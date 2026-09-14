"use server";

import { createHash, randomInt, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { prisma, isDbConfigured } from "@/lib/db";
import { sendMail } from "@/lib/email";
import { verificationCode } from "@/lib/email-templates";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";

/**
 * Our own email verification for new accounts.
 *
 * Registration is two steps. `startRegistration` mails a six-digit code and
 * stores only its hash; `completeRegistration` checks the code and, only then,
 * creates the Supabase account already confirmed.
 *
 * The account is created server-side with the service role key rather than by
 * the browser, because the anon key is public: a browser-side signUp is a
 * signUp anyone can make with curl, and a gate that can be walked around is
 * decoration. Turn off public signups in the Supabase dashboard to close the
 * other door.
 */

const CODE_TTL_MINUTES = 15;
const MAX_ATTEMPTS = 5;
const RESEND_COOLDOWN_SECONDS = 60;

const emailSchema = z.string().trim().toLowerCase().email();
const passwordSchema = z.string().min(8);

export interface RegisterState {
  step: "email" | "code" | "done";
  error?:
    | "invalid-email"
    | "weak-password"
    | "exists"
    | "too-soon"
    | "bad-code"
    | "expired"
    | "locked"
    | "unavailable"
    | "server";
  /** Seconds left before another code may be requested. */
  retryIn?: number;
}

const hash = (code: string) => createHash("sha256").update(code).digest("hex");

/** Constant-time compare, so a wrong code cannot be narrowed by timing. */
function sameHash(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

async function emailAlreadyRegistered(email: string): Promise<boolean> {
  // Profile rows mirror Supabase's users and are created on first sign-in, so
  // this catches anyone who has ever completed registration.
  const existing = await prisma.profile.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(existing);
}

/** Step one: send a code to the address. */
export async function startRegistration(rawEmail: string): Promise<RegisterState> {
  if (!isDbConfigured || !isAdminConfigured) {
    return { step: "email", error: "unavailable" };
  }

  const parsed = emailSchema.safeParse(rawEmail);
  if (!parsed.success) return { step: "email", error: "invalid-email" };
  const email = parsed.data;

  if (await emailAlreadyRegistered(email)) {
    return { step: "email", error: "exists" };
  }

  const pending = await prisma.emailVerification.findUnique({ where: { email } });
  if (pending) {
    const elapsed = (Date.now() - pending.lastSentAt.getTime()) / 1000;
    if (elapsed < RESEND_COOLDOWN_SECONDS) {
      return {
        step: "code",
        error: "too-soon",
        retryIn: Math.ceil(RESEND_COOLDOWN_SECONDS - elapsed),
      };
    }
  }

  // randomInt is drawn from the OS entropy source. Math.random is not, and a
  // predictable code is the same as no code.
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60_000);

  try {
    await prisma.emailVerification.upsert({
      where: { email },
      // A new code resets the attempt counter: the old one is dead either way.
      update: { codeHash: hash(code), expiresAt, attempts: 0, lastSentAt: new Date() },
      create: { email, codeHash: hash(code), expiresAt },
    });
    await sendMail(verificationCode(email, code, CODE_TTL_MINUTES));
  } catch (e) {
    console.error("startRegistration failed:", e);
    return { step: "email", error: "server" };
  }

  return { step: "code" };
}

/** Step two: check the code and create the account. */
export async function completeRegistration(input: {
  email: string;
  code: string;
  password: string;
}): Promise<RegisterState> {
  if (!isDbConfigured || !isAdminConfigured) {
    return { step: "code", error: "unavailable" };
  }

  const parsedEmail = emailSchema.safeParse(input.email);
  if (!parsedEmail.success) return { step: "email", error: "invalid-email" };
  const email = parsedEmail.data;

  const parsedPassword = passwordSchema.safeParse(input.password);
  if (!parsedPassword.success) return { step: "code", error: "weak-password" };

  const code = input.code.replace(/\D/g, "");

  const pending = await prisma.emailVerification.findUnique({ where: { email } });
  if (!pending) return { step: "email", error: "expired" };

  if (pending.expiresAt < new Date()) {
    await prisma.emailVerification.delete({ where: { email } }).catch(() => {});
    return { step: "email", error: "expired" };
  }

  if (pending.attempts >= MAX_ATTEMPTS) {
    return { step: "code", error: "locked" };
  }

  if (code.length !== 6 || !sameHash(pending.codeHash, hash(code))) {
    await prisma.emailVerification.update({
      where: { email },
      data: { attempts: { increment: 1 } },
    });
    return { step: "code", error: "bad-code" };
  }

  const admin = createAdminClient();
  if (!admin) return { step: "code", error: "unavailable" };

  const { error } = await admin.auth.admin.createUser({
    email,
    password: parsedPassword.data,
    // We just proved the address works, which is the whole point of the code.
    email_confirm: true,
  });

  if (error) {
    console.error("createUser failed:", error);
    // A duplicate here means someone registered between the two steps.
    return {
      step: "code",
      error: /already|exists|registered/i.test(error.message) ? "exists" : "server",
    };
  }

  // Single use. Leaving it would let the same code create nothing further, but
  // it would still sit in the table as a hash worth attacking.
  await prisma.emailVerification.delete({ where: { email } }).catch(() => {});

  return { step: "done" };
}

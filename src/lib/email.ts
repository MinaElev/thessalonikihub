import "server-only";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

/**
 * Outgoing mail.
 *
 * Configured entirely from the environment, and a no-op when it is not
 * configured: nothing here should ever be able to fail a moderation action or
 * a submission. An owner not receiving a notification is a small problem; an
 * approval that throws because a mail server was unreachable is a large one.
 *
 *   SMTP_HOST   smtp.gmail.com
 *   SMTP_PORT   465
 *   SMTP_USER   the full address the mail is sent from
 *   SMTP_PASS   a Google App Password (NOT the account password — Google
 *               stopped accepting those for SMTP)
 *   MAIL_FROM   optional display form, e.g. "ThessalonikiHub <you@gmail.com>"
 *   ADMIN_EMAIL optional; where new-submission alerts go. Defaults to SMTP_USER.
 *
 * Gmail rewrites the From header to the authenticated account, so MAIL_FROM
 * can change the display name but not the address.
 */

const host = process.env.SMTP_HOST;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const port = Number(process.env.SMTP_PORT ?? 465);

export const isMailConfigured = Boolean(host && user && pass);

const from = process.env.MAIL_FROM ?? (user ? `ThessalonikiHub <${user}>` : "");
export const adminEmail = process.env.ADMIN_EMAIL ?? user ?? "";

let cached: Transporter | null = null;

function transport(): Transporter | null {
  if (!isMailConfigured) return null;
  // Reused across invocations: a new connection per email is slow and, on
  // Gmail, looks like exactly the pattern rate limiters are built to stop.
  cached ??= nodemailer.createTransport({
    host,
    port,
    // 465 is implicit TLS; 587 upgrades with STARTTLS.
    secure: port === 465,
    auth: { user, pass },
  });
  return cached;
}

export interface Mail {
  to: string;
  subject: string;
  /** Plain text. A text-only email is fine here and never renders badly. */
  text: string;
}

/** Send one email. Returns whether it went out; never throws. */
export async function sendMail(mail: Mail): Promise<boolean> {
  const tx = transport();
  if (!tx || !mail.to) return false;
  try {
    await tx.sendMail({ from, to: mail.to, subject: mail.subject, text: mail.text });
    return true;
  } catch (e) {
    console.error("sendMail failed:", e);
    return false;
  }
}

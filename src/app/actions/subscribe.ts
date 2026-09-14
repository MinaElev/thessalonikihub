"use server";

import { z } from "zod";
import { randomBytes } from "node:crypto";
import { prisma, isDbConfigured } from "@/lib/db";
import { site } from "@/lib/site";
import { sendMail } from "@/lib/email";
import { confirmSubscription } from "@/lib/email-templates";

const schema = z.object({
  email: z.string().trim().toLowerCase().email(),
  locale: z.enum(["el", "en"]).catch("el"),
});

export interface SubscribeState {
  status: "idle" | "ok" | "invalid" | "unavailable" | "error";
}

/**
 * Store a newsletter subscriber.
 *
 * Double opt-in. The address is stored unconfirmed and a confirmation link is
 * sent; nothing counts as consent until that link is followed. Under GDPR a
 * typed address is not proof of anything — anyone can type someone else's.
 *
 * Re-subscribing an existing address is treated as success and clears any
 * previous unsubscribe, so the form never leaks whether an address is on file.
 * An address that is already confirmed is not mailed again, which stops the
 * form being used to send repeated mail to a stranger.
 */
export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    locale: formData.get("locale"),
  });
  if (!parsed.success) return { status: "invalid" };
  if (!isDbConfigured) return { status: "unavailable" };

  const { email, locale } = parsed.data;
  try {
    const existing = await prisma.subscriber.findUnique({ where: { email } });

    // Already confirmed: accept silently. Re-sending would let the form be
    // pointed at someone else's inbox over and over.
    if (existing?.confirmed) {
      await prisma.subscriber.update({
        where: { email },
        data: { locale, unsubscribedAt: null },
      });
      return { status: "ok" };
    }

    // A fresh token each time, so an older link stops working.
    const token = randomBytes(24).toString("base64url");
    await prisma.subscriber.upsert({
      where: { email },
      update: { locale, unsubscribedAt: null, confirmToken: token },
      create: { email, locale, confirmToken: token },
    });

    await sendMail(
      confirmSubscription(
        email,
        `${site.url}/api/newsletter/confirm?token=${token}`,
      ),
    );
    return { status: "ok" };
  } catch {
    return { status: "error" };
  }
}

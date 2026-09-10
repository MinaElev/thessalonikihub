"use server";

import { z } from "zod";
import { prisma, isDbConfigured } from "@/lib/db";

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
 * This only CAPTURES the address. Sending the weekly digest needs an external
 * email provider (an API key in the environment); until one is configured,
 * addresses simply accumulate here and nothing is ever sent.
 *
 * Re-subscribing an existing address is treated as success and clears any
 * previous unsubscribe, so the form never leaks whether an address is on file.
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
    await prisma.subscriber.upsert({
      where: { email },
      update: { locale, unsubscribedAt: null },
      create: { email, locale },
    });
    return { status: "ok" };
  } catch {
    return { status: "error" };
  }
}

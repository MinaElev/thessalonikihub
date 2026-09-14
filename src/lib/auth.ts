import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { prisma, isDbConfigured } from "@/lib/db";

export interface CurrentUser {
  id: string;
  email: string;
  name: string | null;
  role: "USER" | "OWNER" | "ADMIN";
}

/**
 * The signed-in user (or null). Ensures a matching Profile row exists and
 * returns their role. Safe when Supabase/DB are not configured (returns null).
 *
 * Deduplicated per request. Each call otherwise costs a Supabase round trip
 * and a Profile upsert — a database *write* — so a layout and the page inside
 * it asking the same question paid for it twice.
 */
export const getCurrentUser = cache(async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) return null;

  const base: CurrentUser = {
    id: user.id,
    email: user.email,
    name: (user.user_metadata?.name as string) ?? null,
    role: "USER",
  };

  if (!isDbConfigured) return base;

  // Ensure a Profile row exists; read the role from it.
  const profile = await prisma.profile.upsert({
    where: { id: user.id },
    update: { email: user.email },
    create: { id: user.id, email: user.email, name: base.name },
  });

  // The welcome goes out on the first request where a session exists, which
  // is the first moment we know the address actually works. `welcomedAt` is
  // what stops it repeating; it is written whether or not the send succeeded,
  // because a greeting is not worth retrying on every page load forever.
  if (!profile.welcomedAt) {
    await prisma.profile.update({
      where: { id: profile.id },
      data: { welcomedAt: new Date() },
    });
    const [{ sendMail }, { welcome }] = await Promise.all([
      import("@/lib/email"),
      import("@/lib/email-templates"),
    ]);
    await sendMail(welcome(user.email));
  }

  return { ...base, name: profile.name, role: profile.role };
});

export async function requireUser(): Promise<CurrentUser | null> {
  return getCurrentUser();
}

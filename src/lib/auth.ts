import "server-only";
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
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
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

  return { ...base, name: profile.name, role: profile.role };
}

export async function requireUser(): Promise<CurrentUser | null> {
  return getCurrentUser();
}

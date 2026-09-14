"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";

/**
 * Account administration: naming people, and removing them.
 */

const nameSchema = z.string().trim().max(80);

export interface NameState {
  status: "idle" | "saved" | "invalid" | "forbidden";
}

/**
 * Set your own display name.
 *
 * Profile.name was read from Supabase's user metadata, which our registration
 * never writes, so it was null for everyone and the panel listed people by
 * email address. This is the only way to put a name in it.
 */
export async function setMyName(_prev: NameState, formData: FormData): Promise<NameState> {
  if (!isDbConfigured) return { status: "forbidden" };
  const me = await getCurrentUser();
  if (!me) return { status: "forbidden" };

  const parsed = nameSchema.safeParse(formData.get("name"));
  if (!parsed.success) return { status: "invalid" };

  await prisma.profile.update({
    where: { id: me.id },
    // An empty box means "remove it", not "store an empty string".
    data: { name: parsed.data || null },
  });
  revalidatePath("/dashboard");
  revalidatePath("/admin/people");
  return { status: "saved" };
}

/**
 * Delete an account outright — the Supabase auth user and the profile with it.
 *
 * This is what a GDPR erasure request needs, and what clears a test account
 * out of the people list. Cascades remove the person's saved list and their
 * claims; their listings are kept but lose their owner, because deleting
 * someone's account should not silently delete a business's page.
 */
export async function deleteAccount(formData: FormData) {
  if (!isDbConfigured) return;
  const me = await getCurrentUser();
  if (!me || me.role !== "ADMIN") return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;
  // Deleting yourself would end the session mid-request and leave the site
  // with no administrator if you are the only one.
  if (id === me.id) return;

  // Detach rather than cascade: a listing outlives the account that submitted
  // it, and an owner row pointing at nothing would break the dashboard.
  await prisma.place.updateMany({ where: { ownerId: id }, data: { ownerId: null } });
  await prisma.eventItem.updateMany({ where: { ownerId: id }, data: { ownerId: null } });

  await prisma.profile.delete({ where: { id } }).catch(() => {});

  // The profile row is only our mirror; the account itself lives in Supabase
  // Auth and has to be removed there too, or the person can still sign in and
  // silently get a fresh profile on their next request.
  if (isAdminConfigured) {
    const admin = createAdminClient();
    await admin?.auth.admin.deleteUser(id).catch(() => {});
  }

  revalidatePath("/admin/people");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

async function isAdmin(): Promise<boolean> {
  const u = await getCurrentUser();
  return u?.role === "ADMIN";
}

/** Approve a submission (admin only). Reads `kind` + `id` from the form. */
export async function approveListing(formData: FormData) {
  if (!isDbConfigured || !(await isAdmin())) return;
  const kind = String(formData.get("kind"));
  const id = String(formData.get("id"));
  if (kind === "event") {
    await prisma.eventItem.update({ where: { id }, data: { status: "PUBLISHED" } });
  } else {
    await prisma.place.update({ where: { id }, data: { status: "PUBLISHED" } });
  }
  revalidatePath("/admin");
}

/** Reject a submission (admin only). */
export async function rejectListing(formData: FormData) {
  if (!isDbConfigured || !(await isAdmin())) return;
  const kind = String(formData.get("kind"));
  const id = String(formData.get("id"));
  const note = formData.get("note") ? String(formData.get("note")) : null;
  if (kind === "event") {
    await prisma.eventItem.update({
      where: { id },
      data: { status: "REJECTED", rejectionNote: note },
    });
  } else {
    await prisma.place.update({
      where: { id },
      data: { status: "REJECTED", rejectionNote: note },
    });
  }
  revalidatePath("/admin");
}

/** Sign the current user out. */
export async function signOut() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}

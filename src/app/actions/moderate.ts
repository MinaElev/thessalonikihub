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

  // Rebuild the pages the listing has just appeared on, not only the queue.
  // Without this the moderator approves something and it stays invisible
  // until the next ISR window, which reads as the button not having worked.
  if (kind === "event") {
    const row = await prisma.eventItem.update({
      where: { id },
      data: { status: "PUBLISHED" },
      select: { slug: true },
    });
    revalidatePath("/events");
    revalidatePath(`/events/${row.slug}`);
  } else {
    const row = await prisma.place.update({
      where: { id },
      data: { status: "PUBLISHED" },
      select: { slug: true, kind: true },
    });
    const pillar = row.kind.toLowerCase();
    revalidatePath(`/${pillar}`);
    revalidatePath(`/${pillar}/${row.slug}`);
  }
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
  revalidatePath("/dashboard");
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
  revalidatePath("/dashboard");
}

/** Sign the current user out. */
export async function signOut() {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/");
}

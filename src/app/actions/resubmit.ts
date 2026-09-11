"use server";

import { revalidatePath } from "next/cache";
import { prisma, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

/**
 * Put a rejected listing back in the queue.
 *
 * Editing alone did not do this — `updateOwnedListing` never touches `status`
 * — so a rejection was a dead end: the owner could read why, fix it, and still
 * be left looking at a red badge with no way to ask for another look.
 *
 * Clearing the note matters as much as the status. Keeping it would show the
 * owner the old complaint against a listing they have already corrected.
 */
export async function resubmitListing(formData: FormData) {
  if (!isDbConfigured) return;
  const user = await getCurrentUser();
  if (!user) return;

  const kind = String(formData.get("kind") ?? "");
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  if (kind.toUpperCase() === "EVENTS") {
    const event = await prisma.eventItem.findUnique({
      where: { id },
      select: { ownerId: true, status: true },
    });
    // Only the owner, and only from REJECTED: this must not become a way to
    // pull a published listing back out of the site, or to skip moderation.
    if (!event || event.ownerId !== user.id || event.status !== "REJECTED") return;
    await prisma.eventItem.update({
      where: { id },
      data: { status: "PENDING", rejectionNote: null },
    });
  } else {
    const place = await prisma.place.findUnique({
      where: { id },
      select: { ownerId: true, status: true },
    });
    if (!place || place.ownerId !== user.id || place.status !== "REJECTED") return;
    await prisma.place.update({
      where: { id },
      data: { status: "PENDING", rejectionNote: null },
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin");
}

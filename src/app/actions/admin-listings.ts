"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma, isDbConfigured } from "@/lib/db";
import { TAG_EVENTS, TAG_PLACES } from "@/lib/cache-tags";
import { getCurrentUser } from "@/lib/auth";

/**
 * Blanket status control over any listing, published ones included.
 *
 * Moderation could only ever push a submission forwards: approve or reject,
 * once, from the pending queue. There was no way to take a listing back off
 * the site — a business that closed, a page that turned out to be wrong —
 * short of editing the database by hand.
 */

const STATUSES = new Set(["DRAFT", "PENDING", "PUBLISHED", "REJECTED"]);

async function requireAdmin() {
  const user = await getCurrentUser();
  return user?.role === "ADMIN" ? user : null;
}

/** Everything a status change touches, so nothing is served stale. */
function revalidateFor(kind: string, slug: string, pillar?: string) {
  if (kind === "event") {
    revalidateTag(TAG_EVENTS);
    revalidatePath("/events");
    revalidatePath(`/events/${slug}`);
  } else {
    revalidateTag(TAG_PLACES);
    if (pillar) {
      revalidatePath(`/${pillar}`);
      revalidatePath(`/${pillar}/${slug}`);
    }
  }
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
  revalidatePath("/admin/listings");
  revalidatePath("/dashboard");
}

export async function setListingStatus(formData: FormData) {
  if (!isDbConfigured || !(await requireAdmin())) return;

  const kind = String(formData.get("kind") ?? "");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !STATUSES.has(status)) return;

  if (kind === "event") {
    const row = await prisma.eventItem.update({
      where: { id },
      data: {
        status: status as never,
        // A note explaining a rejection is meaningless once the listing is
        // no longer rejected, and would resurface if it were rejected again.
        ...(status === "REJECTED" ? {} : { rejectionNote: null }),
      },
      select: { slug: true },
    });
    revalidateFor("event", row.slug);
  } else {
    const row = await prisma.place.update({
      where: { id },
      data: {
        status: status as never,
        ...(status === "REJECTED" ? {} : { rejectionNote: null }),
      },
      select: { slug: true, kind: true },
    });
    revalidateFor("place", row.slug, row.kind.toLowerCase());
  }
}

/**
 * Delete a listing outright.
 *
 * Kept deliberately separate from a status change, and guarded in the UI
 * behind its own disclosure, because this is the only irreversible action in
 * the panel. Unpublishing is what an admin almost always wants instead; this
 * exists for spam and for test rows.
 */
export async function deleteListing(formData: FormData) {
  if (!isDbConfigured || !(await requireAdmin())) return;

  const kind = String(formData.get("kind") ?? "");
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  if (kind === "event") {
    const row = await prisma.eventItem
      .delete({ where: { id }, select: { slug: true } })
      .catch(() => null);
    if (row) revalidateFor("event", row.slug);
  } else {
    const row = await prisma.place
      .delete({ where: { id }, select: { slug: true, kind: true } })
      .catch(() => null);
    if (row) revalidateFor("place", row.slug, row.kind.toLowerCase());
  }
}

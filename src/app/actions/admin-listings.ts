"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma, isDbConfigured } from "@/lib/db";
import { TAG_EVENTS, TAG_PLACES } from "@/lib/cache-tags";
import { getCurrentUser } from "@/lib/auth";
import { getPlaceBySlug } from "@/lib/repo";
import { placeToDbData } from "@/lib/place-to-db";

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
  const slug = String(formData.get("slug") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!STATUSES.has(status)) return;

  // A listing defined in a content file has no database row until something
  // needs one. Moderating it is such a moment: materialise the row from the
  // file first, exactly as approving an ownership claim already does, and the
  // repository's merge-by-slug then prefers it from here on. The content file
  // is left untouched, so this is reversible by deleting the row.
  if (kind === "place" && !id) {
    if (!slug) return;
    const place = await getPlaceBySlug(slug);
    if (!place) return;
    const data = placeToDbData(place);
    await prisma.place.upsert({
      where: { slug },
      update: { status: status as never },
      create: { slug, ...data, status: status as never },
    });
    revalidateFor("place", slug, place.kind.toLowerCase());
    return;
  }

  if (!id) return;

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
  // Without a row there is nothing to delete: a file-based listing is defined
  // in the repository, and removing a database row would not take it off the
  // site. Setting it to Draft is what hides it; the page says so.
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

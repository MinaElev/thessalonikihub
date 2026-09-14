"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma, isDbConfigured } from "@/lib/db";
import { TAG_EVENTS, TAG_PLACES } from "@/lib/cache-tags";
import { getCurrentUser } from "@/lib/auth";
import { getPlaceBySlug } from "@/lib/repo";
import { placeToDbData } from "@/lib/place-to-db";
import { recordAudit } from "@/lib/audit";

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
  const actor = await requireAdmin();
  if (!isDbConfigured || !actor) return;

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
    await recordAudit(actor, "listing.adopt", slug, status);
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
    await recordAudit(actor, "listing.status", row.slug, status);
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
    await recordAudit(actor, "listing.status", row.slug, status);
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
  const actor = await requireAdmin();
  if (!isDbConfigured || !actor) return;

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
    if (row) {
      revalidateFor("event", row.slug);
      await recordAudit(actor, "listing.delete", row.slug);
    }
  } else {
    const row = await prisma.place
      .delete({ where: { id }, select: { slug: true, kind: true } })
      .catch(() => null);
    if (row) {
      revalidateFor("place", row.slug, row.kind.toLowerCase());
      await recordAudit(actor, "listing.delete", row.slug);
    }
  }
}

/**
 * Apply one status to many listings at once.
 *
 * Twenty imported events needing the same treatment is the case this exists
 * for. Ids arrive as repeated `selected` fields, each prefixed with its table
 * so a place and an event with the same cuid cannot be confused.
 *
 * File-only listings are not selectable in the UI and are ignored here too:
 * adopting a content file into the database is a decision worth making one at
 * a time, not something to do to thirty rows by accident.
 */
export async function bulkSetStatus(formData: FormData) {
  const actor = await requireAdmin();
  if (!isDbConfigured || !actor) return;

  const status = String(formData.get("status") ?? "");
  if (!STATUSES.has(status)) return;

  const selected = formData
    .getAll("selected")
    .map(String)
    .filter((v) => v.includes(":"));
  if (selected.length === 0) return;

  const placeIds = selected.filter((v) => v.startsWith("place:")).map((v) => v.slice(6));
  const eventIds = selected.filter((v) => v.startsWith("event:")).map((v) => v.slice(6));

  const clear = status === "REJECTED" ? {} : { rejectionNote: null };

  if (placeIds.length) {
    await prisma.place.updateMany({
      where: { id: { in: placeIds } },
      data: { status: status as never, ...clear },
    });
    revalidateTag(TAG_PLACES);
  }
  if (eventIds.length) {
    await prisma.eventItem.updateMany({
      where: { id: { in: eventIds } },
      data: { status: status as never, ...clear },
    });
    revalidateTag(TAG_EVENTS);
  }

  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/sitemap.xml");
  revalidatePath("/admin");
  revalidatePath("/admin/listings");
  revalidatePath("/dashboard");

  await recordAudit(
    actor,
    "listing.status",
    `${selected.length} listings`,
    `bulk → ${status}`,
  );
}

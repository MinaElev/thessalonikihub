"use server";

import { randomBytes } from "node:crypto";
import sharp from "sharp";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma, isDbConfigured } from "@/lib/db";
import { TAG_EVENTS, TAG_PLACES } from "@/lib/cache-tags";
import { getCurrentUser } from "@/lib/auth";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import type { Localized, Photo } from "@/lib/types";
import { pick } from "@/lib/types";

/**
 * Photographs, uploaded by the people who own the listing.
 *
 * The submission form asked for "photo URLs, one per line", which is the worst
 * possible thing to ask a restaurant owner for: they have pictures on a phone,
 * not hosted somewhere with a link. Almost nobody filled it in.
 *
 * Everything is re-encoded here rather than stored as sent. A phone photograph
 * is four megabytes of JPEG with the GPS coordinates of the person who took it
 * in its metadata; what belongs on a public page is a WebP no wider than the
 * layout can use, with none of that attached.
 */

const BUCKET = "listing-photos";
const MAX_BYTES = 8 * 1024 * 1024;
const MAX_WIDTH = 1600;
const MAX_PHOTOS = 8;

const ACCEPTED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/heic",
  "image/heif",
]);

export interface PhotoState {
  status: "idle" | "saved" | "error";
  error?: "auth" | "type" | "size" | "limit" | "storage" | "notfound" | "unavailable";
  /** The listing's photos after the change, so the form can redraw. */
  photos?: Photo[];
}

type Target = { table: "place" | "event"; id: string; name: Localized<string>; photos: Photo[] };

async function loadTarget(kind: string, slug: string): Promise<Target | null> {
  const isEvent = kind.toLowerCase() === "events";
  if (isEvent) {
    const row = await prisma.eventItem.findUnique({
      where: { slug },
      select: { id: true, name: true, photos: true, ownerId: true },
    });
    if (!row) return null;
    return {
      table: "event",
      id: row.id,
      name: row.name as Localized<string>,
      photos: (row.photos ?? []) as unknown as Photo[],
    };
  }
  const row = await prisma.place.findUnique({
    where: { slug },
    select: { id: true, name: true, photos: true, ownerId: true },
  });
  if (!row) return null;
  return {
    table: "place",
    id: row.id,
    name: row.name as Localized<string>,
    photos: (row.photos ?? []) as unknown as Photo[],
  };
}

async function mayEdit(kind: string, slug: string): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  if (user.role === "ADMIN") return true;
  const owner =
    kind.toLowerCase() === "events"
      ? (await prisma.eventItem.findUnique({ where: { slug }, select: { ownerId: true } }))?.ownerId
      : (await prisma.place.findUnique({ where: { slug }, select: { ownerId: true } }))?.ownerId;
  return owner === user.id;
}

async function save(target: Target, photos: Photo[], kind: string, slug: string) {
  if (target.table === "event") {
    await prisma.eventItem.update({ where: { id: target.id }, data: { photos: photos as never } });
    revalidateTag(TAG_EVENTS);
    revalidatePath(`/events/${slug}`);
  } else {
    await prisma.place.update({ where: { id: target.id }, data: { photos: photos as never } });
    revalidateTag(TAG_PLACES);
    revalidatePath(`/${kind.toLowerCase()}/${slug}`);
  }
  revalidatePath("/dashboard");
  revalidatePath("/admin/listings");
}

export async function uploadListingPhoto(
  _prev: PhotoState,
  formData: FormData,
): Promise<PhotoState> {
  if (!isDbConfigured || !isAdminConfigured) return { status: "error", error: "unavailable" };

  const kind = String(formData.get("kind") ?? "");
  const slug = String(formData.get("slug") ?? "");
  if (!(await mayEdit(kind, slug))) return { status: "error", error: "auth" };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { status: "error", error: "type" };
  if (!ACCEPTED.has(file.type)) return { status: "error", error: "type" };
  if (file.size > MAX_BYTES) return { status: "error", error: "size" };

  const target = await loadTarget(kind, slug);
  if (!target) return { status: "error", error: "notfound" };
  if (target.photos.length >= MAX_PHOTOS) {
    return { status: "error", error: "limit", photos: target.photos };
  }

  let body: Buffer;
  try {
    // withoutEnlargement: a small photograph stays small rather than being
    // upscaled into a blurry one. Re-encoding also drops EXIF, which is how
    // the location of whoever took the picture would otherwise be published.
    body = await sharp(Buffer.from(await file.arrayBuffer()))
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    return { status: "error", error: "type", photos: target.photos };
  }

  const admin = createAdminClient();
  if (!admin) return { status: "error", error: "unavailable" };

  const path = `${slug}/${randomBytes(8).toString("hex")}.webp`;
  const { error } = await admin.storage
    .from(BUCKET)
    .upload(path, body, { contentType: "image/webp", upsert: false });
  if (error) {
    console.error("photo upload failed:", error);
    return { status: "error", error: "storage", photos: target.photos };
  }

  const { data } = admin.storage.from(BUCKET).getPublicUrl(path);

  // Alt text from the listing's own name. Generic, but true — and far better
  // than the empty string, which is what an uploader that does not ask gets.
  const position = target.photos.length + 1;
  const photos: Photo[] = [
    ...target.photos,
    {
      url: data.publicUrl,
      alt: {
        el: `${pick(target.name, "el")} — φωτογραφία ${position}`,
        en: `${pick(target.name, "en")} — photo ${position}`,
      },
    },
  ];

  await save(target, photos, kind, slug);
  return { status: "saved", photos };
}

export async function deleteListingPhoto(
  _prev: PhotoState,
  formData: FormData,
): Promise<PhotoState> {
  if (!isDbConfigured) return { status: "error", error: "unavailable" };

  const kind = String(formData.get("kind") ?? "");
  const slug = String(formData.get("slug") ?? "");
  const url = String(formData.get("url") ?? "");
  if (!(await mayEdit(kind, slug))) return { status: "error", error: "auth" };

  const target = await loadTarget(kind, slug);
  if (!target) return { status: "error", error: "notfound" };

  const photos = target.photos.filter((p) => p.url !== url);
  if (photos.length === target.photos.length) {
    return { status: "error", error: "notfound", photos: target.photos };
  }

  await save(target, photos, kind, slug);

  // Remove the object too, but only one we host: a listing may still carry a
  // photograph referenced from the content files, and deleting the row's
  // reference must not reach outside our own bucket.
  const marker = `/${BUCKET}/`;
  if (isAdminConfigured && url.includes(marker)) {
    const path = url.slice(url.indexOf(marker) + marker.length);
    await createAdminClient()?.storage.from(BUCKET).remove([path]);
  }

  return { status: "saved", photos };
}

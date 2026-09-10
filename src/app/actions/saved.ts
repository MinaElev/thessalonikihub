"use server";

import { randomBytes } from "node:crypto";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export interface SaveState {
  status: "idle" | "saved" | "removed" | "unauthenticated" | "error";
}

const saveSchema = z.object({
  kind: z.enum(["place", "event", "route", "dish", "festival"]),
  slug: z.string().trim().min(1).max(120),
  path: z.string().trim().startsWith("/").max(200),
  label: z.string().trim().min(1).max(200),
});

/**
 * Add or remove an entry from the signed-in user's list.
 *
 * The label and path are captured at save time so the list keeps rendering
 * even if content is later edited or moved, and so showing the list needs no
 * lookups back into the content files.
 */
export async function toggleSaved(
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  if (!isDbConfigured) return { status: "error" };

  const user = await getCurrentUser();
  if (!user) return { status: "unauthenticated" };

  const parsed = saveSchema.safeParse({
    kind: formData.get("kind"),
    slug: formData.get("slug"),
    path: formData.get("path"),
    label: formData.get("label"),
  });
  if (!parsed.success) return { status: "error" };
  const { kind, slug, path, label } = parsed.data;

  try {
    const existing = await prisma.savedItem.findUnique({
      where: { userId_kind_slug: { userId: user.id, kind, slug } },
    });

    if (existing) {
      await prisma.savedItem.delete({ where: { id: existing.id } });
      revalidatePath("/dashboard/saved");
      return { status: "removed" };
    }

    await prisma.savedItem.create({
      data: { userId: user.id, kind, slug, path, label },
    });
    revalidatePath("/dashboard/saved");
    return { status: "saved" };
  } catch {
    return { status: "error" };
  }
}

/** Remove one entry from the list (used from the list page itself). */
export async function removeSaved(formData: FormData) {
  if (!isDbConfigured) return;
  const user = await getCurrentUser();
  if (!user) return;
  const id = String(formData.get("id") ?? "");
  // Scoped to the owner, so an id from elsewhere deletes nothing.
  await prisma.savedItem.deleteMany({ where: { id, userId: user.id } });
  revalidatePath("/dashboard/saved");
}

/**
 * Turn the shareable link on, or rotate it.
 *
 * Rotating issues a fresh token, which silently revokes every link shared
 * before — that is the only way to take a shared list back.
 */
export async function enableSharing() {
  if (!isDbConfigured) return;
  const user = await getCurrentUser();
  if (!user) return;
  await prisma.profile.update({
    where: { id: user.id },
    data: { shareToken: randomBytes(12).toString("base64url") },
  });
  revalidatePath("/dashboard/saved");
}

/** Turn sharing off; any previously shared link stops resolving. */
export async function disableSharing() {
  if (!isDbConfigured) return;
  const user = await getCurrentUser();
  if (!user) return;
  await prisma.profile.update({
    where: { id: user.id },
    data: { shareToken: null },
  });
  revalidatePath("/dashboard/saved");
}

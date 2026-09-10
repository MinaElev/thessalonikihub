"use server";

import { revalidatePath } from "next/cache";
import { prisma, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getPlaceBySlug } from "@/lib/repo";
import { placeToDbData } from "@/lib/place-to-db";
import { pick } from "@/lib/types";

export interface ClaimState {
  status: "idle" | "ok" | "duplicate" | "unauthenticated" | "notfound" | "error";
}

/**
 * A signed-in user asks to be recognised as the owner of a listing.
 *
 * The claim is keyed by slug, so it works for listings that live in content
 * files as well as those already in the database. Nothing is granted here —
 * an admin reviews it.
 */
export async function requestClaim(
  _prev: ClaimState,
  formData: FormData,
): Promise<ClaimState> {
  if (!isDbConfigured) return { status: "error" };

  const user = await getCurrentUser();
  if (!user) return { status: "unauthenticated" };

  const slug = String(formData.get("slug") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim().slice(0, 1000);
  if (!slug) return { status: "notfound" };

  const place = await getPlaceBySlug(slug);
  if (!place) return { status: "notfound" };

  const existing = await prisma.claim.findUnique({
    where: { placeSlug_userId: { placeSlug: slug, userId: user.id } },
  });
  if (existing) return { status: "duplicate" };

  try {
    await prisma.claim.create({
      data: {
        placeSlug: slug,
        placeKind: place.kind,
        placeName: pick(place.name, "el"),
        userId: user.id,
        message: message || null,
      },
    });
    revalidatePath("/dashboard");
    revalidatePath("/admin");
    return { status: "ok" };
  } catch {
    return { status: "error" };
  }
}

async function isAdmin(): Promise<boolean> {
  const u = await getCurrentUser();
  return u?.role === "ADMIN";
}

/**
 * Approve a claim (admin only).
 *
 * Grants real capability rather than just flipping a flag: the listing is
 * materialised in the database if it only existed in a content file, the
 * claimant becomes its owner and is promoted to OWNER, and the listing is
 * marked verified. Because the repository lets database rows win by slug, the
 * owned row now shadows the content file.
 */
export async function approveClaim(formData: FormData) {
  if (!isDbConfigured || !(await isAdmin())) return;
  const id = String(formData.get("id") ?? "");
  const claim = await prisma.claim.findUnique({ where: { id } });
  if (!claim) return;

  const place = await getPlaceBySlug(claim.placeSlug);
  if (place) {
    const data = placeToDbData(place);
    await prisma.place.upsert({
      where: { slug: claim.placeSlug },
      update: { ownerId: claim.userId, verified: true },
      create: { slug: claim.placeSlug, ...data, ownerId: claim.userId, verified: true },
    });
  }

  // Promote to OWNER, but never demote an admin who claims a listing.
  const claimant = await prisma.profile.findUnique({ where: { id: claim.userId } });
  if (claimant?.role === "USER") {
    await prisma.$transaction([
      prisma.claim.update({ where: { id }, data: { status: "APPROVED" } }),
      prisma.profile.update({ where: { id: claim.userId }, data: { role: "OWNER" } }),
    ]);
  } else {
    await prisma.claim.update({ where: { id }, data: { status: "APPROVED" } });
  }

  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath(`/${claim.placeKind}/${claim.placeSlug}`);
}

/** Reject a claim (admin only). */
export async function rejectClaim(formData: FormData) {
  if (!isDbConfigured || !(await isAdmin())) return;
  const id = String(formData.get("id") ?? "");
  await prisma.claim.update({ where: { id }, data: { status: "REJECTED" } });
  revalidatePath("/admin");
  revalidatePath("/dashboard");
}

"use server";

import { revalidatePath } from "next/cache";
import { prisma, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { parseAthensLocal } from "@/lib/athens-time";
import type { Localized } from "@/lib/types";

export interface EventEditState {
  status: "idle" | "saved" | "forbidden" | "invalid" | "error";
  message?: string;
}

/** Keep both languages, but never store an empty string as a translation. */
function loc(el: string, en: string): Localized<string> {
  const out: Localized<string> = { el: el.trim() };
  if (en.trim()) out.en = en.trim();
  return out;
}

function str(form: FormData, key: string): string {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Edit an event. Available to its owner, and to admins for every event —
 * including the imported ones, which is the only way their text ever gets
 * rewritten.
 */
export async function updateOwnedEvent(
  _prev: EventEditState,
  formData: FormData,
): Promise<EventEditState> {
  if (!isDbConfigured) return { status: "error" };

  const user = await getCurrentUser();
  if (!user) return { status: "forbidden" };

  const slug = str(formData, "slug");
  const event = await prisma.eventItem.findUnique({ where: { slug } });
  if (!event) return { status: "error" };

  const isAdmin = user.role === "ADMIN";
  if (event.ownerId !== user.id && !isAdmin) return { status: "forbidden" };

  const nameEl = str(formData, "nameEl");
  const summaryEl = str(formData, "summaryEl");
  const descriptionEl = str(formData, "descriptionEl");
  const venueEl = str(formData, "venueEl");
  if (!nameEl || !summaryEl || !venueEl) {
    return { status: "invalid", message: "name/summary/venue" };
  }

  const startsAt = parseAthensLocal(str(formData, "startsAt"));
  if (!startsAt) return { status: "invalid", message: "startsAt" };
  const endsAt = parseAthensLocal(str(formData, "endsAt"));
  if (endsAt && endsAt <= startsAt) return { status: "invalid", message: "endsAt" };

  const priceInfoEl = str(formData, "priceInfoEl");
  const existingContact = (event.contact ?? {}) as Record<string, unknown>;

  const data: Record<string, unknown> = {
    name: loc(nameEl, str(formData, "nameEn")),
    summary: loc(summaryEl, str(formData, "summaryEn")),
    description: loc(descriptionEl, str(formData, "descriptionEn")),
    venue: loc(venueEl, str(formData, "venueEn")),
    startsAt,
    endsAt,
    // The owner said what time it starts, so the padding flag no longer applies.
    timeKnown: true,
    priceInfo: priceInfoEl ? loc(priceInfoEl, str(formData, "priceInfoEn")) : null,
    contact: {
      ...existingContact,
      phone: str(formData, "phone") || undefined,
      email: str(formData, "email") || undefined,
      website: str(formData, "website") || undefined,
      bookingUrl: str(formData, "bookingUrl") || undefined,
    },
  };

  // Only an admin may declare the text original. It governs indexing: an
  // imported event stays noindex and out of the sitemap until someone has
  // actually rewritten the feed's wording, and that judgement is editorial.
  if (isAdmin) {
    data.textRewritten = formData.get("textRewritten") === "on";
  }

  try {
    await prisma.eventItem.update({ where: { slug }, data: data as never });
  } catch (e) {
    console.error("updateOwnedEvent failed:", e);
    return { status: "error" };
  }

  revalidatePath("/dashboard");
  revalidatePath("/admin");
  revalidatePath("/events");
  revalidatePath(`/events/${slug}`);
  // The sitemap's contents depend on textRewritten, so it has to be rebuilt too.
  revalidatePath("/sitemap.xml");
  return { status: "saved" };
}

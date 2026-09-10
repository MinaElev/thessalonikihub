"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import type { OpeningHours, WeekDay } from "@/lib/types";

export interface OwnerEditState {
  status: "idle" | "ok" | "forbidden" | "invalid" | "error";
  message?: string;
}

const DAYS: WeekDay[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

/** "09:00-17:00", or empty for closed. Anything else is rejected. */
const rangeSchema = z
  .string()
  .trim()
  .refine(
    (v) => v === "" || /^([01]\d|2[0-3]):[0-5]\d\s*-\s*([01]\d|2[0-3]):[0-5]\d$/.test(v),
    { message: "range" },
  );

const offerSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(600),
  expiresAt: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
});

/** Editorial fields, writable by an admin only. */
const editorialSchema = z.object({
  nameEl: z.string().trim().min(2).max(160),
  nameEn: z.string().trim().max(160),
  summaryEl: z.string().trim().min(10).max(400),
  summaryEn: z.string().trim().max(400),
  descriptionEl: z.string().trim().min(20),
  descriptionEn: z.string().trim(),
  seoTitleEl: z.string().trim().max(70),
  seoTitleEn: z.string().trim().max(70),
  seoDescriptionEl: z.string().trim().max(200),
  seoDescriptionEn: z.string().trim().max(200),
});

const editSchema = z.object({
  phone: z.string().trim().max(40),
  email: z.string().trim().max(120),
  website: z.string().trim().max(300),
  bookingUrl: z.string().trim().max(300),
});

function normaliseUrl(value: string): string | undefined {
  const v = value.trim();
  if (!v) return undefined;
  const withProtocol = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    new URL(withProtocol);
    return withProtocol;
  } catch {
    return undefined;
  }
}

/**
 * An owner updates the parts of their listing we refuse to invent: opening
 * hours, contact details and current offers.
 *
 * Only the listing's owner (or an admin) may write, and only these fields —
 * the editorial description, location and category stay under editorial
 * control so a listing cannot be rewritten into something else.
 */
export async function updateOwnedListing(
  _prev: OwnerEditState,
  formData: FormData,
): Promise<OwnerEditState> {
  if (!isDbConfigured) return { status: "error" };

  const user = await getCurrentUser();
  if (!user) return { status: "forbidden" };

  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) return { status: "invalid" };

  const place = await prisma.place.findUnique({ where: { slug } });
  if (!place) return { status: "forbidden" };
  if (place.ownerId !== user.id && user.role !== "ADMIN") {
    return { status: "forbidden" };
  }

  // Opening hours: one range per day, blank means closed, absent means unstated.
  const hours: OpeningHours = {};
  for (const day of DAYS) {
    const raw = formData.get(`hours_${day}`);
    if (raw === null) continue;
    const parsed = rangeSchema.safeParse(String(raw));
    if (!parsed.success) {
      return { status: "invalid", message: day };
    }
    hours[day] = parsed.data;
  }

  const contactParsed = editSchema.safeParse({
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    website: formData.get("website") ?? "",
    bookingUrl: formData.get("bookingUrl") ?? "",
  });
  if (!contactParsed.success) return { status: "invalid", message: "contact" };

  const existingContact = (place.contact ?? {}) as Record<string, unknown>;
  const contact = {
    ...existingContact,
    phone: contactParsed.data.phone || undefined,
    email: contactParsed.data.email || undefined,
    website: normaliseUrl(contactParsed.data.website),
    bookingUrl: normaliseUrl(contactParsed.data.bookingUrl),
  };

  // Offers arrive as parallel arrays from repeated form rows.
  const titles = formData.getAll("offer_title").map(String);
  const descriptions = formData.getAll("offer_description").map(String);
  const expiries = formData.getAll("offer_expires").map(String);
  const offers: {
    id: string;
    title: { el: string };
    description: { el: string };
    expiresAt?: string;
  }[] = [];
  for (let i = 0; i < titles.length; i += 1) {
    if (!titles[i]?.trim()) continue;
    const parsed = offerSchema.safeParse({
      title: titles[i],
      description: descriptions[i] ?? "",
      expiresAt: expiries[i] ?? "",
    });
    if (!parsed.success) return { status: "invalid", message: "offer" };
    offers.push({
      id: `offer-${i + 1}`,
      title: { el: parsed.data.title },
      description: { el: parsed.data.description },
      ...(parsed.data.expiresAt ? { expiresAt: parsed.data.expiresAt } : {}),
    });
  }

  // Editorial text and SEO overrides are admin-only: an owner must not be able
  // to rewrite what the listing says it is.
  let editorial: Record<string, unknown> = {};
  if (user.role === "ADMIN" && formData.get("nameEl") !== null) {
    const e = editorialSchema.safeParse({
      nameEl: formData.get("nameEl") ?? "",
      nameEn: formData.get("nameEn") ?? "",
      summaryEl: formData.get("summaryEl") ?? "",
      summaryEn: formData.get("summaryEn") ?? "",
      descriptionEl: formData.get("descriptionEl") ?? "",
      descriptionEn: formData.get("descriptionEn") ?? "",
      seoTitleEl: formData.get("seoTitleEl") ?? "",
      seoTitleEn: formData.get("seoTitleEn") ?? "",
      seoDescriptionEl: formData.get("seoDescriptionEl") ?? "",
      seoDescriptionEn: formData.get("seoDescriptionEn") ?? "",
    });
    if (!e.success) return { status: "invalid", message: "editorial" };
    const d = e.data;
    // Greek is required; English is stored only when actually written, so
    // `pick()` keeps falling back to Greek rather than showing an empty page.
    const loc = (el: string, en: string) => (en ? { el, en } : { el });
    editorial = {
      name: loc(d.nameEl, d.nameEn),
      summary: loc(d.summaryEl, d.summaryEn),
      description: loc(d.descriptionEl, d.descriptionEn),
      seoTitle: d.seoTitleEl || d.seoTitleEn ? loc(d.seoTitleEl, d.seoTitleEn) : null,
      seoDescription:
        d.seoDescriptionEl || d.seoDescriptionEn
          ? loc(d.seoDescriptionEl, d.seoDescriptionEn)
          : null,
    };
  }

  try {
    const data = {
      hours,
      contact,
      offers: offers.length ? offers : null,
      ...editorial,
    };
    await prisma.place.update({ where: { slug }, data: data as never });
  } catch {
    return { status: "error" };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/${place.kind.toLowerCase()}/${slug}`);
  return { status: "ok" };
}

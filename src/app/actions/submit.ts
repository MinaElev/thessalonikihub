"use server";

import { prisma, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { listingSchema } from "@/lib/submit-schema";
import { centroidFor } from "@/lib/area-centroids";
import { parseAthensLocal } from "@/lib/athens-time";
import type { Localized } from "@/lib/types";

export type SubmitResult =
  | { ok: true; slug: string }
  | { ok: false; error: "auth" | "db" | "validation" | "server"; message?: string };

function slugify(base: string, fallback: string): string {
  const s = base
    .toLowerCase()
    .normalize("NFD")
    // strip combining diacritics (U+0300–U+036F)
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const stem = s || fallback;
  return `${stem}-${Date.now().toString(36).slice(-5)}`;
}

function loc(el: string, en?: string): Localized<string> {
  return en && en.trim() ? { el, en } : { el };
}

function csv(v?: string): string[] {
  return v
    ? v.split(/[,\n]/).map((x) => x.trim()).filter(Boolean)
    : [];
}

export async function submitListing(raw: unknown): Promise<SubmitResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "auth" };

  const parsed = listingSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "validation", message: parsed.error.message };
  }
  if (!isDbConfigured) return { ok: false, error: "db" };

  const d = parsed.data;
  const area = d.area || "center";
  // Prefer the exact pin the owner dropped; otherwise fall back to the area centre.
  const geo =
    d.lat != null && d.lng != null
      ? { lat: d.lat, lng: d.lng }
      : centroidFor(area);
  const slug = slugify(d.nameEn || d.nameEl, d.category);
  const photos = csv(d.photoUrls).map((url) => ({
    url,
    alt: loc(d.nameEl, d.nameEn),
  }));
  const contact = {
    phone: d.phone || undefined,
    whatsapp: d.whatsapp || undefined,
    email: d.email || undefined,
    website: d.website || undefined,
    bookingUrl: d.bookingUrl || undefined,
  };

  try {
    if (d.category === "events") {
      await prisma.eventItem.create({
        data: {
          slug,
          name: loc(d.nameEl, d.nameEn) as never,
          summary: loc(d.summaryEl, d.summaryEn) as never,
          description: loc(d.descriptionEl, d.descriptionEn) as never,
          type: d.type || "event",
          tags: csv(d.tagsCsv),
          // The owner typed a Thessaloniki wall-clock time. `new Date()` on a
          // zoneless value would resolve it against the server's zone (UTC on
          // Vercel), shifting every evening event by two or three hours.
          startsAt: parseAthensLocal(d.startsAt as string) as Date,
          endsAt: parseAthensLocal(d.endsAt),
          venue: loc(d.venueEl ?? "", d.nameEn) as never,
          lat: geo.lat,
          lng: geo.lng,
          area,
          photos: photos as never,
          contact: contact as never,
          priceInfo: d.priceInfoEl ? (loc(d.priceInfoEl) as never) : undefined,
          status: "PENDING" as never,
          ownerId: user.id,
        },
      });
      return { ok: true, slug };
    }

    const stay =
      d.category === "stay"
        ? {
            propertyType: d.propertyType || "apartment",
            maxGuests: d.maxGuests,
            bedrooms: d.bedrooms,
            beds: d.beds,
            bathrooms: d.bathrooms,
            sizeSqm: d.sizeSqm,
            priceFrom: d.stayPriceFrom,
            currency: d.currency || "EUR",
            checkIn: d.checkIn || undefined,
            checkOut: d.checkOut || undefined,
            minNights: d.minNights,
            cancellation: d.cancellation,
            parking: d.parking,
            policies: {
              pets: d.petsAllowed,
              smoking: d.smokingAllowed,
            },
            languages: csv(d.languagesCsv),
          }
        : undefined;

    const service =
      d.category === "services"
        ? {
            serviceType: d.serviceType || "other",
            priceModel: d.priceModel,
            priceFrom: d.servicePriceFrom,
            currency: d.currency || "EUR",
            coverageAreas: csv(d.coverageCsv),
            capacityPassengers: d.capacityPassengers,
            availability: d.availabilityEl ? loc(d.availabilityEl) : undefined,
            languages: csv(d.languagesCsv),
          }
        : undefined;

    await prisma.place.create({
      data: {
        slug,
        kind: d.category.toUpperCase() as never,
        name: loc(d.nameEl, d.nameEn) as never,
        summary: loc(d.summaryEl, d.summaryEn) as never,
        description: loc(d.descriptionEl, d.descriptionEn) as never,
        type: d.type || d.propertyType || d.serviceType || "listing",
        tags: csv(d.tagsCsv),
        lat: geo.lat,
        lng: geo.lng,
        area,
        address: d.address ? (loc(d.address) as never) : undefined,
        photos: photos as never,
        contact: contact as never,
        amenities: d.amenities ?? [],
        priceRange: d.priceRange,
        stay: (stay ?? null) as never,
        service: (service ?? null) as never,
        status: "PENDING" as never,
        ownerId: user.id,
      },
    });
    return { ok: true, slug };
  } catch (e) {
    console.error("submitListing failed:", e);
    return { ok: false, error: "server" };
  }
}

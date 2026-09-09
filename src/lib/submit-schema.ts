import { z } from "zod";
import type { Localized } from "@/lib/types";

/** Categories a registered user can submit (DISCOVER is editorial-only). */
export type SubmitCategory =
  | "stay"
  | "eat"
  | "drink"
  | "experiences"
  | "services"
  | "events";

export interface CategoryConfig {
  key: SubmitCategory;
  label: Localized<string>;
  blurb: Localized<string>;
  /** Which extra sections the form shows. */
  sections: {
    amenities?: boolean;
    priceRange?: boolean;
    stay?: boolean;
    service?: boolean;
    event?: boolean;
  };
}

export const submitCategories: CategoryConfig[] = [
  {
    key: "stay",
    label: { el: "Κατάλυμα", en: "Accommodation" },
    blurb: { el: "Διαμέρισμα, studio, βίλα, ξενώνας…", en: "Apartment, studio, villa, guesthouse…" },
    sections: { amenities: true, stay: true },
  },
  {
    key: "eat",
    label: { el: "Φαγητό", en: "Food" },
    blurb: { el: "Εστιατόριο, μεζεδοπωλείο, brunch, καφέ…", en: "Restaurant, meze, brunch, café…" },
    sections: { amenities: true, priceRange: true },
  },
  {
    key: "drink",
    label: { el: "Ποτό", en: "Drink" },
    blurb: { el: "Bar, cocktail bar, rooftop, live…", en: "Bar, cocktail bar, rooftop, live…" },
    sections: { amenities: true, priceRange: true },
  },
  {
    key: "experiences",
    label: { el: "Εμπειρία", en: "Experience" },
    blurb: { el: "Ξενάγηση, food tour, δραστηριότητα…", en: "Tour, food tour, activity…" },
    sections: { priceRange: true },
  },
  {
    key: "services",
    label: { el: "Υπηρεσία", en: "Service" },
    blurb: { el: "Transfer, ταξί, καθαρισμός, φωτογράφος…", en: "Transfer, taxi, cleaning, photographer…" },
    sections: { service: true },
  },
  {
    key: "events",
    label: { el: "Event", en: "Event" },
    blurb: { el: "Συναυλία, φεστιβάλ, έκθεση…", en: "Concert, festival, exhibition…" },
    sections: { event: true },
  },
];

export function getCategory(key: string): CategoryConfig | undefined {
  return submitCategories.find((c) => c.key === key);
}

const optionalUrl = z
  .string()
  .trim()
  .url()
  .optional()
  .or(z.literal("").transform(() => undefined));

const optionalEmail = z
  .string()
  .trim()
  .email()
  .optional()
  .or(z.literal("").transform(() => undefined));

/**
 * One schema covers every category. Common fields are always validated; the
 * form only shows category-relevant fields, and `superRefine` enforces the few
 * category-specific requirements.
 */
export const listingSchema = z
  .object({
    category: z.enum([
      "stay",
      "eat",
      "drink",
      "experiences",
      "services",
      "events",
    ]),

    // Common
    nameEl: z.string().trim().min(2, "Απαιτείται όνομα"),
    nameEn: z.string().trim().optional(),
    summaryEl: z.string().trim().min(10, "Σύντομη περιγραφή (min 10 χαρακτ.)"),
    summaryEn: z.string().trim().optional(),
    descriptionEl: z.string().trim().min(20, "Περιγραφή (min 20 χαρακτ.)"),
    descriptionEn: z.string().trim().optional(),
    type: z.string().trim().optional(),
    area: z.string().trim().optional(),
    address: z.string().trim().optional(),
    // Exact map pin (set via the location picker).
    lat: z.coerce.number().optional(),
    lng: z.coerce.number().optional(),
    tagsCsv: z.string().trim().optional(),
    photoUrls: z.string().trim().optional(),

    // Contact
    phone: z.string().trim().optional(),
    whatsapp: z.string().trim().optional(),
    email: optionalEmail,
    website: optionalUrl,
    bookingUrl: optionalUrl,

    // Eat/Drink
    priceRange: z.coerce.number().int().min(1).max(4).optional(),

    // Amenities (checkbox keys)
    amenities: z.array(z.string()).optional(),

    // Stay
    propertyType: z.string().trim().optional(),
    maxGuests: z.coerce.number().int().positive().optional(),
    bedrooms: z.coerce.number().int().nonnegative().optional(),
    beds: z.coerce.number().int().nonnegative().optional(),
    bathrooms: z.coerce.number().int().nonnegative().optional(),
    sizeSqm: z.coerce.number().positive().optional(),
    stayPriceFrom: z.coerce.number().positive().optional(),
    checkIn: z.string().trim().optional(),
    checkOut: z.string().trim().optional(),
    minNights: z.coerce.number().int().positive().optional(),
    cancellation: z.enum(["flexible", "moderate", "strict"]).optional(),
    parking: z
      .enum(["none", "free-onsite", "paid-onsite", "street", "nearby"])
      .optional(),
    petsAllowed: z.boolean().optional(),
    smokingAllowed: z.boolean().optional(),

    // Service
    serviceType: z.string().trim().optional(),
    priceModel: z
      .enum(["fixed", "per-trip", "per-hour", "per-day", "per-person", "quote"])
      .optional(),
    servicePriceFrom: z.coerce.number().positive().optional(),
    coverageCsv: z.string().trim().optional(),
    capacityPassengers: z.coerce.number().int().positive().optional(),
    availabilityEl: z.string().trim().optional(),

    // Shared extra
    languagesCsv: z.string().trim().optional(),
    currency: z.string().trim().default("EUR").optional(),

    // Event
    startsAt: z.string().trim().optional(),
    endsAt: z.string().trim().optional(),
    venueEl: z.string().trim().optional(),
    priceInfoEl: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.category === "events") {
      if (!data.startsAt)
        ctx.addIssue({ code: "custom", path: ["startsAt"], message: "Απαιτείται ημερομηνία" });
      if (!data.venueEl)
        ctx.addIssue({ code: "custom", path: ["venueEl"], message: "Απαιτείται χώρος" });
    }
    if (data.category === "services" && !data.serviceType) {
      ctx.addIssue({ code: "custom", path: ["serviceType"], message: "Απαιτείται τύπος υπηρεσίας" });
    }
    if (data.category === "stay" && !data.propertyType) {
      ctx.addIssue({ code: "custom", path: ["propertyType"], message: "Απαιτείται τύπος καταλύματος" });
    }
    const hasContact =
      data.phone || data.email || data.website || data.bookingUrl || data.whatsapp;
    if (!hasContact) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Δώστε τουλάχιστον έναν τρόπο επικοινωνίας",
      });
    }
  });

export type ListingInput = z.infer<typeof listingSchema>;

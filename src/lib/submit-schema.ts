import { z } from "zod";
import type { Localized } from "@/lib/types";
import { typeOptions } from "@/content/data/place-types";

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
    /**
     * Street address and map pin. Off for listings with no front door — a
     * transfer company covers areas, it does not sit at an address.
     */
    location?: boolean;
    /** A "book here" link. Meaningless for a plumber. */
    bookingUrl?: boolean;
  };
  /**
   * Options for the "type" dropdown.
   *
   * Omitted where a dedicated structured field already asks the same question
   * (accommodation has propertyType, services have serviceType) — asking twice
   * is how you end up with two different answers.
   */
  types?: { key: string; label: Localized<string> }[];
}

export const submitCategories: CategoryConfig[] = [
  {
    key: "stay",
    label: { el: "Κατάλυμα", en: "Accommodation" },
    blurb: { el: "Διαμέρισμα, studio, βίλα, ξενώνας…", en: "Apartment, studio, villa, guesthouse…" },
    sections: { amenities: true, stay: true, location: true, bookingUrl: true },
  },
  {
    key: "eat",
    label: { el: "Φαγητό", en: "Food" },
    blurb: { el: "Εστιατόριο, μεζεδοπωλείο, brunch, καφέ…", en: "Restaurant, meze, brunch, café…" },
    sections: { amenities: true, priceRange: true, location: true, bookingUrl: true },
    types: typeOptions([
      "taverna", "mezedopoleio", "tsipouradiko", "ouzeri", "psarotaverna", "restaurant", "psistaria", "souvlaki", "bougatsadiko", "bakery", "patisserie", "brunch", "cafe", "street-food", "pizzeria", "ethnic", "vegan", "fine-dining", "other",
    ]),
  },
  {
    key: "drink",
    label: { el: "Ποτό", en: "Drink" },
    blurb: { el: "Bar, cocktail bar, rooftop, live…", en: "Bar, cocktail bar, rooftop, live…" },
    sections: { amenities: true, priceRange: true, location: true, bookingUrl: true },
    types: typeOptions([
      "bar", "cocktail-bar", "rooftop-bar", "wine-bar", "brewery", "cafe-bar", "live-venue", "club", "beach-bar", "other",
    ]),
  },
  {
    key: "experiences",
    label: { el: "Εμπειρία", en: "Experience" },
    blurb: { el: "Ξενάγηση, food tour, δραστηριότητα…", en: "Tour, food tour, activity…" },
    sections: { amenities: true, priceRange: true, location: true, bookingUrl: true },
    types: typeOptions([
      "guided-tour", "walking-tour", "food-tour", "boat-trip", "cooking-class", "wine-tasting", "workshop", "bike-tour", "photo-tour", "day-trip", "other",
    ]),
  },
  {
    key: "services",
    label: { el: "Υπηρεσία", en: "Service" },
    blurb: { el: "Transfer, ταξί, καθαρισμός, φωτογράφος…", en: "Transfer, taxi, cleaning, photographer…" },
    // No address, no map pin: a service covers areas rather than sitting at a
    // spot, and the coverage field below asks for exactly that.
    sections: { service: true },
  },
  {
    key: "events",
    label: { el: "Event", en: "Event" },
    blurb: { el: "Συναυλία, φεστιβάλ, έκθεση…", en: "Concert, festival, exhibition…" },
    sections: { event: true, location: true, bookingUrl: true },
    types: typeOptions([
      "concert", "theatre", "festival", "exhibition", "screening", "dance", "sport", "family", "talk", "workshop", "market", "party", "other",
    ]),
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

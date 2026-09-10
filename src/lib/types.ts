import type { Locale } from "@/i18n/routing";

/**
 * Core domain model for ThessalonikiHub.
 *
 * Everything the platform surfaces — accommodations, restaurants, bars,
 * attractions, events, experiences — is an "Entity". Entities share a common
 * shape so they can be cross-linked into a single local knowledge graph
 * (a hotel page links to nearby restaurants, an event links to nearby stays,
 * and so on).
 *
 * Content is stored per-locale via the `Localized<T>` helper. Today the data
 * lives in typed files under `src/content`, but the repository layer
 * (`src/lib/repo.ts`) is the only thing that reads it, so it can be swapped for
 * a database (Postgres/Prisma) without touching pages or components.
 */

/** A value that can differ per language. Greek is always required. */
export type Localized<T> = { el: T } & Partial<Record<Locale, T>>;

export function pick<T>(value: Localized<T>, locale: Locale): T {
  return (value[locale] ?? value.el) as T;
}

/** The top-level pillars of the platform. Drives navigation and URL prefixes. */
export type Pillar =
  | "stay"
  | "eat"
  | "drink"
  | "discover"
  | "events"
  | "experiences"
  | "services";

/** A geographic point plus the Thessaloniki area/neighbourhood it belongs to. */
export interface Geo {
  lat: number;
  lng: number;
  /** Area slug, e.g. "center", "ladadika", "ano-poli", "kalamaria". */
  area: string;
  address?: Localized<string>;
}

export interface Photo {
  url: string;
  /** Alt text is required for accessibility and image SEO. */
  alt: Localized<string>;
  credit?: string;
}

export interface ContactInfo {
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  /** External booking link (Booking.com, direct engine, etc.). */
  bookingUrl?: string;
  social?: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
}

export interface Offer {
  id: string;
  title: Localized<string>;
  description: Localized<string>;
  /** ISO date; the offer is hidden after this date. */
  expiresAt?: string;
}

export interface Faq {
  question: Localized<string>;
  answer: Localized<string>;
}

/** Aggregate guest rating (populated later from moderated reviews). */
export interface Rating {
  average: number; // 0–5
  count: number;
}

/** Days of the week, keyed the way opening hours are stored. */
export type WeekDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

/**
 * Opening hours, one entry per day, as a range like "09:00-17:00".
 *
 * An empty string means closed that day; a missing key means "not stated",
 * which is different and must not be rendered as closed. Only an owner or a
 * published source ever fills this in — hours are never guessed.
 */
export type OpeningHours = Partial<Record<WeekDay, string>>;

export type CancellationPolicy = "flexible" | "moderate" | "strict";
export type ParkingOption =
  | "none"
  | "free-onsite"
  | "paid-onsite"
  | "street"
  | "nearby";

/**
 * Accommodation-specific structured details (STAY pillar).
 *
 * Tuned for short-term rental homes/apartments rather than large hotels:
 * whole-home capacity instead of room types, no official star rating.
 * All fields are optional — only fill what is verified; never invent numbers.
 */
export interface StayDetails {
  /** apartment | studio | villa | maisonette | house | guesthouse | loft … */
  propertyType: string;
  maxGuests?: number;
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;
  sizeSqm?: number;
  floor?: number;
  /** e.g. ["sea", "city", "mountain", "garden"] */
  views?: string[];
  /** "15:00" */
  checkIn?: string;
  /** "11:00" */
  checkOut?: string;
  /** self | keybox | host | reception */
  checkInMethod?: string;
  minNights?: number;
  priceFrom?: number;
  currency?: string; // ISO 4217, e.g. "EUR"
  cleaningFee?: number;
  deposit?: number;
  cancellation?: CancellationPolicy;
  policies?: {
    pets?: boolean;
    smoking?: boolean;
    children?: boolean;
    parties?: boolean;
    /** e.g. "23:00–08:00" */
    quietHours?: string;
  };
  /** Languages spoken, as locale codes: ["el", "en", "de"]. */
  languages?: string[];
  parking?: ParkingOption;
  /** e.g. ["step-free", "elevator", "wheelchair"] */
  accessibility?: string[];
  yearRenovated?: number;
  seasonality?: "year-round" | "seasonal";
  videoUrl?: string;
  virtualTourUrl?: string;
}

export type PriceModel =
  | "fixed"
  | "per-trip"
  | "per-hour"
  | "per-day"
  | "per-person"
  | "quote";

/**
 * Service-specific structured details (SERVICES pillar): transfers, taxis,
 * cleaning, plumbers, photographers, tour guides, car rental, etc. All optional
 * except `serviceType`.
 */
export interface ServiceDetails {
  /** transfer | taxi | car-rental | cleaning | plumber | electrician |
   *  photographer | tour-guide | babysitting | laundry | beauty | other */
  serviceType: string;
  priceModel?: PriceModel;
  priceFrom?: number;
  currency?: string;
  /** Area slugs served, or free labels like "airport", "all-thessaloniki". */
  coverageAreas?: string[];
  serviceRadiusKm?: number;
  /** e.g. transfer passenger capacity. */
  capacityPassengers?: number;
  /** Free-form availability, e.g. "24/7", "Mon–Sat 09:00–21:00". */
  availability?: Localized<string>;
  languages?: string[];
  instantBooking?: boolean;
}

/**
 * A place: the base for accommodations, restaurants, bars, attractions,
 * experiences and services. `kind` selects the pillar; `type` and `tags` power
 * the intent-based collection pages (e.g. "hotels for couples", "romantic
 * restaurants", "rooftop bars", "airport transfers").
 */
export interface Place {
  slug: string;
  kind: Pillar;
  name: Localized<string>;
  /** Short one-line summary used on cards and in meta descriptions. */
  summary: Localized<string>;
  /** Full editorial description (markdown). Written by editors, never spun. */
  description: Localized<string>;
  /** Primary sub-type, e.g. "hotel", "greek", "cocktail-bar", "museum". */
  type: string;
  /** Free-form intent tags, e.g. ["couples", "sea-view", "parking"]. */
  tags: string[];
  geo: Geo;
  photos: Photo[];
  contact: ContactInfo;
  amenities?: string[];
  priceRange?: 1 | 2 | 3 | 4;
  offers?: Offer[];
  faqs?: Faq[];
  /** Accommodation-specific structured details (only for `kind: "stay"`). */
  stay?: StayDetails;
  /** Service-specific structured details (only for `kind: "services"`). */
  service?: ServiceDetails;
  /** Aggregate guest rating; shown once moderated reviews exist. */
  rating?: Rating;
  /** Opening hours, supplied by the owner. Never invented. */
  hours?: OpeningHours;
  /**
   * Optional SEO overrides, written by an editor. When absent the page falls
   * back to the name (plus area) and the summary, which is the right default
   * for most listings — these exist for the few where it isn't.
   */
  seoTitle?: Localized<string>;
  seoDescription?: Localized<string>;
  /** True once the listing is verified / claimed by its owner. */
  verified?: boolean;
  /** Curated, editor-controlled ranking within a listing. Higher wins. */
  featured?: boolean;
  /** ISO timestamp of last editorial update — surfaced for freshness/E-E-A-T. */
  updatedAt: string;
}

/** A dated happening: concert, festival, exhibition, etc. */
export interface EventItem {
  slug: string;
  kind: "events";
  name: Localized<string>;
  summary: Localized<string>;
  description: Localized<string>;
  type: string;
  tags: string[];
  /** ISO start/end datetimes (Europe/Athens). */
  startsAt: string;
  endsAt?: string;
  venue: Localized<string>;
  geo: Geo;
  photos: Photo[];
  contact: ContactInfo;
  priceInfo?: Localized<string>;
  featured?: boolean;
  updatedAt: string;
}

/**
 * A curated collection page — the SEO backbone. Each one is an intentionally
 * created, editorially justified page (an area, a type or a search intent),
 * NOT an auto-generated filter combination. Every collection has a unique
 * intro so it carries real, indexable value.
 */
export interface Collection {
  slug: string;
  pillar: Pillar;
  /** How the page selects its members. */
  facet: "area" | "type" | "intent";
  /** The value matched against a place's `geo.area`, `type`, or `tags`. */
  match: string;
  title: Localized<string>;
  /** H1 / hero heading if different from the SEO title. */
  heading: Localized<string>;
  /** Unique editorial introduction (markdown). Required — no thin pages. */
  intro: Localized<string>;
  metaDescription: Localized<string>;
  featured?: boolean;
}

/** Long-form editorial content: travel guides, itineraries, seasonal pieces. */
export interface Guide {
  slug: string;
  title: Localized<string>;
  excerpt: Localized<string>;
  /** Markdown body. */
  body: Localized<string>;
  category: "itinerary" | "food" | "nightlife" | "areas" | "seasonal" | "tips";
  cover: Photo;
  author: string;
  publishedAt: string;
  updatedAt: string;
  /** Slugs of related places to render as an internal-linking block. */
  relatedPlaces?: string[];
  featured?: boolean;
}

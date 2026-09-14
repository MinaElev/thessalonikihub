import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { Collection, EventItem, Guide, Localized, Pillar, Place } from "@/lib/types";
import { accommodations } from "@/content/data/accommodations";
import { restaurants } from "@/content/data/restaurants";
import { bars } from "@/content/data/bars";
import { attractions } from "@/content/data/attractions";
import { experiences } from "@/content/data/experiences";
import { services } from "@/content/data/services";
import { events as allEvents } from "@/content/data/events";
import { collections as allCollections } from "@/content/data/collections";
import { guides as allGuides } from "@/content/data/guides";
import { prisma, isDbConfigured } from "@/lib/db";
import { DATA_TTL, TAG_EVENTS, TAG_PLACES } from "@/lib/cache-tags";

/**
 * Repository layer — the ONLY place the app reads content from.
 *
 * HYBRID: the typed files under `src/content` are the curated editorial seed;
 * when a database is configured, PUBLISHED rows from Postgres are merged on top
 * (deduped by slug, DB wins) so user submissions and imported events appear
 * live. Collections and guides stay file-based (editorial only).
 *
 * Places and events are async (they may hit the DB). Nearby/similar and search
 * stay synchronous over the file seed. `getFile*` helpers give sync access to
 * the seed for `generateStaticParams` (so the build never needs the DB).
 *
 * READS ARE CACHED TWICE. `unstable_cache` keeps the two queries below in
 * Next's data cache between requests (invalidated by tag whenever a row is
 * written, see `cache-tags.ts`), and React's `cache` dedupes them within a
 * single render — a listing page used to query once in `generateMetadata` and
 * again in the page body for the same rows.
 */

type StayPillar = Exclude<Pillar, "events">;

const placesByPillar: Record<StayPillar, Place[]> = {
  stay: accommodations,
  eat: restaurants,
  drink: bars,
  discover: attractions,
  experiences,
  services,
};

const allFilePlaces: Place[] = Object.values(placesByPillar).flat();

// ---- DB mapping ----

/* eslint-disable @typescript-eslint/no-explicit-any */
function rowToPlace(r: any): Place {
  return {
    slug: r.slug,
    kind: String(r.kind).toLowerCase() as Pillar,
    name: r.name,
    summary: r.summary,
    description: r.description,
    type: r.type,
    tags: r.tags ?? [],
    geo: { lat: r.lat, lng: r.lng, area: r.area, address: r.address ?? undefined },
    photos: r.photos ?? [],
    contact: r.contact ?? {},
    amenities: r.amenities ?? undefined,
    priceRange: r.priceRange ?? undefined,
    offers: r.offers ?? undefined,
    faqs: r.faqs ?? undefined,
    stay: r.stay ?? undefined,
    service: r.service ?? undefined,
    rating: r.rating ?? undefined,
    hours: r.hours ?? undefined,
    hoursNote: r.hoursNote ?? undefined,
    seoTitle: r.seoTitle ?? undefined,
    seoDescription: r.seoDescription ?? undefined,
    verified: r.verified ?? undefined,
    featured: r.featured ?? undefined,
    updatedAt:
      r.updatedAt instanceof Date ? r.updatedAt.toISOString().slice(0, 10) : String(r.updatedAt),
  };
}

function rowToEvent(r: any): EventItem {
  return {
    slug: r.slug,
    kind: "events",
    name: r.name,
    summary: r.summary,
    description: r.description,
    type: r.type,
    tags: r.tags ?? [],
    startsAt: (r.startsAt instanceof Date ? r.startsAt.toISOString() : String(r.startsAt)),
    endsAt: r.endsAt ? (r.endsAt instanceof Date ? r.endsAt.toISOString() : String(r.endsAt)) : undefined,
    timeKnown: r.timeKnown ?? true,
    venue: r.venue,
    // Coordinates are null for imports whose feed named no venue.
    geo:
      typeof r.lat === "number" && typeof r.lng === "number"
        ? { lat: r.lat, lng: r.lng, area: r.area ?? "center" }
        : undefined,
    textRewritten: r.textRewritten ?? true,
    photos: r.photos ?? [],
    contact: r.contact ?? {},
    priceInfo: r.priceInfo ?? undefined,
    featured: r.featured ?? undefined,
    updatedAt:
      r.updatedAt instanceof Date ? r.updatedAt.toISOString().slice(0, 10) : String(r.updatedAt),
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Every published place, in one query.
 *
 * One query for all six pillars rather than one each: a page that shows an
 * area, or the map, or search results wants most of them anyway, and at this
 * size the whole table is smaller than the six round-trips it replaces.
 */
const loadDbPlaces = unstable_cache(
  async (): Promise<Place[]> => {
    const rows = await prisma.place.findMany({ where: { status: "PUBLISHED" } });
    return rows.map(rowToPlace);
  },
  ["repo:places"],
  { tags: [TAG_PLACES], revalidate: DATA_TTL },
);

/**
 * Published events from the last year.
 *
 * The listings only ever show what is current, but the imports run daily and
 * nothing deletes a past event, so an unbounded read would grow for ever. A
 * year is well past anything a visitor browses to and still bounded; an older
 * event keeps its own page through `dbEvent` below.
 */
const EVENT_WINDOW_DAYS = 365;

const loadDbEvents = unstable_cache(
  async (): Promise<EventItem[]> => {
    const from = new Date(Date.now() - EVENT_WINDOW_DAYS * 24 * 60 * 60 * 1000);
    const rows = await prisma.eventItem.findMany({
      where: { status: "PUBLISHED", startsAt: { gte: from } },
      orderBy: { startsAt: "asc" },
    });
    return rows.map(rowToEvent);
  },
  ["repo:events"],
  { tags: [TAG_EVENTS], revalidate: DATA_TTL },
);

/** One event by slug — for the ones that fell out of the window above. */
const loadDbEvent = unstable_cache(
  async (slug: string): Promise<EventItem | null> => {
    const row = await prisma.eventItem.findFirst({ where: { slug, status: "PUBLISHED" } });
    return row ? rowToEvent(row) : null;
  },
  ["repo:event"],
  { tags: [TAG_EVENTS], revalidate: DATA_TTL },
);

/**
 * A database that cannot be reached must not take the site down with it, so
 * every read falls back to the editorial seed. The failure happens inside the
 * cached function, which means the empty result is never what gets stored —
 * the next request tries the database again instead of serving a blank page
 * for the rest of the cache window.
 */
const dbPlaces = cache(async (): Promise<Place[]> => {
  if (!isDbConfigured) return [];
  try {
    return await loadDbPlaces();
  } catch (e) {
    console.error("repo.dbPlaces failed:", e);
    return [];
  }
});

const dbEvents = cache(async (): Promise<EventItem[]> => {
  if (!isDbConfigured) return [];
  try {
    return await loadDbEvents();
  } catch (e) {
    console.error("repo.dbEvents failed:", e);
    return [];
  }
});

const dbEvent = cache(async (slug: string): Promise<EventItem | undefined> => {
  if (!isDbConfigured) return undefined;
  try {
    return (await loadDbEvent(slug)) ?? undefined;
  } catch (e) {
    console.error("repo.dbEvent failed:", e);
    return undefined;
  }
});

function mergeBySlug<T extends { slug: string }>(file: T[], db: T[]): T[] {
  const map = new Map<string, T>();
  for (const it of file) map.set(it.slug, it);
  for (const it of db) map.set(it.slug, it); // DB wins on conflict
  return [...map.values()];
}

function sortByFeatured(list: Place[]): Place[] {
  return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}

// ---- Places (async, hybrid) ----

/** Sync, file-only — for generateStaticParams (never touches the DB). */
export function getFilePlaces(pillar: StayPillar): Place[] {
  return sortByFeatured(placesByPillar[pillar]);
}

export const getPlaces = cache(async (pillar: StayPillar): Promise<Place[]> => {
  const fromDb = (await dbPlaces()).filter((p) => p.kind === pillar);
  return sortByFeatured(mergeBySlug(placesByPillar[pillar], fromDb));
});

/** Every place of every pillar. Shares the one cached query with `getPlaces`. */
export const getAllPlaces = cache(async (): Promise<Place[]> => {
  return sortByFeatured(mergeBySlug(allFilePlaces, await dbPlaces()));
});

export async function getPlace(pillar: StayPillar, slug: string): Promise<Place | undefined> {
  return (await getPlaces(pillar)).find((p) => p.slug === slug);
}

export async function getPlaceBySlug(slug: string): Promise<Place | undefined> {
  return (await getAllPlaces()).find((p) => p.slug === slug);
}

export async function getPlacesInArea(area: string): Promise<Place[]> {
  return (await getAllPlaces()).filter((p) => p.geo.area === area);
}

export async function getPlacesByTags(tags: string[], limit = 6): Promise<Place[]> {
  const set = new Set(tags);
  return (await getAllPlaces())
    .filter((p) => p.tags.some((t) => set.has(t)))
    .slice(0, limit);
}

export async function getCollectionMembers(collection: Collection): Promise<Place[]> {
  if (collection.pillar === "events") return [];
  const pool = await getPlaces(collection.pillar);
  return sortByFeatured(
    pool.filter((p) => {
      switch (collection.facet) {
        case "area":
          return p.geo.area === collection.match;
        case "type":
          return p.type === collection.match;
        case "intent":
          return p.tags.includes(collection.match);
      }
    }),
  );
}

// ---- Collections (sync, file/editorial) ----

export function getCollections(pillar?: Pillar): Collection[] {
  const list = pillar ? allCollections.filter((c) => c.pillar === pillar) : allCollections;
  return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}

export function getCollection(pillar: Pillar, slug: string): Collection | undefined {
  return allCollections.find((c) => c.pillar === pillar && c.slug === slug);
}

// ---- Events (async, hybrid) ----

/** Sync, file-only — for generateStaticParams. */
export function getFileEvents(): EventItem[] {
  return [...allEvents];
}

export const getEvents = cache(async (): Promise<EventItem[]> => {
  return mergeBySlug(allEvents, await dbEvents()).sort((a, b) =>
    a.startsAt.localeCompare(b.startsAt),
  );
});

export async function getEvent(slug: string): Promise<EventItem | undefined> {
  const listed = (await getEvents()).find((e) => e.slug === slug);
  // Everything current is already in hand; only an event older than the read
  // window above costs a second query, and it is a lookup on a unique index.
  return listed ?? (await dbEvent(slug));
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export async function getEventsOnDay(day: Date = new Date()): Promise<EventItem[]> {
  return (await getEvents()).filter((e) => {
    const start = new Date(e.startsAt);
    const end = e.endsAt ? new Date(e.endsAt) : start;
    return sameDay(start, day) || sameDay(end, day) || (start <= day && end >= day);
  });
}

export async function getUpcomingEvents(days = 14): Promise<EventItem[]> {
  const now = new Date();
  const horizon = new Date();
  horizon.setDate(horizon.getDate() + days);
  return (await getEvents()).filter((e) => {
    const start = new Date(e.startsAt);
    const end = e.endsAt ? new Date(e.endsAt) : start;
    return end >= now && start <= horizon;
  });
}

export async function getEventsInArea(area: string): Promise<EventItem[]> {
  return (await getEvents()).filter((e) => e.geo?.area === area);
}

// ---- Guides (sync, file/editorial) ----

export function getGuides(): Guide[] {
  return [...allGuides].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getGuide(slug: string): Guide | undefined {
  return allGuides.find((g) => g.slug === slug);
}

// ---- Search (sync, over the file seed) ----


// ---- Knowledge graph: "nearby" / "similar" (sync, over the file seed) ----

function distanceMeters(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export interface NearbyResult<T> {
  item: T;
  meters: number;
}

export function getNearbyPlaces(
  origin: { lat: number; lng: number },
  pillar: StayPillar,
  opts: { limit?: number; excludeSlug?: string } = {},
): NearbyResult<Place>[] {
  const { limit = 4, excludeSlug } = opts;
  return placesByPillar[pillar]
    .filter((p) => p.slug !== excludeSlug)
    .map((item) => ({ item, meters: distanceMeters(origin, item.geo) }))
    .sort((a, b) => a.meters - b.meters)
    .slice(0, limit);
}

export function getNearbyEvents(
  origin: { lat: number; lng: number },
  opts: { limit?: number } = {},
): NearbyResult<EventItem>[] {
  const { limit = 3 } = opts;
  const now = new Date();
  return allEvents
    .filter((e) => new Date(e.endsAt ?? e.startsAt) >= now)
    // "Nearby" needs a location; an event without coordinates has no distance.
    .flatMap((item) =>
      item.geo ? [{ item, meters: distanceMeters(origin, item.geo) }] : [],
    )
    .sort((a, b) => a.meters - b.meters)
    .slice(0, limit);
}

export function getSimilarPlaces(place: Place, limit = 4): Place[] {
  const pool = placesByPillar[place.kind as StayPillar] ?? [];
  return sortByFeatured(
    pool.filter((p) => p.slug !== place.slug && p.tags.some((t) => place.tags.includes(t))),
  ).slice(0, limit);
}

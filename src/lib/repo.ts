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

/**
 * Repository layer — the ONLY place the app reads content from.
 *
 * Today it reads typed files under `src/content`. To move to a database later,
 * swap the bodies of these functions (e.g. Prisma queries) and make them async;
 * pages already `await` nothing that would break, and the return types stay the
 * same, so components and pages don't change.
 */

const placesByPillar: Record<Exclude<Pillar, "events">, Place[]> = {
  stay: accommodations,
  eat: restaurants,
  drink: bars,
  discover: attractions,
  experiences,
  services,
};

const allPlaces: Place[] = Object.values(placesByPillar).flat();

// ---- Places ----

export function getPlaces(pillar: Exclude<Pillar, "events">): Place[] {
  return sortByFeatured(placesByPillar[pillar]);
}

export function getPlace(
  pillar: Exclude<Pillar, "events">,
  slug: string,
): Place | undefined {
  return placesByPillar[pillar].find((p) => p.slug === slug);
}

export function getPlaceBySlug(slug: string): Place | undefined {
  return allPlaces.find((p) => p.slug === slug);
}

/** All places (any pillar) in a given area. */
export function getPlacesInArea(area: string): Place[] {
  return sortByFeatured(allPlaces.filter((p) => p.geo.area === area));
}

/** Places (any pillar) that carry at least one of the given tags. */
export function getPlacesByTags(tags: string[], limit = 6): Place[] {
  const set = new Set(tags);
  return sortByFeatured(
    allPlaces.filter((p) => p.tags.some((t) => set.has(t))),
  ).slice(0, limit);
}

/** Events in a given area. */
export function getEventsInArea(area: string): EventItem[] {
  return getEvents().filter((e) => e.geo.area === area);
}

/**
 * Similar places: same pillar, sharing at least one tag — the "you might also
 * like" / editorial-adjacency signal (complements geo-nearby).
 */
export function getSimilarPlaces(place: Place, limit = 4): Place[] {
  const pool = placesByPillar[place.kind as Exclude<Pillar, "events">] ?? [];
  return sortByFeatured(
    pool.filter(
      (p) => p.slug !== place.slug && p.tags.some((t) => place.tags.includes(t)),
    ),
  ).slice(0, limit);
}

/** Members of a curated collection, selected by its facet. */
export function getCollectionMembers(collection: Collection): Place[] {
  const pool =
    collection.pillar === "events"
      ? []
      : placesByPillar[collection.pillar] ?? [];
  const members = pool.filter((p) => {
    switch (collection.facet) {
      case "area":
        return p.geo.area === collection.match;
      case "type":
        return p.type === collection.match;
      case "intent":
        return p.tags.includes(collection.match);
    }
  });
  return sortByFeatured(members);
}

// ---- Collections ----

export function getCollections(pillar?: Pillar): Collection[] {
  const list = pillar
    ? allCollections.filter((c) => c.pillar === pillar)
    : allCollections;
  return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}

export function getCollection(
  pillar: Pillar,
  slug: string,
): Collection | undefined {
  return allCollections.find((c) => c.pillar === pillar && c.slug === slug);
}

// ---- Events ----

export function getEvents(): EventItem[] {
  return [...allEvents].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export function getEvent(slug: string): EventItem | undefined {
  return allEvents.find((e) => e.slug === slug);
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Events happening on a given day (defaults to today). */
export function getEventsOnDay(day: Date = new Date()): EventItem[] {
  return getEvents().filter((e) => {
    const start = new Date(e.startsAt);
    const end = e.endsAt ? new Date(e.endsAt) : start;
    // Include multi-day events that span the given day.
    return (
      sameDay(start, day) ||
      sameDay(end, day) ||
      (start <= day && end >= day)
    );
  });
}

/** Upcoming events within the next `days` days (default 14). */
export function getUpcomingEvents(days = 14): EventItem[] {
  const now = new Date();
  const horizon = new Date();
  horizon.setDate(horizon.getDate() + days);
  return getEvents().filter((e) => {
    const start = new Date(e.startsAt);
    const end = e.endsAt ? new Date(e.endsAt) : start;
    return end >= now && start <= horizon;
  });
}

// ---- Guides ----

export function getGuides(): Guide[] {
  return [...allGuides].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getGuide(slug: string): Guide | undefined {
  return allGuides.find((g) => g.slug === slug);
}

// ---- Search ----

export interface SearchResults {
  places: Place[];
  events: EventItem[];
  guides: Guide[];
}

/** Simple case-insensitive search across names, summaries, tags and types. */
export function search(q: string): SearchResults {
  const needle = q.trim().toLowerCase();
  if (!needle) return { places: [], events: [], guides: [] };

  const inLoc = (l: Localized<string>) =>
    `${l.el} ${l.en ?? ""}`.toLowerCase().includes(needle);

  const places = allPlaces.filter(
    (p) =>
      inLoc(p.name) ||
      inLoc(p.summary) ||
      p.type.toLowerCase().includes(needle) ||
      p.tags.some((t) => t.toLowerCase().includes(needle)),
  );
  const events = allEvents.filter(
    (e) =>
      inLoc(e.name) ||
      inLoc(e.summary) ||
      e.tags.some((t) => t.toLowerCase().includes(needle)),
  );
  const guides = allGuides.filter((g) => inLoc(g.title) || inLoc(g.excerpt));

  return { places, events, guides };
}

// ---- Knowledge graph: "nearby" ----

/** Haversine distance in metres between two coordinates. */
function distanceMeters(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export interface NearbyResult<T> {
  item: T;
  meters: number;
}

/**
 * Nearest places of a given pillar to an origin point — the core of the
 * internal-linking knowledge graph (nearby restaurants on a hotel page, etc.).
 */
export function getNearbyPlaces(
  origin: { lat: number; lng: number },
  pillar: Exclude<Pillar, "events">,
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
  return getUpcomingEvents(30)
    .map((item) => ({ item, meters: distanceMeters(origin, item.geo) }))
    .sort((a, b) => a.meters - b.meters)
    .slice(0, limit);
}

// ---- helpers ----

function sortByFeatured(list: Place[]): Place[] {
  return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}

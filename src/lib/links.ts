import type { Collection, EventItem, Guide, Place } from "@/lib/types";

/**
 * Central URL builders — the single source of truth for the site's URL
 * architecture. All hrefs are locale-agnostic (no locale prefix); the
 * next-intl <Link> adds the prefix. Keeping them here means the URL structure
 * can be reviewed and evolved in one place.
 *
 * Structure:
 *   /{pillar}                        pillar index
 *   /{pillar}/thessaloniki           city collection (all listings)
 *   /{pillar}/thessaloniki/{slug}    curated SEO collection (area/type/intent)
 *   /{pillar}/{slug}                 individual entity page
 *   /events, /events/{slug}, /today
 *   /guides, /guides/{slug}
 */

export function placeHref(place: Pick<Place, "kind" | "slug">): string {
  return `/${place.kind}/${place.slug}`;
}

export function pillarHref(pillar: string): string {
  return `/${pillar}`;
}

export function cityHref(pillar: string): string {
  return `/${pillar}/thessaloniki`;
}

export function collectionHref(collection: Collection): string {
  return `/${collection.pillar}/thessaloniki/${collection.slug}`;
}

export function eventHref(event: Pick<EventItem, "slug">): string {
  return `/events/${event.slug}`;
}

export function guideHref(guide: Pick<Guide, "slug">): string {
  return `/guides/${guide.slug}`;
}

export function mapsHref(geo: { lat: number; lng: number }): string {
  return `https://www.google.com/maps/search/?api=1&query=${geo.lat},${geo.lng}`;
}

export function areasHref(): string {
  return "/areas";
}

export function areaHref(slug: string): string {
  return `/areas/${slug}`;
}

export function dayTripsHref(): string {
  return "/day-trips";
}

export function dayTripHref(slug: string): string {
  return `/day-trips/${slug}`;
}

export function audienceHref(slug: string): string {
  return `/for/${slug}`;
}

export function metroHref(): string {
  return "/metro";
}

export function metroStationHref(slug: string): string {
  return `/metro/${slug}`;
}

export function whenToVisitHref(): string {
  return "/when-to-visit";
}

export function monthHref(slug: string): string {
  return `/when-to-visit/${slug}`;
}

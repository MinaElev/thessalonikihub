import type { Place } from "@/lib/types";

/**
 * Convert a content-file Place into the shape the database expects.
 *
 * Listings live in two places: typed content files and the database, merged by
 * slug in `src/lib/repo.ts` with the database winning. When an owner claims a
 * file-based listing we materialise a database row from it, so the row can then
 * carry ownership, the verified badge and any edits the owner makes — without
 * touching the original content file.
 */
export function placeToDbData(place: Place) {
  return {
    kind: place.kind.toUpperCase() as never,
    name: place.name as never,
    summary: place.summary as never,
    description: place.description as never,
    type: place.type,
    tags: place.tags,
    lat: place.geo.lat,
    lng: place.geo.lng,
    area: place.geo.area,
    address: (place.geo.address ?? null) as never,
    photos: place.photos as never,
    contact: place.contact as never,
    amenities: place.amenities ?? [],
    priceRange: place.priceRange ?? null,
    offers: (place.offers ?? null) as never,
    faqs: (place.faqs ?? null) as never,
    stay: (place.stay ?? null) as never,
    service: (place.service ?? null) as never,
    rating: (place.rating ?? null) as never,
    hours: (place.hours ?? null) as never,
    seoTitle: (place.seoTitle ?? null) as never,
    seoDescription: (place.seoDescription ?? null) as never,
    featured: place.featured ?? false,
    status: "PUBLISHED" as never,
  };
}

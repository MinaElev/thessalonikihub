import type { MetadataRoute } from "next";
import { site, absoluteUrl } from "@/lib/site";
import type { Pillar } from "@/lib/types";
import {
  areaHref,
  audienceHref,
  cityHref,
  collectionHref,
  dayTripHref,
  metroStationHref,
  eventHref,
  guideHref,
  pillarHref,
  placeHref,
} from "@/lib/links";
import { areas } from "@/content/data/areas";
import { dayTrips } from "@/content/data/daytrips";
import { audiences } from "@/content/data/audiences";
import { metroStations } from "@/content/data/metro";
import {
  getCollections,
  getEvents,
  getGuides,
  getPlaces,
} from "@/lib/repo";

/**
 * Multilingual sitemap. Every entry lists language alternates so search engines
 * discover the hreflang cluster. Only real, indexable pages are included —
 * never arbitrary filtered combinations.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Always-present pages.
  const paths = new Set<string>(["/", "/guides", "/areas", "/day-trips", "/for", "/plan", "/metro"]);
  // /today is intentionally excluded: it is a dynamic daily page.
  for (const a of areas) paths.add(areaHref(a.slug));
  for (const d of dayTrips) paths.add(dayTripHref(d.slug));
  for (const a of audiences) paths.add(audienceHref(a.slug));
  for (const m of metroStations) paths.add(metroStationHref(m.slug));

  const pillars: Exclude<Pillar, "events">[] = [
    "stay",
    "eat",
    "drink",
    "discover",
    "experiences",
    "services",
  ];

  // Only index a pillar (and its city/collection pages) once it has real
  // content — empty pillars would otherwise be thin pages.
  for (const pillar of pillars) {
    const places = await getPlaces(pillar);
    if (!places.length) continue;
    paths.add(pillarHref(pillar));
    paths.add(cityHref(pillar));
    for (const c of getCollections(pillar)) paths.add(collectionHref(c));
    for (const p of places) paths.add(placeHref(p));
  }

  const events = await getEvents();
  if (events.length) {
    paths.add("/events");
    for (const e of events) paths.add(eventHref(e));
  }
  for (const g of getGuides()) paths.add(guideHref(g));

  const now = new Date();

  return Array.from(paths).map((path) => ({
    url: absoluteUrl(site.defaultLocale, path),
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        site.locales.map((l) => [l, absoluteUrl(l, path)]),
      ),
    },
  }));
}

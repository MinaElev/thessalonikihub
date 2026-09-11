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
  monthHref,
  festivalHref,
  dishHref,
  routeHref,
  eventHref,
  guideHref,
  pillarHref,
  placeHref,
} from "@/lib/links";
import { areas } from "@/content/data/areas";
import { dayTrips } from "@/content/data/daytrips";
import { audiences } from "@/content/data/audiences";
import { metroStations } from "@/content/data/metro";
import { cityMonths } from "@/content/data/months";
import { festivals } from "@/content/data/festivals";
import { dishes } from "@/content/data/dishes";
import { walkingRoutes } from "@/content/data/routes";
import { staticPages } from "@/content/data/pages";
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
  // Real modification dates, where a record actually carries one.
  const lastMod = new Map<string, string>();

  // Always-present pages.
  const paths = new Set<string>(["/", "/guides", "/areas", "/day-trips", "/for", "/plan", "/metro", "/when-to-visit", "/festivals", "/what-to-eat", "/routes", "/thessaloniki-and-chalkidiki"]);
  // /today is intentionally excluded: it is a dynamic daily page.
  for (const a of areas) paths.add(areaHref(a.slug));
  for (const d of dayTrips) paths.add(dayTripHref(d.slug));
  for (const a of audiences) paths.add(audienceHref(a.slug));
  for (const m of metroStations) paths.add(metroStationHref(m.slug));
  for (const m of cityMonths) paths.add(monthHref(m.slug));
  for (const f of festivals) paths.add(festivalHref(f.slug));
  for (const d of dishes) paths.add(dishHref(d.slug));
  for (const r of walkingRoutes) paths.add(routeHref(r.slug));
  // About, contact, privacy and terms. Low-traffic, but a site that asks for
  // an email address should have them indexed and findable.
  for (const p of staticPages) paths.add(`/info/${p.slug}`);

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
    for (const p of places) {
      paths.add(placeHref(p));
      if (p.updatedAt) lastMod.set(placeHref(p), p.updatedAt);
    }
  }

  const events = await getEvents();
  if (events.length) {
    paths.add("/events");
    for (const e of events) {
      // Imported events keep the source feed's wording until an editor rewrites
      // them, and stay noindex until then — so they stay out of the sitemap.
      if (e.textRewritten === false) continue;
      paths.add(eventHref(e));
      if (e.updatedAt) lastMod.set(eventHref(e), e.updatedAt);
    }
  }
  for (const g of getGuides()) {
    paths.add(guideHref(g));
    if (g.updatedAt) lastMod.set(guideHref(g), g.updatedAt);
  }

  return Array.from(paths).map((path) => ({
    url: absoluteUrl(site.defaultLocale, path),
    // `lastModified` is omitted rather than stamped with the build time:
    // claiming every page changed on every deploy trains crawlers to ignore
    // the field. Entries with a real date get one from `lastMod` above.
    ...(lastMod.has(path) ? { lastModified: new Date(lastMod.get(path)!) } : {}),
    priority: path === "/" ? 1 : 0.7,
    alternates: {
      languages: {
        ...Object.fromEntries(site.locales.map((l) => [l, absoluteUrl(l, path)])),
        // The page's own <link rel="alternate"> tags declare x-default, so the
        // sitemap has to as well — otherwise the two describe different
        // hreflang clusters for the same URL and Google has to pick one.
        "x-default": absoluteUrl(site.defaultLocale, path),
      },
    },
  }));
}

import type { Locale } from "@/i18n/routing";
import type { Pillar } from "@/lib/types";
import { pick } from "@/lib/types";
import { getAllPlaces, getEvents } from "@/lib/repo";
import { placeHref, eventHref } from "@/lib/links";

export interface MapPoint {
  id: string;
  kind: Pillar;
  name: string;
  lat: number;
  lng: number;
  area: string;
  /** In-app path without locale prefix. */
  path: string;
}

/**
 * All mappable entities (places of every pillar + events), name-localized.
 *
 * The two reads are asked for together. Walking the pillars one at a time with
 * an `await` inside the loop turned this into seven round-trips in a row, and
 * every area hub calls it, not just the map.
 */
export async function getMapPoints(locale: Locale): Promise<MapPoint[]> {
  const [places, events] = await Promise.all([getAllPlaces(), getEvents()]);

  const points: MapPoint[] = [];
  for (const p of places) {
    points.push({
      id: p.slug,
      kind: p.kind,
      name: pick(p.name, locale),
      lat: p.geo.lat,
      lng: p.geo.lng,
      area: p.geo.area,
      path: placeHref(p),
    });
  }
  for (const e of events) {
    // Events whose source named no venue have no coordinates — leaving them off
    // the map is honest; dropping them on the city centre is not.
    if (!e.geo) continue;
    points.push({
      id: e.slug,
      kind: "events",
      name: pick(e.name, locale),
      lat: e.geo.lat,
      lng: e.geo.lng,
      area: e.geo.area,
      path: eventHref(e),
    });
  }
  return points;
}

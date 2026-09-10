import type { Locale } from "@/i18n/routing";
import type { EventItem, Guide, Localized, Place } from "@/lib/types";
import { pick } from "@/lib/types";
import { getEvents, getGuides, getPlaces } from "@/lib/repo";
import { areas } from "@/content/data/areas";
import { dayTrips } from "@/content/data/daytrips";
import { audiences } from "@/content/data/audiences";
import { metroStations } from "@/content/data/metro";
import { cityMonths } from "@/content/data/months";
import { festivals } from "@/content/data/festivals";
import { dishes } from "@/content/data/dishes";
import { walkingRoutes } from "@/content/data/routes";
import {
  areaHref,
  audienceHref,
  dayTripHref,
  dishHref,
  eventHref,
  festivalHref,
  guideHref,
  metroStationHref,
  monthHref,
  placeHref,
  routeHref,
} from "@/lib/links";

/**
 * Site-wide search.
 *
 * Two things make this more than a substring scan. It runs over the repository
 * (so submitted businesses and imported events are findable, not just the
 * editorial seed), and it folds Greek accents — readers type "μπουγατσα" far
 * more often than "μπουγάτσα", and an exact match would find neither the dish
 * nor the guides that mention it.
 */

/** What kind of thing a hit is — drives the grouping in the results page. */
export type SearchKind =
  | "place"
  | "event"
  | "guide"
  | "area"
  | "metro"
  | "month"
  | "festival"
  | "dish"
  | "route"
  | "daytrip"
  | "audience";

export interface SearchHit {
  kind: SearchKind;
  /** Unique within a result set (`kind` + slug, since slugs repeat across kinds). */
  id: string;
  title: string;
  summary: string;
  /** In-app path without the locale prefix. */
  href: string;
  /** The original record, so the page can render a real card for places/events. */
  place?: Place;
  event?: EventItem;
  guide?: Guide;
}

/**
 * Fold a string down to something a typo-tolerant comparison can use:
 * lowercase, no diacritics, and final sigma unified with medial sigma so
 * "Αγιος"/"αγιός"/"ΑΓΙΟΣ" all reduce to the same key.
 */
export function foldGreek(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/ς/g, "σ");
}

/** Every localized string of a record, folded into one haystack. */
function haystack(locale: Locale, ...parts: (Localized<string> | string | undefined)[]): string {
  return foldGreek(
    parts
      .map((p) => (typeof p === "string" ? p : p ? `${p.el} ${p.en ?? ""}` : ""))
      .join(" "),
  );
}

interface Indexed extends SearchHit {
  haystack: string;
}

/**
 * Build the full index for a locale.
 *
 * Places and events come from the repository, so anything a user submitted or
 * an importer added is included the moment it is published.
 */
async function buildIndex(locale: Locale): Promise<Indexed[]> {
  const out: Indexed[] = [];
  const add = (hit: SearchHit, hay: string) => out.push({ ...hit, haystack: hay });

  for (const pillar of ["stay", "eat", "drink", "discover", "experiences", "services"] as const) {
    for (const p of await getPlaces(pillar)) {
      add(
        {
          kind: "place",
          id: `place-${p.kind}-${p.slug}`,
          title: pick(p.name, locale),
          summary: pick(p.summary, locale),
          href: placeHref(p),
          place: p,
        },
        haystack(locale, p.name, p.summary, p.type, p.tags.join(" ")),
      );
    }
  }

  for (const e of await getEvents()) {
    add(
      {
        kind: "event",
        id: `event-${e.slug}`,
        title: pick(e.name, locale),
        summary: pick(e.summary, locale),
        href: eventHref(e),
        event: e,
      },
      haystack(locale, e.name, e.summary, e.venue, e.tags.join(" ")),
    );
  }

  for (const g of getGuides()) {
    add(
      {
        kind: "guide",
        id: `guide-${g.slug}`,
        title: pick(g.title, locale),
        summary: pick(g.excerpt, locale),
        href: guideHref(g),
        guide: g,
      },
      haystack(locale, g.title, g.excerpt),
    );
  }

  // Editorial content types. These are most of the site's pages and its most
  // distinctive writing, so leaving them unsearchable hid the best material.
  for (const a of areas) {
    add(
      {
        kind: "area",
        id: `area-${a.slug}`,
        title: pick(a.name, locale),
        summary: pick(a.blurb, locale),
        href: areaHref(a.slug),
      },
      haystack(locale, a.name, a.blurb),
    );
  }

  for (const s of metroStations) {
    add(
      {
        kind: "metro",
        id: `metro-${s.slug}`,
        title: pick(s.name, locale),
        summary: pick(s.blurb, locale),
        href: metroStationHref(s.slug),
      },
      haystack(locale, s.name, s.blurb, "μετρο metro σταση station"),
    );
  }

  for (const m of cityMonths) {
    add(
      {
        kind: "month",
        id: `month-${m.slug}`,
        title: pick(m.name, locale),
        summary: pick(m.blurb, locale),
        href: monthHref(m.slug),
      },
      haystack(locale, m.name, m.nameAcc, m.blurb),
    );
  }

  for (const f of festivals) {
    add(
      {
        kind: "festival",
        id: `festival-${f.slug}`,
        title: pick(f.name, locale),
        summary: pick(f.blurb, locale),
        href: festivalHref(f.slug),
      },
      haystack(locale, f.name, f.shortName, f.blurb),
    );
  }

  for (const d of dishes) {
    add(
      {
        kind: "dish",
        id: `dish-${d.slug}`,
        title: pick(d.name, locale),
        summary: pick(d.blurb, locale),
        href: dishHref(d.slug),
      },
      haystack(locale, d.name, d.blurb),
    );
  }

  for (const r of walkingRoutes) {
    add(
      {
        kind: "route",
        id: `route-${r.slug}`,
        title: pick(r.name, locale),
        summary: pick(r.blurb, locale),
        href: routeHref(r.slug),
      },
      haystack(locale, r.name, r.blurb, r.intro),
    );
  }

  for (const d of dayTrips) {
    add(
      {
        kind: "daytrip",
        id: `daytrip-${d.slug}`,
        title: pick(d.name, locale),
        summary: pick(d.summary, locale),
        href: dayTripHref(d.slug),
      },
      haystack(locale, d.name, d.summary),
    );
  }

  for (const a of audiences) {
    add(
      {
        kind: "audience",
        id: `audience-${a.slug}`,
        title: pick(a.name, locale),
        summary: pick(a.blurb, locale),
        href: audienceHref(a.slug),
      },
      haystack(locale, a.name, a.blurb),
    );
  }

  return out;
}

/**
 * Rank a hit for one folded term. A match in the title beats a match in the
 * body, and a title that *starts* with the term beats one that merely contains
 * it, so searching "λευκ" puts the White Tower first.
 */
function score(hit: Indexed, term: string): number {
  const title = foldGreek(hit.title);
  if (title === term) return 100;
  if (title.startsWith(term)) return 60;
  if (title.includes(term)) return 40;
  if (foldGreek(hit.summary).includes(term)) return 20;
  return hit.haystack.includes(term) ? 10 : 0;
}

export interface SearchResults {
  hits: SearchHit[];
  total: number;
}

/**
 * Search everything. Multi-word queries require every word to match somewhere
 * in the record, which is what makes "λευκος πυργος" behave the way a reader
 * expects rather than returning everything containing "πύργος".
 */
export async function searchAll(
  query: string,
  locale: Locale,
  limit = 60,
): Promise<SearchResults> {
  const terms = foldGreek(query.trim()).split(/\s+/).filter(Boolean);
  if (!terms.length) return { hits: [], total: 0 };

  const index = await buildIndex(locale);
  const scored: { hit: Indexed; rank: number }[] = [];

  for (const hit of index) {
    let rank = 0;
    for (const term of terms) {
      const s = score(hit, term);
      if (s === 0) {
        rank = 0;
        break;
      }
      rank += s;
    }
    if (rank > 0) scored.push({ hit, rank });
  }

  scored.sort((a, b) => b.rank - a.rank || a.hit.title.localeCompare(b.hit.title, locale));
  return {
    hits: scored.slice(0, limit).map(({ hit }) => hit),
    total: scored.length,
  };
}

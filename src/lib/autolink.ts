import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { attractions } from "@/content/data/attractions";
import { areas } from "@/content/data/areas";
import { metroStations } from "@/content/data/metro";
import { dishes } from "@/content/data/dishes";
import { dayTrips } from "@/content/data/daytrips";
import { festivals } from "@/content/data/festivals";
import { walkingRoutes } from "@/content/data/routes";
import {
  areaHref,
  dayTripHref,
  dishHref,
  festivalHref,
  metroStationHref,
  placeHref,
  routeHref,
} from "@/lib/links";

/**
 * Link the first mention of a known place, dish or route inside body prose.
 *
 * The site had 843 internal links but a median of zero per page inside an
 * actual sentence: the cards and "nearby" rails did the linking while the
 * writing did none. A page could name Θεσσαλονίκη eighteen times and link it
 * never. These are the links a reader follows mid-sentence, and the ones that
 * tell a search engine what a page is about, because the anchor text is the
 * name rather than "read more".
 *
 * Only the first mention of each entity is linked, never inside a heading, a
 * code span or an existing link, and never back to the page you are on.
 */

/** Accent folding that preserves length, so match offsets map onto the original. */
const FOLD: Record<string, string> = {
  ά: "α", έ: "ε", ή: "η", ί: "ι", ό: "ο", ύ: "υ", ώ: "ω",
  ϊ: "ι", ϋ: "υ", ΐ: "ι", ΰ: "υ", ς: "σ",
  Ά: "α", Έ: "ε", Ή: "η", Ί: "ι", Ό: "ο", Ύ: "υ", Ώ: "ω", Ϊ: "ι", Ϋ: "υ",
};

function fold(value: string): string {
  let out = "";
  for (const ch of value) {
    const mapped = FOLD[ch];
    out += mapped ?? ch.toLowerCase();
  }
  return out;
}

/**
 * Greek inflects, so "Λευκός Πύργος" appears as "Λευκού Πύργου" and
 * "Λευκό Πύργο". Rather than truncating stems — which makes "Θέρμη" match
 * "θέρμανση" — each ending is swapped for the set it actually declines into.
 */
const RAW_ENDINGS: [string, string[]][] = [
  ["ους", ["ος", "ου", "ο", "ε", "οι", "ων", "ους"]],
  ["ος", ["ος", "ου", "ο", "ε", "οι", "ων", "ους"]],
  ["ης", ["ης", "η", "ηδες"]],
  ["ας", ["ας", "α", "αδες"]],
  ["ες", ["ες", "ων", "α"]],
  ["οι", ["οι", "ων", "ους"]],
  ["ων", ["ων", "ες", "α"]],
  ["α", ["α", "ας", "ες", "ων"]],
  ["η", ["η", "ης", "ες", "ων"]],
  ["ο", ["ο", "ου", "α", "ων"]],
  ["ι", ["ι", "ιου", "ια", "ιων"]],
  ["υ", ["υ", "υς"]],
];

/**
 * Folded once here rather than written folded by hand. The table is read
 * against text that has already been through `fold`, where final sigma has
 * become medial — so an ending written "ος" would never match "λευκοσ", and
 * every -ος noun in the site would silently decline to nothing.
 */
const ENDINGS: [string, string[]][] = RAW_ENDINGS.map(([ending, forms]) => [
  fold(ending),
  forms.map(fold),
]);

const ESCAPE = /[.*+?^${}()|[\]\\]/g;

/** A pattern matching one word in any form it plausibly declines into. */
function wordPattern(word: string): string {
  const folded = fold(word);
  // Latin words and anything short stay literal; "Boston" does not decline and
  // a three-letter stem matches far too much.
  if (!/[α-ω]/.test(folded) || folded.length < 4) {
    return folded.replace(ESCAPE, "\\$&");
  }
  for (const [ending, forms] of ENDINGS) {
    if (folded.endsWith(ending)) {
      const stem = folded.slice(0, -ending.length).replace(ESCAPE, "\\$&");
      if (stem.length < 3) break;
      return `${stem}(?:${forms.join("|")})`;
    }
  }
  return folded.replace(ESCAPE, "\\$&");
}

interface Entity {
  href: string;
  /** Folded-text pattern, already inflection-aware. */
  pattern: RegExp;
  /** Longest-first ordering, so "Αγία Σοφία" wins over "Σοφία". */
  weight: number;
  /** Folded name, for comparing entities that share one. */
  name: string;
  /**
   * Lower wins when two entities share a name. Several metro stations are
   * named after the district they serve, and a mention of "Καλαμαριά" in prose
   * almost always means the neighbourhood, not the platform.
   */
  priority: number;
}

/**
 * Names that are also ordinary words. Several metro stations are named after
 * the thing they sit next to, so "Μικρά" is both a station and the plural of
 * "small", and "Πανεπιστήμιο" is both a station and a university. Matching on
 * capitalisation catches most of these, but not at the start of a sentence, so
 * they are excluded outright: linking the word "μικρές" to a metro stop is
 * worse than not linking the station at all.
 */
const TOO_GENERIC = new Set(
  [
    "Μίκρα", "Μικρά", "Πανεπιστήμιο", "Δημοκρατίας", "Νομαρχία", "Ανάληψη",
    "Συντριβάνι", "Κέντρο", "Λιμάνι", "Παραλία", "Νέα Παραλία", "Φλέμινγκ",
    "University", "Democracy", "Harbour", "City Center", "Waterfront",
  ].map(fold),
);

function buildEntities(locale: Locale): Entity[] {
  const out: Entity[] = [];
  let priority = 0;
  const add = (name: string, href: string) => {
    const trimmed = name.trim();
    // Drop a parenthetical alias: "Ροτόντα (Άγιος Γεώργιος)" matches on the
    // name people actually write.
    const base = trimmed.replace(/\s*\([^)]*\)\s*$/, "").trim();
    if (base.length < 5) return;
    // Compared folded, because an accent would otherwise slip past: the station
    // is spelt "Μίκρα" while the phrase in the prose is "Μικράς Ασίας".
    if (TOO_GENERIC.has(fold(base))) return;
    const words = base.split(/\s+/).map(wordPattern);
    out.push({
      href,
      pattern: new RegExp(`(?<![\\p{L}\\p{N}])${words.join("\\s+")}(?![\\p{L}\\p{N}])`, "u"),
      weight: base.length,
      name: fold(base),
      priority,
    });
  };

  // Order sets the priority used when two entities share a name.
  priority = 1; for (const p of attractions) add(pick(p.name, locale), placeHref(p));
  priority = 2; for (const a of areas) add(pick(a.name, locale), areaHref(a.slug));
  priority = 3; for (const d of dishes) add(pick(d.name, locale), dishHref(d.slug));
  priority = 4; for (const d of dayTrips) add(pick(d.name, locale), dayTripHref(d.slug));
  priority = 5; for (const f of festivals) add(pick(f.name, locale), festivalHref(f.slug));
  priority = 6; for (const r of walkingRoutes) add(pick(r.name, locale), routeHref(r.slug));
  priority = 7; for (const s of metroStations) add(pick(s.name, locale), metroStationHref(s.slug));

  return out.sort((a, b) => b.weight - a.weight || a.priority - b.priority);
}

const cache = new Map<Locale, Entity[]>();
function entitiesFor(locale: Locale): Entity[] {
  let e = cache.get(locale);
  if (!e) {
    e = buildEntities(locale);
    cache.set(locale, e);
  }
  return e;
}

/** Character ranges the linker must not touch. */
function protectedRanges(md: string): [number, number][] {
  const ranges: [number, number][] = [];
  const push = (re: RegExp) => {
    for (const m of md.matchAll(re)) {
      ranges.push([m.index!, m.index! + m[0].length]);
    }
  };
  push(/\[[^\]]*\]\([^)]*\)/g);   // existing links
  push(/`[^`]*`/g);               // inline code
  push(/```[\s\S]*?```/g);        // fenced code
  push(/^#{1,6} .*$/gm);          // headings
  push(/^>.*$/gm);                // block quotes, which are asides here
  push(/!\[[^\]]*\]\([^)]*\)/g);  // images
  return ranges;
}

const MAX_LINKS_PER_PAGE = 8;

/**
 * Insert links into markdown.
 *
 * `selfHref` is the page being rendered, so a page never links to itself.
 */
export function autoLink(markdown: string, locale: Locale, selfHref?: string): string {
  if (!markdown) return markdown;

  const folded = fold(markdown);
  const blocked = protectedRanges(markdown);
  const isBlocked = (start: number, end: number) =>
    blocked.some(([a, b]) => start < b && end > a);

  // Collect one match per entity, then apply them right-to-left so earlier
  // offsets stay valid.
  const hits: { start: number; end: number; href: string }[] = [];
  const taken: [number, number][] = [];

  const all = entitiesFor(locale);
  // A district and the metro station serving it share a name, so excluding the
  // page's own href alone let the station take the link on the district's page.
  const selfName = selfHref ? all.find((e) => e.href === selfHref)?.name : undefined;

  for (const entity of all) {
    if (hits.length >= MAX_LINKS_PER_PAGE) break;
    if (selfHref && entity.href === selfHref) continue;
    if (selfName && entity.name === selfName) continue;

    const m = entity.pattern.exec(folded);
    if (!m || m.index === undefined) continue;
    const start = m.index;
    const end = start + m[0].length;

    if (isBlocked(start, end)) continue;
    if (taken.some(([a, b]) => start < b && end > a)) continue;
    // Greek proper nouns are capitalised. Requiring that of the original text
    // is what separates the station "Μικρά" from the adjective "μικρές".
    const first = markdown[start];
    if (first !== first.toUpperCase() || first === first.toLowerCase()) continue;

    hits.push({ start, end, href: entity.href });
    taken.push([start, end]);
  }

  if (!hits.length) return markdown;

  hits.sort((a, b) => b.start - a.start);
  let out = markdown;
  for (const h of hits) {
    const text = out.slice(h.start, h.end);
    const prefix = locale === "el" ? "" : "/en";
    out = `${out.slice(0, h.start)}[${text}](${prefix}${h.href})${out.slice(h.end)}`;
  }
  return out;
}

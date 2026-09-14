import type { ExternalEvent } from "./types";

/**
 * RSS 2.0 adapter, tuned for WordPress "The Events Calendar" feeds where the
 * item's <pubDate> is the POST date, not the event date. We therefore try to
 * extract the real (Greek or numeric) date from the item description and only
 * fall back to pubDate if none is found — imported events stay PENDING so a
 * moderator confirms the date.
 */

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripHtml(s: string): string {
  return decodeEntities(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function tag(block: string, name: string): string | undefined {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  if (!m) return undefined;
  let v = m[1].trim();
  const cdata = v.match(/<!\[CDATA\[([\s\S]*?)\]\]>/);
  if (cdata) v = cdata[1];
  return v.trim();
}

// Greek month stems (after accent removal) → month number.
const GREEK_MONTHS: [RegExp, number][] = [
  [/^ιανουαρ/, 1],
  [/^φεβρουαρ/, 2],
  [/^μαρτ/, 3],
  [/^απριλ/, 4],
  [/^μαι/, 5],
  [/^ιουν/, 6],
  [/^ιουλ/, 7],
  [/^αυγουστ/, 8],
  [/^σεπτεμβρ/, 9],
  [/^οκτωβρ/, 10],
  [/^νοεμβρ/, 11],
  [/^δεκεμβρ/, 12],
];

function stripAccents(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

/** A calendar date, plus the clock time only when the source actually stated one. */
export interface ExtractedDate {
  date: Date;
  timeKnown: boolean;
}

/**
 * Find a start time ("19:00", "7.30 μμ") in free text.
 *
 * Only accepted when it sits near a time cue, so a price ("12.50") or a street
 * number cannot be mistaken for a clock reading.
 */
function extractTime(norm: string): { h: number; m: number } | null {
  const m = norm.match(
    /(?:ωρα|ωρες|ωραριο|start|time|στις)\s*:?\s*(\d{1,2})[:.](\d{2})|(\d{1,2})[:.](\d{2})\s*(?:μμ|πμ|μ\.μ|π\.μ)/,
  );
  if (!m) return null;
  const h = Number(m[1] ?? m[3]);
  const min = Number(m[2] ?? m[4]);
  if (h > 23 || min > 59) return null;
  // "7.30 μμ" means 19:30.
  const pm = /μμ|μ\.μ/.test(m[0]) && h < 12;
  return { h: pm ? h + 12 : h, m: min };
}

/**
 * Extract an event date from free text (Greek "1 Νοεμβρίου 2026" or dd/mm/yyyy).
 *
 * When the text carries no clock time, the returned date sits at midnight and
 * `timeKnown` is false — callers show the day only. Inventing a plausible
 * evening slot would put a start time we made up in front of readers and in
 * schema.org `startDate`.
 */
export function extractDate(text: string): ExtractedDate | null {
  const norm = stripAccents(text);
  const time = extractTime(norm);
  const at = (y: number, mo: number, d: number): ExtractedDate | null => {
    const date = new Date(y, mo - 1, d, time?.h ?? 0, time?.m ?? 0, 0);
    return isNaN(date.getTime()) ? null : { date, timeKnown: time !== null };
  };

  const re = /(\d{1,2})\s+([α-ωa-z]+)\s+(\d{4})/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(norm))) {
    const month = GREEK_MONTHS.find(([re2]) => re2.test(m![2]))?.[1];
    if (month) {
      const hit = at(Number(m[3]), month, Number(m[1]));
      if (hit) return hit;
    }
  }
  const num = norm.match(/(\d{1,2})[/.](\d{1,2})[/.](\d{4})/);
  if (num) return at(Number(num[3]), Number(num[2]), Number(num[1]));
  return null;
}

import { profileFor } from "./sources";

/**
 * Whether a clock time is believable as a public event's start.
 *
 * Feeds carry data-entry artefacts — a calendar we read lists a punk gig at
 * 03:33, which the source really does say. The date is still right, so the
 * entry is kept; only the clock is demoted to unknown, and the page then shows
 * the day without asserting an hour nobody will turn up at. Midnight and 01:00
 * stay trusted: club nights genuinely list those as door times.
 */
function plausibleStart(date: Date): boolean {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Athens",
      hour: "2-digit",
      hour12: false,
    }).format(date),
  );
  return hour < 2 || hour >= 8;
}

export function parseRss(xml: string, source = "rss"): ExternalEvent[] {
  const blocks = xml.split(/<item[\s>]/i).slice(1).map((s) => s.split(/<\/item>/i)[0]);
  const events: ExternalEvent[] = [];

  for (const block of blocks) {
    const title = tag(block, "title");
    if (!title) continue;
    const link = tag(block, "link");
    const guid = tag(block, "guid");
    const descHtml = tag(block, "description") ?? "";
    const descText = stripHtml(descHtml);
    const pub = tag(block, "pubDate");
    const profile = profileFor(link);

    const category = decodeEntities(tag(block, "category") ?? "").trim() || undefined;
    // A feed we have notes on may publish categories we deliberately skip.
    if (profile?.allowCategories && !profile.allowCategories.includes(category ?? "")) {
      continue;
    }

    // pubDate is normally when the article was posted, not when the event runs,
    // so its clock time says nothing about the start. Some feeds set it to the
    // event's own start with a timezone; only a checked profile says so.
    const found = profile?.pubDateIsEventStart && pub
      ? { date: new Date(pub), timeKnown: plausibleStart(new Date(pub)) }
      : extractDate(descText) ??
        extractDate(decodeEntities(title)) ??
        (pub ? { date: new Date(pub), timeKnown: false } : null);
    if (!found || isNaN(found.date.getTime())) continue;

    // <georss:point>lat lng</georss:point> — the source's own coordinates, so
    // unlike a gazetteer guess these can be trusted onto a map.
    let lat: number | undefined;
    let lng: number | undefined;
    const point = /<georss:point>\s*([-\d.]+)\s+([-\d.]+)\s*<\/georss:point>/i.exec(block);
    if (point) {
      const a = Number(point[1]);
      const b = Number(point[2]);
      if (Number.isFinite(a) && Number.isFinite(b) && Math.abs(a) <= 90 && Math.abs(b) <= 180) {
        lat = a;
        lng = b;
      }
    }

    let cleanTitle = decodeEntities(title).trim();
    if (profile?.titlePrefix) cleanTitle = cleanTitle.replace(profile.titlePrefix, "").trim();
    if (!cleanTitle) continue;

    events.push({
      externalId: guid || link || `${title}-${found.date.toISOString()}`,
      source,
      sourceUrl: link || undefined,
      title: cleanTitle,
      description: descText || undefined,
      startsAt: found.date.toISOString(),
      timeKnown: found.timeKnown,
      category,
      lat,
      lng,
      indexable: profile?.indexable,
    });
  }

  return events;
}

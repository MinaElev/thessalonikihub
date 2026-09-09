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

/** Extract an event date from free text (Greek "1 Νοεμβρίου 2026" or dd/mm/yyyy). */
export function extractDate(text: string): Date | null {
  const norm = stripAccents(text);
  const re = /(\d{1,2})\s+([α-ωa-z]+)\s+(\d{4})/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(norm))) {
    const month = GREEK_MONTHS.find(([re2]) => re2.test(m![2]))?.[1];
    if (month) {
      const d = new Date(Number(m[3]), month - 1, Number(m[1]), 19, 0, 0);
      if (!isNaN(d.getTime())) return d;
    }
  }
  const num = norm.match(/(\d{1,2})[/.](\d{1,2})[/.](\d{4})/);
  if (num) {
    const d = new Date(Number(num[3]), Number(num[2]) - 1, Number(num[1]), 19, 0, 0);
    if (!isNaN(d.getTime())) return d;
  }
  return null;
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

    const eventDate = extractDate(descText) ?? (pub ? new Date(pub) : null);
    if (!eventDate || isNaN(eventDate.getTime())) continue;

    events.push({
      externalId: guid || link || `${title}-${eventDate.toISOString()}`,
      source,
      sourceUrl: link || undefined,
      title: decodeEntities(title),
      description: descText || undefined,
      startsAt: eventDate.toISOString(),
    });
  }

  return events;
}

import "server-only";
import { extractTimes, extractPrice, extractVenueName } from "./extract";
import { locateVenue, findVenueInText } from "./venues";
import { rewriteEvent, isRewriterConfigured } from "./rewrite";
import { parseAthensLocal } from "@/lib/athens-time";
import type { toEventData } from "./normalize";

/**
 * Everything that turns a raw import into a publishable page.
 *
 * Two passes, deliberately different in kind. Rules first, for the facts a
 * reader acts on — start time, price, which building — because a rule either
 * matches or does not, and "usually right" is the wrong standard for an hour
 * someone will turn up at. Then the model, for the prose, because the
 * alternative to original writing is republishing someone else's.
 *
 * An event is published automatically only when the rewrite came back
 * confident. Everything else lands in the moderation queue exactly as before,
 * so the failure mode of this whole pipeline is "a human looks at it", never
 * "something wrong goes live".
 */

// normalize.ts returns literal nulls for the fields it deliberately leaves
// empty, which TypeScript infers as the `null` type. Enrichment exists to fill
// exactly those, so they are widened here.
type EventData = Omit<
  ReturnType<typeof toEventData>,
  "lat" | "lng" | "area" | "type" | "status"
> & {
  lat: number | null;
  lng: number | null;
  area: string | null;
  type: string;
  status: string;
  priceInfo?: { el: string; en?: string };
};

export interface EnrichResult {
  data: EventData;
  /** True when the text is ours and the event can go live unattended. */
  autoPublished: boolean;
}

const loc = (el: string, en?: string) => (en && en.trim() ? { el, en } : { el });

export async function enrichEvent(data: EventData): Promise<EnrichResult> {
  const source = `${data.name.el}\n${data.description.el}`;
  const enriched: EventData = { ...data };

  /* ---- Rules ---- */

  // The feed's own venue field wins; only fall back to reading the prose.
  const statedVenue =
    (data.venue as { el?: string }).el?.trim() ||
    extractVenueName(data.description.el) ||
    null;

  const located = statedVenue ? locateVenue(statedVenue) : findVenueInText(source);
  if (located && located.name) {
    enriched.venue = { el: located.name };
    enriched.lat = located.lat;
    enriched.lng = located.lng;
    enriched.area = located.area;
  }

  const times = extractTimes(data.description.el);
  if (times.start) {
    // The date is already right; only the clock was missing or padded.
    const day = data.startsAt.toISOString().slice(0, 10);
    const start = parseAthensLocal(`${day}T${times.start}`);
    if (start) {
      enriched.startsAt = start;
      enriched.timeKnown = true;
      if (times.end) {
        const end = parseAthensLocal(`${day}T${times.end}`);
        // Ignore an end before the start: that is a range spanning midnight or
        // a misread, and a negative duration is worse than none.
        if (end && end > start) enriched.endsAt = end;
      }
    }
  }

  const price = extractPrice(data.description.el);
  if (price) enriched.priceInfo = loc(price.el, price.en);

  /* ---- The model ---- */

  if (!isRewriterConfigured) return { data: enriched, autoPublished: false };

  const rewrite = await rewriteEvent({
    sourceTitle: data.name.el,
    sourceText: data.description.el,
    dateLabel: new Intl.DateTimeFormat("el-GR", {
      timeZone: "Europe/Athens",
      dateStyle: "full",
    }).format(enriched.startsAt),
    venue: located?.name ?? null,
    startTime: times.start,
    price: price?.el ?? null,
  });

  if (!rewrite) return { data: enriched, autoPublished: false };

  enriched.name = loc(rewrite.nameEl, rewrite.nameEn);
  enriched.summary = loc(rewrite.summaryEl, rewrite.summaryEn);
  enriched.description = loc(rewrite.descriptionEl, rewrite.descriptionEn);
  enriched.type = rewrite.type;
  enriched.tags = rewrite.tags;
  // The venue keeps the extracted wording; only its translation comes from the
  // model, and only when it actually named one.
  enriched.textRewritten = true;
  enriched.status = "PUBLISHED";

  return { data: enriched, autoPublished: true };
}

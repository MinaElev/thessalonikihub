import type { Locale } from "@/i18n/routing";
import type { EventItem } from "@/lib/types";
import { pick } from "@/lib/types";

/**
 * A one-line description for an event, or nothing when there is none to give.
 *
 * An imported feed that supplies no description leaves `summary` holding a
 * copy of the title, which reached every surface the event has: the homepage
 * card read "Live" twice, the page repeated its own heading under it, and the
 * meta description for `/events/live-…` was the single word "Live". A summary
 * that repeats the title is not a summary.
 *
 * Where the feed gave nothing, the venue and the date are still known and say
 * more than the title repeated, so they become the line instead — described,
 * never invented: a date is only stated when the source gave one, and the time
 * only when `timeKnown` says it is real.
 */
function same(a: string, b: string): boolean {
  const norm = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();
  return norm(a) === norm(b);
}

/** The event's own words, when they add something the title has not said. */
export function eventSummary(
  event: EventItem,
  locale: Locale,
): string | undefined {
  const summary = pick(event.summary, locale)?.trim();
  if (!summary) return undefined;
  if (same(summary, pick(event.name, locale))) return undefined;
  return summary;
}

/**
 * A line that always says something: the summary where there is one, and
 * otherwise where and when the event is.
 */
export function eventBlurb(event: EventItem, locale: Locale): string {
  const summary = eventSummary(event, locale);
  if (summary) return summary;

  const el = locale === "el";
  const venue = pick(event.venue, locale)?.trim();
  const when = new Date(event.startsAt);
  const dated = !Number.isNaN(when.getTime());

  const date = dated
    ? new Intl.DateTimeFormat(el ? "el-GR" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        // Padding stands in for a start time the source never gave.
        ...(event.timeKnown === false
          ? {}
          : { hour: "2-digit", minute: "2-digit" }),
        timeZone: "Europe/Athens",
      }).format(when)
    : null;

  const parts = [venue, date].filter(Boolean);
  if (!parts.length) {
    return el ? "Εκδήλωση στη Θεσσαλονίκη." : "An event in Thessaloniki.";
  }
  // Greek abbreviates the half of the day as "μ.μ.", so the sentence already
  // ends in a full stop and must not be given a second one.
  const tail = parts.join(", ");
  const stop = tail.endsWith(".") ? "" : ".";
  return el
    ? `Εκδήλωση στη Θεσσαλονίκη — ${tail}${stop}`
    : `An event in Thessaloniki — ${tail}${stop}`;
}

/**
 * The event's own body text, when it is more than the title again.
 *
 * The same twelve imported events whose summary is a copy of the name carry
 * the name in `description` too, so the page printed its own heading three
 * times: once as the h1, once as the lede, once as the body.
 */
export function eventBody(
  event: EventItem,
  locale: Locale,
): string | undefined {
  const body = pick(event.description, locale)?.trim();
  if (!body) return undefined;
  if (same(body, pick(event.name, locale))) return undefined;
  return body;
}

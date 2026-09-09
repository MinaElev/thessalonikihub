import type { ExternalEvent } from "./types";

/** Stable dedupe key across sources. */
export function dedupeKey(e: ExternalEvent): string {
  return `${e.source}:${e.externalId}`.toLowerCase();
}

/** Remove duplicates (same source + externalId). */
export function dedupe(events: ExternalEvent[]): ExternalEvent[] {
  const seen = new Set<string>();
  const out: ExternalEvent[] = [];
  for (const e of events) {
    const k = dedupeKey(e);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(e);
  }
  return out;
}

/** Keep only events that haven't ended yet. */
export function futureOnly(events: ExternalEvent[]): ExternalEvent[] {
  const now = Date.now();
  return events.filter((e) => {
    const end = e.endsAt ?? e.startsAt;
    return new Date(end).getTime() >= now;
  });
}

function slugify(base: string): string {
  return (
    base
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "event"
  );
}

function shortHash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36).slice(0, 6);
}

/**
 * Map an external event to the fields of a ThessalonikiHub EventItem row.
 * Imported events default to `center`/city coords and status PENDING — a
 * moderator refines and approves them. Text is stored under `el`; translation
 * happens later with review.
 */
export function toEventData(e: ExternalEvent) {
  const desc = (e.description ?? e.title).trim();
  const summary = desc.length > 160 ? `${desc.slice(0, 157)}…` : desc;
  const key = dedupeKey(e);
  return {
    slug: `${slugify(e.title)}-${shortHash(key)}`,
    name: { el: e.title },
    summary: { el: summary },
    description: { el: desc },
    type: "imported",
    tags: [] as string[],
    startsAt: new Date(e.startsAt),
    endsAt: e.endsAt ? new Date(e.endsAt) : null,
    venue: { el: e.location || "Θεσσαλονίκη" },
    lat: 40.6401,
    lng: 22.9444,
    area: "center",
    photos: [] as unknown[],
    contact: e.sourceUrl ? { website: e.sourceUrl } : {},
    source: e.source,
    sourceUrl: e.sourceUrl ?? null,
    externalId: key,
    status: "PENDING",
  };
}

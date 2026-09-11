import { prisma, isDbConfigured } from "@/lib/db";
import { athensDayStart } from "@/lib/athens-time";

/** Key used by every helper here, so a caller can look a listing up directly. */
export function viewKey(kind: string, slug: string): string {
  return `${kind.toLowerCase()}:${slug}`;
}

function since(days: number): Date {
  const start = athensDayStart();
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return start;
}

/** Opens, and the contact routes taken, over the period asked for. */
export interface ListingStats {
  views: number;
  /** Every contact route added together: the number an owner cares about. */
  contacts: number;
  /** Per route, for the ones that actually happened. */
  byAction: Record<string, number>;
}

const EMPTY: ListingStats = { views: 0, contacts: 0, byAction: {} };

export function emptyStats(): ListingStats {
  return EMPTY;
}

/**
 * Stats per listing over the last `days` days, including today.
 *
 * Returns a map rather than an array so a caller rendering a list can look up
 * each row without a nested search.
 */
export async function getListingStats(
  items: { kind: string; slug: string }[],
  days = 30,
): Promise<Map<string, ListingStats>> {
  const result = new Map<string, ListingStats>();
  if (!isDbConfigured || items.length === 0) return result;

  const rows = await prisma.listingView.groupBy({
    by: ["kind", "slug", "action"],
    where: {
      day: { gte: since(days) },
      OR: items.map((i) => ({ kind: i.kind.toLowerCase(), slug: i.slug })),
    },
    _sum: { count: true },
  });

  for (const row of rows) {
    const key = viewKey(row.kind, row.slug);
    const entry = result.get(key) ?? { views: 0, contacts: 0, byAction: {} };
    const count = row._sum.count ?? 0;
    if (row.action === "view") {
      entry.views += count;
    } else {
      entry.contacts += count;
      entry.byAction[row.action] = (entry.byAction[row.action] ?? 0) + count;
    }
    result.set(key, entry);
  }
  return result;
}

export interface TopListing {
  kind: string;
  slug: string;
  views: number;
  contacts: number;
}

/** The most-read listings, for the moderation dashboard. */
export async function getTopViewed(days = 30, limit = 8): Promise<TopListing[]> {
  if (!isDbConfigured) return [];

  const rows = await prisma.listingView.groupBy({
    by: ["kind", "slug", "action"],
    where: { day: { gte: since(days) } },
    _sum: { count: true },
  });

  // Ordering has to happen after views and contacts are folded together, so
  // it cannot be pushed into the query.
  const merged = new Map<string, TopListing>();
  for (const row of rows) {
    const key = viewKey(row.kind, row.slug);
    const entry = merged.get(key) ?? {
      kind: row.kind,
      slug: row.slug,
      views: 0,
      contacts: 0,
    };
    const count = row._sum.count ?? 0;
    if (row.action === "view") entry.views += count;
    else entry.contacts += count;
    merged.set(key, entry);
  }

  return Array.from(merged.values())
    .sort((a, b) => b.views - a.views || b.contacts - a.contacts)
    .slice(0, limit);
}

/**
 * Totals across the whole site, for the moderation dashboard header.
 * `previous` covers the equally long stretch before it, so the two compare.
 */
export interface SiteTotals {
  views: number;
  contacts: number;
  previousViews: number;
}

export async function getSiteTotals(days = 30): Promise<SiteTotals> {
  if (!isDbConfigured) return { views: 0, contacts: 0, previousViews: 0 };

  const start = since(days);
  const previousStart = since(days * 2);

  const rows = await prisma.listingView.groupBy({
    by: ["action"],
    where: { day: { gte: start } },
    _sum: { count: true },
  });
  const previous = await prisma.listingView.aggregate({
    where: { day: { gte: previousStart, lt: start }, action: "view" },
    _sum: { count: true },
  });

  let views = 0;
  let contacts = 0;
  for (const row of rows) {
    const count = row._sum.count ?? 0;
    if (row.action === "view") views += count;
    else contacts += count;
  }

  return { views, contacts, previousViews: previous._sum.count ?? 0 };
}

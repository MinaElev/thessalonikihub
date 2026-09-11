import { prisma, isDbConfigured } from "@/lib/db";
import { athensDayStart } from "@/lib/athens-time";

/** Key used by both helpers, so callers can look a listing up directly. */
export function viewKey(kind: string, slug: string): string {
  return `${kind.toLowerCase()}:${slug}`;
}

function since(days: number): Date {
  const start = athensDayStart();
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return start;
}

/**
 * Views per listing over the last `days` days, including today.
 *
 * Returns a map rather than an array so a caller rendering a list can look up
 * each row without a nested search, and so a listing with no views at all is
 * simply absent instead of needing a zero row.
 */
export async function getViewCounts(
  items: { kind: string; slug: string }[],
  days = 30,
): Promise<Map<string, number>> {
  const result = new Map<string, number>();
  if (!isDbConfigured || items.length === 0) return result;

  const rows = await prisma.listingView.groupBy({
    by: ["kind", "slug"],
    where: {
      day: { gte: since(days) },
      OR: items.map((i) => ({ kind: i.kind.toLowerCase(), slug: i.slug })),
    },
    _sum: { count: true },
  });

  for (const row of rows) {
    result.set(viewKey(row.kind, row.slug), row._sum.count ?? 0);
  }
  return result;
}

export interface TopListing {
  kind: string;
  slug: string;
  views: number;
}

/** The most-read listings, for the moderation dashboard. */
export async function getTopViewed(days = 30, limit = 8): Promise<TopListing[]> {
  if (!isDbConfigured) return [];

  const rows = await prisma.listingView.groupBy({
    by: ["kind", "slug"],
    where: { day: { gte: since(days) } },
    _sum: { count: true },
    orderBy: { _sum: { count: "desc" } },
    take: limit,
  });

  return rows.map((r) => ({
    kind: r.kind,
    slug: r.slug,
    views: r._sum.count ?? 0,
  }));
}

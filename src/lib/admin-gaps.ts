import "server-only";
import { Prisma } from "@prisma/client";
import { prisma, isDbConfigured } from "@/lib/db";

/**
 * What is published but incomplete.
 *
 * The panel could say what exists and what was waiting; it could not say what
 * was wrong. These are the gaps that cost something real — a visitor who
 * cannot find an opening time, a listing nobody can contact, an event with no
 * picture in a search result — each with the filter that leads straight to
 * the rows in question.
 */

export interface Gap {
  key: string;
  count: number;
  /** Where to go and fix it. */
  href: string;
  /** Higher means it costs more to leave alone. */
  severity: "high" | "medium";
}

export async function getContentGaps(): Promise<Gap[]> {
  if (!isDbConfigured) return [];

  const [
    eventsNoPhoto,
    eventsNoGeo,
    eventsNoText,
    placesNoHours,
    placesNoContact,
    placesNoPhoto,
    placesNoOwner,
  ] = await Promise.all([
    prisma.eventItem.count({ where: { status: "PUBLISHED", photos: { equals: [] } } }),
    prisma.eventItem.count({ where: { status: "PUBLISHED", lat: null } }),
    prisma.eventItem.count({ where: { status: "PUBLISHED", textRewritten: false } }),
    // A monument with neither hours nor a note answers nothing when someone
    // asks the single most common question about it.
    prisma.place.count({
      // DbNull, not null: on a nullable Json column Prisma distinguishes a SQL
      // NULL from the JSON value `null`, and only the former means "unset".
      where: {
        status: "PUBLISHED",
        hours: { equals: Prisma.DbNull },
        hoursNote: { equals: Prisma.DbNull },
      },
    }),
    // Businesses only. A monument with no phone number is not a defect, and
    // counting fifteen of them here would bury the listings that really are
    // unreachable.
    prisma.place.count({
      where: { status: "PUBLISHED", contact: { equals: {} }, NOT: { kind: "DISCOVER" } },
    }),
    prisma.place.count({ where: { status: "PUBLISHED", photos: { equals: [] } } }),
    // Same reasoning: editorial entries for monuments have no owner by
    // design, so only a business without one is worth chasing.
    prisma.place.count({
      where: { status: "PUBLISHED", ownerId: null, NOT: { kind: "DISCOVER" } },
    }),
  ]);

  const gaps: Gap[] = [
    { key: "placesNoHours", count: placesNoHours, href: "/admin/listings", severity: "high" },
    { key: "eventsNoText", count: eventsNoText, href: "/admin/listings?needs=rewrite", severity: "high" },
    { key: "placesNoPhoto", count: placesNoPhoto, href: "/admin/listings", severity: "high" },
    { key: "placesNoContact", count: placesNoContact, href: "/admin/listings", severity: "medium" },
    { key: "eventsNoPhoto", count: eventsNoPhoto, href: "/admin/listings?kind=EVENTS", severity: "medium" },
    { key: "eventsNoGeo", count: eventsNoGeo, href: "/admin/listings?kind=EVENTS", severity: "medium" },
    { key: "placesNoOwner", count: placesNoOwner, href: "/admin/listings", severity: "medium" },
  ];

  // Nothing is a gap at zero.
  return gaps.filter((g) => g.count > 0);
}

export interface DailyPoint {
  day: string;
  views: number;
  contacts: number;
}

/**
 * Views and contacts per day, oldest first, with the quiet days present as
 * zeroes — a chart that skips empty days draws a rising line out of a flat
 * fortnight.
 */
export async function getDailySeries(days = 30): Promise<DailyPoint[]> {
  if (!isDbConfigured) return [];

  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - (days - 1));

  const rows = await prisma.listingView.groupBy({
    by: ["day", "action"],
    where: { day: { gte: start } },
    _sum: { count: true },
  });

  const byDay = new Map<string, DailyPoint>();
  for (let i = 0; i < days; i++) {
    const d = new Date(start.getTime() + i * 86_400_000);
    const key = d.toISOString().slice(0, 10);
    byDay.set(key, { day: key, views: 0, contacts: 0 });
  }

  for (const row of rows) {
    const key = row.day.toISOString().slice(0, 10);
    const point = byDay.get(key);
    if (!point) continue;
    const n = row._sum.count ?? 0;
    if (row.action === "view") point.views += n;
    else point.contacts += n;
  }

  return Array.from(byDay.values());
}

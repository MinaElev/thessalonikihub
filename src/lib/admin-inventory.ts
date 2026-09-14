import "server-only";
import { prisma, isDbConfigured } from "@/lib/db";
import { areas } from "@/content/data/areas";
import { dayTrips } from "@/content/data/daytrips";
import { audiences } from "@/content/data/audiences";
import { metroStations } from "@/content/data/metro";
import { cityMonths } from "@/content/data/months";
import { festivals } from "@/content/data/festivals";
import { dishes } from "@/content/data/dishes";
import { walkingRoutes } from "@/content/data/routes";
import { staticPages } from "@/content/data/pages";
import { getGuides, getCollections, getFilePlaces } from "@/lib/repo";
import type { Pillar } from "@/lib/types";
import { prisma as db } from "@/lib/db";

/**
 * Everything the platform holds, counted.
 *
 * The split down the middle is the important part. Rows in the database are
 * created by visitors and moderated here; the editorial content is written in
 * the repository and ships with a deploy. A panel that blurred the two would
 * offer buttons that cannot work, so the distinction is carried through to
 * the types rather than left to the page to remember.
 */

export interface StatusCounts {
  total: number;
  pending: number;
  published: number;
  rejected: number;
  draft: number;
}

export interface DatabaseInventory {
  places: StatusCounts;
  events: StatusCounts;
  /**
   * Published events still carrying the source feed's wording. They are live
   * for visitors but noindex and absent from the sitemap, which looks like
   * success from every screen that only reports status.
   */
  eventsAwaitingRewrite: number;
  /**
   * Listings defined in a content file with no database row behind them. They
   * are live on the site and were invisible to a panel that counted rows, so
   * the counts here are what the site serves, not what the database holds.
   */
  fileOnlyPlaces: number;
  people: { total: number; users: number; owners: number; admins: number };
  subscribers: { total: number; confirmed: number; unsubscribed: number };
  claims: { pending: number; approved: number; rejected: number };
  savedItems: number;
}

export interface FileContentGroup {
  key: string;
  count: number;
  /** Path in the repository, so a reader knows where to go and edit it. */
  source: string;
}

const EMPTY_STATUS: StatusCounts = {
  total: 0,
  pending: 0,
  published: 0,
  rejected: 0,
  draft: 0,
};

function foldStatuses(rows: { status: string; _count: { _all: number } }[]): StatusCounts {
  const out: StatusCounts = { ...EMPTY_STATUS };
  for (const row of rows) {
    const n = row._count._all;
    out.total += n;
    if (row.status === "PENDING") out.pending += n;
    else if (row.status === "PUBLISHED") out.published += n;
    else if (row.status === "REJECTED") out.rejected += n;
    else if (row.status === "DRAFT") out.draft += n;
  }
  return out;
}

export async function getDatabaseInventory(): Promise<DatabaseInventory> {
  if (!isDbConfigured) {
    return {
      places: { ...EMPTY_STATUS },
      events: { ...EMPTY_STATUS },
      eventsAwaitingRewrite: 0,
      fileOnlyPlaces: 0,
      people: { total: 0, users: 0, owners: 0, admins: 0 },
      subscribers: { total: 0, confirmed: 0, unsubscribed: 0 },
      claims: { pending: 0, approved: 0, rejected: 0 },
      savedItems: 0,
    };
  }

  const [
    placeRows,
    eventRows,
    awaitingRewrite,
    roleRows,
    subscribers,
    confirmed,
    unsubscribed,
    claimRows,
    saved,
  ] =
    await Promise.all([
      prisma.place.groupBy({ by: ["status"], _count: { _all: true } }),
      prisma.eventItem.groupBy({ by: ["status"], _count: { _all: true } }),
      prisma.eventItem.count({
        where: { status: "PUBLISHED", textRewritten: false },
      }),
      prisma.profile.groupBy({ by: ["role"], _count: { _all: true } }),
      prisma.subscriber.count(),
      prisma.subscriber.count({ where: { confirmed: true } }),
      prisma.subscriber.count({ where: { NOT: { unsubscribedAt: null } } }),
      prisma.claim.groupBy({ by: ["status"], _count: { _all: true } }),
      prisma.savedItem.count(),
    ]);

  // A file listing only gains a row when something moderates it, so the set
  // of slugs already in the database is what tells the two apart.
  const rows = await db.place.findMany({ select: { slug: true } });
  const known = new Set(rows.map((r) => r.slug));
  const pillars: Exclude<Pillar, "events">[] = [
    "stay",
    "eat",
    "drink",
    "discover",
    "experiences",
    "services",
  ];
  const fileOnlyPlaces = pillars
    .flatMap((pillar) => getFilePlaces(pillar))
    .filter((place) => !known.has(place.slug)).length;

  const byRole = (role: string) =>
    roleRows.find((r) => r.role === role)?._count._all ?? 0;
  const byClaim = (status: string) =>
    claimRows.find((r) => r.status === status)?._count._all ?? 0;

  return {
    places: foldStatuses(placeRows),
    events: foldStatuses(eventRows),
    eventsAwaitingRewrite: awaitingRewrite,
    fileOnlyPlaces,
    people: {
      total: roleRows.reduce((a, r) => a + r._count._all, 0),
      users: byRole("USER"),
      owners: byRole("OWNER"),
      admins: byRole("ADMIN"),
    },
    subscribers: { total: subscribers, confirmed, unsubscribed },
    claims: {
      pending: byClaim("PENDING"),
      approved: byClaim("APPROVED"),
      rejected: byClaim("REJECTED"),
    },
    savedItems: saved,
  };
}

/**
 * The editorial content, which lives in the repository rather than the
 * database. Listed so the panel shows the whole platform, and labelled with
 * its source so nobody goes looking for an edit button that cannot exist.
 */
export function getFileContentInventory(): FileContentGroup[] {
  return [
    { key: "guides", count: getGuides().length, source: "src/content/data/guides.ts" },
    { key: "areas", count: areas.length, source: "src/content/data/areas.ts" },
    { key: "routes", count: walkingRoutes.length, source: "src/content/data/routes.ts" },
    { key: "dishes", count: dishes.length, source: "src/content/data/dishes.ts" },
    { key: "metro", count: metroStations.length, source: "src/content/data/metro.ts" },
    { key: "dayTrips", count: dayTrips.length, source: "src/content/data/daytrips.ts" },
    { key: "months", count: cityMonths.length, source: "src/content/data/months.ts" },
    { key: "collections", count: getCollections().length, source: "src/content/data/collections.ts" },
    { key: "audiences", count: audiences.length, source: "src/content/data/audiences.ts" },
    { key: "festivals", count: festivals.length, source: "src/content/data/festivals.ts" },
    { key: "pages", count: staticPages.length, source: "src/content/data/pages.ts" },
  ];
}

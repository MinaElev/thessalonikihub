import { NextResponse } from "next/server";
import { prisma, isDbConfigured } from "@/lib/db";
import { previewSources } from "@/lib/events/ingest";
import { toEventData } from "@/lib/events/normalize";
import type { SourceConfig } from "@/lib/events/types";

/**
 * Scheduled event import. Configure a cron (e.g. Vercel Cron daily) to call:
 *   GET /api/cron/import-events   with header  Authorization: Bearer <CRON_SECRET>
 *
 * Sources come from env:
 *   EVENT_ICAL_FEEDS  = "label1|https://…ics,label2|https://…ics"
 *   EVENTBRITE_TOKEN  + EVENTBRITE_ORG
 *
 * Imported events are upserted as PENDING and reviewed at /admin.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isDbConfigured) {
    return NextResponse.json({ error: "db-not-configured" }, { status: 503 });
  }

  const sources: SourceConfig[] = [];
  const parseFeeds = (raw: string | undefined) =>
    raw?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  for (const feed of parseFeeds(process.env.EVENT_ICAL_FEEDS)) {
    const [a, b] = feed.split("|");
    sources.push(b ? { kind: "ical", label: a, url: b } : { kind: "ical", url: a });
  }
  for (const feed of parseFeeds(process.env.EVENT_RSS_FEEDS)) {
    const [a, b] = feed.split("|");
    sources.push(b ? { kind: "rss", label: a, url: b } : { kind: "rss", url: a });
  }
  if (process.env.EVENTBRITE_TOKEN && process.env.EVENTBRITE_ORG) {
    sources.push({
      kind: "eventbrite",
      token: process.env.EVENTBRITE_TOKEN,
      url: process.env.EVENTBRITE_ORG,
    });
  }

  const events = await previewSources(sources);
  let imported = 0;
  for (const e of events) {
    const data = toEventData(e);
    const existing = await prisma.eventItem.findUnique({
      where: { externalId: data.externalId },
      select: { id: true, textRewritten: true },
    });
    if (!existing) {
      await prisma.eventItem.create({ data: data as never });
    } else if (!existing.textRewritten) {
      // Refresh the facts the feed owns (a corrected date, a venue added
      // later). Once an editor has rewritten the row, the importer stops
      // touching it so moderation is never silently overwritten.
      await prisma.eventItem.update({
        where: { id: existing.id },
        data: {
          sourceUrl: data.sourceUrl,
          startsAt: data.startsAt,
          endsAt: data.endsAt,
          timeKnown: data.timeKnown,
          venue: data.venue as never,
        },
      });
    } else {
      await prisma.eventItem.update({
        where: { id: existing.id },
        data: { sourceUrl: data.sourceUrl },
      });
    }
    imported++;
  }

  const purged = await purgeExpiredData();

  return NextResponse.json({ ok: true, sources: sources.length, imported, purged });
}

/**
 * Enforce the retention periods the privacy page publishes.
 *
 * Rejected submissions were previously kept for ever while the policy said
 * they were deleted. Thirty days is the grace period: long enough for the
 * owner to read why, correct it and resubmit, short enough to be a real
 * deletion rather than an indefinite hold.
 *
 * Daily view counts go after 14 months, which leaves one full year plus the
 * same season again for comparison.
 */
async function purgeExpiredData() {
  const now = Date.now();
  const rejectedBefore = new Date(now - 30 * 24 * 60 * 60 * 1000);
  const viewsBefore = new Date(now - 426 * 24 * 60 * 60 * 1000);

  // updatedAt is when the row last changed, which for a rejected listing is
  // the rejection itself — the schema records no separate rejectedAt.
  const [places, events, views] = await Promise.all([
    prisma.place.deleteMany({
      where: { status: "REJECTED", updatedAt: { lt: rejectedBefore } },
    }),
    prisma.eventItem.deleteMany({
      where: { status: "REJECTED", updatedAt: { lt: rejectedBefore } },
    }),
    prisma.listingView.deleteMany({ where: { day: { lt: viewsBefore } } }),
  ]);

  return {
    rejectedPlaces: places.count,
    rejectedEvents: events.count,
    oldViewRows: views.count,
  };
}

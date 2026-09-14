import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { TAG_EVENTS, TAG_PLACES } from "@/lib/cache-tags";
import { prisma, isDbConfigured } from "@/lib/db";
import { previewSources } from "@/lib/events/ingest";
import { toEventData } from "@/lib/events/normalize";
import { enrichEvent } from "@/lib/events/enrich";
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
  let autoPublished = 0;
  for (const e of events) {
    const raw = toEventData(e);
    const existing = await prisma.eventItem.findUnique({
      where: { externalId: raw.externalId },
      select: { id: true, textRewritten: true },
    });
    if (!existing) {
      // Only new rows are enriched. Re-running the model over an event that
      // already exists would spend money to produce different words for the
      // same facts, and would overwrite an editor's corrections.
      const { data, autoPublished: live } = await enrichEvent(raw, {
        indexable: e.indexable,
      });
      await prisma.eventItem.create({ data: data as never });
      if (live) autoPublished++;
    } else if (!existing.textRewritten) {
      // Refresh the facts the feed owns (a corrected date, a venue added
      // later). Once an editor has rewritten the row, the importer stops
      // touching it so moderation is never silently overwritten.
      await prisma.eventItem.update({
        where: { id: existing.id },
        data: {
          sourceUrl: raw.sourceUrl,
          startsAt: raw.startsAt,
          endsAt: raw.endsAt,
          timeKnown: raw.timeKnown,
          venue: raw.venue as never,
        },
      });
    } else {
      await prisma.eventItem.update({
        where: { id: existing.id },
        data: { sourceUrl: raw.sourceUrl },
      });
    }
    imported++;
  }

  if (autoPublished > 0) {
    revalidateTag(TAG_EVENTS);
    revalidatePath("/events");
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
  }

  const retiredEvents = await retirePastEvents();
  const purged = await purgeExpiredData();

  // The import refreshed event rows and the purge deleted some, so neither
  // cached read is trustworthy any more.
  revalidateTag(TAG_EVENTS);
  revalidateTag(TAG_PLACES);

  return NextResponse.json({
    ok: true,
    sources: sources.length,
    imported,
    autoPublished,
    retiredEvents,
    purged,
  });
}

/**
 * Take finished events off the site.
 *
 * A page for something that already happened is worse than no page: the
 * visitor reads the date, realises they missed it, and leaves. Two had been
 * sitting published for days before anyone noticed, because nothing was
 * watching.
 *
 * Draft rather than deleted — the row is the record that it happened, and an
 * admin looking back still wants it.
 */
async function retirePastEvents(): Promise<number> {
  // A full day of grace. Events imported with only a date get a start time
  // padded to midnight, so "past" at 04:00 would retire something happening
  // that very evening.
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const finished = await prisma.eventItem.findMany({
    where: {
      status: "PUBLISHED",
      OR: [
        { endsAt: { not: null, lt: cutoff } },
        { endsAt: null, startsAt: { lt: cutoff } },
      ],
    },
    select: { id: true, slug: true },
  });
  if (finished.length === 0) return 0;

  await prisma.eventItem.updateMany({
    where: { id: { in: finished.map((e) => e.id) } },
    data: { status: "DRAFT" },
  });

  revalidateTag(TAG_EVENTS);
  revalidatePath("/events");
  for (const e of finished) revalidatePath(`/events/${e.slug}`);
  revalidatePath("/sitemap.xml");

  return finished.length;
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
  const [places, events, views, codes] = await Promise.all([
    prisma.place.deleteMany({
      where: { status: "REJECTED", updatedAt: { lt: rejectedBefore } },
    }),
    prisma.eventItem.deleteMany({
      where: { status: "REJECTED", updatedAt: { lt: rejectedBefore } },
    }),
    prisma.listingView.deleteMany({ where: { day: { lt: viewsBefore } } }),
    // Abandoned registrations. The row holds an address someone typed and a
    // hash worth attacking, and once the code has expired it is good for
    // nothing else.
    prisma.emailVerification.deleteMany({ where: { expiresAt: { lt: new Date() } } }),
  ]);

  return {
    rejectedPlaces: places.count,
    rejectedEvents: events.count,
    oldViewRows: views.count,
    expiredCodes: codes.count,
  };
}

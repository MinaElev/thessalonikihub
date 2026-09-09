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
    await prisma.eventItem.upsert({
      where: { externalId: data.externalId },
      update: { sourceUrl: data.sourceUrl, updatedAt: new Date() },
      create: data as never,
    });
    imported++;
  }

  return NextResponse.json({ ok: true, sources: sources.length, imported });
}

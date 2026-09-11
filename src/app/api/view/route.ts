import { NextResponse } from "next/server";
import { prisma, isDbConfigured } from "@/lib/db";
import { athensDayStart } from "@/lib/athens-time";

/**
 * Records what a visitor did with a listing: opened it, or took one of the
 * contact routes on it.
 *
 * Deliberately thin. The request body carries a pillar, a slug and an action
 * name, and nothing else; no IP, user agent, referrer or identifier of any kind
 * is written. What lands in the database is a single integer per listing per
 * action per day, which is enough to tell an owner their page is being read and
 * acted on, and not enough to say anything about who did it.
 */

/** Only the pillars that have owned, public listing pages. */
const KINDS = new Set([
  "stay",
  "eat",
  "drink",
  "discover",
  "experiences",
  "services",
  "events",
]);

/** "view" is opening the page; the rest are ways of reaching the business. */
const ACTIONS = new Set([
  "view",
  "phone",
  "whatsapp",
  "email",
  "website",
  "booking",
  "directions",
]);

/** Slugs this project generates are lowercase latin, digits and hyphens. */
const SLUG = /^[a-z0-9](?:[a-z0-9-]{0,118}[a-z0-9])?$/;

/**
 * Crawlers would otherwise dominate the numbers on a site with little human
 * traffic yet, which is the opposite of useful. This misses plenty — it is a
 * coarse filter for honest bots, not an anti-fraud measure.
 */
const BOT = /bot|crawl|spider|slurp|headless|lighthouse|preview|monitor|curl|wget|fetch/i;

export async function POST(request: Request) {
  if (!isDbConfigured) return new NextResponse(null, { status: 204 });

  if (BOT.test(request.headers.get("user-agent") ?? "")) {
    return new NextResponse(null, { status: 204 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const { kind, slug, action = "view" } = (body ?? {}) as Record<string, unknown>;

  if (typeof kind !== "string" || typeof slug !== "string" || typeof action !== "string") {
    return new NextResponse(null, { status: 204 });
  }
  if (!KINDS.has(kind) || !ACTIONS.has(action) || !SLUG.test(slug)) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    const day = athensDayStart();
    await prisma.listingView.upsert({
      where: { kind_slug_day_action: { kind, slug, day, action } },
      create: { kind, slug, day, action, count: 1 },
      update: { count: { increment: 1 } },
    });
  } catch (e) {
    // A counter is never worth failing a page view over.
    console.error("view count failed:", e);
  }

  return new NextResponse(null, { status: 204 });
}

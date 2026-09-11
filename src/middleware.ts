import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { site } from "./lib/site";

const intlMiddleware = createMiddleware(routing);

/** The one hostname every canonical, the sitemap and robots.txt point at. */
const CANONICAL_HOST = new URL(site.url).host;

/**
 * Hostnames that serve the same site but must not be indexed as separate ones:
 * the www twin, and Vercel's own project URL.
 *
 * Preview deployments get their own *.vercel.app hostnames and are deliberately
 * left alone — redirecting those to production would make every preview show
 * the live site instead of the branch being reviewed.
 */
const ALIAS_HOSTS = new Set([
  `www.${site.domain}`,
  "thessalonikihub.vercel.app",
]);

/**
 * Send alias hostnames to the canonical one.
 *
 * Every canonical tag, the sitemap, robots.txt and all internal links already
 * name the apex, so a crawler following the site never meets this redirect; it
 * exists for someone who types "www." by hand, and so the same pages cannot be
 * indexed under three hostnames. A canonical tag alone is only a hint, and the
 * .vercel.app URL is otherwise fully crawlable.
 */
export default function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (ALIAS_HOSTS.has(host) && host !== CANONICAL_HOST) {
    const url = new URL(request.url);
    url.host = CANONICAL_HOST;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - /auth/* — the Supabase redirect target. It is a route handler outside
  //   the [locale] segment, so letting the i18n middleware rewrite it sent
  //   every sign-in to a 404.
  // - Next.js internals (_next)
  // - static files (with a dot, e.g. favicon.ico, robots.txt, images)
  matcher: ["/((?!api|auth|_next|_vercel|.*\\..*).*)"],
};

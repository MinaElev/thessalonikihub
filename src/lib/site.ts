import type { Pillar } from "@/lib/types";
import type { Locale } from "@/i18n/routing";

const DEFAULT_SITE_URL = "https://thessalonikihub.gr";

/**
 * Canonical origin, resolved defensively.
 *
 * `metadataBase` feeds this straight into `new URL()`, so a bad value takes the
 * whole build down with "Invalid URL". A hosting dashboard can easily leave the
 * variable defined but empty, and `??` does not catch an empty string — so
 * trim, require a protocol, and verify it parses before trusting it.
 */
function resolveSiteUrl(raw: string | undefined): string {
  const value = raw?.trim();
  if (!value) return DEFAULT_SITE_URL;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    new URL(withProtocol);
  } catch {
    return DEFAULT_SITE_URL;
  }
  return withProtocol.replace(/\/$/, "");
}

/** Global site configuration. */
export const site = {
  name: "ThessalonikiHub",
  domain: "thessalonikihub.gr",
  /** Canonical origin; override in production via NEXT_PUBLIC_SITE_URL. */
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  defaultLocale: "el" as Locale,
  locales: ["el", "en"] as Locale[],
  twitter: "@thessalonikihub",
};

/** Pillar → URL prefix + labels. Drives navigation and breadcrumbs. */
export const pillars: Record<
  Pillar,
  { href: string; label: Record<Locale, string> }
> = {
  stay: { href: "/stay", label: { el: "Διαμονή", en: "Stay" } },
  eat: { href: "/eat", label: { el: "Φαγητό", en: "Eat" } },
  drink: { href: "/drink", label: { el: "Ποτό", en: "Drink" } },
  discover: { href: "/discover", label: { el: "Ανακαλύψτε", en: "Discover" } },
  events: { href: "/events", label: { el: "Events", en: "Events" } },
  experiences: {
    href: "/experiences",
    label: { el: "Εμπειρίες", en: "Experiences" },
  },
  services: {
    href: "/services",
    label: { el: "Υπηρεσίες", en: "Services" },
  },
};

/** Absolute URL for a locale + in-app path (path starts with "/"). */
export function absoluteUrl(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === site.defaultLocale
    ? `${site.url}${clean}`
    : `${site.url}/${locale}${clean}`;
}

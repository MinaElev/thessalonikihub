import type { Pillar } from "@/lib/types";
import type { Locale } from "@/i18n/routing";

/** Global site configuration. */
export const site = {
  name: "ThessalonikiHub",
  domain: "thessalonikihub.gr",
  /** Canonical origin; override in production via NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://thessalonikihub.gr").replace(
    /\/$/,
    "",
  ),
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

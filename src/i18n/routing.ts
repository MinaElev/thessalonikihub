import { defineRouting } from "next-intl/routing";

/**
 * Locale configuration for ThessalonikiHub.
 *
 * Greek is the default locale and is served without a URL prefix (e.g. `/stay`).
 * English is served under `/en` (e.g. `/en/stay`).
 *
 * Additional languages from the roadmap (de, fr, it, ro, bg, sr, tr) are added
 * here once their content is professionally localized — never machine-translated
 * without quality control.
 */
export const routing = defineRouting({
  locales: ["el", "en"],
  defaultLocale: "el",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;

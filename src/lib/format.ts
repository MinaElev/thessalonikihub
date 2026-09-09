import type { Locale } from "@/i18n/routing";

const intlLocale: Record<Locale, string> = { el: "el-GR", en: "en-GB" };

export function formatDistance(meters: number, locale: Locale): string {
  if (meters < 1000) {
    return `${Math.round(meters / 10) * 10} ${locale === "el" ? "μ." : "m"}`;
  }
  const km = (meters / 1000).toFixed(1);
  return `${km} ${locale === "el" ? "χλμ." : "km"}`;
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatEventWhen(
  startsAt: string,
  endsAt: string | undefined,
  locale: Locale,
): string {
  const start = new Date(startsAt);
  const dateFmt = new Intl.DateTimeFormat(intlLocale[locale], {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const timeFmt = new Intl.DateTimeFormat(intlLocale[locale], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const base = `${dateFmt.format(start)}, ${timeFmt.format(start)}`;
  if (!endsAt) return base;
  const end = new Date(endsAt);
  const sameDay = start.toDateString() === end.toDateString();
  return sameDay ? base : `${dateFmt.format(start)} – ${dateFmt.format(end)}`;
}

export function priceRangeLabel(range?: 1 | 2 | 3 | 4): string {
  return range ? "€".repeat(range) : "";
}

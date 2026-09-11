import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/types";

/**
 * Human wording for the enum values the moderation flow stores.
 *
 * These used to be rendered raw, so a Greek-speaking owner saw "PENDING" and
 * "EAT" on their own dashboard and had to guess. The database keeps the enums;
 * only the display changes.
 */

export type ListingStatusValue = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";

const STATUS: Record<ListingStatusValue, Localized<string>> = {
  DRAFT: { el: "Πρόχειρο", en: "Draft" },
  PENDING: { el: "Σε έλεγχο", en: "In review" },
  PUBLISHED: { el: "Δημοσιευμένη", en: "Published" },
  REJECTED: { el: "Απορρίφθηκε", en: "Rejected" },
};

/** What the owner should understand is happening, and whether they must act. */
const STATUS_HINT: Record<ListingStatusValue, Localized<string>> = {
  DRAFT: {
    el: "Δεν έχει υποβληθεί ακόμη.",
    en: "Not submitted yet.",
  },
  PENDING: {
    el: "Την ελέγχουμε. Δεν χρειάζεται να κάνεις κάτι.",
    en: "We are reviewing it. Nothing for you to do.",
  },
  PUBLISHED: {
    el: "Είναι ζωντανή στο site.",
    en: "It is live on the site.",
  },
  REJECTED: {
    el: "Διόρθωσε τα σημεία που σου επισημάναμε και υπέβαλε ξανά.",
    en: "Fix the points we flagged and submit again.",
  },
};

export const statusTone: Record<ListingStatusValue, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  PENDING: "bg-amber-100 text-amber-800",
  PUBLISHED: "bg-brand-50 text-brand-700",
  REJECTED: "bg-rose-100 text-rose-700",
};

export function statusLabel(status: string, locale: Locale): string {
  const entry = STATUS[status as ListingStatusValue];
  return entry ? (locale === "el" ? entry.el : (entry.en ?? entry.el)) : status;
}

export function statusHint(status: string, locale: Locale): string | null {
  const entry = STATUS_HINT[status as ListingStatusValue];
  if (!entry) return null;
  return locale === "el" ? entry.el : (entry.en ?? entry.el);
}

const KIND: Record<string, Localized<string>> = {
  STAY: { el: "Διαμονή", en: "Stay" },
  EAT: { el: "Φαγητό", en: "Eat" },
  DRINK: { el: "Ποτό", en: "Drink" },
  DISCOVER: { el: "Αξιοθέατο", en: "Discover" },
  EXPERIENCES: { el: "Εμπειρία", en: "Experience" },
  SERVICES: { el: "Υπηρεσία", en: "Service" },
  EVENTS: { el: "Εκδήλωση", en: "Event" },
};

export function kindLabel(kind: string, locale: Locale): string {
  const entry = KIND[kind.toUpperCase()];
  return entry ? (locale === "el" ? entry.el : (entry.en ?? entry.el)) : kind;
}

/** Where a published listing actually lives, so the owner can go look at it. */
export function publicHref(kind: string, slug: string): string {
  return kind.toUpperCase() === "EVENTS"
    ? `/events/${slug}`
    : `/${kind.toLowerCase()}/${slug}`;
}

/** Where its owner edits it — events and places have separate editors. */
export function editHref(kind: string, slug: string): string {
  return kind.toUpperCase() === "EVENTS"
    ? `/dashboard/edit/event/${slug}`
    : `/dashboard/edit/${slug}`;
}

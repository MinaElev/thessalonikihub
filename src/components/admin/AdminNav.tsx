"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { LayoutDashboard, List, Users, FileText, DownloadCloud, History } from "lucide-react";
import type { Locale } from "@/i18n/routing";

/**
 * The panel's own navigation.
 *
 * A client component only because the current section has to be highlighted,
 * and `usePathname` is the one piece of that which needs the browser. The
 * counts are passed in from the server so the badge cannot drift from the
 * queue it describes.
 */
export interface AdminNavCounts {
  pending: number;
}

const ICONS = {
  overview: LayoutDashboard,
  listings: List,
  people: Users,
  content: FileText,
  import: DownloadCloud,
  activity: History,
} as const;

export function AdminNav({
  locale,
  counts,
}: {
  locale: Locale;
  counts: AdminNavCounts;
}) {
  const pathname = usePathname();
  const tt = (el: string, en: string) => (locale === "el" ? el : en);

  const items = [
    { key: "overview", href: "/admin", label: tt("Επισκόπηση", "Overview") },
    {
      key: "listings",
      href: "/admin/listings",
      label: tt("Καταχωρήσεις", "Listings"),
      badge: counts.pending || undefined,
    },
    { key: "people", href: "/admin/people", label: tt("Χρήστες", "People") },
    { key: "content", href: "/admin/content", label: tt("Περιεχόμενο", "Content") },
    { key: "import", href: "/admin/import", label: tt("Εισαγωγή", "Import") },
    { key: "activity", href: "/admin/activity", label: tt("Ιστορικό", "Activity") },
  ] as const;

  // The locale prefix is on the pathname but not on the hrefs, so compare the
  // tail. Longest match wins, or /admin would light up on every page.
  const active = items.reduce((best, item) => {
    const hit = pathname === item.href || pathname.endsWith(item.href);
    if (!hit) return best;
    return !best || item.href.length > best.length ? item.href : best;
  }, "" as string);

  return (
    <nav className="mb-8 flex flex-wrap gap-1 border-b border-slate-200 pb-px">
      {items.map((item) => {
        const Icon = ICONS[item.key];
        const isActive = active === item.href;
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`-mb-px inline-flex items-center gap-2 rounded-t-lg border-b-2 px-4 py-2.5 text-sm font-semibold transition ${
              isActive
                ? "border-brand-600 text-brand-700"
                : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
            {"badge" in item && item.badge ? (
              <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-800">
                {item.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

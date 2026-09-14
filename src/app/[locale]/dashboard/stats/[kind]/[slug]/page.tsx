import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ArrowLeft, BarChart3, Eye, LogIn } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/types";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { TrendChart } from "@/components/admin/TrendChart";
import { getCurrentUser } from "@/lib/auth";
import { prisma, isDbConfigured } from "@/lib/db";
import { getListingStats, getListingSeries, viewKey, emptyStats } from "@/lib/views";
import { actionLabel, kindLabel, publicHref } from "@/lib/listing-labels";

/**
 * One listing's own figures, over time.
 *
 * The dashboard shows a month's totals beside each listing; this is the page
 * behind them. It exists to be shown to the business — "this is what the page
 * did for you last month" is the argument for a paid tier, and a single number
 * on a list is not an argument.
 */
export const dynamic = "force-dynamic";

export default async function ListingStatsPage({
  params,
}: {
  params: Promise<{ locale: Locale; kind: string; slug: string }>;
}) {
  const { locale, kind, slug } = await params;
  setRequestLocale(locale);
  const tt = (el: string, en: string) => (locale === "el" ? el : en);
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Container className="py-16 text-center">
        <LogIn className="mx-auto h-10 w-10 text-brand-600" />
        <p className="mt-3 text-lg">
          {tt("Συνδέσου για να δεις τα στατιστικά.", "Sign in to see the statistics.")}
        </p>
        <Link
          href={`/login?next=${encodeURIComponent(`/dashboard/stats/${kind}/${slug}`)}`}
          className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
        >
          {tt("Σύνδεση", "Sign in")}
        </Link>
      </Container>
    );
  }

  if (!isDbConfigured) notFound();

  const isEvent = kind.toUpperCase() === "EVENTS";
  const row = isEvent
    ? await prisma.eventItem.findUnique({
        where: { slug },
        select: { name: true, ownerId: true },
      })
    : await prisma.place.findUnique({
        where: { slug },
        select: { name: true, ownerId: true },
      });
  if (!row) notFound();

  // Numbers about a business belong to that business and to us, nobody else.
  if (row.ownerId !== user.id && user.role !== "ADMIN") {
    return (
      <Container className="py-16 text-center">
        <p className="text-muted">
          {tt(
            "Δεν έχεις δικαίωμα να δεις αυτά τα στατιστικά.",
            "You do not have permission to see these statistics.",
          )}
        </p>
      </Container>
    );
  }

  const [statsMap, series] = await Promise.all([
    getListingStats([{ kind, slug }], 30),
    getListingSeries(kind, slug, 30),
  ]);
  const stats = statsMap.get(viewKey(kind, slug)) ?? emptyStats();
  const routes = Object.entries(stats.byAction).sort((a, b) => b[1] - a[1]);
  const rate = stats.views ? Math.round((stats.contacts / stats.views) * 100) : null;

  return (
    <Container className="py-8">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
      >
        <ArrowLeft className="h-4 w-4" /> {tt("Πίσω στον πίνακα", "Back to dashboard")}
      </Link>

      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          {kindLabel(kind, locale)}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold">
          {pick(row.name as Localized<string>, locale)}
        </h1>
        <Link
          href={publicHref(kind, slug)}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
        >
          <Eye className="h-4 w-4" /> {tt("Δες τη σελίδα", "View the page")}
        </Link>
      </header>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {tt("Προβολές", "Views")}
          </p>
          <p className="mt-1 text-3xl font-extrabold tabular-nums">{stats.views}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {tt("Επικοινωνίες", "Contacts")}
          </p>
          <p className="mt-1 text-3xl font-extrabold tabular-nums text-brand-700">
            {stats.contacts}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {tt("Κοινοποιήσεις", "Shares")}
          </p>
          <p className="mt-1 text-3xl font-extrabold tabular-nums">{stats.shares}</p>
          <p className="mt-0.5 text-xs text-muted">
            {tt("φορές που στάλθηκε η σελίδα", "times the page was passed on")}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {tt("Ποσοστό επικοινωνίας", "Contact rate")}
          </p>
          <p className="mt-1 text-3xl font-extrabold tabular-nums">
            {rate === null ? "—" : `${rate}%`}
          </p>
        </div>
      </div>

      <TrendChart
        data={series}
        labels={{
          views: tt("Προβολές", "Views"),
          contacts: tt("Επικοινωνίες", "Contacts"),
          empty: tt(
            "Καμία κίνηση στις τελευταίες 30 ημέρες.",
            "No traffic in the last 30 days.",
          ),
        }}
      />

      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
          <BarChart3 className="h-5 w-5 text-brand-600" />
          {tt("Πώς επικοινώνησαν", "How people got in touch")}
        </h2>
        {routes.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-muted">
            {tt(
              "Κανείς δεν έχει πατήσει ακόμα κουμπί επικοινωνίας.",
              "Nobody has pressed a contact button yet.",
            )}
          </p>
        ) : (
          <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-100">
            {routes.map(([action, count]) => (
              <li key={action} className="flex items-center justify-between gap-4 p-3.5">
                <span className="text-sm font-medium">{actionLabel(action, locale)}</span>
                <span className="text-lg font-bold tabular-nums">{count}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-6 max-w-prose text-xs text-muted">
        {tt(
          "Μετράμε ένα άνοιγμα σελίδας ανά επισκέπτη και ένα πάτημα ανά κουμπί, χωρίς cookie και χωρίς αναγνωριστικό. Τα νούμερα δείχνουν πόσοι, όχι ποιοι.",
          "We count one page open per visitor and one press per button, with no cookie and no identifier. The figures say how many, never who.",
        )}
      </p>
    </Container>
  );
}

import { setRequestLocale } from "next-intl/server";
import {
  Check,
  X,
  EyeOff,
  BadgeCheck,
  Pencil,
  CalendarClock,
  BarChart3,
  Mail,
  Database,
  Inbox,
  Wrench,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/types";
import { pick } from "@/lib/types";
import { prisma, isDbConfigured } from "@/lib/db";
import { approveListing, rejectListing } from "@/app/actions/moderate";
import { approveClaim, rejectClaim } from "@/app/actions/claim";
import { kindLabel, editHref, publicHref } from "@/lib/listing-labels";
import { getTopViewed, getSiteTotals } from "@/lib/views";
import { getDatabaseInventory, getFileContentInventory } from "@/lib/admin-inventory";
import { getContentGaps, getDailySeries } from "@/lib/admin-gaps";
import { TrendChart } from "@/components/admin/TrendChart";
import { isMailConfigured } from "@/lib/email";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tt = (el: string, en: string) => (locale === "el" ? el : en);

  const [places, events, claims] = isDbConfigured
    ? await Promise.all([
        prisma.place.findMany({ where: { status: "PENDING" }, orderBy: { createdAt: "asc" } }),
        prisma.eventItem.findMany({ where: { status: "PENDING" }, orderBy: { createdAt: "asc" } }),
        prisma.claim.findMany({
          where: { status: "PENDING" },
          orderBy: { createdAt: "asc" },
          include: { user: { select: { email: true } } },
        }),
      ])
    : [[], [], []];

  const [topViewed, totals, inventory, gaps, series] = await Promise.all([
    getTopViewed(30, 8),
    getSiteTotals(30),
    getDatabaseInventory(),
    getContentGaps(),
    getDailySeries(30),
  ]);
  const fileContent = getFileContentInventory();
  const fileTotal = fileContent.reduce((a, g) => a + g.count, 0);

  const rows = [
    ...places.map((p) => ({
      id: p.id,
      kind: "place",
      entity: p.kind as string,
      name: p.name as Localized<string>,
      summary: p.summary as Localized<string>,
      slug: p.slug as string,
      startsAt: null as Date | null,
      textRewritten: true,
    })),
    ...events.map((e) => ({
      id: e.id,
      kind: "event",
      entity: "EVENTS",
      name: e.name as Localized<string>,
      summary: e.summary as Localized<string>,
      slug: e.slug as string,
      startsAt: e.startsAt,
      textRewritten: e.textRewritten,
    })),
  ];

  const GAP_LABEL: Record<string, [string, string]> = {
    placesNoHours: [
      "καταχωρήσεις δεν λένε πότε είναι ανοιχτές",
      "listings do not say when they are open",
    ],
    eventsNoText: [
      "εκδηλώσεις κρατούν το κείμενο της πηγής, άρα μένουν εκτός Google",
      "events still carry source text, so they stay out of Google",
    ],
    placesNoPhoto: ["καταχωρήσεις χωρίς φωτογραφία", "listings with no photograph"],
    placesNoContact: [
      "καταχωρήσεις χωρίς κανέναν τρόπο επικοινωνίας",
      "listings with no way to make contact",
    ],
    eventsNoPhoto: [
      "εκδηλώσεις χωρίς δική τους φωτογραφία",
      "events with no photograph of their own",
    ],
    eventsNoGeo: [
      "εκδηλώσεις χωρίς συντεταγμένες, δεν μπαίνουν σε χάρτη",
      "events with no coordinates, so they cannot appear on a map",
    ],
    placesNoOwner: [
      "καταχωρήσεις χωρίς ιδιοκτήτη να τις συντηρεί",
      "listings with no owner keeping them up to date",
    ],
  };

  const CONTENT_LABEL: Record<string, [string, string]> = {
    guides: ["Οδηγοί", "Guides"],
    areas: ["Περιοχές", "Areas"],
    routes: ["Διαδρομές", "Routes"],
    dishes: ["Πιάτα", "Dishes"],
    metro: ["Στάσεις μετρό", "Metro stations"],
    dayTrips: ["Εκδρομές", "Day trips"],
    months: ["Μήνες", "Months"],
    collections: ["Συλλογές", "Collections"],
    audiences: ["Κοινά", "Audiences"],
    festivals: ["Φεστιβάλ", "Festivals"],
    pages: ["Σελίδες", "Pages"],
  };

  /** One line of a status breakdown, hiding the zeros that say nothing. */
  const breakdown = (parts: [number, string][]) =>
    parts
      .filter(([n]) => n > 0)
      .map(([n, label]) => `${n} ${label}`)
      .join(" · ") || tt("καμία", "none");

  return (
    <div>
      {/* Health first: every one of these fails silently, so the panel has to
          say out loud whether the machinery behind it is actually running. */}
      <section className="mb-10 grid gap-3 sm:grid-cols-3">
        <p
          className={`flex items-center gap-2 rounded-xl border p-3 text-sm ${
            isDbConfigured
              ? "border-brand-200 bg-brand-50/50 text-brand-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          <Database className="h-4 w-4 shrink-0" />
          {isDbConfigured
            ? tt("Βάση δεδομένων συνδεδεμένη", "Database connected")
            : tt("Η βάση δεν έχει συνδεθεί", "Database not connected")}
        </p>
        <p
          className={`flex items-center gap-2 rounded-xl border p-3 text-sm ${
            isMailConfigured
              ? "border-brand-200 bg-brand-50/50 text-brand-800"
              : "border-amber-200 bg-amber-50 text-amber-900"
          }`}
        >
          <Mail className="h-4 w-4 shrink-0" />
          {isMailConfigured
            ? tt("Τα email στέλνονται", "Email is sending")
            : tt("Τα email δεν στέλνονται", "Email is not sending")}
        </p>
        <Link
          href="/admin/listings?status=PENDING"
          className={`flex items-center gap-2 rounded-xl border p-3 text-sm transition ${
            rows.length + claims.length
              ? "border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Inbox className="h-4 w-4 shrink-0" />
          {rows.length + claims.length
            ? tt(
                `${rows.length + claims.length} εκκρεμότητες`,
                `${rows.length + claims.length} pending`,
              )
            : tt("Καμία εκκρεμότητα", "Nothing pending")}
        </Link>
      </section>

      {/* Published but unindexable is the one failure that looks like success
          everywhere else: the status says live, and Google has never seen it. */}
      {inventory.eventsAwaitingRewrite ? (
        <Link
          href="/admin/listings?kind=EVENTS&needs=rewrite"
          className="mb-10 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 transition hover:bg-amber-100"
        >
          <EyeOff className="h-5 w-5 shrink-0 text-amber-700" />
          <span className="min-w-0">
            <span className="block font-semibold text-amber-900">
              {tt(
                `${inventory.eventsAwaitingRewrite} δημοσιευμένες εκδηλώσεις δεν φαίνονται στη Google`,
                `${inventory.eventsAwaitingRewrite} published events are invisible to Google`,
              )}
            </span>
            <span className="mt-0.5 block text-sm text-amber-800">
              {tt(
                "Κρατούν ακόμα το κείμενο της πηγής, οπότε μένουν noindex και εκτός sitemap. Ξαναγράψε το κείμενο και τσέκαρε την ευρετηρίαση στον editor.",
                "They still carry the source feed's wording, so they stay noindex and out of the sitemap. Rewrite the text and tick indexing in the editor.",
              )}
            </span>
          </span>
          <span className="ml-auto whitespace-nowrap font-semibold text-amber-900">
            {tt("Δες τες →", "Show them →")}
          </span>
        </Link>
      ) : null}

      {/* What is published but incomplete. The panel could say what exists
          and what was waiting; it could not say what was wrong. */}
      {gaps.length ? (
        <section className="mb-12">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <Wrench className="h-5 w-5 text-accent-600" />
            {tt("Τι λείπει", "What is missing")}
          </h2>
          <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-100">
            {gaps.map((g) => (
              <li key={g.key}>
                <Link
                  href={g.href}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 p-3.5 transition hover:bg-slate-50"
                >
                  <span
                    className={`text-lg font-extrabold tabular-nums ${
                      g.severity === "high" ? "text-accent-700" : "text-slate-700"
                    }`}
                  >
                    {g.count}
                  </span>
                  <span className="min-w-0 flex-1 text-sm text-slate-700">
                    {locale === "el" ? GAP_LABEL[g.key]?.[0] : GAP_LABEL[g.key]?.[1]}
                  </span>
                  <span className="text-sm font-semibold text-brand-700">
                    {tt("Δες →", "Show →")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* The whole platform, counted. */}
      <section className="mb-12">
        <h2 className="mb-3 text-xl font-bold">{tt("Τι υπάρχει", "What exists")}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/admin/listings?kind=EVENTS"
            className="rounded-2xl border border-slate-100 p-4 transition hover:border-brand-200 hover:shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {tt("Εκδηλώσεις", "Events")}
            </p>
            <p className="mt-1 text-3xl font-extrabold tabular-nums">{inventory.events.total}</p>
            <p className="mt-0.5 text-xs text-muted">
              {breakdown([
                [inventory.events.published, tt("δημοσιευμένες", "published")],
                [inventory.events.pending, tt("σε έλεγχο", "in review")],
                [inventory.events.rejected, tt("απορριφθείσες", "rejected")],
              ])}
            </p>
          </Link>

          <Link
            href="/admin/listings"
            className="rounded-2xl border border-slate-100 p-4 transition hover:border-brand-200 hover:shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {tt("Καταχωρήσεις", "Listings")}
            </p>
            {/* What the site serves, which is the database rows plus the
                listings that still live only in a content file. Counting rows
                alone under-reported every business added by hand. */}
            <p className="mt-1 text-3xl font-extrabold tabular-nums">
              {inventory.places.published + inventory.fileOnlyPlaces}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {breakdown([
                [inventory.fileOnlyPlaces, tt("από αρχείο", "from files")],
                [inventory.places.published, tt("στη βάση", "in the database")],
                [inventory.places.pending, tt("σε έλεγχο", "in review")],
                [inventory.places.rejected, tt("απορριφθείσες", "rejected")],
              ])}
            </p>
          </Link>

          <Link
            href="/admin/people"
            className="rounded-2xl border border-slate-100 p-4 transition hover:border-brand-200 hover:shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {tt("Λογαριασμοί", "Accounts")}
            </p>
            <p className="mt-1 text-3xl font-extrabold tabular-nums">{inventory.people.total}</p>
            <p className="mt-0.5 text-xs text-muted">
              {breakdown([
                [inventory.people.admins, tt("διαχειριστές", "admins")],
                [inventory.people.owners, tt("ιδιοκτήτες", "owners")],
                [inventory.people.users, tt("επισκέπτες", "visitors")],
              ])}
            </p>
          </Link>

          <Link
            href="/admin/people"
            className="rounded-2xl border border-slate-100 p-4 transition hover:border-brand-200 hover:shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">Newsletter</p>
            <p className="mt-1 text-3xl font-extrabold tabular-nums">
              {inventory.subscribers.total}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {breakdown([
                [inventory.subscribers.confirmed, tt("επιβεβαιωμένα", "confirmed")],
                [inventory.subscribers.unsubscribed, tt("διαγραφές", "unsubscribed")],
              ])}
            </p>
          </Link>

          <div className="rounded-2xl border border-slate-100 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {tt("Αιτήματα ιδιοκτησίας", "Ownership claims")}
            </p>
            <p className="mt-1 text-3xl font-extrabold tabular-nums">
              {inventory.claims.pending + inventory.claims.approved + inventory.claims.rejected}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {breakdown([
                [inventory.claims.pending, tt("σε αναμονή", "pending")],
                [inventory.claims.approved, tt("εγκεκριμένα", "approved")],
                [inventory.claims.rejected, tt("απορριφθέντα", "rejected")],
              ])}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {tt("Αποθηκευμένα από επισκέπτες", "Saved by visitors")}
            </p>
            <p className="mt-1 text-3xl font-extrabold tabular-nums">{inventory.savedItems}</p>
            <p className="mt-0.5 text-xs text-muted">
              {tt("σε προσωπικές λίστες", "in personal lists")}
            </p>
          </div>

          <Link
            href="/admin/content"
            className="rounded-2xl border border-slate-100 p-4 transition hover:border-brand-200 hover:shadow-sm sm:col-span-2"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {tt("Συντακτικό περιεχόμενο", "Editorial content")}
            </p>
            <p className="mt-1 text-3xl font-extrabold tabular-nums">{fileTotal}</p>
            <p className="mt-0.5 text-xs text-muted">
              {fileContent
                .slice(0, 5)
                .map(
                  (g) =>
                    `${g.count} ${
                      locale === "el"
                        ? (CONTENT_LABEL[g.key]?.[0] ?? g.key).toLowerCase()
                        : (CONTENT_LABEL[g.key]?.[1] ?? g.key).toLowerCase()
                    }`,
                )
                .join(" · ")}
              {" · "}
              {tt("και άλλα →", "and more →")}
            </p>
          </Link>
        </div>
      </section>

      {/* Traffic. */}
      {totals.views || totals.contacts ? (
        <section className="mb-12">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <BarChart3 className="h-5 w-5 text-brand-600" />
            {tt("Κίνηση, 30 ημέρες", "Traffic, 30 days")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {tt("Προβολές", "Views")}
              </p>
              <p className="mt-1 text-3xl font-extrabold tabular-nums">{totals.views}</p>
              {totals.previousViews ? (
                <p className="mt-0.5 text-xs text-muted">
                  {totals.views >= totals.previousViews ? "+" : "−"}
                  {Math.abs(totals.views - totals.previousViews)}{" "}
                  {tt("από την προηγούμενη περίοδο", "vs the period before")}
                </p>
              ) : null}
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {tt("Επικοινωνίες", "Contacts")}
              </p>
              <p className="mt-1 text-3xl font-extrabold tabular-nums text-brand-700">
                {totals.contacts}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {tt("τηλέφωνο, κράτηση, site, οδηγίες", "phone, booking, site, directions")}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {tt("Ποσοστό επικοινωνίας", "Contact rate")}
              </p>
              <p className="mt-1 text-3xl font-extrabold tabular-nums">
                {totals.views ? `${Math.round((totals.contacts / totals.views) * 100)}%` : "—"}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {tt("από όσους άνοιξαν καταχώρηση", "of everyone who opened a listing")}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <TrendChart
              data={series}
              labels={{
                views: tt("Προβολές", "Views"),
                contacts: tt("Επικοινωνίες", "Contacts"),
                empty: tt(
                  "Καμία κίνηση ακόμα. Το γράφημα γεμίζει μόλις αρχίσουν οι επισκέψεις.",
                  "No traffic yet. The chart fills in once visits start.",
                ),
              }}
            />
          </div>

          {topViewed.length ? (
            <ul className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-100">
              {topViewed.map((t) => (
                <li
                  key={`${t.kind}-${t.slug}`}
                  className="flex items-center justify-between gap-4 p-3"
                >
                  <Link
                    href={publicHref(t.kind, t.slug)}
                    className="min-w-0 truncate text-sm font-semibold text-brand-700 hover:underline"
                  >
                    /{t.kind}/{t.slug}
                  </Link>
                  <span className="shrink-0 text-sm tabular-nums">
                    <span className="font-bold">{t.views}</span>
                    <span className="text-muted"> {tt("προβολές", "views")}</span>
                    {t.contacts ? (
                      <span className="ml-2 font-semibold text-brand-700">
                        {t.contacts} {tt("επαφές", "contacts")}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      {/* The queue. */}
      <section>
        <h2 className="mb-3 text-xl font-bold">
          {tt("Προς έλεγχο", "Awaiting review")}
        </h2>

        {claims.length ? (
          <div className="mb-8">
            <h3 className="mb-3 flex items-center gap-2 font-bold">
              <BadgeCheck className="h-5 w-5 text-brand-600" />
              {tt("Αιτήματα ιδιοκτησίας", "Ownership requests")}
            </h3>
            <ul className="space-y-3">
              {claims.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-brand-200 bg-brand-50/40 p-4"
                >
                  <div className="min-w-0">
                    <p className="font-semibold">
                      {c.placeName}{" "}
                      <span className="ml-1 rounded bg-white px-1.5 py-0.5 text-xs font-normal text-slate-500">
                        /{c.placeKind}/{c.placeSlug}
                      </span>
                    </p>
                    <p className="text-sm text-muted">{c.user.email}</p>
                    {c.message ? (
                      <p className="mt-1 max-w-prose whitespace-pre-line text-sm text-slate-700">
                        {c.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex gap-2">
                    <form action={approveClaim}>
                      <input type="hidden" name="id" value={c.id} />
                      <button className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">
                        <Check className="h-4 w-4" /> {tt("Έγκριση", "Approve")}
                      </button>
                    </form>
                    <form action={rejectClaim}>
                      <input type="hidden" name="id" value={c.id} />
                      <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium hover:bg-slate-50">
                        <X className="h-4 w-4" /> {tt("Απόρριψη", "Reject")}
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {rows.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-muted">
            {tt("Καμία καταχώρηση σε αναμονή 🎉", "No listings waiting 🎉")}
          </p>
        ) : (
          <ul className="space-y-3">
            {rows.map((r) => (
              <li key={`${r.kind}-${r.id}`} className="rounded-2xl border border-slate-100 p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold">
                      {pick(r.name, locale)}{" "}
                      <span className="ml-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-normal text-slate-500">
                        {kindLabel(r.entity, locale)}
                      </span>
                      {!r.textRewritten ? (
                        <span className="ml-1 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-normal text-amber-800">
                          {tt("κείμενο πηγής", "source text")}
                        </span>
                      ) : null}
                    </p>
                    <p className="truncate text-sm text-muted">{pick(r.summary, locale)}</p>
                    {r.startsAt ? (
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
                        <CalendarClock className="h-3.5 w-3.5" />
                        {new Intl.DateTimeFormat(locale === "el" ? "el-GR" : "en-GB", {
                          timeZone: "Europe/Athens",
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(r.startsAt)}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={editHref(r.entity, r.slug)}
                      className="inline-flex items-center gap-1 rounded-full border border-brand-200 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                    >
                      <Pencil className="h-4 w-4" />
                      {tt("Έλεγχος / επεξεργασία", "Review / edit")}
                    </Link>
                    <form action={approveListing}>
                      <input type="hidden" name="kind" value={r.kind} />
                      <input type="hidden" name="id" value={r.id} />
                      <button className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">
                        <Check className="h-4 w-4" /> {tt("Έγκριση", "Approve")}
                      </button>
                    </form>
                  </div>
                </div>

                <details className="mt-3">
                  <summary className="inline-flex cursor-pointer items-center gap-1 text-sm font-medium text-slate-500 hover:text-accent-700">
                    <X className="h-4 w-4" /> {tt("Απόρριψη…", "Reject…")}
                  </summary>
                  <form action={rejectListing} className="mt-2 space-y-2">
                    <input type="hidden" name="kind" value={r.kind} />
                    <input type="hidden" name="id" value={r.id} />
                    <textarea
                      name="note"
                      rows={2}
                      placeholder={tt(
                        "Γιατί απορρίπτεται; Ο ιδιοκτήτης το βλέπει στον πίνακά του και το λαμβάνει με email.",
                        "Why is it rejected? The owner sees this on their dashboard and receives it by email.",
                      )}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                    />
                    <button className="inline-flex items-center gap-1 rounded-full border border-accent-200 bg-accent-50 px-3 py-1.5 text-sm font-semibold text-accent-800 hover:bg-accent-100">
                      <X className="h-4 w-4" /> {tt("Απόρριψη", "Reject")}
                    </button>
                  </form>
                </details>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

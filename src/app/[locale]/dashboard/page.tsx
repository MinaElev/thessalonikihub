import { setRequestLocale } from "next-intl/server";
import {
  LogIn,
  Plus,
  ShieldCheck,
  Pencil,
  Eye,
  AlertCircle,
  RotateCcw,
  BarChart3,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/types";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";
import { prisma, isDbConfigured } from "@/lib/db";
import { signOut } from "@/app/actions/moderate";
import { resubmitListing } from "@/app/actions/resubmit";
import { getListingStats, emptyStats, viewKey } from "@/lib/views";
import {
  statusLabel,
  statusHint,
  statusTone,
  kindLabel,
  actionLabel,
  publicHref,
  editHref,
} from "@/lib/listing-labels";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tt = (el: string, en: string) => (locale === "el" ? el : en);
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Container className="py-16 text-center">
        <LogIn className="mx-auto h-10 w-10 text-brand-600" />
        <p className="mt-3 text-lg">{tt("Συνδέσου για να δεις τις καταχωρήσεις σου.", "Sign in to see your listings.")}</p>
        <Link href="/login?next=%2Fdashboard" className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700">
          {tt("Σύνδεση", "Sign in")}
        </Link>
      </Container>
    );
  }

  const [places, events, claims] = isDbConfigured
    ? await Promise.all([
        prisma.place.findMany({ where: { ownerId: user.id }, orderBy: { createdAt: "desc" } }),
        prisma.eventItem.findMany({ where: { ownerId: user.id }, orderBy: { createdAt: "desc" } }),
        prisma.claim.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
      ])
    : [[], [], []];

  const rows = [
    ...places.map((p) => ({
      id: p.id,
      name: p.name as Localized<string>,
      status: p.status as string,
      kind: p.kind as string,
      slug: p.slug,
      rejectionNote: p.rejectionNote,
    })),
    ...events.map((e) => ({
      id: e.id,
      name: e.name as Localized<string>,
      status: e.status as string,
      kind: "EVENTS",
      slug: e.slug,
      rejectionNote: e.rejectionNote,
    })),
  ];

  // What an owner actually wants to know: is anyone reading this, and did
  // anyone get in touch because of it?
  const stats = await getListingStats(
    rows.map((r) => ({ kind: r.kind, slug: r.slug })),
    30,
  );

  // Moderation has no entry point of its own — an admin arrives here like
  // anyone else, so the queue has to announce itself or it goes unnoticed.
  const isAdmin = user.role === "ADMIN";
  const [pendingPlaces, pendingEvents, pendingClaims] =
    isAdmin && isDbConfigured
      ? await Promise.all([
          prisma.place.count({ where: { status: "PENDING" } }),
          prisma.eventItem.count({ where: { status: "PENDING" } }),
          prisma.claim.count({ where: { status: "PENDING" } }),
        ])
      : [0, 0, 0];
  const pendingTotal = pendingPlaces + pendingEvents + pendingClaims;

  return (
    <Container className="py-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">{tt("Οι καταχωρήσεις μου", "My listings")}</h1>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/saved" className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:border-brand-300 hover:text-brand-700">
            {tt("Το ταξίδι μου", "My trip")}
          </Link>
          <Link href="/submit" className="inline-flex items-center gap-1 rounded-full bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-700">
            <Plus className="h-4 w-4" /> {tt("Νέα καταχώρηση", "New listing")}
          </Link>
          <form action={signOut}>
            <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
              {tt("Αποσύνδεση", "Sign out")}
            </button>
          </form>
        </div>
      </div>

      {isAdmin ? (
        <Link
          href="/admin"
          className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-200 bg-brand-50/50 p-4 transition hover:border-brand-300 hover:bg-brand-50"
        >
          <span className="flex items-center gap-2 font-semibold text-brand-800">
            <ShieldCheck className="h-5 w-5 text-brand-600" />
            {tt("Διαχείριση", "Moderation")}
          </span>
          <span className="text-sm text-slate-700">
            {pendingTotal === 0
              ? tt("Καμία εκκρεμότητα", "Nothing pending")
              : [
                  pendingPlaces
                    ? tt(
                        `${pendingPlaces} ${pendingPlaces === 1 ? "καταχώρηση" : "καταχωρήσεις"}`,
                        `${pendingPlaces} listing${pendingPlaces === 1 ? "" : "s"}`,
                      )
                    : null,
                  pendingEvents
                    ? tt(
                        `${pendingEvents} ${pendingEvents === 1 ? "εκδήλωση" : "εκδηλώσεις"}`,
                        `${pendingEvents} event${pendingEvents === 1 ? "" : "s"}`,
                      )
                    : null,
                  pendingClaims
                    ? tt(
                        `${pendingClaims} ${pendingClaims === 1 ? "αίτημα ιδιοκτησίας" : "αιτήματα ιδιοκτησίας"}`,
                        `${pendingClaims} ownership request${pendingClaims === 1 ? "" : "s"}`,
                      )
                    : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
          </span>
          <span className="text-sm font-semibold text-brand-700">
            {tt("Άνοιγμα →", "Open →")}
          </span>
        </Link>
      ) : null}

      {!isDbConfigured ? (
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-muted">
          {tt(
            "Η βάση δεδομένων θα συνδεθεί με το Supabase. Τότε θα εμφανίζονται εδώ οι καταχωρήσεις σου.",
            "The database will connect via Supabase. Your listings will appear here then.",
          )}
        </p>
      ) : rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-muted">
          {tt("Δεν έχεις καταχωρήσεις ακόμη.", "You have no listings yet.")}
        </p>
      ) : (
        <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-100">
          {rows.map((r) => (
            <li key={r.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold">{pick(r.name, locale)}</p>
                  <p className="text-xs text-muted">{kindLabel(r.kind, locale)}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {r.status === "PUBLISHED" ? (
                    <Link
                      href={publicHref(r.kind, r.slug)}
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold hover:border-brand-300 hover:text-brand-700"
                    >
                      <Eye className="h-4 w-4" /> {tt("Προβολή", "View")}
                    </Link>
                  ) : null}
                  <Link
                    href={editHref(r.kind, r.slug)}
                    className="inline-flex items-center gap-1 rounded-full border border-brand-200 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                  >
                    <Pencil className="h-4 w-4" /> {tt("Επεξεργασία", "Edit")}
                  </Link>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone[r.status as keyof typeof statusTone] ?? ""}`}
                  >
                    {statusLabel(r.status, locale)}
                  </span>
                </div>
              </div>
              {/* A status badge alone leaves the owner guessing whether the
                  ball is in their court. Say so, and for a rejection say why. */}
              <p className="mt-1.5 text-xs text-muted">{statusHint(r.status, locale)}</p>

              {r.status === "PUBLISHED"
                ? (() => {
                    const st = stats.get(viewKey(r.kind, r.slug)) ?? emptyStats();
                    const routes = Object.entries(st.byAction).sort((a, b) => b[1] - a[1]);
                    return (
                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl bg-slate-50 px-3 py-2.5">
                        <span className="inline-flex items-baseline gap-1.5">
                          <BarChart3 className="h-3.5 w-3.5 self-center text-slate-400" />
                          <span className="text-base font-bold tabular-nums">{st.views}</span>
                          <span className="text-xs text-muted">{tt("προβολές", "views")}</span>
                        </span>
                        <span className="inline-flex items-baseline gap-1.5">
                          <span className="text-base font-bold tabular-nums text-brand-700">
                            {st.contacts}
                          </span>
                          <span className="text-xs text-muted">
                            {tt("επικοινωνίες", "contacts")}
                          </span>
                        </span>
                        {routes.length ? (
                          <span className="text-xs text-muted">
                            {routes
                              .map(([action, n]) => `${n} ${actionLabel(action, locale)}`)
                              .join(" · ")}
                          </span>
                        ) : null}
                        <span className="ml-auto text-[11px] uppercase tracking-wide text-slate-400">
                          {tt("τελευταίες 30 ημέρες", "last 30 days")}
                        </span>
                      </div>
                    );
                  })()
                : null}
              {r.status === "REJECTED" ? (
                <div className="mt-2 rounded-lg bg-rose-50 p-3">
                  {r.rejectionNote ? (
                    <p className="flex items-start gap-2 text-sm text-rose-800">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{r.rejectionNote}</span>
                    </p>
                  ) : null}
                  <form action={resubmitListing} className={r.rejectionNote ? "mt-3" : ""}>
                    <input type="hidden" name="kind" value={r.kind} />
                    <input type="hidden" name="id" value={r.id} />
                    <button className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">
                      <RotateCcw className="h-4 w-4" />
                      {tt("Υπέβαλε ξανά για έλεγχο", "Submit again for review")}
                    </button>
                  </form>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {claims.length ? (
        <section className="mt-10">
          <h2 className="mb-3 text-xl font-bold">
            {tt("Τα αιτήματά μου", "My requests")}
          </h2>
          <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-100">
            {claims.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="font-semibold">{c.placeName}</p>
                  <p className="truncate text-xs text-muted">
                    /{c.placeKind}/{c.placeSlug}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    c.status === "APPROVED"
                      ? "bg-brand-50 text-brand-700"
                      : c.status === "REJECTED"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {c.status === "PENDING"
                    ? tt("Σε αναμονή", "Pending")
                    : c.status === "APPROVED"
                      ? tt("Εγκρίθηκε", "Approved")
                      : tt("Απορρίφθηκε", "Rejected")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Container>
  );
}

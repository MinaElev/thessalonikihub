import { setRequestLocale } from "next-intl/server";
import { ShieldCheck, Check, X, BadgeCheck, Pencil, CalendarClock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/types";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";
import { prisma, isDbConfigured } from "@/lib/db";
import { approveListing, rejectListing } from "@/app/actions/moderate";
import { approveClaim, rejectClaim } from "@/app/actions/claim";
import { kindLabel, editHref } from "@/lib/listing-labels";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tt = (el: string, en: string) => (locale === "el" ? el : en);
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return (
      <Container className="py-16 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-slate-300" />
        <p className="mt-3 text-muted">
          {tt("Πρόσβαση μόνο για διαχειριστές.", "Admins only.")}
        </p>
      </Container>
    );
  }

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
      // Events carry a slug like anything else. Dropping it here was why no
      // event ever showed an edit link, and so why imported wording could
      // never be rewritten.
      slug: e.slug as string,
      startsAt: e.startsAt,
      textRewritten: e.textRewritten,
    })),
  ];

  return (
    <Container className="py-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">{tt("Έγκριση καταχωρήσεων", "Moderation")}</h1>
          <p className="mt-1 text-sm text-muted">
            {tt("Καταχωρήσεις σε αναμονή έγκρισης.", "Listings awaiting approval.")}
          </p>
        </div>
        <Link
          href="/admin/import"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:border-brand-300 hover:text-brand-700"
        >
          {tt("Εισαγωγή events →", "Import events →")}
        </Link>
      </div>

      {claims.length ? (
        <section className="mb-10">
          <h2 className="mb-3 flex items-center gap-2 text-xl font-bold">
            <BadgeCheck className="h-5 w-5 text-brand-600" />
            {tt("Αιτήματα ιδιοκτησίας", "Ownership requests")}
          </h2>
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
        </section>
      ) : null}

      {!isDbConfigured ? (
        <p className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-muted">
          {tt("Θα ενεργοποιηθεί με τη σύνδεση του Supabase.", "Activates once Supabase is connected.")}
        </p>
      ) : rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-muted">
          {tt("Καμία εκκρεμότητα 🎉", "Nothing pending 🎉")}
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
                    {/* Imported wording is why an event stays noindex, so flag
                        it here rather than only inside the editor. */}
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

              {/* Rejecting without a reason leaves the owner with a red badge
                  and nothing to act on, so the reason is part of the action. */}
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
                      "Γιατί απορρίπτεται; Ο ιδιοκτήτης το βλέπει στον πίνακά του.",
                      "Why is it rejected? The owner sees this on their dashboard.",
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
    </Container>
  );
}

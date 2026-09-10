import { setRequestLocale } from "next-intl/server";
import { ShieldCheck, Check, X, BadgeCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/types";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";
import { prisma, isDbConfigured } from "@/lib/db";
import { approveListing, rejectListing } from "@/app/actions/moderate";
import { approveClaim, rejectClaim } from "@/app/actions/claim";

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
    ...places.map((p) => ({ id: p.id, kind: "place", label: p.kind as string, name: p.name as Localized<string>, summary: p.summary as Localized<string>, slug: p.slug as string | undefined })),
    ...events.map((e) => ({ id: e.id, kind: "event", label: "EVENTS", name: e.name as Localized<string>, summary: e.summary as Localized<string>, slug: undefined as string | undefined })),
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
            <li key={`${r.kind}-${r.id}`} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 p-4">
              <div className="min-w-0">
                <p className="font-semibold">
                  {pick(r.name, locale)}{" "}
                  <span className="ml-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-normal text-slate-500">{r.label}</span>
                </p>
                <p className="truncate text-sm text-muted">{pick(r.summary, locale)}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {r.slug ? (
                  <Link
                    href={`/dashboard/edit/${r.slug}`}
                    className="rounded-full border border-brand-200 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                  >
                    {tt("Μετάφραση / επεξεργασία", "Translate / edit")}
                  </Link>
                ) : null}
                <form action={approveListing}>
                  <input type="hidden" name="kind" value={r.kind} />
                  <input type="hidden" name="id" value={r.id} />
                  <button className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700">
                    <Check className="h-4 w-4" /> {tt("Έγκριση", "Approve")}
                  </button>
                </form>
                <form action={rejectListing}>
                  <input type="hidden" name="kind" value={r.kind} />
                  <input type="hidden" name="id" value={r.id} />
                  <button className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium hover:bg-slate-50">
                    <X className="h-4 w-4" /> {tt("Απόρριψη", "Reject")}
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

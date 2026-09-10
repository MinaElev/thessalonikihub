import { setRequestLocale } from "next-intl/server";
import { LogIn, Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/types";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";
import { prisma, isDbConfigured } from "@/lib/db";
import { signOut } from "@/app/actions/moderate";

const statusTone: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  PUBLISHED: "bg-brand-50 text-brand-700",
  REJECTED: "bg-rose-100 text-rose-700",
  DRAFT: "bg-slate-100 text-slate-600",
};

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
        <Link href="/login" className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700">
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
    ...places.map((p) => ({ id: p.id, name: p.name as Localized<string>, status: p.status, kind: p.kind as string, slug: p.slug })),
    ...events.map((e) => ({ id: e.id, name: e.name as Localized<string>, status: e.status, kind: "EVENTS", slug: undefined as string | undefined })),
  ];

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
            <li key={r.id} className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-semibold">{pick(r.name, locale)}</p>
                <p className="text-xs text-muted">{r.kind}</p>
              </div>
              <div className="flex items-center gap-3">
                {r.slug ? (
                  <Link
                    href={`/dashboard/edit/${r.slug}`}
                    className="text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    {tt("Επεξεργασία", "Edit")}
                  </Link>
                ) : null}
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone[r.status] ?? ""}`}>
                  {r.status}
                </span>
              </div>
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
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone[c.status] ?? ""}`}
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

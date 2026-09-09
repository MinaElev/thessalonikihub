import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight, LogIn } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { submitCategories } from "@/lib/submit-schema";
import { getCurrentUser } from "@/lib/auth";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: "/submit",
    title: locale === "el" ? "Καταχώρησε την επιχείρησή σου" : "Add your business",
    description:
      locale === "el"
        ? "Καταχώρησε δωρεάν το κατάλυμα, το μαγαζί, το event, την εμπειρία ή την υπηρεσία σου στο ThessalonikiHub."
        : "List your accommodation, venue, event, experience or service on ThessalonikiHub.",
    index: false,
  });
}

export default async function SubmitHub({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tt = (el: string, en: string) => (locale === "el" ? el : en);
  const user = await getCurrentUser();

  return (
    <Container className="py-8">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          {tt("Καταχώρησε στην πλατφόρμα", "Add to the platform")}
        </h1>
        <p className="mt-3 text-lg text-muted">
          {tt(
            "Διάλεξε κατηγορία και συμπλήρωσε τα στοιχεία. Κάθε καταχώρηση ελέγχεται πριν δημοσιευθεί.",
            "Choose a category and fill in the details. Every listing is reviewed before it goes live.",
          )}
        </p>
      </header>

      {!user ? (
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-xl border border-brand-100 bg-brand-50 p-4">
          <LogIn className="h-5 w-5 text-brand-700" />
          <span className="text-sm text-brand-900">
            {tt("Συνδέσου για να καταχωρήσεις.", "Sign in to add a listing.")}
          </span>
          <Link
            href="/login"
            className="ml-auto rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {tt("Σύνδεση / Εγγραφή", "Sign in / Register")}
          </Link>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {submitCategories.map((c) => (
          <Link
            key={c.key}
            href={`/submit/${c.key}`}
            className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
          >
            <span className="text-lg font-bold text-brand-700 group-hover:text-brand-800">
              {pick(c.label, locale)}
            </span>
            <span className="mt-1 flex-1 text-sm text-muted">
              {pick(c.blurb, locale)}
            </span>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
              {tt("Καταχώρηση", "Add")} <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}

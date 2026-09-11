import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { LogIn } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { getCategory, submitCategories } from "@/lib/submit-schema";
import { getCurrentUser } from "@/lib/auth";
import { ListingForm } from "@/components/submit/ListingForm";

export function generateStaticParams() {
  return submitCategories.map((c) => ({ category: c.key }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return buildMetadata({
    locale,
    path: `/submit/${category}`,
    title: `${pick(c.label, locale)} — ${locale === "el" ? "Καταχώρηση" : "Add"}`,
    description: pick(c.blurb, locale),
    index: false,
  });
}

export default async function SubmitCategoryPage({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const c = getCategory(category);
  if (!c) notFound();
  const tt = (el: string, en: string) => (locale === "el" ? el : en);
  const user = await getCurrentUser();

  return (
    <Container className="py-4">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: tt("Αρχική", "Home"), href: "/" },
          { label: tt("Καταχώρηση", "Add"), href: "/submit" },
          { label: pick(c.label, locale) },
        ]}
      />
      <header className="mb-6 max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          {tt("Καταχώρηση:", "Add:")} {pick(c.label, locale)}
        </h1>
      </header>

      {user ? (
        <ListingForm category={c.key} locale={locale} />
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-brand-100 bg-brand-50 p-6">
          <LogIn className="h-5 w-5 text-brand-700" />
          <span className="text-brand-900">
            {tt(
              "Πρέπει να συνδεθείς για να καταχωρήσεις.",
              "You need to sign in to add a listing.",
            )}
          </span>
          <Link
            href={`/login?next=${encodeURIComponent(`/submit/${category}`)}`}
            className="ml-auto rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
          >
            {tt("Σύνδεση / Εγγραφή", "Sign in / Register")}
          </Link>
        </div>
      )}
    </Container>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Search as SearchIcon } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Container, SectionHeading } from "@/components/ui";
import { PlaceCard } from "@/components/PlaceCard";
import { EventCard } from "@/components/EventCard";
import { GuideCard } from "@/components/GuideCard";
import { buildMetadata } from "@/lib/seo";
import { search } from "@/lib/repo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "search" });
  return buildMetadata({
    locale,
    path: "/search",
    title: t("title"),
    description: t("subtitle"),
    index: false,
  });
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { q = "" } = await searchParams;
  const t = await getTranslations({ locale });
  const results = q ? search(q) : { places: [], events: [], guides: [] };
  const total = results.places.length + results.events.length + results.guides.length;
  const action = locale === "el" ? "/search" : `/${locale}/search`;

  return (
    <Container className="py-8">
      <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">{t("search.title")}</h1>

      <form action={action} className="mb-8 flex max-w-xl items-center gap-2 rounded-full border border-slate-200 bg-white p-2 shadow-sm">
        <SearchIcon className="ml-2 h-5 w-5 shrink-0 text-slate-400" />
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder={t("search.placeholder")}
          className="w-full bg-transparent outline-none placeholder:text-slate-400"
          aria-label={t("search.placeholder")}
        />
        <button type="submit" className="shrink-0 rounded-full bg-brand-600 px-5 py-2 font-semibold text-white hover:bg-brand-700">
          {t("search.button")}
        </button>
      </form>

      {q ? (
        <p className="mb-8 text-muted">
          {t("search.resultsFor", { count: total, q })}
        </p>
      ) : null}

      {results.places.length ? (
        <section className="mb-10">
          <SectionHeading title={t("search.places")} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.places.map((p) => (
              <PlaceCard key={`${p.kind}-${p.slug}`} place={p} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}

      {results.events.length ? (
        <section className="mb-10">
          <SectionHeading title={t("search.events")} />
          <div className="grid gap-4 sm:grid-cols-2">
            {results.events.map((e) => (
              <EventCard key={e.slug} event={e} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}

      {results.guides.length ? (
        <section className="mb-10">
          <SectionHeading title={t("search.guides")} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.guides.map((g) => (
              <GuideCard key={g.slug} guide={g} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}

      {q && total === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-muted">
          {t("search.noResults")}
        </p>
      ) : null}
    </Container>
  );
}

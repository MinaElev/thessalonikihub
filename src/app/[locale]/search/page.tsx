import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Container, SectionHeading } from "@/components/ui";
import { PlaceCard } from "@/components/PlaceCard";
import { EventCard } from "@/components/EventCard";
import { GuideCard } from "@/components/GuideCard";
import { buildMetadata } from "@/lib/seo";
import { searchAll, type SearchHit, type SearchKind } from "@/lib/search";

export const dynamic = "force-dynamic";

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

/** Order the result groups the way a visitor's intent usually runs. */
const GROUP_ORDER: SearchKind[] = [
  "place",
  "event",
  "guide",
  "area",
  "metro",
  "dish",
  "route",
  "festival",
  "month",
  "daytrip",
  "audience",
];

const GROUP_LABEL: Record<SearchKind, string> = {
  place: "places",
  event: "events",
  guide: "guides",
  area: "areas",
  metro: "metro",
  month: "months",
  festival: "festivals",
  dish: "dishes",
  route: "routes",
  daytrip: "daytrips",
  audience: "audiences",
};

/** A compact row for content types that have no card component of their own. */
function HitRow({ hit }: { hit: SearchHit }) {
  return (
    <Link
      href={hit.href}
      className="group flex items-start justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="min-w-0">
        <span className="block font-bold leading-snug text-ink group-hover:text-brand-700">
          {hit.title}
        </span>
        <span className="mt-1 block text-sm text-muted">{hit.summary}</span>
      </span>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-600 transition group-hover:translate-x-0.5" />
    </Link>
  );
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
  const { hits, total } = await searchAll(q, locale);
  const action = locale === "el" ? "/search" : `/${locale}/search`;

  // Group while preserving the ranked order inside each group.
  const groups = new Map<SearchKind, SearchHit[]>();
  for (const hit of hits) {
    const list = groups.get(hit.kind);
    if (list) list.push(hit);
    else groups.set(hit.kind, [hit]);
  }

  return (
    <Container className="py-8">
      <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">{t("search.title")}</h1>

      <form
        action={action}
        className="mb-8 flex max-w-xl items-center gap-2 rounded-full border border-slate-200 bg-white p-2 shadow-sm"
      >
        <SearchIcon className="ml-2 h-5 w-5 shrink-0 text-slate-400" />
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder={t("search.placeholder")}
          className="w-full bg-transparent outline-none placeholder:text-slate-400"
          aria-label={t("search.placeholder")}
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-brand-600 px-5 py-2 font-semibold text-white hover:bg-brand-700"
        >
          {t("search.button")}
        </button>
      </form>

      {q ? (
        <p className="mb-8 text-muted">{t("search.resultsFor", { count: total, q })}</p>
      ) : null}

      {GROUP_ORDER.filter((kind) => groups.has(kind)).map((kind) => {
        const list = groups.get(kind)!;
        return (
          <section key={kind} className="mb-10">
            <SectionHeading title={t(`search.${GROUP_LABEL[kind]}`)} />
            {kind === "place" ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((hit) => (
                  <PlaceCard key={hit.id} place={hit.place!} locale={locale} />
                ))}
              </div>
            ) : kind === "event" ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {list.map((hit) => (
                  <EventCard key={hit.id} event={hit.event!} locale={locale} />
                ))}
              </div>
            ) : kind === "guide" ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((hit) => (
                  <GuideCard key={hit.id} guide={hit.guide!} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {list.map((hit) => (
                  <HitRow key={hit.id} hit={hit} />
                ))}
              </div>
            )}
          </section>
        );
      })}

      {q && total === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-muted">
          {t("search.noResults")}
        </p>
      ) : null}
    </Container>
  );
}

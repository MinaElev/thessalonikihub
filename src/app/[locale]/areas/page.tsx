import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, MapPin, TrainFront } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { areaHref } from "@/lib/links";
import { areas } from "@/content/data/areas";
import { getStationsForArea } from "@/content/data/metro";
import { getAllPlaces } from "@/lib/repo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "areas" });
  return buildMetadata({
    locale,
    path: "/areas",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function AreasPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  /*
   * Sixteen cards of one line of prose each, in a fixed order, gave a reader
   * nothing to choose on. These are the two facts that decide a neighbourhood
   * for a visitor — can I get there on the metro, and is there anything there
   * — and both are already in the data.
   *
   * Counted once here rather than per card: getAllPlaces() is cached per
   * request, but grouping once is clearer than sixteen filters.
   */
  const places = await getAllPlaces();
  const countByArea = new Map<string, number>();
  for (const p of places) {
    countByArea.set(p.geo.area, (countByArea.get(p.geo.area) ?? 0) + 1);
  }

  return (
    <Container className="py-8">
      <Breadcrumbs
        locale={locale}
        items={[{ label: t("common.home"), href: "/" }, { label: t("areas.title") }]}
      />
      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{t("areas.title")}</h1>
        <p className="mt-3 text-lg text-muted">{t("areas.subtitle")}</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((a) => {
          const stations = getStationsForArea(a.slug);
          const listed = countByArea.get(a.slug) ?? 0;
          return (
            <Link
              key={a.slug}
              href={areaHref(a.slug)}
              className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
            >
              <span className="inline-flex items-center gap-1 text-lg font-bold text-brand-700 group-hover:text-brand-800">
                <MapPin className="h-4 w-4" /> {pick(a.name, locale)}
              </span>
              <span className="mt-2 flex-1 text-sm text-muted">
                {pick(a.blurb, locale)}
              </span>
              {/* Only what is true of this area: an area with no station and
                  nothing listed yet shows neither, rather than a zero. */}
              {stations.length || listed ? (
                <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  {stations.length ? (
                    <span className="inline-flex items-center gap-1">
                      <TrainFront className="h-3.5 w-3.5 text-brand-600" />
                      {stations
                        .slice(0, 2)
                        .map((st) => pick(st.name, locale))
                        .join(", ")}
                      {stations.length > 2 ? ` +${stations.length - 2}` : ""}
                    </span>
                  ) : null}
                  {listed ? (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-brand-600" />
                      {t("areas.listedHere", { count: listed })}
                    </span>
                  ) : null}
                </span>
              ) : null}
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                {t("common.readMore")} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}

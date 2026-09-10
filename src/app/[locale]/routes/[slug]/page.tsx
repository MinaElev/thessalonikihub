import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Footprints,
  Clock,
  Ruler,
  Sunrise,
  MapPin,
  TrainFront,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { MapClient } from "@/components/map/MapClient";
import { JsonLd } from "@/components/JsonLd";
import type { MapPoint } from "@/lib/mappoints";
import { buildMetadata } from "@/lib/seo";
import { areaHref, metroStationHref, routeHref } from "@/lib/links";
import { getArea } from "@/content/data/areas";
import { getMetroStation } from "@/content/data/metro";
import {
  walkingRoutes,
  getWalkingRoute,
  getWalkingRoutes,
} from "@/content/data/routes";

export function generateStaticParams() {
  return walkingRoutes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const r = getWalkingRoute(slug);
  if (!r) return {};
  const name = pick(r.name, locale);
  return buildMetadata({
    locale,
    path: routeHref(slug),
    title:
      locale === "el"
        ? `${name} — διαδρομή ${r.distanceKm} χλμ με τα πόδια`
        : `${name} — a ${r.distanceKm} km walking route`,
    description: pick(r.blurb, locale),
  });
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const r = getWalkingRoute(slug);
  if (!r) notFound();

  const el = locale === "el";
  const name = pick(r.name, locale);
  const area = r.area ? getArea(r.area) : undefined;
  const station = r.metroStation ? getMetroStation(r.metroStation) : undefined;
  const others = getWalkingRoutes().filter((x) => x.slug !== r.slug);

  // Reuse the site map component: each stop becomes a point.
  const points: MapPoint[] = r.stops.map((s, i) => ({
    id: `${r.slug}-${i}`,
    kind: "discover",
    name: `${i + 1}. ${pick(s.name, locale)}`,
    lat: s.lat,
    lng: s.lng,
    area: r.area ?? "center",
    path: s.placeSlug ? `/discover/${s.placeSlug}` : routeHref(r.slug),
  }));
  const midLat = r.stops.reduce((a, s) => a + s.lat, 0) / r.stops.length;
  const midLng = r.stops.reduce((a, s) => a + s.lng, 0) / r.stops.length;

  return (
    <Container className="py-4">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name,
          description: pick(r.blurb, locale),
          touristType: el ? "Πεζοπόροι στην πόλη" : "City walkers",
          itinerary: {
            "@type": "ItemList",
            numberOfItems: r.stops.length,
            itemListElement: r.stops.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "TouristAttraction",
                name: pick(s.name, locale),
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: s.lat,
                  longitude: s.lng,
                },
              },
            })),
          },
        }}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label: t("routes.title"), href: "/routes" },
          { label: name },
        ]}
      />

      <header className="mb-6 max-w-3xl">
        <h1 className="inline-flex items-start gap-2 text-3xl font-extrabold sm:text-4xl">
          <Footprints className="mt-1 h-7 w-7 shrink-0 text-brand-600" /> {name}
        </h1>
        <p className="mt-3 text-lg text-muted">{pick(r.blurb, locale)}</p>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <Ruler className="h-5 w-5 shrink-0 text-brand-600" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t("routes.distance")}
            </p>
            <p className="font-semibold text-ink">{r.distanceKm} km</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <Clock className="h-5 w-5 shrink-0 text-brand-600" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t("routes.duration")}
            </p>
            <p className="font-semibold text-ink">
              {r.durationMin} {t("routes.minutes")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <Footprints className="h-5 w-5 shrink-0 text-brand-600" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t("routes.difficultyLabel")}
            </p>
            <p className="font-semibold text-ink">
              {t(`routes.difficulty.${r.difficulty}`)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <Sunrise className="h-5 w-5 shrink-0 text-brand-600" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t("routes.bestTime")}
            </p>
            <p className="font-semibold text-ink">{pick(r.bestTime, locale)}</p>
          </div>
        </div>
      </div>

      <div className="mb-10 max-w-3xl">
        <MarkdownBody>{pick(r.intro, locale)}</MarkdownBody>
      </div>

      <div className="mb-10">
        <MapClient
          points={points}
          locale={locale}
          center={[midLat, midLng]}
          zoom={15}
        />
        <p className="mt-2 text-xs text-muted">{t("routes.mapNote")}</p>
      </div>

      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold">{t("routes.theStops")}</h2>
        <ol className="space-y-5">
          {r.stops.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 border-b border-slate-100 pb-5">
                <h3 className="font-bold text-ink">
                  {s.placeSlug ? (
                    <Link
                      href={`/discover/${s.placeSlug}`}
                      className="hover:text-brand-700"
                    >
                      {pick(s.name, locale)}
                    </Link>
                  ) : (
                    pick(s.name, locale)
                  )}
                </h3>
                <p className="mt-1 text-slate-700">{pick(s.note, locale)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_290px]">
        <div className="min-w-0">
          <MarkdownBody>{pick(r.outro, locale)}</MarkdownBody>

          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-bold">{t("routes.otherRoutes")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={routeHref(o.slug)}
                  className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
                >
                  <span className="font-bold text-brand-700 group-hover:text-brand-800">
                    {pick(o.name, locale)}
                  </span>
                  <span className="mt-1 text-sm text-muted">
                    {pick(o.blurb, locale)}
                  </span>
                  <span className="mt-2 text-xs font-semibold text-muted">
                    {o.distanceKm} km · {o.durationMin}′
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          {station ? (
            <Link
              href={metroStationHref(station.slug)}
              className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white p-5 text-sm font-semibold text-brand-700 shadow-sm transition hover:border-brand-200"
            >
              <TrainFront className="h-4 w-4" />
              {t("routes.startStation")}: {pick(station.name, locale)}
              <ArrowRight className="ml-auto h-4 w-4" />
            </Link>
          ) : null}

          {area ? (
            <Link
              href={areaHref(area.slug)}
              className="flex items-center gap-2 rounded-2xl border border-slate-100 bg-white p-5 text-sm font-semibold text-brand-700 shadow-sm transition hover:border-brand-200"
            >
              <MapPin className="h-4 w-4" /> {pick(area.name, locale)}
              <ArrowRight className="ml-auto h-4 w-4" />
            </Link>
          ) : null}

          <p className="text-xs text-muted">{t("routes.disclaimer")}</p>
        </aside>
      </div>
    </Container>
  );
}

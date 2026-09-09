import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrainFront, ArrowRight, ArrowLeft, MapPin, Link2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { PlaceCard } from "@/components/PlaceCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { MiniMapClient } from "@/components/map/MiniMapClient";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { areaHref, metroStationHref, mapsHref } from "@/lib/links";
import { getPlaceBySlug } from "@/lib/repo";
import { getArea } from "@/content/data/areas";
import {
  metroStations,
  getMetroStation,
  getMetroStations,
} from "@/content/data/metro";

export function generateStaticParams() {
  return metroStations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const station = getMetroStation(slug);
  if (!station) return {};
  const name = pick(station.name, locale);
  return buildMetadata({
    locale,
    path: metroStationHref(slug),
    title:
      locale === "el"
        ? `Στάση μετρό ${name} — τι υπάρχει γύρω`
        : `${name} metro station — what's around`,
    description: pick(station.blurb, locale),
  });
}

export default async function MetroStationPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const station = getMetroStation(slug);
  if (!station) notFound();

  const el = locale === "el";
  const name = pick(station.name, locale);
  const ordered = getMetroStations().filter(
    (s) => s.branch === "trunk" || s.branch === station.branch,
  );
  const index = ordered.findIndex((s) => s.slug === station.slug);
  const prev = index > 0 ? ordered[index - 1] : undefined;
  const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined;

  const area = station.area ? getArea(station.area) : undefined;
  const places = (
    await Promise.all((station.nearbyPlaces ?? []).map((s) => getPlaceBySlug(s)))
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <Container className="py-4">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SubwayStation",
          name,
          description: pick(station.blurb, locale),
          geo: {
            "@type": "GeoCoordinates",
            latitude: station.center.lat,
            longitude: station.center.lng,
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: el ? "Θεσσαλονίκη" : "Thessaloniki",
            addressCountry: "GR",
          },
        }}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label: t("metro.title"), href: "/metro" },
          { label: name },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <header className="mb-6 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              {t("metro.stationEyebrow")}
            </p>
            <h1 className="mt-1 inline-flex items-center gap-2 text-3xl font-extrabold sm:text-4xl">
              <TrainFront className="h-7 w-7 text-brand-600" /> {name}
            </h1>
            <p className="mt-3 text-lg text-muted">{pick(station.blurb, locale)}</p>
          </header>

          <MarkdownBody>{pick(station.long, locale)}</MarkdownBody>

          {places.length ? (
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">{t("metro.nearbyPlaces")}</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {places.map((p) => (
                  <PlaceCard key={p.slug} place={p} locale={locale} />
                ))}
              </div>
            </section>
          ) : null}

          <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-6">
            {prev ? (
              <Link
                href={metroStationHref(prev.slug)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:gap-3"
              >
                <ArrowLeft className="h-4 w-4" /> {pick(prev.name, locale)}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={metroStationHref(next.slug)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:gap-3"
              >
                {pick(next.name, locale)} <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">
              {t("metro.stationFacts")}
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted">{t("metro.branchLabel")}</dt>
                <dd className="text-right font-semibold text-ink">
                  {station.branch === "trunk"
                    ? t("metro.trunk")
                    : station.branch === "kalamaria"
                      ? t("metro.branchSouth")
                      : t("metro.branchEast")}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted">{t("metro.openedLabel")}</dt>
                <dd className="text-right font-semibold text-ink">
                  {new Intl.DateTimeFormat(el ? "el-GR" : "en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(station.opened))}
                </dd>
              </div>
            </dl>
            {station.connections ? (
              <p className="mt-3 border-t border-slate-100 pt-3 text-sm text-muted">
                <span className="mb-1 flex items-center gap-1.5 font-semibold text-ink">
                  <Link2 className="h-4 w-4" /> {t("metro.connections")}
                </span>
                {pick(station.connections, locale)}
              </p>
            ) : null}
          </div>

          <div>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted">
              {t("place.location")}
            </h2>
            <MiniMapClient lat={station.center.lat} lng={station.center.lng} label={name} />
            <p className="mt-2 text-xs text-muted">{t("metro.approx")}</p>
            <a
              href={mapsHref(station.center)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-700"
            >
              <MapPin className="h-4 w-4" /> {t("place.getDirections")}
            </a>
          </div>

          {area ? (
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted">
                {t("metro.servesArea")}
              </h2>
              <Link
                href={areaHref(area.slug)}
                className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800"
              >
                <MapPin className="h-4 w-4" /> {pick(area.name, locale)}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-2 text-sm text-muted">{pick(area.blurb, locale)}</p>
            </div>
          ) : null}

          <Link
            href="/metro"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:gap-3"
          >
            <TrainFront className="h-4 w-4" /> {t("metro.allStations")}
          </Link>
        </aside>
      </div>
    </Container>
  );
}

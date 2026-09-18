import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, ArrowRight, TrainFront } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Pillar } from "@/lib/types";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { PlaceCard } from "@/components/PlaceCard";
import { EventCard } from "@/components/EventCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownBody } from "@/components/MarkdownBody";
import { RelatedLinks } from "@/components/RelatedLinks";
import { MapClient } from "@/components/map/MapClient";
import { pillars } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { areaHref, metroStationHref } from "@/lib/links";
import { getMapPoints } from "@/lib/mappoints";
import { areas, getArea } from "@/content/data/areas";
import { getStationsForArea, linesFor } from "@/content/data/metro";
import { getRoutesForArea } from "@/content/data/routes";
import { RouteLinks } from "@/components/RouteLinks";
import { getPlaces, getEventsInArea } from "@/lib/repo";
import Image from "next/image";

const PILLARS: Exclude<Pillar, "events">[] = [
  "stay",
  "eat",
  "drink",
  "discover",
  "experiences",
  "services",
];

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  const name = pick(area.name, locale);
  return buildMetadata({
    locale,
    path: areaHref(slug),
    title: `${name} — ${locale === "el" ? "Οδηγός Θεσσαλονίκης" : "Thessaloniki guide"}`,
    description: pick(area.blurb, locale),
    images: area.photo ? [area.photo.url] : undefined,
  });
}

export default async function AreaHub({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const area = getArea(slug);
  if (!area) notFound();
  const stations = getStationsForArea(slug);

  const name = pick(area.name, locale);
  const points = (await getMapPoints(locale)).filter((p) => p.area === slug);
  const events = await getEventsInArea(slug);
  const sectionsRaw = await Promise.all(
    PILLARS.map(async (pillar) => ({
      pillar,
      places: (await getPlaces(pillar)).filter((p) => p.geo.area === slug),
    })),
  );
  const sections = sectionsRaw.filter((s) => s.places.length > 0);
  const nearby = area.nearby
    .map((s) => getArea(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <Container className="py-4">
      {/* Sixteen district pages carried no markup for the thing they describe.
          Everything here comes from the record: the centre point that already
          drives the map, the neighbours already listed, and the photo where
          one exists. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name,
          description: pick(area.blurb, locale),
          url: absoluteUrl(locale, areaHref(area.slug)),
          geo: {
            "@type": "GeoCoordinates",
            latitude: area.center.lat,
            longitude: area.center.lng,
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: locale === "el" ? "Θεσσαλονίκη" : "Thessaloniki",
            addressCountry: "GR",
          },
          containedInPlace: {
            "@type": "City",
            name: locale === "el" ? "Θεσσαλονίκη" : "Thessaloniki",
          },
          ...(area.photo ? { image: `${site.url}${area.photo.url}` } : {}),
          // Neighbouring districts are deliberately not listed here.
          // `containsPlace` would claim Ano Poli contains the city centre,
          // and schema.org has no property for "next to", so the honest
          // markup is to say nothing rather than something false.
        }}
      />
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label: t("areas.title"), href: "/areas" },
          { label: name },
        ]}
      />

      <header className="mb-6 max-w-3xl">
        <h1 className="inline-flex items-center gap-2 text-3xl font-extrabold sm:text-4xl">
          <MapPin className="h-7 w-7 text-brand-600" /> {name}
        </h1>
        {area.photo ? (
          <figure className="mt-5 overflow-hidden rounded-2xl bg-slate-100">
            {/* The header image, so it is the Largest Contentful Paint element
                and worth loading eagerly; sizes stops a phone fetching the
                full-width file to render it at 400px. */}
            <Image
              src={area.photo.url}
              alt={pick(area.photo.alt, locale)}
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 768px) 100vw, 760px"
              className="h-auto w-full object-cover"
            />
          </figure>
        ) : null}
        <div className="mt-4">
          <MarkdownBody locale={locale} selfHref={areaHref(area.slug)}>
            {pick(area.long, locale)}
          </MarkdownBody>
        </div>
      </header>

      {points.length ? (
        <div className="mb-10">
          <MapClient
            points={points}
            locale={locale}
            center={[area.center.lat, area.center.lng]}
            zoom={15}
          />
        </div>
      ) : null}

      {sections.map(({ pillar, places }) => (
        <section key={pillar} className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">
            {pick(pillars[pillar].label, locale)}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((p) => (
              <PlaceCard key={p.slug} place={p} locale={locale} />
            ))}
          </div>
        </section>
      ))}

      {events.length ? (
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{t("nav.events")}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {events.map((e) => (
              <EventCard key={e.slug} event={e} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}

      <RouteLinks
        locale={locale}
        routes={getRoutesForArea(slug)}
        title={t("routes.walksHere")}
      />

      {stations.length ? (
        <section className="mb-10">
          <h2 className="mb-1 text-2xl font-bold">{t("areas.metroTitle")}</h2>
          <p className="mb-4 text-sm text-muted">{t("areas.metroNote")}</p>
          <div className="flex flex-wrap gap-3">
            {stations.map((st) => (
              <Link
                key={st.slug}
                href={metroStationHref(st.slug)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                <TrainFront className="h-4 w-4 text-brand-500" />
                {pick(st.name, locale)}
                {linesFor(st).map((n) => (
                  <span
                    key={n}
                    className={`rounded px-1.5 py-0.5 text-xs font-bold text-white ${
                      n === "1" ? "bg-red-600" : "bg-blue-600"
                    }`}
                  >
                    {n}
                  </span>
                ))}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {nearby.length ? (
        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-bold">{t("areas.nearby")}</h2>
          <div className="flex flex-wrap gap-3">
            {nearby.map((a) => (
              <Link
                key={a.slug}
                href={areaHref(a.slug)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
              >
                <MapPin className="h-4 w-4 text-brand-500" /> {pick(a.name, locale)}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Walking routes run through these neighbourhoods, but nothing linked
          to the hub outside the menu. */}
      <RelatedLinks
        title={t("related.exploreMore")}
        items={[
          { href: "/routes", label: t("nav.routes") },
          { href: "/areas", label: t("nav.areas") },
        ]}
      />
    </Container>
  );
}

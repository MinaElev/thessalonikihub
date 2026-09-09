import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Pillar } from "@/lib/types";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { PlaceCard } from "@/components/PlaceCard";
import { EventCard } from "@/components/EventCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { MapClient } from "@/components/map/MapClient";
import { pillars } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { areaHref } from "@/lib/links";
import { getMapPoints } from "@/lib/mappoints";
import { areas, getArea } from "@/content/data/areas";
import { getPlaces, getEventsInArea } from "@/lib/repo";

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
        <div className="mt-4">
          <MarkdownBody>{pick(area.long, locale)}</MarkdownBody>
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
    </Container>
  );
}

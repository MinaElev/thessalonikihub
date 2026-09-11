import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CalendarDays, MapPin, Ticket } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { PlaceCard } from "@/components/PlaceCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { eventHref, mapsHref } from "@/lib/links";
import { formatDistance, formatEventWhen } from "@/lib/format";
import { absoluteUrl } from "@/lib/site";
import { getEvent, getFileEvents, getNearbyPlaces } from "@/lib/repo";
import { MiniMapClient } from "@/components/map/MiniMapClient";
import { ViewBeacon } from "@/components/ViewBeacon";
import { TrackedLink } from "@/components/TrackedLink";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getFileEvents().map((e) => ({ locale, slug: e.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};
  return buildMetadata({
    locale,
    path: eventHref(event),
    title: pick(event.name, locale),
    description: pick(event.summary, locale),
    images: event.photos[0] ? [event.photos[0].url] : undefined,
    type: "article",
    // Imported events carry the source feed's own words until an editor
    // rewrites them; republishing that verbatim is duplicate content.
    index: event.textRewritten !== false,
  });
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const event = await getEvent(slug);
  if (!event) notFound();

  const photo = event.photos[0];
  const venueName = pick(event.venue, locale);
  const nearbyStay = event.geo ? getNearbyPlaces(event.geo, "stay", { limit: 4 }) : [];
  const nearbyEat = event.geo ? getNearbyPlaces(event.geo, "eat", { limit: 4 }) : [];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: pick(event.name, locale),
          description: pick(event.summary, locale),
          // schema.org accepts a bare date; sending a start time we never knew
          // would put an invented hour into Google's event rich results.
          startDate: event.timeKnown === false
            ? event.startsAt.slice(0, 10)
            : event.startsAt,
          ...(event.endsAt ? { endDate: event.endsAt } : {}),
          eventStatus: "https://schema.org/EventScheduled",
          image: photo?.url,
          url: absoluteUrl(locale, eventHref(event)),
          ...(venueName
            ? {
                location: {
                  "@type": "Place",
                  name: venueName,
                  ...(event.geo
                    ? {
                        geo: {
                          "@type": "GeoCoordinates",
                          latitude: event.geo.lat,
                          longitude: event.geo.lng,
                        },
                      }
                    : {}),
                },
              }
            : {}),
        }}
      />
      <ViewBeacon kind="events" slug={event.slug} />

      <Container>
        <Breadcrumbs
          locale={locale}
          items={[
            { label: t("common.home"), href: "/" },
            { label: t("events.title"), href: "/events" },
            { label: pick(event.name, locale) },
          ]}
        />
        <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-slate-100 sm:aspect-[21/9]">
          {photo ? (
            <Image
              src={photo.url}
              alt={pick(photo.alt, locale)}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl">
              {pick(event.name, locale)}
            </h1>
            <p className="mt-3 text-lg text-muted">{pick(event.summary, locale)}</p>
            <div className="mt-6">
              <MarkdownBody>{pick(event.description, locale)}</MarkdownBody>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  {t("events.when")}
                </p>
                <p className="mt-1 inline-flex items-center gap-2 font-medium">
                  <CalendarDays className="h-4 w-4 text-brand-600" />
                  {formatEventWhen(event.startsAt, event.endsAt, locale, event.timeKnown)}
                </p>
              </div>
              {/* Imported feeds often name no venue: show a location only when
                  one is actually known, and a map only when we have coords. */}
              {venueName ? (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    {t("events.where")}
                  </p>
                  {event.geo ? (
                    <TrackedLink
                      kind="events"
                      slug={event.slug}
                      action="directions"
                      href={mapsHref(event.geo)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-2 font-medium text-brand-700 hover:underline"
                    >
                      <MapPin className="h-4 w-4" /> {venueName}
                    </TrackedLink>
                  ) : (
                    <p className="mt-1 inline-flex items-center gap-2 font-medium">
                      <MapPin className="h-4 w-4 text-brand-600" /> {venueName}
                    </p>
                  )}
                  {event.geo ? (
                    <div className="mt-3">
                      <MiniMapClient
                        lat={event.geo.lat}
                        lng={event.geo.lng}
                        label={venueName}
                        color="#db2777"
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
              {event.priceInfo ? (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    {t("events.price")}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-2 font-medium">
                    <Ticket className="h-4 w-4 text-brand-600" />
                    {pick(event.priceInfo, locale)}
                  </p>
                </div>
              ) : null}
            </div>
          </aside>
        </div>

        <section className="mt-10" hidden={!nearbyStay.length}>
          <h2 className="mb-4 text-xl font-bold">{t("place.nearbyStay")}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {nearbyStay.map(({ item, meters }) => (
              <PlaceCard
                key={item.slug}
                place={item}
                locale={locale}
                distanceLabel={formatDistance(meters, locale)}
              />
            ))}
          </div>
        </section>

        <section className="mt-10" hidden={!nearbyEat.length}>
          <h2 className="mb-4 text-xl font-bold">{t("place.nearbyEat")}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {nearbyEat.map(({ item, meters }) => (
              <PlaceCard
                key={item.slug}
                place={item}
                locale={locale}
                distanceLabel={formatDistance(meters, locale)}
              />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}

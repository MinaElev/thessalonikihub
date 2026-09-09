import type { ReactNode } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  Phone,
  Mail,
  Globe,
  MessageCircle,
  CalendarCheck,
  MapPin,
  Clock,
  Users,
  BedDouble,
  Bath,
  Ruler,
  LogIn,
  LogOut,
  Euro,
  Dog,
  Cigarette,
  Baby,
  PartyPopper,
  Globe2,
  Car,
  Star,
  BadgeCheck,
  Accessibility,
  Building2,
} from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { Pillar, Place } from "@/lib/types";
import { pick } from "@/lib/types";
import { Container, Badge } from "@/components/ui";
import { PlaceCard } from "@/components/PlaceCard";
import { EventCard } from "@/components/EventCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { JsonLd } from "@/components/JsonLd";
import { MiniMapClient } from "@/components/map/MiniMapClient";
import { Link } from "@/i18n/navigation";
import { pillars } from "@/lib/site";
import { cityHref, mapsHref, pillarHref, areaHref } from "@/lib/links";
import { formatDate, formatDistance, priceRangeLabel } from "@/lib/format";
import { getArea } from "@/content/data/areas";
import {
  groupAmenities,
  viewLabel,
  parkingLabel,
  accessibilityLabel,
  cancellationLabel,
  languageLabel,
  propertyTypeLabel,
  checkInMethodLabel,
  serviceTypeLabel,
  priceModelLabel,
} from "@/content/data/amenities";
import {
  getNearbyEvents,
  getNearbyPlaces,
  getSimilarPlaces,
  type NearbyResult,
} from "@/lib/repo";

type StayPillar = Exclude<Pillar, "events">;

const schemaType: Record<StayPillar, string> = {
  stay: "LodgingBusiness",
  eat: "Restaurant",
  drink: "BarOrPub",
  discover: "TouristAttraction",
  experiences: "TouristAttraction",
  services: "Service",
};

function Fact({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2 text-sm text-slate-700">
      <Icon className="h-4 w-4 shrink-0 text-brand-600" />
      <span>{children}</span>
    </div>
  );
}

function PolicyItem({
  ok,
  icon: Icon,
  children,
}: {
  ok: boolean;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className={`h-4 w-4 ${ok ? "text-brand-600" : "text-slate-300"}`} />
      <span className={ok ? "text-slate-700" : "text-slate-400 line-through"}>
        {children}
      </span>
    </div>
  );
}

function NearbyRow({
  title,
  results,
  locale,
}: {
  title: string;
  results: NearbyResult<Place>[];
  locale: Locale;
}) {
  if (!results.length) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {results.map(({ item, meters }) => (
          <PlaceCard
            key={item.slug}
            place={item}
            locale={locale}
            distanceLabel={formatDistance(meters, locale)}
          />
        ))}
      </div>
    </section>
  );
}

export async function PlaceDetail({
  place,
  locale,
}: {
  place: Place;
  locale: Locale;
}) {
  const t = await getTranslations({ locale });
  const pillar = place.kind as StayPillar;
  const label = pick(pillars[pillar].label, locale);
  const area = getArea(place.geo.area);
  const photo = place.photos[0];
  const stay = place.kind === "stay" ? place.stay : undefined;
  const service = place.kind === "services" ? place.service : undefined;
  const amenityGroups = place.amenities ? groupAmenities(place.amenities) : [];

  // Knowledge graph: the "otherPillars" a place links out to.
  const nearbyEat =
    pillar !== "eat" ? getNearbyPlaces(place.geo, "eat", { limit: 4, excludeSlug: place.slug }) : [];
  const nearbyDrink =
    pillar !== "drink" ? getNearbyPlaces(place.geo, "drink", { limit: 4, excludeSlug: place.slug }) : [];
  const nearbyDiscover =
    pillar !== "discover" ? getNearbyPlaces(place.geo, "discover", { limit: 4, excludeSlug: place.slug }) : [];
  const nearbyStay =
    pillar !== "stay" ? getNearbyPlaces(place.geo, "stay", { limit: 4, excludeSlug: place.slug }) : [];
  const nearbyEvents = getNearbyEvents(place.geo, { limit: 3 });
  const similar = getSimilarPlaces(place, 4);

  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType[pillar],
    name: pick(place.name, locale),
    description: pick(place.summary, locale),
    address: place.geo.address
      ? { "@type": "PostalAddress", streetAddress: pick(place.geo.address, locale), addressLocality: "Thessaloniki", addressCountry: "GR" }
      : undefined,
    geo: { "@type": "GeoCoordinates", latitude: place.geo.lat, longitude: place.geo.lng },
    image: photo?.url,
    telephone: place.contact.phone,
    url: place.contact.website,
    ...(place.priceRange ? { priceRange: priceRangeLabel(place.priceRange) } : {}),
    ...(place.amenities?.length
      ? {
          amenityFeature: place.amenities.map((a) => ({
            "@type": "LocationFeatureSpecification",
            name: a,
            value: true,
          })),
        }
      : {}),
    ...(stay
      ? {
          ...(stay.checkIn ? { checkinTime: stay.checkIn } : {}),
          ...(stay.checkOut ? { checkoutTime: stay.checkOut } : {}),
          ...(stay.bedrooms ? { numberOfRooms: stay.bedrooms } : {}),
          ...(stay.policies?.pets !== undefined
            ? { petsAllowed: stay.policies.pets }
            : {}),
          ...(stay.languages?.length
            ? { availableLanguage: stay.languages }
            : {}),
        }
      : {}),
    ...(place.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: place.rating.average,
            reviewCount: place.rating.count,
          },
        }
      : {}),
  };

  return (
    <>
      <JsonLd data={ld} />
      {place.faqs?.length ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: place.faqs.map((f) => ({
              "@type": "Question",
              name: pick(f.question, locale),
              acceptedAnswer: { "@type": "Answer", text: pick(f.answer, locale) },
            })),
          }}
        />
      ) : null}

      <Container>
        <Breadcrumbs
          locale={locale}
          items={[
            { label: t("common.home"), href: "/" },
            { label, href: pillarHref(pillar) },
            { label: "Θεσσαλονίκη", href: cityHref(pillar) },
            { label: pick(place.name, locale) },
          ]}
        />

        {/* Hero */}
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

        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          {/* Main */}
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted">
              {area ? (
                <Link
                  href={areaHref(area.slug)}
                  className="inline-flex items-center gap-1 hover:text-brand-700"
                >
                  <MapPin className="h-4 w-4" /> {pick(area.name, locale)}
                </Link>
              ) : null}
              {place.priceRange ? (
                <span className="text-brand-600">
                  · {priceRangeLabel(place.priceRange)}
                </span>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-extrabold sm:text-4xl">
                {pick(place.name, locale)}
              </h1>
              {place.verified ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-sm font-semibold text-brand-700">
                  <BadgeCheck className="h-4 w-4" /> {t("place.verified")}
                </span>
              ) : null}
            </div>
            {place.rating ? (
              <div className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-ink">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {place.rating.average.toFixed(1)}
                <span className="font-normal text-muted">
                  ({place.rating.count} {t("place.reviews")})
                </span>
              </div>
            ) : null}
            <p className="mt-3 text-lg text-muted">{pick(place.summary, locale)}</p>

            {stay ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {stay.propertyType ? (
                  <Fact icon={Building2}>
                    {pick(propertyTypeLabel(stay.propertyType), locale)}
                  </Fact>
                ) : null}
                {stay.maxGuests ? (
                  <Fact icon={Users}>
                    {stay.maxGuests} {t("stay.guests")}
                  </Fact>
                ) : null}
                {stay.bedrooms ? (
                  <Fact icon={BedDouble}>
                    {stay.bedrooms} {t("stay.bedrooms")}
                  </Fact>
                ) : null}
                {stay.beds ? (
                  <Fact icon={BedDouble}>
                    {stay.beds} {t("stay.beds")}
                  </Fact>
                ) : null}
                {stay.bathrooms ? (
                  <Fact icon={Bath}>
                    {stay.bathrooms} {t("stay.bathrooms")}
                  </Fact>
                ) : null}
                {stay.sizeSqm ? <Fact icon={Ruler}>{stay.sizeSqm} m²</Fact> : null}
                {stay.floor ? (
                  <Fact icon={Building2}>
                    {t("stay.floor")} {stay.floor}
                  </Fact>
                ) : null}
                {stay.views?.map((v) => (
                  <Fact key={v} icon={MapPin}>
                    {pick(viewLabel(v), locale)}
                  </Fact>
                ))}
              </div>
            ) : null}

            {service ? (
              <div className="mt-4 flex flex-wrap gap-2">
                <Fact icon={Building2}>
                  {pick(serviceTypeLabel(service.serviceType), locale)}
                </Fact>
                {service.capacityPassengers ? (
                  <Fact icon={Users}>
                    {service.capacityPassengers} {t("service.passengers")}
                  </Fact>
                ) : null}
                {service.coverageAreas?.length ? (
                  <Fact icon={MapPin}>
                    {service.coverageAreas
                      .map((c) => {
                        const a = getArea(c);
                        if (a) return pick(a.name, locale);
                        if (c === "all-greece")
                          return locale === "el" ? "Όλη η Ελλάδα" : "All of Greece";
                        if (c === "all-thessaloniki")
                          return locale === "el"
                            ? "Όλη η Θεσσαλονίκη"
                            : "All of Thessaloniki";
                        return c;
                      })
                      .join(", ")}
                  </Fact>
                ) : null}
                {service.availability ? (
                  <Fact icon={Clock}>{pick(service.availability, locale)}</Fact>
                ) : null}
                {service.languages?.length ? (
                  <Fact icon={Globe2}>
                    {service.languages
                      .map((c) => languageLabel(c, locale))
                      .join(", ")}
                  </Fact>
                ) : null}
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              {place.tags.map((tag) => (
                <Badge key={tag} tone="neutral">
                  {tag}
                </Badge>
              ))}
            </div>

            <section className="mt-8">
              <h2 className="mb-2 text-xl font-bold">{t("place.about")}</h2>
              <MarkdownBody>{pick(place.description, locale)}</MarkdownBody>
            </section>

            {amenityGroups.length ? (
              <section className="mt-8">
                <h2 className="mb-4 text-xl font-bold">{t("place.amenities")}</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {amenityGroups.map(({ group, items }) => (
                    <div key={group.key}>
                      <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-400">
                        {pick(group.label, locale)}
                      </h3>
                      <ul className="flex flex-wrap gap-2">
                        {items.map((a) => (
                          <li
                            key={a.key}
                            className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
                          >
                            {pick(a.label, locale)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {stay ? (
              <section className="mt-8">
                <h2 className="mb-4 text-xl font-bold">{t("stay.details")}</h2>
                <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {stay.checkIn ? (
                    <div className="flex items-center gap-2 text-sm">
                      <LogIn className="h-4 w-4 text-brand-600" />
                      <dt className="text-muted">{t("stay.checkIn")}:</dt>
                      <dd className="font-medium">{stay.checkIn}</dd>
                    </div>
                  ) : null}
                  {stay.checkOut ? (
                    <div className="flex items-center gap-2 text-sm">
                      <LogOut className="h-4 w-4 text-brand-600" />
                      <dt className="text-muted">{t("stay.checkOut")}:</dt>
                      <dd className="font-medium">{stay.checkOut}</dd>
                    </div>
                  ) : null}
                  {stay.checkInMethod ? (
                    <div className="flex items-center gap-2 text-sm">
                      <LogIn className="h-4 w-4 text-brand-600" />
                      <dt className="text-muted">{t("stay.checkInMethod")}:</dt>
                      <dd className="font-medium">
                        {pick(checkInMethodLabel(stay.checkInMethod), locale)}
                      </dd>
                    </div>
                  ) : null}
                  {stay.cancellation ? (
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarCheck className="h-4 w-4 text-brand-600" />
                      <dt className="text-muted">{t("stay.cancellation")}:</dt>
                      <dd className="font-medium">
                        {pick(cancellationLabel(stay.cancellation), locale)}
                      </dd>
                    </div>
                  ) : null}
                  {stay.parking ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Car className="h-4 w-4 text-brand-600" />
                      <dt className="text-muted">{t("stay.parking")}:</dt>
                      <dd className="font-medium">
                        {pick(parkingLabel(stay.parking), locale)}
                      </dd>
                    </div>
                  ) : null}
                  {stay.languages?.length ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe2 className="h-4 w-4 text-brand-600" />
                      <dt className="text-muted">{t("stay.languages")}:</dt>
                      <dd className="font-medium">
                        {stay.languages
                          .map((c) => languageLabel(c, locale))
                          .join(", ")}
                      </dd>
                    </div>
                  ) : null}
                </dl>

                {stay.accessibility?.length ? (
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                    <Accessibility className="h-4 w-4 text-brand-600" />
                    {stay.accessibility.map((a) => (
                      <span
                        key={a}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-slate-700"
                      >
                        {pick(accessibilityLabel(a), locale)}
                      </span>
                    ))}
                  </div>
                ) : null}

                {stay.policies ? (
                  <div className="mt-5">
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-400">
                      {t("stay.policies")}
                    </h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {stay.policies.pets !== undefined ? (
                        <PolicyItem ok={stay.policies.pets} icon={Dog}>
                          {t("stay.pets")}
                        </PolicyItem>
                      ) : null}
                      {stay.policies.smoking !== undefined ? (
                        <PolicyItem ok={stay.policies.smoking} icon={Cigarette}>
                          {t("stay.smoking")}
                        </PolicyItem>
                      ) : null}
                      {stay.policies.children !== undefined ? (
                        <PolicyItem ok={stay.policies.children} icon={Baby}>
                          {t("stay.children")}
                        </PolicyItem>
                      ) : null}
                      {stay.policies.parties !== undefined ? (
                        <PolicyItem ok={stay.policies.parties} icon={PartyPopper}>
                          {t("stay.parties")}
                        </PolicyItem>
                      ) : null}
                    </div>
                    {stay.policies.quietHours ? (
                      <p className="mt-2 text-sm text-muted">
                        {t("stay.quietHours")}: {stay.policies.quietHours}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </section>
            ) : null}

            {place.offers?.length ? (
              <section className="mt-8">
                <h2 className="mb-3 text-xl font-bold">{t("place.offers")}</h2>
                <div className="space-y-3">
                  {place.offers.map((o) => (
                    <div
                      key={o.id}
                      className="rounded-xl border border-accent-200 bg-accent-50 p-4"
                    >
                      <p className="font-semibold text-accent-800">
                        {pick(o.title, locale)}
                      </p>
                      <p className="text-sm text-accent-700">
                        {pick(o.description, locale)}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {place.faqs?.length ? (
              <section className="mt-8">
                <h2 className="mb-3 text-xl font-bold">{t("place.faqs")}</h2>
                <div className="divide-y divide-slate-100 rounded-xl border border-slate-100">
                  {place.faqs.map((f, i) => (
                    <details key={i} className="group p-4">
                      <summary className="cursor-pointer font-semibold text-ink">
                        {pick(f.question, locale)}
                      </summary>
                      <p className="mt-2 text-sm text-muted">
                        {pick(f.answer, locale)}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            <p className="mt-8 inline-flex items-center gap-1 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5" /> {t("place.updated")}:{" "}
              {formatDate(place.updatedAt, locale)}
            </p>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              {stay?.priceFrom ? (
                <div className="mb-4 border-b border-slate-100 pb-4">
                  <p className="text-2xl font-extrabold text-ink">
                    {t("common.from")}{" "}
                    {new Intl.NumberFormat(locale === "el" ? "el-GR" : "en-GB", {
                      style: "currency",
                      currency: stay.currency ?? "EUR",
                      maximumFractionDigits: 0,
                    }).format(stay.priceFrom)}
                    <span className="text-sm font-normal text-muted">
                      {" "}
                      / {t("stay.perNight")}
                    </span>
                  </p>
                  {stay.minNights ? (
                    <p className="mt-1 text-xs text-muted">
                      {t("stay.minNights", { count: stay.minNights })}
                    </p>
                  ) : null}
                </div>
              ) : null}
              {service?.priceFrom ? (
                <div className="mb-4 border-b border-slate-100 pb-4">
                  <p className="text-2xl font-extrabold text-ink">
                    {t("common.from")}{" "}
                    {new Intl.NumberFormat(locale === "el" ? "el-GR" : "en-GB", {
                      style: "currency",
                      currency: service.currency ?? "EUR",
                      maximumFractionDigits: 0,
                    }).format(service.priceFrom)}
                    <span className="text-sm font-normal text-muted">
                      {" "}
                      {pick(priceModelLabel(service.priceModel ?? "quote"), locale)}
                    </span>
                  </p>
                </div>
              ) : null}
              <h2 className="mb-4 text-lg font-bold">{t("place.contact")}</h2>
              <div className="space-y-2">
                {place.contact.bookingUrl ? (
                  <a
                    href={place.contact.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-600 px-4 py-2.5 font-semibold text-white transition hover:bg-accent-700"
                  >
                    <CalendarCheck className="h-5 w-5" /> {t("place.book")}
                  </a>
                ) : null}
                {place.contact.phone ? (
                  <a
                    href={`tel:${place.contact.phone}`}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium transition hover:border-brand-300 hover:text-brand-700"
                  >
                    <Phone className="h-4 w-4" /> {t("place.call")}
                  </a>
                ) : null}
                {place.contact.whatsapp ? (
                  <a
                    href={`https://wa.me/${place.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium transition hover:border-brand-300 hover:text-brand-700"
                  >
                    <MessageCircle className="h-4 w-4" /> {t("place.whatsapp")}
                  </a>
                ) : null}
                {place.contact.email ? (
                  <a
                    href={`mailto:${place.contact.email}`}
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium transition hover:border-brand-300 hover:text-brand-700"
                  >
                    <Mail className="h-4 w-4" /> {t("place.email")}
                  </a>
                ) : null}
                {place.contact.website ? (
                  <a
                    href={place.contact.website}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium transition hover:border-brand-300 hover:text-brand-700"
                  >
                    <Globe className="h-4 w-4" /> {t("place.website")}
                  </a>
                ) : null}
              </div>

              <hr className="my-4 border-slate-100" />
              <h3 className="mb-2 text-sm font-bold text-slate-500">
                {t("place.location")}
              </h3>
              <div className="mb-3">
                <MiniMapClient
                  lat={place.geo.lat}
                  lng={place.geo.lng}
                  label={pick(place.name, locale)}
                />
              </div>
              <a
                href={mapsHref(place.geo)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:underline"
              >
                <MapPin className="h-4 w-4" /> {t("place.getDirections")}
              </a>
            </div>
          </aside>
        </div>

        {/* Knowledge graph */}
        <NearbyRow title={t("place.nearbyEat")} results={nearbyEat} locale={locale} />
        <NearbyRow title={t("place.nearbyDrink")} results={nearbyDrink} locale={locale} />
        <NearbyRow title={t("place.nearbyDiscover")} results={nearbyDiscover} locale={locale} />
        <NearbyRow title={t("place.nearbyStay")} results={nearbyStay} locale={locale} />

        {nearbyEvents.length ? (
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-bold">{t("place.nearbyEvents")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {nearbyEvents.map(({ item }) => (
                <EventCard key={item.slug} event={item} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}

        {similar.length ? (
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-bold">{t("place.similar")}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((item) => (
                <PlaceCard key={item.slug} place={item} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}

        {area ? (
          <div className="mt-10">
            <Link
              href={areaHref(area.slug)}
              className="inline-flex items-center gap-2 rounded-2xl border border-brand-100 bg-brand-50 px-5 py-4 font-semibold text-brand-800 transition hover:border-brand-200"
            >
              <MapPin className="h-5 w-5" />
              {t("place.exploreArea", { area: pick(area.name, locale) })}
            </Link>
          </div>
        ) : null}
      </Container>
    </>
  );
}

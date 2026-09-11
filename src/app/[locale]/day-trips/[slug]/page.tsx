import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, MapPin } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { PhotoCredit } from "@/components/PhotoCredit";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { RelatedLinks } from "@/components/RelatedLinks";
import { buildMetadata } from "@/lib/seo";
import { dayTripHref } from "@/lib/links";
import { dayTrips, getDayTrip } from "@/content/data/daytrips";

export function generateStaticParams() {
  return dayTrips.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const d = getDayTrip(slug);
  if (!d) return {};
  return buildMetadata({
    locale,
    path: dayTripHref(slug),
    title: `${pick(d.name, locale)} — ${locale === "el" ? "Εκδρομή από Θεσσαλονίκη" : "Day trip from Thessaloniki"}`,
    description: pick(d.summary, locale),
    images: d.photos[0] ? [d.photos[0].url] : undefined,
    type: "article",
  });
}

export default async function DayTripPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const d = getDayTrip(slug);
  if (!d) notFound();
  const photo = d.photos[0];
  // Same category first — someone reading about Vergina is likelier to want
  // Meteora than a beach — then whatever else fills the row.
  const others = [...dayTrips]
    .filter((o) => o.slug !== d.slug)
    .sort((a, b) => Number(b.category === d.category) - Number(a.category === d.category))
    .slice(0, 4);

  return (
    <Container className="max-w-3xl py-4">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label: t("daytrips.title"), href: "/day-trips" },
          { label: pick(d.name, locale) },
        ]}
      />
      <h1 className="text-3xl font-extrabold sm:text-4xl">{pick(d.name, locale)}</h1>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
        <span className="inline-flex items-center gap-1">
          <Clock className="h-4 w-4 text-brand-600" /> {pick(d.drivingTime, locale)}
        </span>
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-4 w-4 text-brand-600" /> {d.distanceKm} km {t("daytrips.fromCity")}
        </span>
      </div>

      {photo ? (
        <>
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-3xl bg-slate-100">
            <Image
              src={photo.url}
              alt={pick(photo.alt, locale)}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          <PhotoCredit photo={photo} className="mt-2 text-right" />
        </>
      ) : null}

      <MarkdownBody locale={locale} selfHref={dayTripHref(d.slug)}>
        {pick(d.description, locale)}
      </MarkdownBody>

      {/* These pages used to end here with no outgoing link at all. */}
      <RelatedLinks
        title={t("related.moreTrips")}
        more={{ href: "/day-trips", label: t("related.allTrips") }}
        items={others.map((o) => ({
          href: dayTripHref(o.slug),
          label: pick(o.name, locale),
          hint: `${o.distanceKm} km · ${pick(o.drivingTime, locale)}`,
        }))}
      />

      <RelatedLinks
        title={t("related.planYourTrip")}
        items={[
          { href: "/plan", label: t("nav.plan"), hint: t("related.planYourTripText") },
          { href: "/when-to-visit", label: t("nav.whenToVisit") },
          // The combined-holiday page belongs with Chalkidiki and nowhere else.
          ...(d.slug === "chalkidiki"
            ? [{ href: "/thessaloniki-and-chalkidiki", label: t("nav.combos") }]
            : []),
        ]}
      />
    </Container>
  );
}

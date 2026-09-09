import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { dayTripHref } from "@/lib/links";
import { dayTrips } from "@/content/data/daytrips";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "daytrips" });
  return buildMetadata({
    locale,
    path: "/day-trips",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function DayTripsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <Container className="py-8">
      <Breadcrumbs
        locale={locale}
        items={[{ label: t("common.home"), href: "/" }, { label: t("daytrips.title") }]}
      />
      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{t("daytrips.title")}</h1>
        <p className="mt-3 text-lg text-muted">{t("daytrips.subtitle")}</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {dayTrips.map((d) => {
          const photo = d.photos[0];
          return (
            <Link
              key={d.slug}
              href={dayTripHref(d.slug)}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                {photo ? (
                  <Image
                    src={photo.url}
                    alt={pick(photo.alt, locale)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h2 className="font-bold text-ink group-hover:text-brand-700">
                  {pick(d.name, locale)}
                </h2>
                <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted">
                  {pick(d.summary, locale)}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {pick(d.drivingTime, locale)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {d.distanceKm} km
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}

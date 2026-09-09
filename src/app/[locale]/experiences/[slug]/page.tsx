import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { PlaceDetail } from "@/components/pages/place-detail";
import { placeMetadata } from "@/lib/page-meta";
import { getFilePlaces, getPlace } from "@/lib/repo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getFilePlaces("experiences").map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  return placeMetadata("experiences", slug, locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const place = await getPlace("experiences", slug);
  if (!place) notFound();
  return <PlaceDetail place={place} locale={locale} />;
}

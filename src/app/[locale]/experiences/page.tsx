import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PillarIndex } from "@/components/pages/listing";
import { pillarIndexMetadata } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pillarIndexMetadata("experiences", locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PillarIndex pillar="experiences" locale={locale} />;
}

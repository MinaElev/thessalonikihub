import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { CollectionListing } from "@/components/pages/listing";
import { collectionMetadata } from "@/lib/page-meta";
import { getCollection, getCollections } from "@/lib/repo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getCollections("stay").map((c) => ({ locale, collection: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; collection: string }>;
}): Promise<Metadata> {
  const { locale, collection } = await params;
  return collectionMetadata("stay", collection, locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; collection: string }>;
}) {
  const { locale, collection } = await params;
  setRequestLocale(locale);
  if (!getCollection("stay", collection)) notFound();
  return <CollectionListing pillar="stay" slug={collection} locale={locale} />;
}

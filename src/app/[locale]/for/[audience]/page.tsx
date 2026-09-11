import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Collection, Pillar } from "@/lib/types";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { PlaceCard } from "@/components/PlaceCard";
import { GuideCard } from "@/components/GuideCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { buildMetadata } from "@/lib/seo";
import { audienceHref, collectionHref } from "@/lib/links";
import { audiences, getAudience } from "@/content/data/audiences";
import { getCollection, getGuide, getPlacesByTags } from "@/lib/repo";

export function generateStaticParams() {
  return audiences.map((a) => ({ audience: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; audience: string }>;
}): Promise<Metadata> {
  const { locale, audience } = await params;
  const a = getAudience(audience);
  if (!a) return {};
  return buildMetadata({
    locale,
    path: audienceHref(audience),
    title: `${pick(a.name, locale)} — ${locale === "el" ? "Θεσσαλονίκη" : "Thessaloniki"}`,
    description: pick(a.blurb, locale),
  });
}

export default async function AudiencePage({
  params,
}: {
  params: Promise<{ locale: Locale; audience: string }>;
}) {
  const { locale, audience } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const a = getAudience(audience);
  if (!a) notFound();

  const places = await getPlacesByTags(a.tags, 6);
  const guides = a.guides.map((s) => getGuide(s)).filter(Boolean);
  const collections = a.collections
    .map((ref) => {
      const [pillar, slug] = ref.split(":");
      return getCollection(pillar as Pillar, slug);
    })
    .filter((c): c is Collection => Boolean(c));

  return (
    <Container className="py-8">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label: t("audiences.title"), href: "/for" },
          { label: pick(a.name, locale) },
        ]}
      />
      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{pick(a.name, locale)}</h1>
        <div className="mt-4">
          <MarkdownBody locale={locale}>{pick(a.intro, locale)}</MarkdownBody>
        </div>
      </header>

      {collections.length ? (
        <div className="mb-10 flex flex-wrap gap-2">
          {collections.map((c) => (
            <Link
              key={`${c.pillar}-${c.slug}`}
              href={collectionHref(c)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-brand-300 hover:text-brand-700"
            >
              {pick(c.heading, locale)}
            </Link>
          ))}
        </div>
      ) : null}

      {places.length ? (
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">{t("audiences.recommended")}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((p) => (
              <PlaceCard key={p.slug} place={p} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}

      {guides.length ? (
        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-bold">{t("audiences.guidesFor")}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <GuideCard key={g!.slug} guide={g!} locale={locale} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-6">
        <Link
          href="/for"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:gap-2"
        >
          {t("audiences.all")} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Container>
  );
}

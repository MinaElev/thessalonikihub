import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { PhotoCredit } from "@/components/PhotoCredit";
import { Container } from "@/components/ui";
import { PlaceCard } from "@/components/PlaceCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { guideHref } from "@/lib/links";
import { formatDate } from "@/lib/format";
import { absoluteUrl } from "@/lib/site";
import { getGuide, getGuides, getPlaceBySlug } from "@/lib/repo";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getGuides().map((g) => ({ locale, slug: g.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return buildMetadata({
    locale,
    path: guideHref(guide),
    title: pick(guide.title, locale),
    description: pick(guide.excerpt, locale),
    images: [guide.cover.url],
    type: "article",
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = (
    await Promise.all((guide.relatedPlaces ?? []).map((s) => getPlaceBySlug(s)))
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: pick(guide.title, locale),
          description: pick(guide.excerpt, locale),
          image: guide.cover.url,
          datePublished: guide.publishedAt,
          dateModified: guide.updatedAt,
          author: { "@type": "Organization", name: guide.author },
          publisher: { "@type": "Organization", name: "ThessalonikiHub" },
          mainEntityOfPage: absoluteUrl(locale, guideHref(guide)),
          inLanguage: locale,
        }}
      />
      <Container className="max-w-3xl">
        <Breadcrumbs
          locale={locale}
          items={[
            { label: t("common.home"), href: "/" },
            { label: t("guides.title"), href: "/guides" },
            { label: pick(guide.title, locale) },
          ]}
        />
        <article>
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            {pick(guide.title, locale)}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {t("guides.publishedOn")} {formatDate(guide.publishedAt, locale)} ·{" "}
            {t("guides.by")} {guide.author}
          </p>
          <div className="relative my-6 aspect-[16/9] overflow-hidden rounded-3xl bg-slate-100">
            <Image
              src={guide.cover.url}
              alt={pick(guide.cover.alt, locale)}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          <PhotoCredit photo={guide.cover} className="-mt-4 mb-6 text-right" />
          <p className="mb-6 text-lg text-muted">{pick(guide.excerpt, locale)}</p>
          <MarkdownBody>{pick(guide.body, locale)}</MarkdownBody>
        </article>

        {related.length ? (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold">{t("guides.relatedPlaces")}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PlaceCard key={p.slug} place={p} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </>
  );
}

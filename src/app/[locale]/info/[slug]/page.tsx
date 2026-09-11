import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarkdownBody } from "@/components/MarkdownBody";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";
import { staticPages, getStaticPage } from "@/content/data/pages";

/**
 * About, contact, privacy and terms.
 *
 * These sat in the footer as plain text for pages that did not exist, which is
 * worse than not listing them: the site collects email addresses for the
 * newsletter and for accounts, and had no privacy policy to point at.
 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    staticPages.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = getStaticPage(slug);
  if (!page) return {};
  return buildMetadata({
    locale,
    path: `/info/${slug}`,
    title: pick(page.title, locale),
    description: pick(page.intro, locale),
  });
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const page = getStaticPage(slug);
  if (!page) notFound();
  const t = await getTranslations({ locale });

  return (
    <Container className="py-8">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: t("common.home"), href: "/" },
          { label: pick(page.title, locale) },
        ]}
      />

      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          {pick(page.title, locale)}
        </h1>
        <p className="mt-3 text-lg text-muted">{pick(page.intro, locale)}</p>

        <div className="mt-8">
          {/* No auto-linking here: a privacy policy should not sprout links to
              metro stations because it happens to name a district. */}
          <MarkdownBody>{pick(page.body, locale)}</MarkdownBody>
        </div>

        <p className="mt-10 border-t border-slate-100 pt-4 text-sm text-muted">
          {t("guides.publishedOn")} {formatDate(page.updatedAt, locale)}
        </p>
      </div>
    </Container>
  );
}

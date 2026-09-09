import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { GuideCard } from "@/components/GuideCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { getGuides } from "@/lib/repo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guides" });
  return buildMetadata({
    locale,
    path: "/guides",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const guides = getGuides();

  return (
    <Container>
      <Breadcrumbs
        locale={locale}
        items={[{ label: t("common.home"), href: "/" }, { label: t("guides.title") }]}
      />
      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{t("guides.title")}</h1>
        <p className="mt-3 text-lg text-muted">{t("guides.subtitle")}</p>
      </header>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <GuideCard key={g.slug} guide={g} locale={locale} />
        ))}
      </div>
    </Container>
  );
}

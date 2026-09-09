import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { areaHref } from "@/lib/links";
import { areas } from "@/content/data/areas";
import { getPlacesInArea } from "@/lib/repo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "areas" });
  return buildMetadata({
    locale,
    path: "/areas",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function AreasPage({
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
        items={[{ label: t("common.home"), href: "/" }, { label: t("areas.title") }]}
      />
      <header className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{t("areas.title")}</h1>
        <p className="mt-3 text-lg text-muted">{t("areas.subtitle")}</p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {areas.map((a) => {
          const count = getPlacesInArea(a.slug).length;
          return (
            <Link
              key={a.slug}
              href={areaHref(a.slug)}
              className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
            >
              <span className="inline-flex items-center gap-1 text-lg font-bold text-brand-700 group-hover:text-brand-800">
                <MapPin className="h-4 w-4" /> {pick(a.name, locale)}
              </span>
              <span className="mt-2 flex-1 text-sm text-muted">
                {pick(a.blurb, locale)}
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                {t("common.readMore")} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}

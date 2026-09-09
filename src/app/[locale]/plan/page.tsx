import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { planFaqs } from "@/content/data/faq";
import { getGuides } from "@/lib/repo";
import { guideHref } from "@/lib/links";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "plan" });
  return buildMetadata({
    locale,
    path: "/plan",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function PlanPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const itineraries = getGuides().filter((g) => g.category === "itinerary").slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: planFaqs.map((f) => ({
            "@type": "Question",
            name: pick(f.q, locale),
            acceptedAnswer: { "@type": "Answer", text: pick(f.a, locale) },
          })),
        }}
      />
      <Container className="max-w-3xl py-8">
        <Breadcrumbs
          locale={locale}
          items={[{ label: t("common.home"), href: "/" }, { label: t("plan.title") }]}
        />
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{t("plan.title")}</h1>
          <p className="mt-3 text-lg text-muted">{t("plan.subtitle")}</p>
        </header>

        <div className="divide-y divide-slate-100 rounded-2xl border border-slate-100">
          {planFaqs.map((f, i) => (
            <details key={i} className="group p-5" open={i === 0}>
              <summary className="cursor-pointer text-lg font-semibold text-ink">
                {pick(f.q, locale)}
              </summary>
              <p className="mt-2 text-muted">{pick(f.a, locale)}</p>
            </details>
          ))}
        </div>

        {itineraries.length ? (
          <section className="mt-10">
            <h2 className="mb-4 text-xl font-bold">{t("plan.itineraries")}</h2>
            <ul className="space-y-2">
              {itineraries.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={guideHref(g)}
                    className="inline-flex items-center gap-1 font-medium text-brand-700 hover:gap-2"
                  >
                    {pick(g.title, locale)} <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </>
  );
}

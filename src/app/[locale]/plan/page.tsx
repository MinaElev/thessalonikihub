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
  /*
   * Every itinerary, not the first three.
   *
   * "How many days do I need in Thessaloniki" is the question this page
   * exists to answer, and the site now has a plan for one, two, three, four
   * and five days. Showing three of them and hiding the rest answered it
   * badly — and the ones that got cut were the longer stays, which are the
   * readers who have not booked yet.
   */
  /*
   * Ordered by length, shortest first, with the themed ones after.
   *
   * The day count comes from the slug — "1-day-in-…", "4-days-in-…" — which
   * is the only place it exists as a number. Source order put them 1, 2, 4,
   * 5, romantic weekend, 3, which reads like a mistake because it is one.
   */
  const days = (slug: string) => Number(/^(\d+)-days?-/.exec(slug)?.[1] ?? Infinity);
  const itineraries = getGuides()
    .filter((g) => g.category === "itinerary")
    .sort((a, b) => days(a.slug) - days(b.slug));

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
            <h2 className="mb-1 text-xl font-bold">{t("plan.itineraries")}</h2>
            <p className="mb-4 text-sm text-muted">{t("plan.itinerariesHint")}</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {itineraries.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={guideHref(g)}
                    className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
                  >
                    <span className="font-bold text-ink group-hover:text-brand-700">
                      {pick(g.title, locale)}
                    </span>
                    <span className="mt-1 flex-1 text-sm text-muted">
                      {pick(g.excerpt, locale)}
                    </span>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                      {t("common.readMore")} <ArrowRight className="h-4 w-4" />
                    </span>
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

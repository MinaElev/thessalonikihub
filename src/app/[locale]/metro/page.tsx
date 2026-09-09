import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, TrainFront, Clock, Ticket, Plane } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { metroStationHref } from "@/lib/links";
import { getMetroStations, metroFacts } from "@/content/data/metro";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metro" });
  return buildMetadata({
    locale,
    path: "/metro",
    title: t("title"),
    description: t("subtitle"),
  });
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {label}
        </p>
        <p className="mt-0.5 font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}

export default async function MetroPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const stations = getMetroStations();
  const el = locale === "el";

  const trunk = stations.filter((s) => s.branch === "trunk");
  const east = stations.filter((s) => s.branch === "nea-elvetia");
  const south = stations.filter((s) => s.branch === "kalamaria");

  const groups = [
    { key: "trunk", label: t("metro.trunk"), stations: trunk },
    { key: "east", label: t("metro.branchEast"), stations: east },
    { key: "south", label: t("metro.branchSouth"), stations: south },
  ];

  return (
    <Container className="py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: el
                ? "Πηγαίνει το μετρό Θεσσαλονίκης στο αεροδρόμιο;"
                : "Does the Thessaloniki Metro go to the airport?",
              acceptedAnswer: {
                "@type": "Answer",
                text: el
                  ? `Όχι. Το μετρό δεν φτάνει στο αεροδρόμιο «Μακεδονία». Κατεβαίνεις στον τερματικό σταθμό Μίκρα και συνεχίζεις με τη λεωφορειακή γραμμή Χ3, με ειδικό κόμιστρο ${metroFacts.airportBusFareEur},00 €.`
                  : `No. The metro does not reach "Makedonia" Airport. Get off at the Mikra terminus and continue on bus line X3, which has a special fare of €${metroFacts.airportBusFareEur}.00.`,
              },
            },
            {
              "@type": "Question",
              name: el
                ? "Πόσο κοστίζει το εισιτήριο του μετρό Θεσσαλονίκης;"
                : "How much is a Thessaloniki Metro ticket?",
              acceptedAnswer: {
                "@type": "Answer",
                text: el
                  ? `Το εισιτήριο απλής διαδρομής κοστίζει 0,60 € και το ημερήσιο 2,50 €, με ισχύ 24 ωρών από την πρώτη επικύρωση.`
                  : `A single ticket costs €0.60 and a day ticket €2.50, valid for 24 hours from first validation.`,
              },
            },
            {
              "@type": "Question",
              name: el
                ? "Τι ώρα ξεκινά και τι ώρα κλείνει το μετρό Θεσσαλονίκης;"
                : "What are the Thessaloniki Metro opening hours?",
              acceptedAnswer: {
                "@type": "Answer",
                text: el
                  ? `Τα δρομολόγια ξεκινούν στις ${metroFacts.firstTrain}. Το τελευταίο δρομολόγιο είναι στις ${metroFacts.lastTrainWeek} από Κυριακή έως Πέμπτη και στις ${metroFacts.lastTrainWeekend} Παρασκευή και Σάββατο.`
                  : `Services start at ${metroFacts.firstTrain}. The last train runs at ${metroFacts.lastTrainWeek} from Sunday to Thursday and at ${metroFacts.lastTrainWeekend} on Friday and Saturday.`,
              },
            },
            {
              "@type": "Question",
              name: el
                ? "Πόσοι σταθμοί έχει το μετρό Θεσσαλονίκης;"
                : "How many stations does the Thessaloniki Metro have?",
              acceptedAnswer: {
                "@type": "Answer",
                text: el
                  ? `${metroFacts.stations} σταθμοί σε δίκτυο περίπου ${metroFacts.lengthKm} χιλιομέτρων. Η βασική γραμμή άνοιξε στις 30 Νοεμβρίου 2024 και η επέκταση προς Καλαμαριά στις 27 Αυγούστου 2026.`
                  : `${metroFacts.stations} stations across a network of about ${metroFacts.lengthKm} km. The main line opened on 30 November 2024 and the Kalamaria extension on 27 August 2026.`,
              },
            },
          ],
        }}
      />

      <Breadcrumbs
        locale={locale}
        items={[{ label: t("common.home"), href: "/" }, { label: t("metro.title") }]}
      />

      <header className="mb-8 max-w-3xl">
        <h1 className="inline-flex items-center gap-2 text-3xl font-extrabold sm:text-4xl">
          <TrainFront className="h-8 w-8 text-brand-600" /> {t("metro.title")}
        </h1>
        <p className="mt-3 text-lg text-muted">{t("metro.subtitle")}</p>
        <div className="mt-5 space-y-4 text-slate-700">
          <p>{t("metro.introA")}</p>
          <p>{t("metro.introB")}</p>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">{t("metro.practical")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Fact
            icon={Clock}
            label={t("metro.hours")}
            value={`${metroFacts.firstTrain}–${metroFacts.lastTrainWeek} · ${t("metro.weekend")} ${metroFacts.lastTrainWeekend}`}
          />
          <Fact
            icon={Ticket}
            label={t("metro.ticket")}
            value={`0,60 € · ${t("metro.dayTicket")} 2,50 €`}
          />
          <Fact
            icon={TrainFront}
            label={t("metro.network")}
            value={`${metroFacts.stations} ${t("metro.stationsWord")} · ${metroFacts.lengthKm} km`}
          />
          <Fact
            icon={Plane}
            label={t("metro.airport")}
            value={t("metro.airportValue")}
          />
        </div>
        <div className="mt-4 rounded-2xl border border-accent-200 bg-accent-50 p-5">
          <p className="flex items-start gap-3 text-sm text-accent-900">
            <Plane className="mt-0.5 h-5 w-5 shrink-0 text-accent-700" />
            <span>{t("metro.airportNote")}</span>
          </p>
        </div>
      </section>

      {groups.map((group) =>
        group.stations.length ? (
          <section key={group.key} className="mb-10">
            <h2 className="mb-1 text-2xl font-bold">{group.label}</h2>
            <p className="mb-4 text-sm text-muted">
              {t(`metro.${group.key}Note`)}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.stations.map((s) => (
                <Link
                  key={s.slug}
                  href={metroStationHref(s.slug)}
                  className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
                >
                  <span className="flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                      {s.order}
                    </span>
                    <span className="text-lg font-bold text-brand-700 group-hover:text-brand-800">
                      {pick(s.name, locale)}
                    </span>
                  </span>
                  <span className="mt-2 flex-1 text-sm text-muted">
                    {pick(s.blurb, locale)}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    {t("common.readMore")} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null,
      )}

      <p className="text-xs text-muted">{t("metro.disclaimer")}</p>
    </Container>
  );
}

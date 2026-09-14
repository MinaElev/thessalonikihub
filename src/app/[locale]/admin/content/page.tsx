import { setRequestLocale } from "next-intl/server";
import { FileText, ExternalLink } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/types";
import { getGuides } from "@/lib/repo";
import { getFileContentInventory } from "@/lib/admin-inventory";

export const dynamic = "force-dynamic";

const LABEL: Record<string, [string, string]> = {
  guides: ["Οδηγοί", "Guides"],
  areas: ["Περιοχές", "Areas"],
  routes: ["Διαδρομές", "Routes"],
  dishes: ["Πιάτα", "Dishes"],
  metro: ["Στάσεις μετρό", "Metro stations"],
  dayTrips: ["Εκδρομές", "Day trips"],
  months: ["Μήνες", "Months"],
  collections: ["Συλλογές", "Collections"],
  audiences: ["Κοινά", "Audiences"],
  festivals: ["Φεστιβάλ", "Festivals"],
  pages: ["Σελίδες", "Pages"],
};

const HREF: Record<string, string> = {
  guides: "/guides",
  areas: "/areas",
  routes: "/routes",
  dishes: "/what-to-eat",
  metro: "/metro",
  dayTrips: "/day-trips",
  months: "/when-to-visit",
  festivals: "/festivals",
  audiences: "/for",
};

export default async function AdminContentPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tt = (el: string, en: string) => (locale === "el" ? el : en);

  const groups = getFileContentInventory();
  const guides = getGuides();
  const total = groups.reduce((a, g) => a + g.count, 0);

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-xl font-bold">
          {tt("Συντακτικό περιεχόμενο", "Editorial content")}{" "}
          <span className="font-normal text-muted">({total})</span>
        </h2>
      </div>

      {/* Said plainly and up front, because the rest of the panel has edit
          buttons and this section deliberately does not. */}
      <p className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        {tt(
          "Αυτό το περιεχόμενο δεν ζει στη βάση δεδομένων — είναι γραμμένο σε αρχεία μέσα στο repository και ανεβαίνει με κάθε deploy. Γι' αυτό δεν υπάρχει κουμπί επεξεργασίας εδώ: η αλλαγή γίνεται στον κώδικα, με ιστορικό εκδόσεων και έλεγχο πριν βγει στον αέρα.",
          "This content does not live in the database — it is written in files inside the repository and ships with each deploy. That is why there is no edit button here: changes are made in the code, with version history and a review before they go live.",
        )}
      </p>

      <div className="mb-12 overflow-x-auto rounded-2xl border border-slate-100">
        <table className="w-full min-w-[620px] text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">{tt("Είδος", "Kind")}</th>
              <th className="px-4 py-3">{tt("Πλήθος", "Count")}</th>
              <th className="px-4 py-3">{tt("Αρχείο", "File")}</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {groups.map((g) => (
              <tr key={g.key}>
                <td className="px-4 py-3 font-medium">
                  {locale === "el" ? (LABEL[g.key]?.[0] ?? g.key) : (LABEL[g.key]?.[1] ?? g.key)}
                </td>
                <td className="px-4 py-3 tabular-nums">{g.count}</td>
                <td className="px-4 py-3">
                  <code className="rounded bg-slate-50 px-1.5 py-0.5 text-xs text-slate-600">
                    {g.source}
                  </code>
                </td>
                <td className="px-4 py-3 text-right">
                  {HREF[g.key] ? (
                    <Link
                      href={HREF[g.key]}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline"
                    >
                      {tt("Στο site", "On the site")}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section>
        <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
          <FileText className="h-5 w-5 text-brand-600" />
          {tt("Οδηγοί", "Guides")}{" "}
          <span className="text-base font-normal text-muted">({guides.length})</span>
        </h3>
        <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-100">
          {guides.map((g) => (
            <li key={g.slug} className="flex flex-wrap items-center justify-between gap-3 p-3">
              <Link
                href={`/guides/${g.slug}`}
                className="min-w-0 flex-1 truncate font-semibold text-brand-700 hover:underline"
              >
                {pick(g.title, locale)}
              </Link>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">
                {g.category}
              </span>
              <span className="whitespace-nowrap text-xs text-muted">
                {g.publishedAt.slice(0, 10)}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

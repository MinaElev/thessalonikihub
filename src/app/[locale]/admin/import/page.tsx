import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { ImportPanel } from "@/components/admin/ImportPanel";

export default async function ImportEventsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tt = (el: string, en: string) => (locale === "el" ? el : en);
  return (
    <div>
      <header className="mb-6 max-w-2xl">
        <h2 className="text-xl font-bold">
          {tt("Εισαγωγή events από πηγή", "Import events from a source")}
        </h2>
        <p className="mt-3 text-muted">
          {tt(
            "Δώσε ένα iCal feed ή Eventbrite. Κάνε προεπισκόπηση και μετά εισαγωγή — τα events μπαίνουν σε αναμονή έγκρισης.",
            "Provide an iCal feed or Eventbrite. Preview, then import — events go to the approval queue.",
          )}
        </p>
      </header>
      <ImportPanel locale={locale} />
    </div>
  );
}

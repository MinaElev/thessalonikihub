import { setRequestLocale } from "next-intl/server";
import { ShieldCheck } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCurrentUser } from "@/lib/auth";
import { ImportPanel } from "@/components/admin/ImportPanel";

export default async function ImportEventsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tt = (el: string, en: string) => (locale === "el" ? el : en);
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return (
      <Container className="py-16 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-slate-300" />
        <p className="mt-3 text-muted">{tt("Πρόσβαση μόνο για διαχειριστές.", "Admins only.")}</p>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Breadcrumbs
        locale={locale}
        items={[
          { label: tt("Αρχική", "Home"), href: "/" },
          { label: tt("Εισαγωγή events", "Import events") },
        ]}
      />
      <header className="mb-6 max-w-2xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          {tt("Εισαγωγή events από πηγή", "Import events from a source")}
        </h1>
        <p className="mt-3 text-muted">
          {tt(
            "Δώσε ένα iCal feed ή Eventbrite. Κάνε προεπισκόπηση και μετά εισαγωγή — τα events μπαίνουν σε αναμονή έγκρισης.",
            "Provide an iCal feed or Eventbrite. Preview, then import — events go to the approval queue.",
          )}
        </p>
      </header>
      <ImportPanel locale={locale} />
    </Container>
  );
}

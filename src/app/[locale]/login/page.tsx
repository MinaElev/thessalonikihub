import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tt = (el: string, en: string) => (locale === "el" ? el : en);

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-sm">
        <h1 className="mb-2 text-2xl font-extrabold">
          {tt("Σύνδεση / Εγγραφή", "Sign in / Register")}
        </h1>
        <p className="mb-6 text-sm text-muted">
          {tt(
            "Συνδέσου για να καταχωρείς και να διαχειρίζεσαι τις επιχειρήσεις σου.",
            "Sign in to add and manage your listings.",
          )}
        </p>
        <LoginForm locale={locale} />
      </div>
    </Container>
  );
}

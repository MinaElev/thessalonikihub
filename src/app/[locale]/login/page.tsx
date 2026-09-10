import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { LoginForm } from "@/components/auth/LoginForm";

/**
 * Only same-site paths are accepted as a return target, so a crafted
 * ?next= cannot bounce someone off to another host after signing in.
 */
function safeNext(raw: string | string[] | undefined): string | undefined {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return undefined;
  if (!value.startsWith("/") || value.startsWith("//")) return undefined;
  return value;
}

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const { next } = await searchParams;
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
            "Αποθήκευσε μέρη για το ταξίδι σου, ή διαχειρίσου την επιχείρησή σου.",
            "Save places for your trip, or manage your business listing.",
          )}
        </p>
        <LoginForm locale={locale} next={safeNext(next)} />
      </div>
    </Container>
  );
}

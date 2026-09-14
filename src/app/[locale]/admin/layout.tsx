import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { AdminNav } from "@/components/admin/AdminNav";
import { getCurrentUser } from "@/lib/auth";
import { prisma, isDbConfigured } from "@/lib/db";

/**
 * The admin shell.
 *
 * The role check lives here rather than being repeated at the top of every
 * page: one place to get right, and a new page cannot be added without it.
 * Server actions still check for themselves — a route guard is not an
 * authorisation model, and an action can be invoked without ever rendering
 * the page it sits on.
 */
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // Next generates the layout's prop types with a plain string locale, so the
  // narrowing happens here rather than in the signature.
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const tt = (el: string, en: string) => (locale === "el" ? el : en);
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return (
      <Container className="py-16 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-slate-300" />
        <p className="mt-3 text-muted">
          {tt("Πρόσβαση μόνο για διαχειριστές.", "Admins only.")}
        </p>
        <Link
          href={user ? "/dashboard" : "/login?next=%2Fadmin"}
          className="mt-4 inline-block font-semibold text-brand-700 hover:underline"
        >
          {user ? tt("Πίσω στον πίνακα", "Back to dashboard") : tt("Σύνδεση", "Sign in")}
        </Link>
      </Container>
    );
  }

  const pending = isDbConfigured
    ? (
        await Promise.all([
          prisma.place.count({ where: { status: "PENDING" } }),
          prisma.eventItem.count({ where: { status: "PENDING" } }),
          prisma.claim.count({ where: { status: "PENDING" } }),
        ])
      ).reduce((a, b) => a + b, 0)
    : 0;

  return (
    <Container className="py-8">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-3xl font-extrabold">{tt("Διαχείριση", "Admin")}</h1>
        <span className="text-sm text-muted">{user.email}</span>
      </div>

      <AdminNav locale={locale} counts={{ pending }} />

      {children}
    </Container>
  );
}

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Bookmark, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { prisma, isDbConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; token: string }>;
}): Promise<Metadata> {
  const { locale, token } = await params;
  const t = await getTranslations({ locale, namespace: "saved" });
  return buildMetadata({
    locale,
    path: `/list/${token}`,
    title: t("sharedTitle"),
    description: t("sharedIntro"),
    // A personal list is not search-engine content: it is thin, duplicated
    // across users and changes under the crawler. It is shared person to
    // person, so it stays out of the index.
    index: false,
  });
}

export default async function SharedListPage({
  params,
}: {
  params: Promise<{ locale: Locale; token: string }>;
}) {
  const { locale, token } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  const profile = isDbConfigured
    ? await prisma.profile.findUnique({
        where: { shareToken: token },
        // Deliberately no email or name: a shared list identifies nobody.
        select: { id: true },
      })
    : null;

  if (!profile) {
    return (
      <Container className="py-16 text-center">
        <p className="text-muted">{t("saved.notFound")}</p>
        <Link href="/" className="mt-4 inline-block font-semibold text-brand-700">
          ThessalonikiHub
        </Link>
      </Container>
    );
  }

  const items = await prisma.savedItem.findMany({
    where: { userId: profile.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Container className="py-8">
      <header className="mb-8">
        <h1 className="inline-flex items-center gap-2 text-3xl font-extrabold">
          <Bookmark className="h-7 w-7 text-brand-600" /> {t("saved.sharedTitle")}
        </h1>
        <p className="mt-2 text-muted">
          {items.length} {t("saved.items")} · {t("saved.sharedIntro")}
        </p>
      </header>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-muted">
          {t("saved.empty")}
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {t(`saved.kind.${item.kind}`)}
                </span>
                <span className="mt-1 font-bold text-brand-700 group-hover:text-brand-800">
                  {item.label}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  {t("common.readMore")} <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}

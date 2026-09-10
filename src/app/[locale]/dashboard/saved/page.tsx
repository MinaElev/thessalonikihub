import { getTranslations, setRequestLocale } from "next-intl/server";
import { LogIn, Bookmark, Trash2, Link2, Share2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui";
import { getCurrentUser } from "@/lib/auth";
import { prisma, isDbConfigured } from "@/lib/db";
import { site } from "@/lib/site";
import {
  removeSaved,
  enableSharing,
  disableSharing,
} from "@/app/actions/saved";

export const dynamic = "force-dynamic";

export default async function SavedPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Container className="py-16 text-center">
        <LogIn className="mx-auto h-10 w-10 text-brand-600" />
        <p className="mt-3 text-lg">{t("saved.signIn")}</p>
        <Link
          href="/login"
          className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
        >
          {t("saved.signIn")}
        </Link>
      </Container>
    );
  }

  const [items, profile] = isDbConfigured
    ? await Promise.all([
        prisma.savedItem.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: "desc" },
        }),
        prisma.profile.findUnique({
          where: { id: user.id },
          select: { shareToken: true },
        }),
      ])
    : [[], null];

  const shareUrl = profile?.shareToken
    ? `${site.url}${locale === "el" ? "" : `/${locale}`}/list/${profile.shareToken}`
    : null;

  return (
    <Container className="py-8">
      <header className="mb-8">
        <h1 className="inline-flex items-center gap-2 text-3xl font-extrabold">
          <Bookmark className="h-7 w-7 text-brand-600" /> {t("saved.title")}
        </h1>
        <p className="mt-2 text-muted">{t("saved.subtitle")}</p>
      </header>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-muted">
          {t("saved.empty")}
        </p>
      ) : (
        <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-100">
          {items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <Link
                  href={item.path}
                  className="font-semibold text-brand-700 hover:text-brand-800"
                >
                  {item.label}
                </Link>
                <p className="text-xs text-muted">{t(`saved.kind.${item.kind}`)}</p>
              </div>
              <form action={removeSaved}>
                <input type="hidden" name="id" value={item.id} />
                <button
                  className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-accent-300 hover:text-accent-700"
                  aria-label={`${t("saved.remove")}: ${item.label}`}
                >
                  <Trash2 className="h-3.5 w-3.5" /> {t("saved.remove")}
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}

      <section className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="inline-flex items-center gap-2 text-lg font-bold">
          <Share2 className="h-5 w-5 text-brand-600" /> {t("saved.shareTitle")}
        </h2>
        <p className="mt-1 max-w-prose text-sm text-muted">{t("saved.shareHint")}</p>

        {shareUrl ? (
          <>
            <p className="mt-3 flex items-start gap-2 break-all rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
              <Link2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              {shareUrl}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <form action={enableSharing}>
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:border-brand-300 hover:text-brand-700">
                  {t("saved.shareRotate")}
                </button>
              </form>
              <form action={disableSharing}>
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:border-accent-300 hover:text-accent-700">
                  {t("saved.shareOff")}
                </button>
              </form>
            </div>
            <p className="mt-2 text-xs text-muted">{t("saved.shareRotateHint")}</p>
          </>
        ) : (
          <form action={enableSharing} className="mt-3">
            <button className="rounded-full bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
              {t("saved.shareOn")}
            </button>
          </form>
        )}
      </section>
    </Container>
  );
}

import { setRequestLocale } from "next-intl/server";
import { History } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { prisma, isDbConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

/** What each recorded action was, in words. */
const ACTION: Record<string, [string, string]> = {
  "listing.approve": ["Ενέκρινε", "Approved"],
  "listing.reject": ["Απέρριψε", "Rejected"],
  "listing.status": ["Άλλαξε κατάσταση", "Changed status"],
  "listing.adopt": ["Πήρε από αρχείο στη βάση", "Adopted from a file"],
  "listing.delete": ["Διέγραψε καταχώρηση", "Deleted a listing"],
  "claim.approve": ["Ενέκρινε ιδιοκτησία", "Approved ownership"],
  "claim.reject": ["Απέρριψε ιδιοκτησία", "Rejected ownership"],
  "role.change": ["Άλλαξε ρόλο", "Changed a role"],
  "account.delete": ["Διέγραψε λογαριασμό", "Deleted an account"],
  "subscriber.delete": ["Διέγραψε συνδρομητή", "Deleted a subscriber"],
  "events.import": ["Εισήγαγε events", "Imported events"],
};

/** Actions worth making visually loud, because they cannot be undone. */
const DESTRUCTIVE = new Set(["listing.delete", "account.delete", "subscriber.delete"]);

export default async function AdminActivityPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tt = (el: string, en: string) => (locale === "el" ? el : en);

  const entries = isDbConfigured
    ? await prisma.auditEntry.findMany({ orderBy: { createdAt: "desc" }, take: 200 })
    : [];

  const when = (d: Date) =>
    new Intl.DateTimeFormat(locale === "el" ? "el-GR" : "en-GB", {
      timeZone: "Europe/Athens",
      dateStyle: "short",
      timeStyle: "short",
    }).format(d);

  return (
    <div>
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <History className="h-5 w-5 text-brand-600" />
        {tt("Ιστορικό ενεργειών", "Activity")}
      </h2>
      <p className="mt-1 max-w-prose text-sm text-muted">
        {tt(
          "Ό,τι άλλαξε κάποιος διαχειριστής, με τη σειρά που έγινε. Δεν διαγράφεται τίποτα από εδώ — αυτό είναι που το κάνει να αξίζει να διαβαστεί.",
          "Everything an administrator changed, in the order it happened. Nothing is ever deleted from here, which is what makes it worth reading.",
        )}
      </p>

      {entries.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-muted">
          {tt(
            "Καμία καταγεγραμμένη ενέργεια ακόμα. Η καταγραφή ξεκίνησε τώρα, οπότε ό,τι έγινε πριν δεν φαίνεται εδώ.",
            "Nothing recorded yet. Logging starts from now, so anything done before this does not appear.",
          )}
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-slate-100 rounded-2xl border border-slate-100">
          {entries.map((e) => (
            <li key={e.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 p-3.5">
              <span className="whitespace-nowrap text-xs tabular-nums text-slate-400">
                {when(e.createdAt)}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  DESTRUCTIVE.has(e.action)
                    ? "bg-rose-100 text-rose-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {locale === "el"
                  ? (ACTION[e.action]?.[0] ?? e.action)
                  : (ACTION[e.action]?.[1] ?? e.action)}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{e.target}</span>
              {e.detail ? (
                <span className="max-w-sm truncate text-xs text-muted">{e.detail}</span>
              ) : null}
              <span className="whitespace-nowrap text-xs text-slate-400">{e.actorEmail}</span>
            </li>
          ))}
        </ul>
      )}

      {entries.length === 200 ? (
        <p className="mt-3 text-xs text-muted">
          {tt("Οι 200 πιο πρόσφατες.", "The 200 most recent.")}
        </p>
      ) : null}
    </div>
  );
}

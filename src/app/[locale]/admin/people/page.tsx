import { setRequestLocale } from "next-intl/server";
import { Download, Mail, Users, Trash2, UserX } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { getCurrentUser } from "@/lib/auth";
import { prisma, isDbConfigured } from "@/lib/db";
import { setUserRole, deleteSubscriber } from "@/app/actions/people";
import { deleteAccount } from "@/app/actions/account";
import { isMailConfigured, adminEmail } from "@/lib/email";
import { TestEmailButton } from "@/components/admin/TestEmailButton";

export const dynamic = "force-dynamic";

const ROLES = ["USER", "OWNER", "ADMIN"] as const;

export default async function AdminPeoplePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tt = (el: string, en: string) => (locale === "el" ? el : en);
  const me = await getCurrentUser();

  const [people, subscribers] = isDbConfigured
    ? await Promise.all([
        prisma.profile.findMany({
          orderBy: { createdAt: "asc" },
          include: {
            _count: { select: { places: true, events: true, claims: true } },
          },
        }),
        prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } }),
      ])
    : [[], []];

  const date = (d: Date) =>
    new Intl.DateTimeFormat(locale === "el" ? "el-GR" : "en-GB", {
      timeZone: "Europe/Athens",
      dateStyle: "medium",
    }).format(d);

  return (
    <div>
      <h2 className="text-xl font-bold">{tt("Χρήστες", "People")}</h2>
      <p className="mt-1 text-sm text-muted">
        {tt(
          "Λογαριασμοί και εγγραφές στο newsletter.",
          "Accounts and newsletter sign-ups.",
        )}
      </p>

      {/* Whether notifications can actually go out is invisible otherwise:
          without SMTP the site fails silently and nobody is ever told. */}
      <p
        className={`mt-4 flex flex-wrap items-center gap-2 rounded-xl border p-3 text-sm ${
          isMailConfigured
            ? "border-brand-200 bg-brand-50/50 text-brand-800"
            : "border-amber-200 bg-amber-50 text-amber-900"
        }`}
      >
        <Mail className="h-4 w-4 shrink-0" />
        {isMailConfigured
          ? tt(
              `Τα email στέλνονται. Ειδοποιήσεις νέων καταχωρήσεων προς: ${adminEmail}`,
              `Email is sending. New-submission alerts go to: ${adminEmail}`,
            )
          : tt(
              "Δεν στέλνονται email. Οι ιδιοκτήτες δεν ειδοποιούνται για έγκριση ή απόρριψη, και δεν μαθαίνεις για νέες καταχωρήσεις. Χρειάζονται οι μεταβλητές SMTP_HOST, SMTP_USER, SMTP_PASS.",
              "Email is not sending. Owners are not told when a listing is approved or rejected, and you are not told about new submissions. Set SMTP_HOST, SMTP_USER and SMTP_PASS.",
            )}
      </p>

      <div className="mt-3">
        <TestEmailButton
          labels={{
            send: tt("Δοκιμαστικό email σε μένα", "Send a test email to myself"),
            sent: tt("Στάλθηκε — δες τα εισερχόμενά σου.", "Sent — check your inbox."),
            unconfigured: tt(
              "Λείπουν οι μεταβλητές SMTP.",
              "The SMTP variables are missing.",
            ),
            failed: tt("Δεν στάλθηκε:", "Not sent:"),
          }}
        />
      </div>

      <section className="mt-10">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Users className="h-5 w-5 text-brand-600" />
            {tt("Λογαριασμοί", "Accounts")}{" "}
            <span className="text-base font-normal text-muted">({people.length})</span>
          </h2>
          {/* A plain link, not a client-side download: the file is generated
              per request and must pass the admin check on the way out. */}
          <a
            href="/api/admin/export?what=people"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:border-brand-300 hover:text-brand-700"
          >
            <Download className="h-4 w-4" /> CSV
          </a>
        </div>

        {people.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-muted">
            {tt("Κανένας λογαριασμός ακόμη.", "No accounts yet.")}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">{tt("Εγγραφή", "Joined")}</th>
                  <th className="px-4 py-3">{tt("Καταχωρήσεις", "Listings")}</th>
                  <th className="px-4 py-3">{tt("Ρόλος", "Role")}</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {people.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3">
                      <span className="font-medium">{p.email}</span>
                      {p.name ? (
                        <span className="ml-2 text-muted">{p.name}</span>
                      ) : null}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">
                      {date(p.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">
                      {p._count.places + p._count.events}
                      {p._count.claims ? (
                        <span className="ml-2 text-xs">
                          {tt(
                            `${p._count.claims} αιτήματα`,
                            `${p._count.claims} claims`,
                          )}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      {p.id === me?.id ? (
                        // Demoting yourself has no way back through the UI.
                        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                          {p.role} · {tt("εσύ", "you")}
                        </span>
                      ) : (
                        <form action={setUserRole} className="flex items-center gap-2">
                          <input type="hidden" name="id" value={p.id} />
                          <select
                            name="role"
                            defaultValue={p.role}
                            className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                          >
                            {ROLES.map((r) => (
                              <option key={r} value={r}>
                                {r}
                              </option>
                            ))}
                          </select>
                          <button className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:border-brand-300 hover:text-brand-700">
                            {tt("Αλλαγή", "Change")}
                          </button>
                        </form>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {p.id === me?.id ? null : (
                        <details>
                          <summary className="inline-flex cursor-pointer items-center gap-1 text-xs text-slate-400 hover:text-rose-600">
                            <UserX className="h-3.5 w-3.5" />
                            {tt("Διαγραφή", "Delete")}
                          </summary>
                          {/* The only irreversible thing on this page, and the
                              one a GDPR erasure request actually needs. */}
                          <form action={deleteAccount} className="mt-2 w-56 text-left">
                            <input type="hidden" name="id" value={p.id} />
                            <p className="mb-2 text-xs text-rose-800">
                              {tt(
                                "Διαγράφει οριστικά τον λογαριασμό και από το Supabase. Οι καταχωρήσεις του μένουν, χωρίς ιδιοκτήτη.",
                                "Permanently deletes the account, in Supabase too. Their listings remain, without an owner.",
                              )}
                            </p>
                            <button className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-800 hover:bg-rose-100">
                              {tt("Διαγραφή οριστικά", "Delete permanently")}
                            </button>
                          </form>
                        </details>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-12">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Mail className="h-5 w-5 text-brand-600" />
            Newsletter{" "}
            <span className="text-base font-normal text-muted">({subscribers.length})</span>
          </h2>
          <a
            href="/api/admin/export?what=subscribers"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:border-brand-300 hover:text-brand-700"
          >
            <Download className="h-4 w-4" /> CSV
          </a>
        </div>

        {subscribers.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-muted">
            {tt("Καμία εγγραφή ακόμη.", "No sign-ups yet.")}
          </p>
        ) : (
          <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-100">
            {subscribers.map((sub) => (
              <li key={sub.id} className="flex flex-wrap items-center gap-3 p-3">
                <span className="min-w-0 flex-1 truncate font-medium">{sub.email}</span>
                <span className="text-xs uppercase text-slate-400">{sub.locale}</span>
                {sub.unsubscribedAt ? (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                    {tt("διαγράφηκε", "unsubscribed")}
                  </span>
                ) : sub.confirmed ? (
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">
                    {tt("επιβεβαιωμένο", "confirmed")}
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                    {tt("ανεπιβεβαίωτο", "unconfirmed")}
                  </span>
                )}
                <span className="whitespace-nowrap text-xs text-muted">
                  {date(sub.createdAt)}
                </span>
                <form action={deleteSubscriber}>
                  <input type="hidden" name="id" value={sub.id} />
                  <button
                    title={tt("Οριστική διαγραφή", "Delete permanently")}
                    className="rounded-full border border-slate-200 p-1.5 text-slate-400 hover:border-rose-200 hover:text-rose-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-3 text-xs text-muted">
          {tt(
            "Η διαγραφή είναι οριστική — χρησιμοποίησέ την όταν κάποιος ασκεί το δικαίωμα διαγραφής του GDPR.",
            "Deletion is permanent — use it when someone exercises their GDPR right to erasure.",
          )}
        </p>
      </section>
    </div>
  );
}

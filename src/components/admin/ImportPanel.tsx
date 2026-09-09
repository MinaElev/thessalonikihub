"use client";

import { useState, useTransition } from "react";
import { Download, Eye, Loader2, CheckCircle2, ExternalLink } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { ExternalEvent } from "@/lib/events/types";
import { previewImport, runImport } from "@/app/actions/import-events";

const T = (locale: Locale, el: string, en: string) => (locale === "el" ? el : en);
const inputCls =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

export function ImportPanel({ locale }: { locale: Locale }) {
  const [kind, setKind] = useState<"ical" | "rss" | "eventbrite">("ical");
  const [events, setEvents] = useState<ExternalEvent[] | null>(null);
  const [imported, setImported] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(locale === "el" ? "el-GR" : "en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));

  const preview = (form: FormData) => {
    setError(null);
    setImported(null);
    startTransition(async () => {
      const res = await previewImport(form);
      if (res.ok) setEvents(res.events);
      else setError(res.error);
    });
  };

  const doImport = (form: FormData) => {
    setError(null);
    startTransition(async () => {
      const res = await runImport(form);
      if (res.ok) setImported(res.imported);
      else setError(res.error);
    });
  };

  return (
    <div className="space-y-6">
      <form
        className="space-y-4 rounded-2xl border border-slate-100 p-5"
        onSubmit={(e) => {
          e.preventDefault();
          preview(new FormData(e.currentTarget));
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">{T(locale, "Πηγή", "Source")}</span>
            <select
              name="kind"
              value={kind}
              onChange={(e) => setKind(e.target.value as "ical" | "rss" | "eventbrite")}
              className={inputCls}
            >
              <option value="ical">iCal / .ics feed</option>
              <option value="rss">RSS feed</option>
              <option value="eventbrite">Eventbrite API</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">{T(locale, "Ετικέτα (προαιρετικό)", "Label (optional)")}</span>
            <input name="label" className={inputCls} placeholder="megaron" />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">
            {kind === "eventbrite"
              ? "Eventbrite Organization ID"
              : kind === "rss"
                ? T(locale, "URL του RSS feed", "RSS feed URL")
                : T(locale, "URL του .ics feed", "iCal feed URL")}
          </span>
          <input
            name="url"
            className={inputCls}
            placeholder={
              kind === "eventbrite"
                ? "123456789"
                : kind === "rss"
                  ? "https://…/event/feed/"
                  : "https://…/basic.ics"
            }
          />
        </label>

        {kind === "eventbrite" ? (
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Eventbrite API token</span>
            <input name="token" className={inputCls} placeholder="••••••" />
          </label>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
            {T(locale, "Προεπισκόπηση", "Preview")}
          </button>
          <button
            type="button"
            disabled={pending || !events?.length}
            onClick={(e) => {
              const form = (e.currentTarget.closest("form") as HTMLFormElement) ?? undefined;
              if (form) doImport(new FormData(form));
            }}
            className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-5 py-2.5 font-semibold text-white hover:bg-accent-700 disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            {T(locale, "Εισαγωγή ως PENDING", "Import as PENDING")}
          </button>
        </div>

        {error ? (
          <p className="text-sm text-accent-600">
            {error === "auth"
              ? T(locale, "Μόνο διαχειριστές.", "Admins only.")
              : error === "db"
                ? T(locale, "Σύνδεσε πρώτα το Supabase για εισαγωγή.", "Connect Supabase first to import.")
                : T(locale, "Αποτυχία ανάκτησης feed. Έλεγξε το URL.", "Failed to fetch the feed. Check the URL.")}
          </p>
        ) : null}
        {imported != null ? (
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
            <CheckCircle2 className="h-4 w-4" />
            {T(locale, `Εισήχθησαν ${imported} events (σε αναμονή έγκρισης).`, `Imported ${imported} events (awaiting approval).`)}
          </p>
        ) : null}
      </form>

      {events ? (
        <div>
          <p className="mb-3 text-sm text-muted">
            {T(locale, `${events.length} events βρέθηκαν`, `${events.length} events found`)}
          </p>
          <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-100">
            {events.map((e) => (
              <li key={`${e.source}-${e.externalId}`} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold">{e.title}</p>
                    <p className="text-xs text-muted">
                      {fmt(e.startsAt)}
                      {e.location ? ` · ${e.location}` : ""}
                    </p>
                  </div>
                  {e.sourceUrl ? (
                    <a
                      href={e.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-brand-600 hover:text-brand-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

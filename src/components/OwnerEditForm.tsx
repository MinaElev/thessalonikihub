"use client";

import { useActionState, useState } from "react";
import { Check, Loader2, Plus, Trash2 } from "lucide-react";
import { updateOwnedListing, type OwnerEditState } from "@/app/actions/owner";
import type { OpeningHours, WeekDay } from "@/lib/types";

const initial: OwnerEditState = { status: "idle" };

const DAYS: WeekDay[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export interface OwnerEditLabels {
  hoursTitle: string;
  hoursHint: string;
  closed: string;
  days: Record<WeekDay, string>;
  contactTitle: string;
  phone: string;
  email: string;
  website: string;
  bookingUrl: string;
  offersTitle: string;
  offersHint: string;
  offerTitle: string;
  offerDescription: string;
  offerExpires: string;
  addOffer: string;
  removeOffer: string;
  save: string;
  saved: string;
  forbidden: string;
  invalid: string;
  error: string;
}

interface OfferRow {
  title: string;
  description: string;
  expiresAt: string;
}

export function OwnerEditForm({
  slug,
  hours,
  contact,
  offers,
  labels,
}: {
  slug: string;
  hours: OpeningHours;
  contact: {
    phone?: string;
    email?: string;
    website?: string;
    bookingUrl?: string;
  };
  offers: OfferRow[];
  labels: OwnerEditLabels;
}) {
  const [state, formAction, pending] = useActionState(updateOwnedListing, initial);
  const [rows, setRows] = useState<OfferRow[]>(
    offers.length ? offers : [{ title: "", description: "", expiresAt: "" }],
  );

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="slug" value={slug} />

      <section>
        <h2 className="text-lg font-bold">{labels.hoursTitle}</h2>
        <p className="mt-1 text-sm text-muted">{labels.hoursHint}</p>
        <div className="mt-3 space-y-2">
          {DAYS.map((day) => (
            <div key={day} className="flex items-center gap-3">
              <label
                htmlFor={`hours_${day}`}
                className="w-24 shrink-0 text-sm font-medium text-slate-700"
              >
                {labels.days[day]}
              </label>
              <input
                id={`hours_${day}`}
                name={`hours_${day}`}
                defaultValue={hours[day] ?? ""}
                placeholder={`09:00-17:00 · ${labels.closed}`}
                className="w-full max-w-xs rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold">{labels.contactTitle}</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {(
            [
              ["phone", labels.phone, contact.phone],
              ["email", labels.email, contact.email],
              ["website", labels.website, contact.website],
              ["bookingUrl", labels.bookingUrl, contact.bookingUrl],
            ] as const
          ).map(([name, label, value]) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                defaultValue={value ?? ""}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold">{labels.offersTitle}</h2>
        <p className="mt-1 text-sm text-muted">{labels.offersHint}</p>
        <div className="mt-3 space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 p-4">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  name="offer_title"
                  defaultValue={row.title}
                  placeholder={labels.offerTitle}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
                />
                <input
                  type="date"
                  name="offer_expires"
                  defaultValue={row.expiresAt}
                  aria-label={labels.offerExpires}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
                />
              </div>
              <textarea
                name="offer_description"
                defaultValue={row.description}
                rows={2}
                placeholder={labels.offerDescription}
                className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400"
              />
              {rows.length > 1 ? (
                <button
                  type="button"
                  onClick={() => setRows(rows.filter((_, j) => j !== i))}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-accent-700"
                >
                  <Trash2 className="h-3.5 w-3.5" /> {labels.removeOffer}
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setRows([...rows, { title: "", description: "", expiresAt: "" }])
          }
          className="mt-3 inline-flex items-center gap-1 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:border-brand-300 hover:text-brand-700"
        >
          <Plus className="h-4 w-4" /> {labels.addOffer}
        </button>
      </section>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {labels.save}
        </button>
        {state.status === "ok" ? (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
            <Check className="h-4 w-4" /> {labels.saved}
          </span>
        ) : null}
        {state.status === "forbidden" ? (
          <span className="text-sm text-accent-700">{labels.forbidden}</span>
        ) : null}
        {state.status === "invalid" ? (
          <span className="text-sm text-accent-700">
            {labels.invalid}
            {state.message ? ` (${state.message})` : ""}
          </span>
        ) : null}
        {state.status === "error" ? (
          <span className="text-sm text-accent-700">{labels.error}</span>
        ) : null}
      </div>
    </form>
  );
}

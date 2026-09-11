"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { updateOwnedEvent, type EventEditState } from "@/app/actions/event-edit";

const input =
  "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

export interface EventEditLabels {
  basics: string;
  greek: string;
  english: string;
  englishHint: string;
  name: string;
  summary: string;
  description: string;
  when: string;
  starts: string;
  ends: string;
  endsHint: string;
  venue: string;
  price: string;
  priceHint: string;
  contact: string;
  phone: string;
  email: string;
  website: string;
  bookingUrl: string;
  indexTitle: string;
  indexLabel: string;
  indexHint: string;
  save: string;
  saved: string;
  forbidden: string;
  invalid: string;
  invalidEnd: string;
  error: string;
}

export interface EventEditValues {
  slug: string;
  nameEl: string;
  nameEn: string;
  summaryEl: string;
  summaryEn: string;
  descriptionEl: string;
  descriptionEn: string;
  venueEl: string;
  venueEn: string;
  startsAt: string;
  endsAt: string;
  priceInfoEl: string;
  priceInfoEn: string;
  phone: string;
  email: string;
  website: string;
  bookingUrl: string;
  textRewritten: boolean;
}

function SaveButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {label}
    </button>
  );
}

/** A labelled pair of inputs: Greek on the left, English on the right. */
function Bilingual({
  label,
  fieldEl,
  fieldEn,
  valueEl,
  valueEn,
  labels,
  required,
  rows,
}: {
  label: string;
  fieldEl: string;
  fieldEn: string;
  valueEl: string;
  valueEn: string;
  labels: EventEditLabels;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <p className="mb-1 text-sm font-medium text-slate-700">
        {label} {required ? <span className="text-accent-600">*</span> : null}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            {labels.greek}
          </span>
          {rows ? (
            <textarea
              name={fieldEl}
              rows={rows}
              defaultValue={valueEl}
              required={required}
              className={input}
            />
          ) : (
            <input
              name={fieldEl}
              defaultValue={valueEl}
              required={required}
              className={input}
            />
          )}
        </label>
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wide text-slate-400">
            {labels.english}
          </span>
          {rows ? (
            <textarea name={fieldEn} rows={rows} defaultValue={valueEn} className={input} />
          ) : (
            <input name={fieldEn} defaultValue={valueEn} className={input} />
          )}
        </label>
      </div>
    </div>
  );
}

export function EventEditForm({
  values,
  labels,
  isAdmin,
}: {
  values: EventEditValues;
  labels: EventEditLabels;
  isAdmin: boolean;
}) {
  const [state, action] = useActionState<EventEditState, FormData>(updateOwnedEvent, {
    status: "idle",
  });

  const notice =
    state.status === "saved"
      ? { tone: "ok" as const, text: labels.saved }
      : state.status === "forbidden"
        ? { tone: "bad" as const, text: labels.forbidden }
        : state.status === "invalid"
          ? {
              tone: "bad" as const,
              text: state.message === "endsAt" ? labels.invalidEnd : labels.invalid,
            }
          : state.status === "error"
            ? { tone: "bad" as const, text: labels.error }
            : null;

  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="slug" value={values.slug} />

      {notice ? (
        <p
          className={`flex items-center gap-2 rounded-xl border p-4 text-sm ${
            notice.tone === "ok"
              ? "border-brand-200 bg-brand-50 text-brand-800"
              : "border-accent-200 bg-accent-50 text-accent-800"
          }`}
        >
          {notice.tone === "ok" ? (
            <CheckCircle2 className="h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 shrink-0" />
          )}
          {notice.text}
        </p>
      ) : null}

      <fieldset className="space-y-4">
        <legend className="text-lg font-bold">{labels.basics}</legend>
        <p className="rounded-xl bg-slate-50 p-3 text-xs text-muted">{labels.englishHint}</p>
        <Bilingual
          label={labels.name}
          fieldEl="nameEl"
          fieldEn="nameEn"
          valueEl={values.nameEl}
          valueEn={values.nameEn}
          labels={labels}
          required
        />
        <Bilingual
          label={labels.summary}
          fieldEl="summaryEl"
          fieldEn="summaryEn"
          valueEl={values.summaryEl}
          valueEn={values.summaryEn}
          labels={labels}
          required
        />
        <Bilingual
          label={labels.description}
          fieldEl="descriptionEl"
          fieldEn="descriptionEn"
          valueEl={values.descriptionEl}
          valueEn={values.descriptionEn}
          labels={labels}
          rows={8}
        />
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-bold">{labels.when}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              {labels.starts} <span className="text-accent-600">*</span>
            </span>
            <input
              type="datetime-local"
              name="startsAt"
              required
              defaultValue={values.startsAt}
              className={input}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">{labels.ends}</span>
            <input
              type="datetime-local"
              name="endsAt"
              defaultValue={values.endsAt}
              className={input}
            />
            <span className="mt-1 block text-xs text-muted">{labels.endsHint}</span>
          </label>
        </div>
        <Bilingual
          label={labels.venue}
          fieldEl="venueEl"
          fieldEn="venueEn"
          valueEl={values.venueEl}
          valueEn={values.venueEn}
          labels={labels}
          required
        />
        <Bilingual
          label={labels.price}
          fieldEl="priceInfoEl"
          fieldEn="priceInfoEn"
          valueEl={values.priceInfoEl}
          valueEn={values.priceInfoEn}
          labels={labels}
        />
        <p className="text-xs text-muted">{labels.priceHint}</p>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-lg font-bold">{labels.contact}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">{labels.phone}</span>
            <input name="phone" defaultValue={values.phone} className={input} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">{labels.email}</span>
            <input name="email" type="email" defaultValue={values.email} className={input} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">{labels.website}</span>
            <input
              name="website"
              placeholder="https://"
              defaultValue={values.website}
              className={input}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">
              {labels.bookingUrl}
            </span>
            <input
              name="bookingUrl"
              placeholder="https://"
              defaultValue={values.bookingUrl}
              className={input}
            />
          </label>
        </div>
      </fieldset>

      {isAdmin ? (
        <fieldset className="space-y-3 rounded-2xl border border-brand-200 bg-brand-50/40 p-4">
          <legend className="px-1 text-sm font-bold text-brand-800">{labels.indexTitle}</legend>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              name="textRewritten"
              defaultChecked={values.textRewritten}
              className="mt-0.5 h-4 w-4"
            />
            <span>
              <span className="font-semibold">{labels.indexLabel}</span>
              <span className="mt-0.5 block text-xs text-slate-600">{labels.indexHint}</span>
            </span>
          </label>
        </fieldset>
      ) : null}

      <SaveButton label={labels.save} />
    </form>
  );
}

"use client";

import { useActionState, useState } from "react";
import { BadgeCheck, Check, Loader2 } from "lucide-react";
import { requestClaim, type ClaimState } from "@/app/actions/claim";

const initial: ClaimState = { status: "idle" };

export interface ClaimLabels {
  cta: string;
  title: string;
  intro: string;
  placeholder: string;
  submit: string;
  cancel: string;
  ok: string;
  duplicate: string;
  unauthenticated: string;
  error: string;
}

/**
 * "This is my business" — lets an owner file a claim on a listing.
 *
 * Labels come from the server component, matching how the other client
 * components here work. Nothing is granted on submit: an admin reviews it.
 */
export function ClaimBusiness({
  slug,
  labels,
  loginHref,
}: {
  slug: string;
  labels: ClaimLabels;
  loginHref: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(requestClaim, initial);

  if (state.status === "ok" || state.status === "duplicate") {
    return (
      <p className="flex items-start gap-2 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm font-medium text-brand-900">
        <Check className="mt-0.5 h-4 w-4 shrink-0" />
        {state.status === "ok" ? labels.ok : labels.duplicate}
      </p>
    );
  }

  if (state.status === "unauthenticated") {
    return (
      <p className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
        {labels.unauthenticated}{" "}
        <a href={loginHref} className="font-semibold text-brand-700 underline">
          {labels.cta}
        </a>
      </p>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
      >
        <BadgeCheck className="h-4 w-4 text-brand-600" />
        {labels.cta}
      </button>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <input type="hidden" name="slug" value={slug} />
      <h3 className="font-bold text-ink">{labels.title}</h3>
      <p className="mt-1 text-sm text-muted">{labels.intro}</p>
      <label htmlFor="claim-message" className="sr-only">
        {labels.placeholder}
      </label>
      <textarea
        id="claim-message"
        name="message"
        rows={3}
        maxLength={1000}
        placeholder={labels.placeholder}
        className="mt-3 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
      {state.status === "error" || state.status === "notfound" ? (
        <p className="mt-2 text-xs text-accent-700">{labels.error}</p>
      ) : null}
      <div className="mt-3 flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {labels.submit}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          {labels.cancel}
        </button>
      </div>
    </form>
  );
}

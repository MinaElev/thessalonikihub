"use client";

import { useActionState } from "react";
import { Mail, Check } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";

const initial: SubscribeState = { status: "idle" };

export interface NewsletterLabels {
  placeholder: string;
  cta: string;
  sending: string;
  thanks: string;
  invalid: string;
  error: string;
  privacy: string;
}

/**
 * Weekly "what's on" sign-up. Stores the address; sending is separate.
 *
 * Labels are passed in from the server component rather than read with
 * useTranslations, matching how the other client components here work.
 */
export function NewsletterForm({
  locale,
  labels,
}: {
  locale: Locale;
  labels: NewsletterLabels;
}) {
  const [state, formAction, pending] = useActionState(subscribe, initial);

  if (state.status === "ok") {
    return (
      <p className="flex items-center gap-2 text-sm font-semibold text-brand-700">
        <Check className="h-4 w-4" /> {labels.thanks}
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="locale" value={locale} />
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          {labels.placeholder}
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={labels.placeholder}
          className="min-w-0 flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm text-ink outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60"
        >
          <Mail className="h-4 w-4" />
          {pending ? labels.sending : labels.cta}
        </button>
      </div>
      {state.status === "invalid" ? (
        <p className="text-xs text-accent-700">{labels.invalid}</p>
      ) : null}
      {state.status === "unavailable" || state.status === "error" ? (
        <p className="text-xs text-accent-700">{labels.error}</p>
      ) : null}
      <p className="text-xs text-muted">{labels.privacy}</p>
    </form>
  );
}

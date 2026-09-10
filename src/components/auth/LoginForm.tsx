"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";

const T = (locale: Locale, el: string, en: string) => (locale === "el" ? el : en);
const inputCls =
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

/** Google's brand mark, so the button reads as a real provider button. */
function GoogleMark() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.9 2.6 13.8l7.8 6c1.9-5.6 7.1-9.8 13.6-10.3z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.3z"
      />
      <path
        fill="#FBBC05"
        d="M10.4 28.2c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6C1 16.1 0 19.9 0 23.5s1 7.4 2.6 10.7l7.8-6z"
      />
      <path
        fill="#34A853"
        d="M24 47.5c6.2 0 11.5-2 15.4-5.6l-7.5-5.8c-2.1 1.4-4.8 2.2-7.9 2.2-6.5 0-11.7-4.2-13.6-9.9l-7.8 6C6.5 42.1 14.6 47.5 24 47.5z"
      />
    </svg>
  );
}

export function LoginForm({
  locale,
  next,
}: {
  locale: Locale;
  /** In-app path to return to after signing in. */
  next?: string;
}) {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "google" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  if (!supabase) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-sm text-muted">
        {T(
          locale,
          "Η σύνδεση θα ενεργοποιηθεί μόλις ρυθμιστεί το Supabase (κλειδιά στο .env). Ο κώδικας είναι έτοιμος.",
          "Sign-in activates once Supabase is configured (.env keys). The code is ready.",
        )}
      </div>
    );
  }

  // Send the visitor back where they were, not to a generic dashboard.
  const callback = () => {
    const url = new URL("/auth/callback", window.location.origin);
    if (next) url.searchParams.set("next", next);
    return url.toString();
  };

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: callback() },
    });
    if (!error) {
      setStatus("sent");
      return;
    }
    setStatus("error");
    setMessage(
      error.status === 429
        ? T(
            locale,
            "Πολλές προσπάθειες. Περίμενε ένα λεπτό και ξαναδοκίμασε.",
            "Too many attempts. Wait a minute and try again.",
          )
        : T(locale, "Κάτι πήγε στραβά.", "Something went wrong."),
    );
  };

  const signInGoogle = async () => {
    setStatus("google");
    setMessage(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callback() },
    });
    if (error) {
      setStatus("error");
      setMessage(
        T(
          locale,
          "Η σύνδεση με Google δεν είναι διαθέσιμη αυτή τη στιγμή. Δοκίμασε με email.",
          "Google sign-in isn't available right now. Try email instead.",
        ),
      );
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-brand-100 bg-brand-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-600" />
        <p className="mt-2 font-semibold">
          {T(locale, "Έλεγξε το email σου!", "Check your email!")}
        </p>
        <p className="mt-1 text-sm text-muted">
          {T(
            locale,
            "Σου στείλαμε σύνδεσμο σύνδεσης. Άνοιξέ τον από την ίδια συσκευή.",
            "We sent you a sign-in link. Open it on this same device.",
          )}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-brand-700 underline"
        >
          {T(locale, "Άλλο email", "Use a different email")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={signInGoogle}
        disabled={status === "google"}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 font-medium transition hover:bg-slate-50 disabled:opacity-60"
      >
        {status === "google" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <GoogleMark />
        )}
        {T(locale, "Συνέχεια με Google", "Continue with Google")}
      </button>

      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" /> {T(locale, "ή", "or")}{" "}
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <form onSubmit={sendMagicLink} className="space-y-3">
        <label htmlFor="login-email" className="block text-sm font-medium text-slate-700">
          {T(locale, "Email", "Email")}
        </label>
        <input
          id="login-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className={inputCls}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
          {T(locale, "Σύνδεση με email", "Sign in with email")}
        </button>
        <p className="text-xs text-muted">
          {T(
            locale,
            "Χωρίς κωδικό — σου στέλνουμε σύνδεσμο μιας χρήσης.",
            "No password — we email you a one-time link.",
          )}
        </p>
        {status === "error" && message ? (
          <p className="text-sm text-accent-600">{message}</p>
        ) : null}
      </form>
    </div>
  );
}

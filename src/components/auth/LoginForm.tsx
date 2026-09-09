"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";

const T = (locale: Locale, el: string, en: string) => (locale === "el" ? el : en);
const inputCls =
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

export function LoginForm({ locale }: { locale: Locale }) {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

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

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setStatus(error ? "error" : "sent");
  };

  const signInGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  if (status === "sent") {
    return (
      <div className="rounded-xl border border-brand-100 bg-brand-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-600" />
        <p className="mt-2 font-semibold">
          {T(locale, "Έλεγξε το email σου!", "Check your email!")}
        </p>
        <p className="mt-1 text-sm text-muted">
          {T(locale, "Σου στείλαμε σύνδεσμο σύνδεσης.", "We sent you a sign-in link.")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={signInGoogle}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 font-medium transition hover:bg-slate-50"
      >
        {T(locale, "Συνέχεια με Google", "Continue with Google")}
      </button>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" /> {T(locale, "ή", "or")}{" "}
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <form onSubmit={sendMagicLink} className="space-y-3">
        <input
          type="email"
          required
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
        {status === "error" ? (
          <p className="text-sm text-accent-600">
            {T(locale, "Κάτι πήγε στραβά.", "Something went wrong.")}
          </p>
        ) : null}
      </form>
    </div>
  );
}

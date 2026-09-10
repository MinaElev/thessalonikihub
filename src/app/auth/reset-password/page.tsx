"use client";

import { useState } from "react";
import { KeyRound, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/**
 * Where the password-reset email lands.
 *
 * Supabase establishes a recovery session from the link before this renders,
 * so setting the new password is just an updateUser call. It lives outside the
 * [locale] segment because the redirect target is a fixed URL registered with
 * Supabase, and the i18n middleware skips /auth/*.
 */
export default function ResetPasswordPage() {
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  if (!supabase) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setStatus("error");
      setMessage(
        /session/i.test(error.message)
          ? "Ο σύνδεσμος έληξε. Ζήτησε νέον από τη σελίδα σύνδεσης."
          : "Ο κωδικός πρέπει να έχει τουλάχιστον 6 χαρακτήρες.",
      );
      return;
    }
    setStatus("done");
  };

  return (
    <main className="mx-auto w-full max-w-sm px-4 py-16">
      <h1 className="mb-2 text-2xl font-extrabold">Νέος κωδικός</h1>

      {status === "done" ? (
        <div className="rounded-xl border border-brand-100 bg-brand-50 p-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-brand-600" />
          <p className="mt-2 font-semibold">Ο κωδικός άλλαξε.</p>
          <a href="/dashboard" className="mt-3 inline-block font-semibold text-brand-700 underline">
            Συνέχεια
          </a>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <label htmlFor="new-password" className="block text-sm font-medium text-slate-700">
            Νέος κωδικός
          </label>
          <input
            id="new-password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <KeyRound className="h-4 w-4" />
            )}
            Αποθήκευση
          </button>
          {status === "error" && message ? (
            <p className="text-sm text-accent-600">{message}</p>
          ) : null}
        </form>
      )}
    </main>
  );
}

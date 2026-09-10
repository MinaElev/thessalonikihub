"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle2, KeyRound } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";

const T = (locale: Locale, el: string, en: string) => (locale === "el" ? el : en);
const inputCls =
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

/** Google's brand mark, so the button reads as a real provider button. */
function GoogleMark() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.9 2.6 13.8l7.8 6c1.9-5.6 7.1-9.8 13.6-10.3z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.3z" />
      <path fill="#FBBC05" d="M10.4 28.2c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6C1 16.1 0 19.9 0 23.5s1 7.4 2.6 10.7l7.8-6z" />
      <path fill="#34A853" d="M24 47.5c6.2 0 11.5-2 15.4-5.6l-7.5-5.8c-2.1 1.4-4.8 2.2-7.9 2.2-6.5 0-11.7-4.2-13.6-9.9l-7.8 6C6.5 42.1 14.6 47.5 24 47.5z" />
    </svg>
  );
}

/**
 * OAuth providers must be enabled in the Supabase dashboard before they work.
 * signInWithOAuth navigates away rather than returning an error, so a provider
 * that is switched off dumps raw JSON in the user's face — the button is
 * therefore hidden until this flag is set.
 */
const googleEnabled = process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === "true";

type Mode = "password" | "magic";
type Status = "idle" | "loading" | "google" | "sent" | "reset-sent" | "error";

export function LoginForm({
  locale,
  next,
}: {
  locale: Locale;
  /** In-app path to return to after signing in. */
  next?: string;
}) {
  const supabase = createClient();
  const [mode, setMode] = useState<Mode>("password");
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
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

  const goNext = () => {
    window.location.assign(next ?? "/dashboard");
  };

  const rateLimited = () =>
    T(
      locale,
      googleEnabled
        ? "Πολλές προσπάθειες. Επιτρέπονται λίγα email την ώρα — δοκίμασε με κωδικό ή με Google."
        : "Πολλές προσπάθειες. Επιτρέπονται λίγα email την ώρα — δοκίμασε σύνδεση με κωδικό.",
      googleEnabled
        ? "Too many attempts. Only a few emails per hour are allowed — try a password or Google instead."
        : "Too many attempts. Only a few emails per hour are allowed — sign in with a password instead.",
    );

  /** Password sign-in, or sign-up when the register toggle is on. */
  const submitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);

    if (register) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: callback() },
      });
      if (error) {
        setStatus("error");
        setMessage(
          error.status === 429
            ? rateLimited()
            : /already/i.test(error.message)
              ? T(
                  locale,
                  "Υπάρχει ήδη λογαριασμός με αυτό το email. Δοκίμασε σύνδεση.",
                  "An account with this email already exists. Try signing in.",
                )
              : /password/i.test(error.message)
                ? T(
                    locale,
                    "Ο κωδικός είναι πολύ αδύναμος (τουλάχιστον 6 χαρακτήρες).",
                    "That password is too weak (at least 6 characters).",
                  )
                : T(locale, "Κάτι πήγε στραβά.", "Something went wrong."),
        );
        return;
      }
      // With email confirmation on, Supabase returns no session until the user
      // clicks the link; with it off, they are signed in immediately.
      if (data.session) {
        goNext();
        return;
      }
      setStatus("sent");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus("error");
      setMessage(
        error.status === 429
          ? rateLimited()
          : T(
              locale,
              "Λάθος email ή κωδικός.",
              "Wrong email or password.",
            ),
      );
      return;
    }
    goNext();
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
        ? rateLimited()
        : T(locale, "Κάτι πήγε στραβά.", "Something went wrong."),
    );
  };

  const sendReset = async () => {
    if (!email) {
      setStatus("error");
      setMessage(T(locale, "Γράψε πρώτα το email σου.", "Enter your email first."));
      return;
    }
    setStatus("loading");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) {
      setStatus("error");
      setMessage(error.status === 429 ? rateLimited() : T(locale, "Κάτι πήγε στραβά.", "Something went wrong."));
      return;
    }
    setStatus("reset-sent");
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
          "Η σύνδεση με Google δεν είναι διαθέσιμη αυτή τη στιγμή.",
          "Google sign-in isn't available right now.",
        ),
      );
    }
  };

  if (status === "sent" || status === "reset-sent") {
    return (
      <div className="rounded-xl border border-brand-100 bg-brand-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-600" />
        <p className="mt-2 font-semibold">
          {T(locale, "Έλεγξε το email σου!", "Check your email!")}
        </p>
        <p className="mt-1 text-sm text-muted">
          {status === "reset-sent"
            ? T(
                locale,
                "Σου στείλαμε σύνδεσμο για να ορίσεις νέο κωδικό.",
                "We sent you a link to set a new password.",
              )
            : T(
                locale,
                "Σου στείλαμε σύνδεσμο επιβεβαίωσης. Άνοιξέ τον από την ίδια συσκευή.",
                "We sent you a confirmation link. Open it on this same device.",
              )}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-semibold text-brand-700 underline"
        >
          {T(locale, "Πίσω", "Back")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {googleEnabled ? (
        <>
          <button
            type="button"
            onClick={signInGoogle}
            disabled={status === "google"}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 font-medium transition hover:bg-slate-50 disabled:opacity-60"
          >
            {status === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleMark />}
            {T(locale, "Συνέχεια με Google", "Continue with Google")}
          </button>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-slate-200" /> {T(locale, "ή", "or")}{" "}
            <span className="h-px flex-1 bg-slate-200" />
          </div>
        </>
      ) : null}

      <form onSubmit={mode === "password" ? submitPassword : sendMagicLink} className="space-y-3">
        <div>
          <label htmlFor="login-email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
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
        </div>

        {mode === "password" ? (
          <div>
            <label htmlFor="login-password" className="mb-1 block text-sm font-medium text-slate-700">
              {T(locale, "Κωδικός", "Password")}
            </label>
            <input
              id="login-password"
              type="password"
              required
              minLength={6}
              autoComplete={register ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
            />
          </div>
        ) : null}

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : mode === "password" ? (
            <KeyRound className="h-4 w-4" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
          {mode === "magic"
            ? T(locale, "Στείλε μου σύνδεσμο", "Email me a link")
            : register
              ? T(locale, "Δημιουργία λογαριασμού", "Create account")
              : T(locale, "Σύνδεση", "Sign in")}
        </button>

        {status === "error" && message ? (
          <p className="text-sm text-accent-600">{message}</p>
        ) : null}

        {mode === "password" ? (
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <button
              type="button"
              onClick={() => {
                setRegister(!register);
                setStatus("idle");
                setMessage(null);
              }}
              className="font-semibold text-brand-700 underline"
            >
              {register
                ? T(locale, "Έχω ήδη λογαριασμό", "I already have an account")
                : T(locale, "Δημιουργία λογαριασμού", "Create an account")}
            </button>
            {!register ? (
              <button type="button" onClick={sendReset} className="text-muted underline">
                {T(locale, "Ξέχασα τον κωδικό", "Forgot password")}
              </button>
            ) : null}
          </div>
        ) : null}
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "password" ? "magic" : "password");
          setStatus("idle");
          setMessage(null);
        }}
        className="w-full text-center text-sm text-muted underline"
      >
        {mode === "password"
          ? T(locale, "Σύνδεση με σύνδεσμο email αντί για κωδικό", "Use an email link instead")
          : T(locale, "Σύνδεση με κωδικό", "Use a password instead")}
      </button>
    </div>
  );
}

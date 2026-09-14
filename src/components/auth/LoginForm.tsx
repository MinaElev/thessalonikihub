"use client";

import { useState } from "react";
import { Mail, Loader2, KeyRound, ArrowLeft, CheckCircle2, UserPlus } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/client";
import { startRegistration, completeRegistration } from "@/app/actions/register";

const T = (locale: Locale, el: string, en: string) => (locale === "el" ? el : en);
const inputCls =
  "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";
const codeCls =
  "w-full rounded-lg border border-slate-200 px-3 py-3 text-center font-mono text-2xl tracking-[0.4em] outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

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

/**
 * Sign in and registration — codes only, never links.
 *
 * Every email route into an account is a six-digit code typed on this page.
 * A link has to come back to the right origin to work, which made it fail in
 * ways a code cannot: a Site URL still pointing at localhost, a redirect
 * missing from the allowlist, a link opened on the phone when the session
 * began on the laptop. Nothing here sends one.
 *
 * Registration is ours end to end — our code, our email, our table, and the
 * account created server-side once the code checks out. Signing in uses
 * Supabase's own code, which is the part worth delegating.
 */
type View = "signin" | "signin-code" | "register" | "register-code" | "registered";
type Busy = null | "password" | "code" | "verify" | "google" | "register";

export function LoginForm({
  locale,
  next,
}: {
  locale: Locale;
  /** In-app path to return to after signing in. */
  next?: string;
}) {
  const supabase = createClient();
  const [view, setView] = useState<View>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState<Busy>(null);
  const [message, setMessage] = useState<string | null>(null);
  /** A code sign-in started from "forgot my password" ends at the reset page. */
  const [afterCode, setAfterCode] = useState<"next" | "reset">("next");

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

  const goNext = (path?: string) => {
    window.location.assign(path ?? next ?? "/dashboard");
  };

  const rateLimited = () =>
    T(
      locale,
      "Πολλές προσπάθειες. Επιτρέπονται λίγα email την ώρα — δοκίμασε ξανά σε λίγο.",
      "Too many attempts. Only a few emails per hour are allowed — try again shortly.",
    );

  const generic = () => T(locale, "Κάτι πήγε στραβά.", "Something went wrong.");

  /* ---------------------------------------------------------------- *
   * Sign in with a password
   * ---------------------------------------------------------------- */
  const signInPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy("password");
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setBusy(null);
      setMessage(
        error.status === 400
          ? T(locale, "Λάθος email ή κωδικός.", "Wrong email or password.")
          : generic(),
      );
      return;
    }
    goNext();
  };

  /* ---------------------------------------------------------------- *
   * Sign in with a one-time code
   * ---------------------------------------------------------------- */
  const sendSignInCode = async (purpose: "next" | "reset") => {
    if (!email) {
      setMessage(T(locale, "Γράψε πρώτα το email σου.", "Enter your email first."));
      return;
    }
    setBusy("code");
    setMessage(null);
    setCode("");
    // shouldCreateUser false: registration is our own flow, and this must not
    // quietly create an account for a mistyped address.
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    setBusy(null);
    if (error) {
      setMessage(
        error.status === 429
          ? rateLimited()
          : T(
              locale,
              "Δεν βρέθηκε λογαριασμός με αυτό το email.",
              "No account found with that email.",
            ),
      );
      return;
    }
    setAfterCode(purpose);
    setView("signin-code");
  };

  const verifySignInCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = code.replace(/\D/g, "");
    if (token.length !== 6) {
      setMessage(T(locale, "Ο κωδικός έχει 6 ψηφία.", "The code is 6 digits."));
      return;
    }
    setBusy("verify");
    setMessage(null);
    const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
    if (error) {
      setBusy(null);
      setMessage(
        T(
          locale,
          "Ο κωδικός δεν ισχύει ή έληξε. Ζήτησε καινούργιο.",
          "That code is wrong or has expired. Request a new one.",
        ),
      );
      return;
    }
    goNext(afterCode === "reset" ? "/auth/reset-password" : undefined);
  };

  /* ---------------------------------------------------------------- *
   * Register — our own verification
   * ---------------------------------------------------------------- */
  const registerError = (error?: string, retryIn?: number) => {
    switch (error) {
      case "invalid-email":
        return T(locale, "Έλεγξε τη διεύθυνση email.", "Check the email address.");
      case "weak-password":
        return T(
          locale,
          "Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες.",
          "The password needs at least 8 characters.",
        );
      case "exists":
        return T(
          locale,
          "Υπάρχει ήδη λογαριασμός με αυτό το email. Συνδέσου.",
          "An account with that email already exists. Sign in instead.",
        );
      case "too-soon":
        return T(
          locale,
          `Μόλις στείλαμε κωδικό. Ξαναδοκίμασε σε ${retryIn ?? 60} δευτερόλεπτα.`,
          `A code was just sent. Try again in ${retryIn ?? 60} seconds.`,
        );
      case "bad-code":
        return T(locale, "Λάθος κωδικός.", "Wrong code.");
      case "expired":
        return T(
          locale,
          "Ο κωδικός έληξε. Ξεκίνα την εγγραφή από την αρχή.",
          "The code expired. Start registration again.",
        );
      case "locked":
        return T(
          locale,
          "Πολλές λάθος προσπάθειες. Ζήτησε νέο κωδικό.",
          "Too many wrong attempts. Request a new code.",
        );
      case "unavailable":
        return T(
          locale,
          "Η εγγραφή δεν είναι διαθέσιμη αυτή τη στιγμή.",
          "Registration is not available right now.",
        );
      default:
        return generic();
    }
  };

  const beginRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setMessage(registerError("weak-password"));
      return;
    }
    setBusy("register");
    setMessage(null);
    setCode("");
    const result = await startRegistration(email);
    setBusy(null);

    if (result.step === "code") {
      setView("register-code");
      if (result.error) setMessage(registerError(result.error, result.retryIn));
      return;
    }
    setMessage(registerError(result.error, result.retryIn));
  };

  const finishRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = code.replace(/\D/g, "");
    if (token.length !== 6) {
      setMessage(T(locale, "Ο κωδικός έχει 6 ψηφία.", "The code is 6 digits."));
      return;
    }
    setBusy("verify");
    setMessage(null);
    const result = await completeRegistration({ email, code: token, password });

    if (result.step !== "done") {
      setBusy(null);
      if (result.error === "expired") setView("register");
      setMessage(registerError(result.error, result.retryIn));
      return;
    }

    // The account exists and is already confirmed, so sign straight in rather
    // than making someone who just proved their address type it all again.
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(null);
    if (error) {
      setView("registered");
      return;
    }
    goNext();
  };

  /* ---------------------------------------------------------------- *
   * Google
   * ---------------------------------------------------------------- */
  const signInGoogle = async () => {
    setBusy("google");
    setMessage(null);
    const url = new URL("/auth/callback", window.location.origin);
    if (next) url.searchParams.set("next", next);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: url.toString() },
    });
    if (error) {
      setBusy(null);
      setMessage(
        T(
          locale,
          "Η σύνδεση με Google δεν είναι διαθέσιμη αυτή τη στιγμή.",
          "Google sign-in isn't available right now.",
        ),
      );
    }
  };

  /* ---------------------------------------------------------------- *
   * Views
   * ---------------------------------------------------------------- */

  const back = (to: View, label: string) => (
    <button
      type="button"
      onClick={() => {
        setView(to);
        setMessage(null);
        setCode("");
      }}
      className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-800"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );

  if (view === "registered") {
    return (
      <div className="rounded-xl border border-brand-100 bg-brand-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-600" />
        <p className="mt-2 font-semibold">
          {T(locale, "Ο λογαριασμός δημιουργήθηκε!", "Your account is ready!")}
        </p>
        <p className="mt-1 text-sm text-muted">
          {T(
            locale,
            "Συνδέσου με το email και τον κωδικό σου.",
            "Sign in with your email and password.",
          )}
        </p>
        <button
          type="button"
          onClick={() => {
            setView("signin");
            setCode("");
            setMessage(null);
          }}
          className="mt-4 text-sm font-semibold text-brand-700 underline"
        >
          {T(locale, "Σύνδεση", "Sign in")}
        </button>
      </div>
    );
  }

  if (view === "signin-code" || view === "register-code") {
    const isRegister = view === "register-code";
    return (
      <form onSubmit={isRegister ? finishRegister : verifySignInCode} className="space-y-4">
        <div className="rounded-xl border border-brand-100 bg-brand-50 p-5 text-center">
          <Mail className="mx-auto h-9 w-9 text-brand-600" />
          <p className="mt-2 font-semibold">
            {T(locale, "Στείλαμε έναν κωδικό", "We sent you a code")}
          </p>
          <p className="mt-1 text-sm text-muted">
            {T(locale, "Έξι ψηφία στο", "Six digits to")}{" "}
            <span className="font-semibold text-ink">{email}</span>
          </p>
        </div>

        <label htmlFor="otp" className="block text-sm font-medium text-slate-700">
          {T(locale, "Κωδικός επιβεβαίωσης", "Confirmation code")}
        </label>
        <input
          id="otp"
          // Numeric keypad on phones, and the OS can fill the code straight
          // from the notification rather than anyone reading digits off it.
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          required
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          placeholder="000000"
          className={codeCls}
        />

        {message ? <p className="text-sm text-accent-600">{message}</p> : null}

        <button
          type="submit"
          disabled={busy === "verify"}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {busy === "verify" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {isRegister
            ? T(locale, "Ολοκλήρωση εγγραφής", "Complete registration")
            : T(locale, "Σύνδεση", "Sign in")}
        </button>

        <div className="flex items-center justify-between text-sm">
          {back(isRegister ? "register" : "signin", T(locale, "Πίσω", "Back"))}
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => {
              const noop = { preventDefault() {} } as React.FormEvent;
              if (isRegister) void beginRegister(noop);
              else void sendSignInCode(afterCode);
            }}
            className="font-semibold text-brand-700 underline disabled:opacity-60"
          >
            {T(locale, "Στείλε ξανά", "Resend")}
          </button>
        </div>
      </form>
    );
  }

  if (view === "register") {
    return (
      <form onSubmit={beginRegister} className="space-y-3">
        <label htmlFor="reg-email" className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="reg-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
        />

        <label htmlFor="reg-password" className="block text-sm font-medium text-slate-700">
          {T(locale, "Κωδικός πρόσβασης", "Password")}
        </label>
        <input
          id="reg-password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputCls}
        />
        <p className="text-xs text-muted">
          {T(locale, "Τουλάχιστον 8 χαρακτήρες.", "At least 8 characters.")}
        </p>

        {message ? <p className="text-sm text-accent-600">{message}</p> : null}

        <button
          type="submit"
          disabled={busy === "register"}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {busy === "register" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <UserPlus className="h-4 w-4" />
          )}
          {T(locale, "Στείλε μου κωδικό επιβεβαίωσης", "Email me a confirmation code")}
        </button>

        <button
          type="button"
          onClick={() => {
            setView("signin");
            setMessage(null);
          }}
          className="w-full text-center text-sm text-muted underline"
        >
          {T(locale, "Έχω ήδη λογαριασμό", "I already have an account")}
        </button>
      </form>
    );
  }

  /* Default: sign in. */
  return (
    <div className="space-y-4">
      {googleEnabled ? (
        <>
          <button
            type="button"
            onClick={signInGoogle}
            disabled={busy === "google"}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 font-semibold transition hover:bg-slate-50 disabled:opacity-60"
          >
            {busy === "google" ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleMark />}
            {T(locale, "Συνέχεια με Google", "Continue with Google")}
          </button>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-slate-200" />
            {T(locale, "ή", "or")}
            <span className="h-px flex-1 bg-slate-200" />
          </div>
        </>
      ) : null}

      <form onSubmit={signInPassword} className="space-y-3">
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
        />

        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
          {T(locale, "Κωδικός πρόσβασης", "Password")}
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputCls}
        />

        {message ? <p className="text-sm text-accent-600">{message}</p> : null}

        <button
          type="submit"
          disabled={busy === "password"}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
        >
          {busy === "password" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <KeyRound className="h-4 w-4" />
          )}
          {T(locale, "Σύνδεση", "Sign in")}
        </button>
      </form>

      <div className="space-y-2 text-center text-sm">
        <button
          type="button"
          disabled={busy === "code"}
          onClick={() => sendSignInCode("next")}
          className="inline-flex items-center gap-1.5 font-semibold text-brand-700 underline disabled:opacity-60"
        >
          {busy === "code" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          {T(locale, "Σύνδεση με κωδικό μιας χρήσης", "Sign in with a one-time code")}
        </button>
        <p>
          <button
            type="button"
            disabled={busy === "code"}
            onClick={() => sendSignInCode("reset")}
            className="text-muted underline disabled:opacity-60"
          >
            {T(locale, "Ξέχασα τον κωδικό μου", "I forgot my password")}
          </button>
        </p>
        <p>
          <button
            type="button"
            onClick={() => {
              setView("register");
              setMessage(null);
              setPassword("");
            }}
            className="text-muted underline"
          >
            {T(locale, "Δεν έχω λογαριασμό — Εγγραφή", "No account yet — Register")}
          </button>
        </p>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Rescues auth links that land on the wrong page.
 *
 * Supabase only honours the `redirectTo` we ask for when that exact URL is in
 * the project's Redirect URLs allowlist; otherwise it silently falls back to
 * the project's Site URL and appends the token as a fragment. Recovery mails
 * sent from the Supabase dashboard always do this — they carry no `redirectTo`
 * at all. Either way the visitor lands on a page that has no idea what the
 * fragment means, sees no form, and concludes the link is broken.
 *
 * The fragment never reaches the server, so this has to run in the browser.
 * No page outside /auth builds a Supabase client, so nothing has consumed the
 * fragment by the time this effect runs — it is still there to forward.
 */
export function AuthHashHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.length < 2) return;

    const params = new URLSearchParams(hash.slice(1));

    // A password-reset link. Carry the fragment across untouched: the reset
    // page's own Supabase client reads the session out of it.
    if (params.get("type") === "recovery" && params.has("access_token")) {
      window.location.replace(`/auth/reset-password${hash}`);
      return;
    }

    // An expired or already-used link. Supabase reports these the same way,
    // as a fragment on the Site URL. Send it to the sign-in page rather than
    // leaving the visitor on a homepage that looks like nothing happened.
    if (params.has("error") || params.has("error_code")) {
      const reason = params.get("error_code") ?? params.get("error") ?? "";
      window.location.replace(`/login?auth_error=${encodeURIComponent(reason)}`);
    }
  }, []);

  return null;
}

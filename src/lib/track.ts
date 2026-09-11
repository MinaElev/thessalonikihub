"use client";

/**
 * Sends one listing event to /api/view.
 *
 * Nothing is written to the visitor's browser — no cookie, no localStorage, no
 * sessionStorage. Storage for analytics would need a consent banner under
 * ePrivacy, and the site's whole claim is that it does not do that. A plain
 * module-level set is enough to stop double counting: it lives as long as the
 * tab's JavaScript does, so moving around the site and coming back does not
 * re-count, and it vanishes on reload without ever having touched the
 * visitor's machine.
 *
 * Deduplicating contact clicks is deliberate too. Tapping a phone number three
 * times is one person deciding to call, and "how many people got in touch" is
 * the number worth showing an owner — a click tally would flatter it.
 */
const sent = new Set<string>();

export function track(kind: string, slug: string, action: string): void {
  const key = `${kind}:${slug}:${action}`;
  if (sent.has(key)) return;
  sent.add(key);

  const payload = JSON.stringify({ kind, slug, action });

  // A contact click navigates away — to the dialer, to another site — and an
  // ordinary fetch can be cancelled mid-flight when that happens. sendBeacon
  // exists for exactly this and is handed off to the browser to deliver.
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      if (navigator.sendBeacon("/api/view", blob)) return;
    }
  } catch {
    // Fall through to fetch.
  }

  void fetch("/api/view", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

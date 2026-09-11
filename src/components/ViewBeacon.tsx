"use client";

import { useEffect } from "react";

/**
 * Tells /api/view that this listing page was opened.
 *
 * Nothing is written to the visitor's browser — no cookie, no localStorage, no
 * sessionStorage. Storage for analytics would need a consent banner under
 * ePrivacy, and the site's whole claim is that it does not do that. A plain
 * module-level set is enough: it lives as long as the tab's JavaScript does,
 * so moving around the site and coming back does not re-count, and it vanishes
 * on reload without ever having touched the visitor's machine.
 *
 * The cost is that a hard refresh counts again. For deciding whether a listing
 * is being read at all, that is an acceptable margin.
 */
const counted = new Set<string>();

export function ViewBeacon({ kind, slug }: { kind: string; slug: string }) {
  useEffect(() => {
    const key = `${kind}:${slug}`;
    if (counted.has(key)) return;
    counted.add(key);

    // keepalive so the request survives the visitor navigating straight on.
    void fetch("/api/view", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind, slug }),
      keepalive: true,
    }).catch(() => {});
  }, [kind, slug]);

  return null;
}

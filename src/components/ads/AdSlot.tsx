"use client";

import { useEffect } from "react";

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/**
 * A single responsive AdSense display unit. Renders only when both a publisher
 * ID (NEXT_PUBLIC_ADSENSE_CLIENT) and a `slot` id (created in the AdSense
 * dashboard) are available — so no empty ad boxes appear before setup or on
 * pages you don't pass a slot to.
 */
export function AdSlot({ slot, className }: { slot?: string; className?: string }) {
  useEffect(() => {
    if (!client || !slot) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle not ready — ignore.
    }
  }, [slot]);

  if (!client || !slot) return null;

  return (
    <ins
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

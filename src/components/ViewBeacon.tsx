"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Records that a listing page was opened. See `track` for what is and is not stored. */
export function ViewBeacon({ kind, slug }: { kind: string; slug: string }) {
  useEffect(() => {
    track(kind, slug, "view");
  }, [kind, slug]);

  return null;
}

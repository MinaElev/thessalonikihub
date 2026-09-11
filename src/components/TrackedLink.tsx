"use client";

import { track } from "@/lib/track";

/**
 * An ordinary link that also records which contact route the visitor took.
 *
 * A wrapper rather than a global click listener, so the tracked links are the
 * ones a reader can point at in the markup, and nothing is recorded for the
 * rest of the page.
 */
export function TrackedLink({
  kind,
  slug,
  action,
  children,
  ...rest
}: {
  kind: string;
  slug: string;
  action: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a {...rest} onClick={() => track(kind, slug, action)}>
      {children}
    </a>
  );
}

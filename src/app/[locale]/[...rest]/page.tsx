import { notFound } from "next/navigation";

/**
 * Catch-all for paths that match no route.
 *
 * Without it, Next serves its own bare 404 for an unrecognised URL, because a
 * segment's not-found.tsx only renders for `notFound()` calls inside a matched
 * segment. Routing every stray path through here means a mistyped or retired
 * URL lands on the site's own 404 — with search and the pillar links — instead
 * of a dead end. More specific routes always win over this one.
 */
export default function CatchAll() {
  notFound();
}

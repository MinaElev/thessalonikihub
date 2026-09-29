import { markdownHeadings } from "@/lib/slug";

/**
 * "In this guide" — the sections of a long article, as links.
 *
 * Eight of the sixteen guides run to six sections or more, and several are
 * reference pieces nobody reads top to bottom: someone arriving at the
 * parking guide wants the bit about the blue zone, not the history of
 * pedestrianisation. Without a contents list the only way to find it is to
 * scroll and skim.
 *
 * Rendered server-side from the same markdown the body is rendered from, so
 * there is no moment where the list is present and the anchors are not.
 * `<details>` rather than always-open: on a phone a twelve-item list pushes
 * the article itself below the fold, which is the opposite of helping.
 */
export function TableOfContents({
  body,
  label,
  /** Below this many sections a list is noise, not navigation. */
  min = 4,
}: {
  body: string;
  label: string;
  min?: number;
}) {
  const headings = markdownHeadings(body);
  if (headings.length < min) return null;

  return (
    <details
      open
      className="group mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
        {label}
        <span className="text-xs font-semibold normal-case text-brand-700 group-open:hidden">
          {headings.length}
        </span>
      </summary>
      <ol className="mt-3 space-y-1.5">
        {headings.map((h, i) => (
          <li key={h.id} className="flex gap-2.5 text-sm">
            <span className="w-5 shrink-0 text-right tabular-nums text-slate-400">
              {i + 1}.
            </span>
            <a
              href={`#${h.id}`}
              className="font-medium text-slate-700 underline-offset-4 hover:text-brand-700 hover:underline"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}

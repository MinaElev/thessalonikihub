import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

/**
 * A tail of onward links for pages that ended in a full stop.
 *
 * The day-trip and two of the guide pages had no outgoing links at all: a
 * reader who arrived at Vergina from search had nowhere to go except the back
 * button, and the page passed no link equity on to anything.
 */
export function RelatedLinks({
  title,
  items,
  more,
}: {
  title: string;
  items: { href: string; label: string; hint?: string }[];
  /** A link to the hub this page belongs to. */
  more?: { href: string; label: string };
}) {
  if (!items.length && !more) return null;
  return (
    <section className="mt-12 border-t border-slate-100 pt-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="text-xl font-bold text-ink">{title}</h2>
        {more ? (
          <Link
            href={more.href}
            className="shrink-0 text-sm font-semibold text-brand-700 hover:underline"
          >
            {more.label}
          </Link>
        ) : null}
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              className="group flex items-start justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="min-w-0">
                <span className="block font-semibold text-ink group-hover:text-brand-700">
                  {i.label}
                </span>
                {i.hint ? (
                  <span className="mt-0.5 block text-sm text-muted">{i.hint}</span>
                ) : null}
              </span>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-brand-600 transition group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

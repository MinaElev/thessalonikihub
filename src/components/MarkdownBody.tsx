import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import { autoLink } from "@/lib/autolink";
import { headingSlug } from "@/lib/slug";

/** The text of a rendered heading, for building its id. */
function textOf(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

/**
 * Body prose.
 *
 * Pass `locale` to have the first mention of a known place, dish or route
 * linked automatically; see `autoLink`. Without it the markdown renders as
 * written, which is what the few non-editorial callers want.
 *
 * Every section heading gets an id, so a reader can be sent straight to
 * "Πώς να πας" in a guide that runs to a dozen sections rather than to the
 * top of it. `TableOfContents` derives the same ids from the same source.
 */
export function MarkdownBody({
  children,
  locale,
  /** Path of the page being rendered, so it never links to itself. */
  selfHref,
}: {
  children: string;
  locale?: Locale;
  selfHref?: string;
}) {
  const body = locale ? autoLink(children, locale, selfHref) : children;
  return (
    <div className="prose-content text-slate-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children: c }) => <h2 id={headingSlug(textOf(c))}>{c}</h2>,
          h3: ({ children: c }) => <h3 id={headingSlug(textOf(c))}>{c}</h3>,
          // A comparison table is wider than a phone. It scrolls inside its
          // own box, so the page body never scrolls sideways.
          table: ({ children: c }) => (
            <div className="table-scroll">
              <table>{c}</table>
            </div>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}

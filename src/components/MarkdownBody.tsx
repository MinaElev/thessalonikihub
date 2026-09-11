import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Locale } from "@/i18n/routing";
import { autoLink } from "@/lib/autolink";

/**
 * Body prose.
 *
 * Pass `locale` to have the first mention of a known place, dish or route
 * linked automatically; see `autoLink`. Without it the markdown renders as
 * written, which is what the few non-editorial callers want.
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
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
    </div>
  );
}

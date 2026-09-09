import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({
  items,
  locale,
}: {
  items: Crumb[];
  locale: Locale;
}) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(locale, c.href) } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="py-4 text-sm text-muted">
      <JsonLd data={ld} />
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={i} className="inline-flex items-center gap-1">
            {c.href ? (
              <Link href={c.href} className="hover:text-brand-700">
                {c.label}
              </Link>
            ) : (
              <span className="text-slate-700">{c.label}</span>
            )}
            {i < items.length - 1 ? (
              <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

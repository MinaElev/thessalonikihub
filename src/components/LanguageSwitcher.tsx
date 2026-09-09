"use client";

import { useLocale } from "next-intl";
import { usePathname, Link } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";
import { clsx } from "clsx";

const labels: Record<string, string> = { el: "ΕΛ", en: "EN" };

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 p-0.5 text-sm">
      {locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={clsx(
            "rounded-full px-2.5 py-1 font-semibold transition",
            l === locale
              ? "bg-brand-600 text-white"
              : "text-slate-500 hover:text-brand-700",
          )}
        >
          {labels[l] ?? l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

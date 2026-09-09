import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Guide } from "@/lib/types";
import { pick } from "@/lib/types";
import { guideHref } from "@/lib/links";

export function GuideCard({
  guide,
  locale,
}: {
  guide: Guide;
  locale: Locale;
}) {
  return (
    <Link
      href={guideHref(guide)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <Image
          src={guide.cover.url}
          alt={pick(guide.cover.alt, locale)}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-bold leading-snug text-ink group-hover:text-brand-700">
          {pick(guide.title, locale)}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {pick(guide.excerpt, locale)}
        </p>
      </div>
    </Link>
  );
}

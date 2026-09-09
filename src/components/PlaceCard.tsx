import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Place } from "@/lib/types";
import { pick } from "@/lib/types";
import { placeHref } from "@/lib/links";
import { priceRangeLabel } from "@/lib/format";
import { Badge } from "@/components/ui";
import { getArea } from "@/content/data/areas";

export function PlaceCard({
  place,
  locale,
  distanceLabel,
}: {
  place: Place;
  locale: Locale;
  distanceLabel?: string;
}) {
  const photo = place.photos[0];
  const area = getArea(place.geo.area);

  return (
    <Link
      href={placeHref(place)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        {photo ? (
          <Image
            src={photo.url}
            alt={pick(photo.alt, locale)}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
        {place.featured ? (
          <span className="absolute left-3 top-3">
            <Badge tone="accent">★</Badge>
          </span>
        ) : null}
        {distanceLabel ? (
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold text-white">
            {distanceLabel}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-2 text-xs text-muted">
          {area ? <span>{pick(area.name, locale)}</span> : null}
          {place.priceRange ? (
            <span className="text-brand-600">
              · {priceRangeLabel(place.priceRange)}
            </span>
          ) : null}
        </div>
        <h3 className="font-bold leading-snug text-ink group-hover:text-brand-700">
          {pick(place.name, locale)}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {pick(place.summary, locale)}
        </p>
      </div>
    </Link>
  );
}

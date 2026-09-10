import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { EventItem } from "@/lib/types";
import { pick } from "@/lib/types";
import { eventHref } from "@/lib/links";
import { formatEventWhen } from "@/lib/format";

export function EventCard({
  event,
  locale,
}: {
  event: EventItem;
  locale: Locale;
}) {
  const photo = event.photos[0];
  return (
    <Link
      href={eventHref(event)}
      className="group flex gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        {photo ? (
          <Image
            src={photo.url}
            alt={pick(photo.alt, locale)}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          /* Imported events almost never carry a photo. */
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100"
          >
            <CalendarDays className="h-7 w-7 text-brand-600/40" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-bold text-ink group-hover:text-brand-700">
          {pick(event.name, locale)}
        </h3>
        <p className="mt-0.5 line-clamp-2 text-sm text-muted">
          {pick(event.summary, locale)}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatEventWhen(event.startsAt, event.endsAt, locale, event.timeKnown)}
          </span>
          {/* Imported feeds often name no venue — an empty pin looked broken. */}
          {pick(event.venue, locale) ? (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {pick(event.venue, locale)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

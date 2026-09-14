import { setRequestLocale } from "next-intl/server";
import { Pencil, Eye, Trash2, Search, BarChart3, CalendarClock, CheckSquare } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Localized } from "@/lib/types";
import { pick } from "@/lib/types";
import { prisma, isDbConfigured } from "@/lib/db";
import { setListingStatus, deleteListing, bulkSetStatus } from "@/app/actions/admin-listings";
import {
  statusLabel,
  statusTone,
  kindLabel,
  publicHref,
  editHref,
  type ListingStatusValue,
} from "@/lib/listing-labels";
import { getListingStats, viewKey, emptyStats } from "@/lib/views";
import { getFilePlaces } from "@/lib/repo";
import type { Pillar } from "@/lib/types";

export const dynamic = "force-dynamic";

const STATUSES = ["DRAFT", "PENDING", "PUBLISHED", "REJECTED"] as const;
const PILLARS = ["STAY", "EAT", "DRINK", "DISCOVER", "EXPERIENCES", "SERVICES", "EVENTS"] as const;

interface Row {
  /** Empty for a listing that exists only in a content file. */
  id: string;
  table: "place" | "event";
  entity: string;
  slug: string;
  name: Localized<string>;
  status: string;
  ownerEmail: string | null;
  updatedAt: Date;
  startsAt: Date | null;
  textRewritten: boolean;
  /** Defined in a content file, with no database row behind it yet. */
  fromFile: boolean;
}

function one(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export default async function AdminListingsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const tt = (el: string, en: string) => (locale === "el" ? el : en);

  const status = one(sp.status).toUpperCase();
  const kind = one(sp.kind).toUpperCase();
  const q = one(sp.q).trim();
  // Linked to from the overview warning about live-but-unindexable events.
  const needsRewrite = one(sp.needs) === "rewrite";

  const statusFilter = STATUSES.includes(status as never)
    ? { status: status as never }
    : {};
  const wantsEvents = !kind || kind === "EVENTS";
  const wantsPlaces = !kind || kind !== "EVENTS";

  const [places, events] = isDbConfigured
    ? await Promise.all([
        wantsPlaces
          ? prisma.place.findMany({
              where: {
                ...statusFilter,
                ...(kind && kind !== "EVENTS" ? { kind: kind as never } : {}),
              },
              orderBy: { updatedAt: "desc" },
              select: {
                id: true,
                slug: true,
                name: true,
                kind: true,
                status: true,
                updatedAt: true,
                owner: { select: { email: true } },
              },
            })
          : [],
        wantsEvents
          ? prisma.eventItem.findMany({
              where: statusFilter,
              orderBy: { startsAt: "desc" },
              select: {
                id: true,
                slug: true,
                name: true,
                status: true,
                updatedAt: true,
                startsAt: true,
                textRewritten: true,
                owner: { select: { email: true } },
              },
            })
          : [],
      ])
    : [[], []];

  // Listings defined in content files are live on the site whether or not a
  // database row exists for them, so a panel that queried only the database
  // was hiding real pages — including every business added by hand. They are
  // merged in here, and a row is created the moment one is actually moderated.
  const dbSlugs = new Set(places.map((p) => p.slug));
  const filePillars: Exclude<Pillar, "events">[] = [
    "stay",
    "eat",
    "drink",
    "discover",
    "experiences",
    "services",
  ];
  const fileOnly = filePillars
    .filter((pillar) => !kind || kind === pillar.toUpperCase())
    .flatMap((pillar) => getFilePlaces(pillar))
    .filter((place) => !dbSlugs.has(place.slug))
    // A file listing is live, so it only belongs under "published" or no filter.
    .filter(() => !status || status === "PUBLISHED");

  const all: Row[] = [
    ...fileOnly.map((f) => ({
      id: "",
      table: "place" as const,
      entity: f.kind.toUpperCase(),
      slug: f.slug,
      name: f.name,
      status: "PUBLISHED",
      ownerEmail: null,
      // Content files carry no timestamp; sorting puts these last rather than
      // claiming an edit date the repository never recorded.
      updatedAt: new Date(0),
      startsAt: null,
      textRewritten: true,
      fromFile: true,
    })),
    ...places.map((p) => ({
      id: p.id,
      table: "place" as const,
      entity: p.kind as string,
      slug: p.slug,
      name: p.name as Localized<string>,
      status: p.status as string,
      ownerEmail: p.owner?.email ?? null,
      updatedAt: p.updatedAt,
      startsAt: null,
      textRewritten: true,
      fromFile: false,
    })),
    ...events.map((e) => ({
      id: e.id,
      table: "event" as const,
      entity: "EVENTS",
      slug: e.slug,
      name: e.name as Localized<string>,
      status: e.status as string,
      ownerEmail: e.owner?.email ?? null,
      updatedAt: e.updatedAt,
      startsAt: e.startsAt,
      textRewritten: e.textRewritten,
      fromFile: false,
    })),
  ];

  // Searching happens here rather than in the query: the name is a JSON column
  // holding both languages, and with the platform in the low hundreds of rows
  // a scan costs nothing while keeping the match rules plain to read.
  const needle = q.toLowerCase();
  const scoped = needsRewrite ? all.filter((r) => !r.textRewritten) : all;
  const rows = (
    needle
      ? scoped.filter(
          (r) =>
            r.slug.toLowerCase().includes(needle) ||
            Object.values(r.name).some((v) =>
              String(v ?? "").toLowerCase().includes(needle),
            ) ||
            (r.ownerEmail ?? "").toLowerCase().includes(needle),
        )
      : scoped
  ).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  const stats = await getListingStats(
    rows.map((r) => ({ kind: r.entity, slug: r.slug })),
    30,
  );

  const date = (d: Date) =>
    new Intl.DateTimeFormat(locale === "el" ? "el-GR" : "en-GB", {
      timeZone: "Europe/Athens",
      dateStyle: "short",
    }).format(d);

  const chip = (label: string, key: "status" | "kind", value: string) => {
    const current = key === "status" ? status : kind;
    const on = current === value || (!current && !value);
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (needsRewrite) next.set("needs", "rewrite");
    if (key === "status" ? value : status) next.set("status", key === "status" ? value : status);
    if (key === "kind" ? value : kind) next.set("kind", key === "kind" ? value : kind);
    const query = next.toString();
    return (
      <Link
        key={`${key}-${value || "all"}`}
        href={`/admin/listings${query ? `?${query}` : ""}`}
        className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
          on
            ? "bg-brand-600 text-white"
            : "border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-700"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-xl font-bold">
          {tt("Όλες οι καταχωρήσεις", "All listings")}{" "}
          <span className="font-normal text-muted">({rows.length})</span>
        </h2>
        <p className="text-sm text-muted">
          {needsRewrite
            ? tt(
                "Μόνο όσες κρατούν το κείμενο της πηγής και μένουν noindex.",
                "Only those still carrying source text, which stay noindex.",
              )
            : tt(
                "Υποβολές χρηστών και εισαγόμενες εκδηλώσεις — ό,τι ζει στη βάση.",
                "User submissions and imported events — everything that lives in the database.",
              )}
        </p>
      </div>

      {/* GET, so a filtered view is a URL an admin can bookmark or share. */}
      <form method="get" className="mb-4 flex flex-wrap gap-2">
        {status ? <input type="hidden" name="status" value={status} /> : null}
        {kind ? <input type="hidden" name="kind" value={kind} /> : null}
        {needsRewrite ? <input type="hidden" name="needs" value="rewrite" /> : null}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            defaultValue={q}
            placeholder={tt("Όνομα, slug ή email ιδιοκτήτη", "Name, slug or owner email")}
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
          {tt("Αναζήτηση", "Search")}
        </button>
        {q ? (
          <Link
            href="/admin/listings"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            {tt("Καθαρισμός", "Clear")}
          </Link>
        ) : null}
      </form>

      <div className="mb-2 flex flex-wrap gap-1.5">
        {chip(tt("Όλες", "All"), "status", "")}
        {STATUSES.map((s) => chip(statusLabel(s, locale), "status", s))}
      </div>
      <div className="mb-6 flex flex-wrap gap-1.5">
        {chip(tt("Κάθε είδος", "Every kind"), "kind", "")}
        {PILLARS.map((p) => chip(kindLabel(p, locale), "kind", p))}
      </div>

      {rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-muted">
          {tt("Καμία εγγραφή με αυτά τα φίλτρα.", "Nothing matches these filters.")}
        </p>
      ) : (
        <>
        {/* The bulk form holds only this bar. The checkboxes live down in the
            rows and join it by id, because a form inside a form is invalid
            HTML — and every row already has its own. Sticky, since the
            selection is made while scrolling. */}
        <form
          action={bulkSetStatus}
          id="bulk"
          className="sticky top-0 z-10 mb-3 rounded-xl border border-slate-200 bg-white/95 p-3 backdrop-blur"
        >
          <div className="flex flex-wrap items-center gap-2">
            <CheckSquare className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-muted">
              {tt("Επιλεγμένες:", "Selected:")}
            </span>
            <select
              name="status"
              defaultValue="PUBLISHED"
              className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
            >
              {STATUSES.map((st) => (
                <option key={st} value={st}>
                  {statusLabel(st, locale)}
                </option>
              ))}
            </select>
            <button className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-semibold text-white hover:bg-slate-700">
              {tt("Εφαρμογή σε όλες", "Apply to selected")}
            </button>
            <span className="ml-auto text-xs text-muted">
              {tt(
                "Οι καταχωρήσεις από αρχείο δεν επιλέγονται μαζικά.",
                "File-based listings cannot be selected in bulk.",
              )}
            </span>
          </div>
        </form>

        <ul className="space-y-2">
          {rows.map((r) => {
            const st = stats.get(viewKey(r.entity, r.slug)) ?? emptyStats();
            return (
              <li
                key={`${r.table}-${r.id || r.slug}`}
                className="rounded-2xl border border-slate-100 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-3">
                    {r.fromFile ? (
                      <span className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <input
                        type="checkbox"
                        form="bulk"
                        name="selected"
                        value={`${r.table}:${r.id}`}
                        aria-label={pick(r.name, locale)}
                        className="mt-1 h-4 w-4 shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 font-semibold">
                      {pick(r.name, locale)}
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          statusTone[r.status as ListingStatusValue] ?? ""
                        }`}
                      >
                        {statusLabel(r.status, locale)}
                      </span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-normal text-slate-500">
                        {kindLabel(r.entity, locale)}
                      </span>
                      {!r.textRewritten ? (
                        <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-normal text-amber-800">
                          {tt("κείμενο πηγής", "source text")}
                        </span>
                      ) : null}
                      {r.fromFile ? (
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-normal text-slate-600">
                          {tt("από αρχείο", "from a file")}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                      <span className="font-mono">/{r.entity.toLowerCase()}/{r.slug}</span>
                      <span>
                        {tt("ιδιοκτήτης:", "owner:")}{" "}
                        {r.ownerEmail ?? tt("κανείς", "none")}
                      </span>
                      {r.fromFile ? (
                        <span>{tt("ορίζεται στο repository", "defined in the repository")}</span>
                      ) : (
                        <span>
                          {tt("ενημερώθηκε", "updated")} {date(r.updatedAt)}
                        </span>
                      )}
                      {r.startsAt ? (
                        <span className="inline-flex items-center gap-1">
                          <CalendarClock className="h-3.5 w-3.5" />
                          {date(r.startsAt)}
                        </span>
                      ) : null}
                      {r.status === "PUBLISHED" ? (
                        <span className="inline-flex items-center gap-1">
                          <BarChart3 className="h-3.5 w-3.5" />
                          {st.views} {tt("προβολές", "views")}
                          {st.contacts ? ` · ${st.contacts} ${tt("επαφές", "contacts")}` : ""}
                        </span>
                      ) : null}
                    </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {r.status === "PUBLISHED" ? (
                      <Link
                        href={publicHref(r.entity, r.slug)}
                        className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-semibold hover:border-brand-300 hover:text-brand-700"
                      >
                        <Eye className="h-4 w-4" /> {tt("Προβολή", "View")}
                      </Link>
                    ) : null}
                    <Link
                      href={editHref(r.entity, r.slug)}
                      className="inline-flex items-center gap-1 rounded-full border border-brand-200 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                    >
                      <Pencil className="h-4 w-4" /> {tt("Επεξεργασία", "Edit")}
                    </Link>
                    <form action={setListingStatus} className="flex items-center gap-1.5">
                      <input type="hidden" name="kind" value={r.table} />
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="slug" value={r.slug} />
                      <select
                        name="status"
                        defaultValue={r.status}
                        className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {statusLabel(s, locale)}
                          </option>
                        ))}
                      </select>
                      <button className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700">
                        {tt("Εφαρμογή", "Apply")}
                      </button>
                    </form>
                  </div>
                </div>

                {/* The only irreversible action in the panel, so it is folded
                    away and says what it does before it is reachable. */}
                {r.fromFile ? (
                  <p className="mt-2 text-xs text-slate-400">
                    {tt(
                      "Γραμμένη σε αρχείο του repository. Με την πρώτη αλλαγή κατάστασης δημιουργείται εγγραφή στη βάση και γίνεται πλήρως διαχειρίσιμη — το αρχείο μένει ως έχει.",
                      "Written in a repository file. The first status change creates a database row and makes it fully manageable — the file itself is left alone.",
                    )}
                  </p>
                ) : null}

                {r.fromFile ? null : (
                  <details className="mt-2">
                    <summary className="inline-flex cursor-pointer items-center gap-1 text-xs text-slate-400 hover:text-rose-600">
                      <Trash2 className="h-3.5 w-3.5" /> {tt("Διαγραφή…", "Delete…")}
                    </summary>
                    <form action={deleteListing} className="mt-2 flex flex-wrap items-center gap-3">
                      <input type="hidden" name="kind" value={r.table} />
                      <input type="hidden" name="id" value={r.id} />
                      <p className="text-xs text-rose-800">
                        {tt(
                          "Οριστική διαγραφή, χωρίς επαναφορά. Για να κατέβει απλώς από το site, βάλ' την σε «Πρόχειρο».",
                          "Permanent, with no undo. To just take it off the site, set it to Draft instead.",
                        )}
                      </p>
                      <button className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-800 hover:bg-rose-100">
                        {tt("Διαγραφή οριστικά", "Delete permanently")}
                      </button>
                    </form>
                  </details>
                )}
              </li>
            );
          })}
        </ul>
        </>
      )}
    </div>
  );
}

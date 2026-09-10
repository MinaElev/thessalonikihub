# ThessalonikiHub

The digital discovery platform for Thessaloniki — **where to stay, eat, drink, and what to do**.
Bilingual (Greek / English), SEO-first, and built to grow from a website into a platform.

> Η ψηφιακή πλατφόρμα ανακάλυψης για τη Θεσσαλονίκη. Δίγλωσσο (Ελληνικά / Αγγλικά),
> με προτεραιότητα στο SEO και σε ποιοτικό περιεχόμενο.

---

## Tech stack

- **Next.js 15** (App Router, React 19) — server components, static generation, great SEO.
- **next-intl** — locale routing (`el` at root, `en` under `/en`) with hreflang.
- **Tailwind CSS v4** — design tokens in `src/app/globals.css`.
- **TypeScript** throughout.
- Content today lives in typed files under `src/content`; the **repository layer**
  (`src/lib/repo.ts`) is the only reader, so it can be swapped for a database later
  without touching pages or components.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also type-checks)
npm run start    # serve the production build
```

Set the canonical origin in production:

```
NEXT_PUBLIC_SITE_URL=https://thessalonikihub.gr
```

## Project structure

```
src/
  app/[locale]/            All pages, wrapped in the locale layout (html/body)
    page.tsx               Home — "What do you want to do in Thessaloniki?"
    stay|eat|drink|discover|experiences/
      page.tsx                     Pillar index
      thessaloniki/page.tsx        City listing (all entities)
      thessaloniki/[collection]/   Curated SEO collection (area/type/intent)
      [slug]/page.tsx              Individual entity page
    events/  events/[slug]/        Events + event pages
    today/                         Dynamic daily page
    guides/  guides/[slug]/        Editorial content engine
  app/sitemap.ts  app/robots.ts    Multilingual sitemap + robots
  components/                      Header, Footer, cards, page renderers
  content/data/                    The content (accommodations, restaurants, …)
  i18n/                            next-intl routing / navigation / request
  lib/                             types, repo, seo, links, site, format
  messages/el.json  en.json        UI strings
```

## URL architecture (the SEO backbone)

The single source of truth is `src/lib/links.ts`.

```
/{pillar}                       pillar index          (e.g. /stay)
/{pillar}/thessaloniki          city listing          (e.g. /eat/thessaloniki)
/{pillar}/thessaloniki/{slug}   curated collection    (e.g. /stay/thessaloniki/couples)
/{pillar}/{slug}                entity page           (e.g. /stay/thermaikos-boutique-hotel)
/events  /events/{slug}         events
/today                          dynamic daily page
/guides  /guides/{slug}         editorial guides
/areas   /areas/{slug}          neighbourhood hubs
/metro   /metro/{station}       metro station guides (18 stations)
/when-to-visit/{month}          month-by-month guides (12 months)
/festivals/{slug}               permanent festival anchor pages
/what-to-eat/{dish}             food monographs
/routes/{slug}                  self-guided walking routes
/day-trips/{slug}               day trips from the city
/thessaloniki-and-chalkidiki    combined itineraries with the sister site
/for/{audience}                 audience hubs
/map  /search  /plan  /submit   tools
```

English mirrors these under `/en/...`. Every page emits a self-referencing
canonical plus hreflang alternates for all locales (`src/lib/seo.ts`).

## Content quality & SEO principles (built in)

- **No thin pages.** Only deliberately created, editorially justified collection
  pages get indexed (`src/content/data/collections.ts`), each with a unique intro.
  Arbitrary UI filter combinations are never turned into indexable URLs.
- **Index/noindex control.** `buildMetadata({ index: false })` marks any page
  that must not be indexed; `robots.ts` blocks `?query` URLs and `/api/`.
- **Internal-linking knowledge graph.** Each entity links to nearby places of
  other pillars and nearby events (`getNearbyPlaces` / `getNearbyEvents`), turning
  the site into an interconnected local graph.
- **Structured data (JSON-LD).** `LodgingBusiness` / `Restaurant` / `BarOrPub` /
  `TouristAttraction`, `Event`, `Article`, `FAQPage`, and `BreadcrumbList`.
- **No fabricated information.** There are no placeholder listings: everything in
  `src/content/data` is real and sourced. Attractions, metro facts, festival
  histories and dish origins were researched and cross-checked, and where a fact
  is uncertain or an origin is shared the content says so. Business listings are
  added only with verified public information or details supplied by the owner —
  never invented phone numbers, prices, hours or reviews. Photos are either
  properly licensed (Wikimedia Commons) or supplied by the owner; third-party
  booking-site images are never reused.

## Adding content

Everything is typed — the compiler guides you. Each entity supports per-locale
fields via `Localized<T>` (`{ el: "...", en: "..." }`; Greek required).

- **A place** (stay / eat / drink / discover / experience): add a `Place` to the
  matching file in `src/content/data/`.
- **An event**: add an `EventItem` to `src/content/data/events.ts`.
- **A curated collection (SEO page)**: add a `Collection` to
  `src/content/data/collections.ts` with a unique `intro`.
- **A guide**: add a `Guide` to `src/content/data/guides.ts` (markdown body).
- **A metro station / month / festival / dish / walking route**: add an entry to
  `metro.ts`, `months.ts`, `festivals.ts`, `dishes.ts` or `routes.ts`. Each is a
  typed content collection with its own hub and detail pages.

## Roadmap (mapped to the product vision)

**Phase 1 — MVP (this scaffold)**
Pillars STAY / EAT / DRINK / DISCOVER / EVENTS / EXPERIENCES, TODAY page,
guides, bilingual EL/EN, SEO foundation, knowledge-graph internal linking.
Content is admin-managed via typed files.

**Phase 2 — Database & business profiles**
Move `src/lib/repo.ts` to Postgres (Prisma). Business profiles + "Claim your
business", opening hours, menus, reviews with moderation, an interactive Map,
Offers / Deals, and richer Experiences.

**Phase 3 — Accounts & submissions**
Owner accounts, listing submission with editorial approval, business
subscriptions (Free / Pro / Premium), featured/premium placements, analytics.

**Phase 4 — Booking & monetization**
Booking commissions and leads, AdSense on editorial pages, sponsored content.

**Phase 5 — Platform**
AI City Concierge & "Build my day" (itineraries backed by the structured DB),
Student Hub, Local Services, Awards / "The Thessaloniki 100", Creator program,
additional languages (de, fr, it, ro, bg, sr, tr) with real localization.

## User submissions (registered users)

Registered users can submit listings in six categories — **accommodation, food,
drink, experience, service (e.g. transfer), event** — which go live after admin
approval.

- `/submit` → choose category → `/submit/[category]` form (React Hook Form + Zod).
- Auth via Supabase (email magic-link + Google): `/login`, `/auth/callback`.
- `/dashboard` — a user's own listings and their status.
- `/admin` — moderation queue (approve / reject); admins only.
- Flow: submit → `PENDING` → admin approves → `PUBLISHED` (appears on the site).

Everything is **guarded**: without Supabase env vars the whole site still runs on
the file-based content; auth/submit UI shows a "connect Supabase" state.

### Going live (connect Supabase)

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` → `.env` and fill `DATABASE_URL`, `DIRECT_URL`
   (Settings → Database) and `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (Settings → API).
3. `npm run db:push` (create tables) then `npm run db:seed` (load real content).
4. In Supabase → Authentication: set the Site URL / redirect to your domain and
   enable the Google provider (optional).
5. Make yourself an admin: in the SQL editor run
   `update "Profile" set role = 'ADMIN' where email = 'you@example.com';`
   (after signing in once so the row exists).

Still TODO on connect: direct photo upload (Supabase Storage) — the form takes
photo URLs for now — and composing Supabase session refresh into the middleware.

---

© ThessalonikiHub · thessalonikihub.gr

-- Row Level Security for the Supabase public schema.
--
-- Prisma creates tables with RLS DISABLED. Supabase exposes every table in the
-- `public` schema through PostgREST, so with RLS off any holder of the
-- NEXT_PUBLIC_SUPABASE_ANON_KEY -- which is, by design, shipped to the browser
-- -- can read and write them directly, bypassing the application entirely.
--
-- The app never reads these tables through the Supabase client: it uses Prisma
-- over DATABASE_URL, which connects as the project owner and bypasses RLS.
-- The Supabase client is used only for auth, which lives in the `auth` schema.
-- Enabling RLS with no policies therefore denies anon/authenticated access
-- while leaving the application untouched.
--
-- Re-run this after any `prisma migrate reset` or when adding a new model.

ALTER TABLE public."Claim"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Collection" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."EventItem"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Guide"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Place"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Profile"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."SavedItem"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Subscriber" ENABLE ROW LEVEL SECURITY;

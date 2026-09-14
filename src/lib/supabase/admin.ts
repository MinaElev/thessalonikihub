import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseUrl, isSupabaseConfigured } from "./config";

/**
 * A Supabase client holding the service role key.
 *
 * This key bypasses row-level security and can create, confirm and delete any
 * account, so it must never reach the browser: `server-only` above makes
 * importing it from a client component a build error rather than a leak.
 *
 * It exists because registration is ours to gate. The anon key is public by
 * design, so anything the browser can do, anyone can do with curl — including
 * calling signUp and skipping our email verification entirely. Creating the
 * account from the server, only after the code has been checked, is the only
 * version of that gate which actually holds. Pair it with "Disable signup" in
 * the Supabase dashboard so the public key cannot create accounts at all.
 */

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const isAdminConfigured = Boolean(isSupabaseConfigured && serviceKey);

let cached: SupabaseClient | null = null;

export function createAdminClient(): SupabaseClient | null {
  if (!isAdminConfigured) return null;
  cached ??= createClient(supabaseUrl, serviceKey as string, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return cached;
}

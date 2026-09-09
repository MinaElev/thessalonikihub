// Shared Supabase config, safe to import from both client and server.
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True once Supabase auth/storage env vars are set. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

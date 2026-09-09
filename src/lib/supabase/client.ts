"use client";

import { createBrowserClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey, isSupabaseConfigured } from "./config";

/** Browser Supabase client, or null if Supabase isn't configured yet. */
export function createClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

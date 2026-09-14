/**
 * Creates the Supabase Storage bucket that owner photo uploads land in.
 *
 * Run once per environment:
 *   node scripts/ensure-storage-bucket.mjs
 *
 * Public on purpose. These are photographs of restaurants and hotels meant to
 * appear on public pages, and a private bucket would mean signing every URL on
 * every render — slower, uncacheable, and no more private, since the images
 * are published either way.
 *
 * The size and type limits are enforced here as well as in the upload action:
 * the action is the door people use, this is the wall behind it.
 */
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config();

const BUCKET = "listing-photos";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "  The service role key is required: creating a bucket is an admin operation.",
  );
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: existing } = await admin.storage.getBucket(BUCKET);

if (existing) {
  console.log(`  Bucket "${BUCKET}" already exists (public: ${existing.public}).`);
} else {
  const { error } = await admin.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: 8 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/heic"],
  });
  if (error) {
    console.error("  Could not create the bucket:", error.message);
    process.exit(1);
  }
  console.log(`  Created bucket "${BUCKET}".`);
}

const { data: buckets } = await admin.storage.listBuckets();
console.log(`  Buckets now: ${(buckets ?? []).map((b) => b.name).join(", ") || "none"}`);

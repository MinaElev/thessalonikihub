import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Server actions cap request bodies at 1MB by default, and a photograph
    // straight off a phone is several times that before it reaches the
    // resizer. The upload action enforces its own 8MB limit.
    serverActions: { bodySizeLimit: "9mb" },
  },
  images: {
    // Remote image hosts are added here as real listings are onboarded.
    // Wikimedia is deliberately absent: its photos are downloaded into
    // public/photos by scripts/fetch-photo-credits.mjs, because hotlinking
    // upload.wikimedia.org gets rate-limited (HTTP 429) under real traffic.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Owner uploads live in this project's own Supabase Storage bucket.
      ...(supabaseHost
        ? [{ protocol: "https" as const, hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
        : []),
    ],
  },
};

export default withNextIntl(nextConfig);

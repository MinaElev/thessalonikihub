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
    /*
     * AVIF first, WebP behind it.
     *
     * Measured on this project's own photographs: 37% smaller at 640px and
     * 41% at 1080px for the same visual quality. On a site that is mostly
     * pictures, that is the single largest saving available, and browsers
     * that cannot decode AVIF are served the WebP automatically.
     *
     * The cost is encode time on the first request for each new size, which
     * is why the cache below is long: these are photographs of buildings and
     * food, not dashboards, and they do not change from one week to the next.
     * A photograph replaced at the same path takes up to a month to reach
     * people who already loaded it — rename the file to publish it sooner.
     */
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
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
  /*
   * Headers the browser should be told once, not guessed at.
   *
   * Nothing here changes how a page looks; they close the cheap holes a
   * public site is expected to close. Referrer-Policy keeps the full URL of
   * a member's dashboard out of the Referer sent to an outbound restaurant
   * site, and the permissions policy declines hardware this site never asks
   * for, so an embedded third party cannot ask on its behalf.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), payment=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Remote image hosts are added here as real listings are onboarded.
    // Wikimedia is deliberately absent: its photos are downloaded into
    // public/photos by scripts/fetch-photo-credits.mjs, because hotlinking
    // upload.wikimedia.org gets rate-limited (HTTP 429) under real traffic.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default withNextIntl(nextConfig);

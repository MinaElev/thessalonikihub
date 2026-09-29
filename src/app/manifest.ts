import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ThessalonikiHub",
    short_name: "ThessalonikiHub",
    description: "The digital guide to Thessaloniki — where to stay, eat, drink and what to do.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#128788",
    /*
     * The SVG alone was not enough to install: Android and Chrome want real
     * PNG sizes before they will offer "add to home screen", and a maskable
     * one so the launcher can crop to its own shape without clipping the Θ.
     * Generated from the same SVG by scripts/build-icons.mjs.
     */
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

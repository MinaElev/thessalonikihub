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
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}

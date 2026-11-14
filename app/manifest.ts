import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Garra",
    description: siteConfig.shortDescription,
    lang: siteConfig.language,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0B0F1A",
    theme_color: "#0B0F1A",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

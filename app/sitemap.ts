import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

/** Somente URLs canônicas, existentes e indexáveis. Âncoras (#secao) não são URLs e não entram aqui. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.contentUpdatedAt);
  return [
    { url: `${siteConfig.url}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/politica-de-privacidade`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}

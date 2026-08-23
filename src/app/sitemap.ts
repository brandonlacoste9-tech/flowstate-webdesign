import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { studio } from "@/content/studio";
import { routing } from "@/i18n/routing";

const pages = ["", "/work", "/services", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const page of pages) {
      const languages = Object.fromEntries(
        routing.locales.map((l) => [l, `${studio.url}/${l}${page}`]),
      );
      entries.push({
        url: `${studio.url}/${locale}${page}`,
        lastModified,
        alternates: { languages },
      });
    }

    for (const study of caseStudies) {
      const path = `/work/${study.slug}`;
      const languages = Object.fromEntries(
        routing.locales.map((l) => [l, `${studio.url}/${l}${path}`]),
      );
      entries.push({
        url: `${studio.url}/${locale}${path}`,
        lastModified,
        alternates: { languages },
      });
    }
  }

  return entries;
}

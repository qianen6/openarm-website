import type { MetadataRoute } from "next";
import { SITE_BASE_PATH, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: SITE_BASE_PATH || "/",
        disallow: [`${SITE_BASE_PATH}/api/`, `${SITE_BASE_PATH}/_next/`],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

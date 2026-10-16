import { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/l/"] }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}

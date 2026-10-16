import { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { SITE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const reflexions = ((getContent() as any).reflexions ?? []) as { slug: string }[];
  return [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/cv`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/reflexion`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...reflexions.map((r) => ({ url: `${SITE}/reflexion/${r.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}

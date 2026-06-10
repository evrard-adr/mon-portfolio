import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://evrard-andre.vercel.app", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://evrard-andre.vercel.app/cv", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://evrard-andre.vercel.app/contact", lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
  ];
}

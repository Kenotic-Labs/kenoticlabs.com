import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

const DEMO_PERSONAS = ["priya", "marcus", "dr-amara", "jess-taylor"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kenoticlabs.com";

  const articleEntries = articles.map((article) => ({
    url: `${baseUrl}/insights/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const personaEntries = DEMO_PERSONAS.map((slug) => ({
    url: `${baseUrl}/demo/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/thesis`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/demo/live`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...personaEntries,
    ...articleEntries,
  ];
}

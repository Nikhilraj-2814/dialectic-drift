import type { MetadataRoute } from "next";
import { getAllArticles, getCanonicalUrl, getTopics } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/articles", "/topics", "/manifesto", "/about"].map((route) => ({
    url: getCanonicalUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: getCanonicalUrl(`/articles/${article.slug}`),
    lastModified: new Date(`${article.date}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: article.featured ? 0.9 : 0.7,
  }));

  const topicRoutes: MetadataRoute.Sitemap = getTopics().map((topic) => ({
    url: getCanonicalUrl(`/topics/${topic.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes, ...topicRoutes];
}

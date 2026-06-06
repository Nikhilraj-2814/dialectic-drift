import fs from "node:fs";
import path from "node:path";

export type ArticleFrontmatter = {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  author: string;
  coverImage: string;
};

export type TableOfContentsItem = {
  id: string;
  title: string;
  depth: 2 | 3;
};

export type ArticleMeta = ArticleFrontmatter & {
  slug: string;
  readingTime: string;
  wordCount: number;
  tableOfContents: TableOfContentsItem[];
};

export type Article = ArticleMeta & {
  content: string;
};

const articlesDirectory = path.join(process.cwd(), "content", "articles");
const wordsPerMinute = 220;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((item) => item.trim().replace(/^[\'"]|[\'"]$/g, ""))
    .filter(Boolean);
}

function parseBoolean(value: string | undefined) {
  return value?.toLowerCase() === "true";
}

function parseFrontmatter(fileContents: string) {
  const frontmatterMatch = fileContents.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const frontmatter = frontmatterMatch?.[1] ?? "";
  const content = frontmatterMatch
    ? fileContents.slice(frontmatterMatch[0].length).trim()
    : fileContents.trim();

  const fields = new Map<string, string>();
  for (const line of frontmatter.split(/\r?\n/)) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^[\'"]|[\'"]$/g, "");
    fields.set(key, value);
  }

  return { fields, content };
}

export function countWords(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#{}`>*_\-[\]()]|https?:\/\/\S+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function calculateReadingTime(content: string) {
  const wordCount = countWords(content);
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return { readingTime: `${minutes} min read`, wordCount };
}

export function extractTableOfContents(content: string): TableOfContentsItem[] {
  return content
    .split(/\r?\n/)
    .map((line) => {
      const match = line.match(/^(##|###)\s+(.+)$/);
      if (!match) return undefined;
      const title = match[2].replace(/[*_`]/g, "").trim();
      return {
        id: slugify(title),
        title,
        depth: match[1] === "##" ? (2 as const) : (3 as const),
      };
    })
    .filter((item): item is TableOfContentsItem => Boolean(item));
}

function getArticleFilenames() {
  if (!fs.existsSync(articlesDirectory)) return [];
  return fs
    .readdirSync(articlesDirectory)
    .filter((filename) => filename.endsWith(".mdx"))
    .sort();
}

export function getArticleSlugs() {
  return getArticleFilenames().map((filename) => filename.replace(/\.mdx$/, ""));
}

export function getArticleBySlug(slug: string): Article | undefined {
  const normalizedSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(articlesDirectory, `${normalizedSlug}.mdx`);

  if (!fs.existsSync(fullPath)) return undefined;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { fields, content } = parseFrontmatter(fileContents);
  const title = fields.get("title") ?? normalizedSlug.replace(/-/g, " ");
  const description = fields.get("description") ?? fields.get("excerpt") ?? content.split("\n").find(Boolean) ?? "";
  const { readingTime, wordCount } = calculateReadingTime(content);

  return {
    slug: normalizedSlug,
    title,
    description,
    category: fields.get("category") ?? "Essays",
    date: fields.get("date") ?? "2026-01-01",
    author: fields.get("author") ?? "Dialectic Drift Editors",
    tags: parseList(fields.get("tags")),
    featured: parseBoolean(fields.get("featured")),
    coverImage: fields.get("coverImage") ?? "/logo.png",
    readingTime,
    wordCount,
    tableOfContents: extractTableOfContents(content),
    content,
  };
}

export function getAllArticles() {
  return getArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => Boolean(article))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedArticle() {
  return getAllArticles().find((article) => article.featured) ?? getAllArticles()[0];
}

export function getLatestArticles(limit?: number) {
  const articles = getAllArticles();
  return typeof limit === "number" ? articles.slice(0, limit) : articles;
}

export function getEditorsPicks(limit = 3) {
  const featured = getAllArticles().filter((article) => article.featured);
  return (featured.length ? featured : getAllArticles()).slice(0, limit);
}

export function getRelatedArticles(article: Article, limit = 3) {
  return getAllArticles()
    .filter((item) => item.slug !== article.slug)
    .map((item) => {
      const tagScore = item.tags.filter((tag) => article.tags.includes(tag)).length;
      const categoryScore = item.category === article.category ? 2 : 0;
      return { item, score: tagScore + categoryScore };
    })
    .sort((a, b) => b.score - a.score || new Date(b.item.date).getTime() - new Date(a.item.date).getTime())
    .slice(0, limit)
    .map(({ item }) => item);
}

export function getArticleNeighbors(slug: string) {
  const chronological = [...getAllArticles()].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const index = chronological.findIndex((article) => article.slug === slug);
  return {
    previous: index > 0 ? chronological[index - 1] : undefined,
    next: index >= 0 && index < chronological.length - 1 ? chronological[index + 1] : undefined,
  };
}

export function getTopics() {
  return Array.from(
    getAllArticles().reduce((topics, article) => {
      const current = topics.get(article.category) ?? { name: article.category, count: 0, slug: slugify(article.category) };
      topics.set(article.category, { ...current, count: current.count + 1 });
      return topics;
    }, new Map<string, { name: string; count: number; slug: string }>()),
  ).map(([, topic]) => topic);
}

export function getArticlesByTopic(topicSlug: string) {
  return getAllArticles().filter((article) => slugify(article.category) === topicSlug);
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export function getCanonicalUrl(pathname = "") {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dialecticdrift.com";
  return new URL(pathname, siteUrl).toString();
}

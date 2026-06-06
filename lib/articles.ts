import fs from "node:fs";
import path from "node:path";

export type ArticleMeta = {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
};

export type Article = ArticleMeta & {
  content: string;
};

const articlesDirectory = path.join(process.cwd(), "content", "articles");

function parseList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((item) => item.trim().replace(/^['\"]|['\"]$/g, ""))
    .filter(Boolean);
}

function parseFrontmatter(fileContents: string) {
  const frontmatterMatch = fileContents.match(/^---\n([\s\S]*?)\n---\n?/);
  const frontmatter = frontmatterMatch?.[1] ?? "";
  const content = frontmatterMatch
    ? fileContents.slice(frontmatterMatch[0].length).trim()
    : fileContents.trim();

  const fields = new Map<string, string>();
  for (const line of frontmatter.split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) continue;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['\"]|['\"]$/g, "");
    fields.set(key, value);
  }

  return { fields, content };
}

function calculateReadingTime(content: string) {
  const words = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#{}`>*_\-[\]()]|https?:\/\/\S+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
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

  return {
    slug: normalizedSlug,
    title: fields.get("title") ?? normalizedSlug.replace(/-/g, " "),
    category: fields.get("category") ?? "Essays",
    date: fields.get("date") ?? "2026-01-01",
    author: fields.get("author") ?? "Dialectic Drift Editors",
    excerpt: fields.get("excerpt") ?? content.split("\n").find(Boolean) ?? "",
    tags: parseList(fields.get("tags")),
    readingTime: calculateReadingTime(content),
    content,
  };
}

export function getAllArticles() {
  return getArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => Boolean(article))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

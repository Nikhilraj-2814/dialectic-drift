import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownContent from "@/components/MarkdownContent";
import Navbar from "@/components/Navbar";
import {
  formatArticleDate,
  getArticleBySlug,
  getArticleNeighbors,
  getArticleSlugs,
  getCanonicalUrl,
  getRelatedArticles,
} from "@/lib/articles";

export const dynamicParams = false;

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  const canonical = getCanonicalUrl(`/articles/${article.slug}`);

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author }],
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonical,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      images: [{ url: article.coverImage, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.coverImage],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = getRelatedArticles(article, 3);
  const { previous, next } = getArticleNeighbors(article.slug);
  const canonical = getCanonicalUrl(`/articles/${article.slug}`);
  const encodedUrl = encodeURIComponent(canonical);
  const encodedTitle = encodeURIComponent(article.title);

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white">
      <Navbar />
      <article className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:px-8">
        <div className="min-w-0">
          <Link href="/articles" className="text-sm font-semibold text-[#c9a227] hover:text-[#e0bd4d]">
            ← Back to archive
          </Link>
          <header className="mt-8 border-b border-white/10 pb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c9a227]">{article.category}</p>
            <h1 className="font-title mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-gray-300">{article.description}</p>
            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400">
              <span>{article.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
              <span aria-hidden="true">·</span>
              <span>{article.wordCount.toLocaleString()} words</span>
            </div>
          </header>

          <MarkdownContent content={article.content} />

          <nav className="mt-16 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2" aria-label="Article navigation">
            {previous ? (
              <Link href={`/articles/${previous.slug}`} className="rounded-2xl border border-white/10 p-5 transition hover:border-[#c9a227]/50">
                <span className="text-xs uppercase tracking-[0.22em] text-gray-500">Previous</span>
                <span className="mt-2 block font-semibold text-white">{previous.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/articles/${next.slug}`} className="rounded-2xl border border-white/10 p-5 text-left transition hover:border-[#c9a227]/50 sm:text-right">
                <span className="text-xs uppercase tracking-[0.22em] text-gray-500">Next</span>
                <span className="mt-2 block font-semibold text-white">{next.title}</span>
              </Link>
            ) : null}
          </nav>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {article.tableOfContents.length ? (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c9a227]">Contents</h2>
              <ol className="mt-4 space-y-3 text-sm text-gray-300">
                {article.tableOfContents.map((item) => (
                  <li key={item.id} className={item.depth === 3 ? "pl-4" : undefined}>
                    <a href={`#${item.id}`} className="hover:text-[#c9a227]">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c9a227]">Share</h2>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <a className="rounded-full border border-white/10 px-3 py-2 hover:border-[#c9a227]/60" href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}>
                X / Twitter
              </a>
              <a className="rounded-full border border-white/10 px-3 py-2 hover:border-[#c9a227]/60" href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}>
                LinkedIn
              </a>
              <a className="rounded-full border border-white/10 px-3 py-2 hover:border-[#c9a227]/60" href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}>
                Email
              </a>
            </div>
          </section>
        </aside>
      </article>

      {related.length ? (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="font-title text-3xl font-bold">Related essays</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/articles/${item.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#c9a227]/50">
                <p className="text-xs uppercase tracking-[0.22em] text-[#c9a227]">{item.category}</p>
                <h3 className="font-title mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{item.readingTime}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

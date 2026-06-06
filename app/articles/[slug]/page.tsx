import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownContent from "@/components/MarkdownContent";
import Navbar from "@/components/Navbar";
import { formatArticleDate, getAllArticles, getArticleBySlug, getArticleSlugs } from "@/lib/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const related = getAllArticles().filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <Navbar />
      <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <Link href="/articles" className="text-sm font-semibold text-[#C9A227] hover:text-[#e0bd4d]">← Back to archive</Link>
        <header className="mt-8 border-b border-white/10 pb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#C9A227]">{article.category}</p>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">{article.title}</h1>
          <p className="mt-6 text-xl leading-8 text-gray-300">{article.excerpt}</p>
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-400">
            <span>{article.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTime}</span>
          </div>
        </header>

        <MarkdownContent content={article.content} />
      </article>

      {related.length ? (
        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Continue reading</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <Link key={item.slug} href={`/articles/${item.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#C9A227]/50">
                <p className="text-xs uppercase tracking-[0.22em] text-[#C9A227]">{item.category}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{item.readingTime}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

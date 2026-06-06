import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { formatArticleDate, getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description: "The Dialectic Drift article archive: long-form essays on power, history, philosophy, geopolitics, technology, and society.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#C9A227]">Archive</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">Articles</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">A living archive of essays written to slow down the news cycle and recover the deeper arguments beneath politics, technology, culture, and historical memory.</p>

        <div className="mt-12 grid gap-5">
          {articles.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#C9A227]/50 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C9A227]">{article.category}</p>
                  <h2 className="mt-3 text-2xl font-bold group-hover:text-[#C9A227] sm:text-3xl">{article.title}</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-gray-300">{article.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">{tag}</span>
                    ))}
                  </div>
                </div>
                <p className="shrink-0 text-sm text-gray-400 sm:text-right">{formatArticleDate(article.date)}<br />{article.readingTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

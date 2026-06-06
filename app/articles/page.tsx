import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { formatArticleDate, getAllArticles, getCanonicalUrl, getTopics } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "The Dialectic Drift article archive: long-form essays on power, history, philosophy, geopolitics, technology, and society.",
  alternates: { canonical: getCanonicalUrl("/articles") },
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const topics = getTopics();

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white">
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c9a227]">Archive</p>
            <h1 className="font-title mt-4 text-5xl font-bold tracking-tight sm:text-7xl">Articles</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              A living archive of essays written to slow down the news cycle and recover the deeper arguments beneath politics,
              technology, culture, and historical memory.
            </p>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c9a227]">Search-ready index</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Every card is generated from MDX frontmatter, including normalized title, category, date, tags, and reading-time data for future filtering.
            </p>
          </aside>
        </div>

        <div id="topics" className="mt-10 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Link key={topic.slug} href={`/topics/${topic.slug}`} className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-[#c9a227]/60 hover:text-white">
              {topic.name} <span className="text-gray-500">{topic.count}</span>
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-5" data-article-index>
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#c9a227]/50 sm:p-8"
              data-title={article.title}
              data-category={article.category}
              data-tags={article.tags.join(",")}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227]">{article.category}</p>
                  <h2 className="font-title mt-3 text-2xl font-bold group-hover:text-[#c9a227] sm:text-3xl">{article.title}</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-gray-300">{article.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="shrink-0 text-sm text-gray-400 sm:text-right">
                  <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                  <br />
                  {article.readingTime}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

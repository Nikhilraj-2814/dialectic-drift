import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  formatArticleDate,
  getEditorsPicks,
  getFeaturedArticle,
  getLatestArticles,
  getTopics,
} from "@/lib/articles";

export const metadata: Metadata = {
  title: "Dialectic Drift",
  description:
    "An independent digital publication of long-form essays on power, history, philosophy, geopolitics, technology, and public life.",
};

export default function Home() {
  const featured = getFeaturedArticle();
  const latest = getLatestArticles(4).filter((article) => article.slug !== featured?.slug).slice(0, 3);
  const topics = getTopics();
  const editorsPicks = getEditorsPicks(3);

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white">
      <Navbar />

      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.36em] text-[#c9a227]">Independent Journal of Ideas</p>
            <h1 className="font-title mt-5 text-5xl font-bold leading-[0.96] tracking-tight sm:text-7xl">
              Essays for readers who distrust easy certainty.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-300">
              Dialectic Drift publishes patient arguments about institutions, memory, technology, strategy, and the political
              life of ideas. The point is not to keep pace with the feed; it is to understand what the feed makes difficult to see.
            </p>
          </div>

          {featured ? (
            <Link href={`/articles/${featured.slug}`} className="group self-end rounded-[2rem] border border-[#c9a227]/35 bg-[#c9a227]/[0.07] p-6 transition hover:border-[#c9a227]/70 sm:p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#c9a227]">Featured Essay</p>
              <h2 className="font-title mt-5 text-3xl font-bold leading-tight group-hover:text-[#c9a227] sm:text-5xl">{featured.title}</h2>
              <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg">{featured.description}</p>
              <p className="mt-8 text-sm text-gray-400">
                {formatArticleDate(featured.date)} · {featured.readingTime} · {featured.category}
              </p>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#c9a227]">Latest Essays</p>
            <h2 className="font-title mt-2 text-3xl font-bold sm:text-4xl">Recently published</h2>
          </div>
          <Link href="/articles" className="text-sm font-semibold text-[#c9a227] hover:text-[#e0bd4d]">
            View archive
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latest.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#c9a227]/50">
              <p className="text-xs uppercase tracking-[0.22em] text-[#c9a227]">{article.category}</p>
              <h3 className="font-title mt-3 text-2xl font-semibold">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-400">{article.description}</p>
              <p className="mt-6 text-xs text-gray-500">{formatArticleDate(article.date)} · {article.readingTime}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#c9a227]">Topics</p>
          <h2 className="font-title mt-3 text-3xl font-bold">Follow the drift by subject.</h2>
          <p className="mt-4 leading-7 text-gray-300">
            Categories are inferred from article frontmatter, so the publication taxonomy grows as the archive grows.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {topics.map((topic) => (
              <Link key={topic.slug} href={`/topics/${topic.slug}`} className="rounded-full border border-white/10 px-4 py-2 text-sm transition hover:border-[#c9a227]/60 hover:text-[#c9a227]">
                {topic.name} ({topic.count})
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#c9a227]">Editor&apos;s Picks</p>
          <div className="mt-4 grid gap-4">
            {editorsPicks.map((article, index) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="group flex gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#c9a227]/50">
                <span className="font-title text-4xl text-[#c9a227]/60">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="font-title block text-2xl font-semibold group-hover:text-[#c9a227]">{article.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-gray-400">{article.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-12 border-t border-white/10 px-4 py-8 text-center text-sm text-gray-500">
        Dialectic Drift · Ideas in Motion
      </footer>
    </main>
  );
}

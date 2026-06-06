import Link from "next/link";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { formatArticleDate, getAllArticles } from "@/lib/articles";

const topics = ["Geopolitics", "Philosophy", "History", "Technology", "Society"];

export default function Home() {
  const articles = getAllArticles();
  const [featured, ...recent] = articles;

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <Navbar />
      <Hero />

      {featured ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link href={`/articles/${featured.slug}`} className="group block rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-[#C9A227]/50 sm:p-10 lg:p-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#C9A227]">Featured Essay</p>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="max-w-4xl text-3xl font-bold tracking-tight group-hover:text-[#C9A227] sm:text-5xl">{featured.title}</h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-gray-300 sm:text-lg">{featured.excerpt}</p>
              </div>
              <p className="shrink-0 text-sm text-gray-400">{formatArticleDate(featured.date)} · {featured.readingTime}</p>
            </div>
          </Link>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold">Latest articles</h2>
            <Link href="/articles" className="text-sm font-semibold text-[#C9A227] hover:text-[#e0bd4d]">View all</Link>
          </div>
          <div className="space-y-4">
            {recent.slice(0, 3).map((article) => (
              <Link key={article.slug} href={`/articles/${article.slug}`} className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#C9A227]/40">
                <p className="text-xs uppercase tracking-[0.22em] text-[#C9A227]">{article.category}</p>
                <h3 className="mt-2 text-2xl font-semibold">{article.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-400">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-[#C9A227]/25 bg-[#C9A227]/[0.06] p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Editorial compass</h2>
          <p className="mt-4 leading-7 text-gray-300">We publish slowly, argue carefully, and treat every conclusion as provisional. The archive is built for readers who want context before certainty.</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {topics.map((topic) => (
              <div key={topic} className="rounded-xl border border-white/10 bg-black/20 p-4 text-center text-sm font-medium text-gray-200">{topic}</div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 p-8 text-center sm:p-12">
          <h2 className="text-3xl font-bold">Stay in the Drift</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">New essays, reading notes, and editorial dispatches for readers who prefer analysis over acceleration.</p>
          <Link href="/articles" className="mt-8 inline-flex rounded-full bg-[#C9A227] px-7 py-3 font-semibold text-black transition hover:bg-[#e0bd4d]">Start reading</Link>
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-gray-500">Dialectic Drift · Ideas in Motion</footer>
    </main>
  );
}

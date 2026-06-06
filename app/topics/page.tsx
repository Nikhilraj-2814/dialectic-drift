import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getCanonicalUrl, getTopics } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Topics",
  description: "Browse Dialectic Drift essays by publication topic.",
  alternates: { canonical: getCanonicalUrl("/topics") },
};

export default function TopicsPage() {
  const topics = getTopics();

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#c9a227]">Topics</p>
        <h1 className="font-title mt-4 text-5xl font-bold tracking-tight sm:text-7xl">The publication map</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
          Dialectic Drift organizes essays by the frontmatter category of each MDX file. Add a new category to a new essay and it becomes part of this map automatically.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link key={topic.slug} href={`/topics/${topic.slug}`} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#c9a227]/50">
              <h2 className="font-title text-3xl font-semibold">{topic.name}</h2>
              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-gray-500">{topic.count} essay{topic.count === 1 ? "" : "s"}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

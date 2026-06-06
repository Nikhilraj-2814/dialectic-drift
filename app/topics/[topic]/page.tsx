import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { formatArticleDate, getArticlesByTopic, getCanonicalUrl, getTopics } from "@/lib/articles";

type TopicPageProps = {
  params: Promise<{ topic: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getTopics().map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topic } = await params;
  const topicData = getTopics().find((item) => item.slug === topic);

  if (!topicData) return { title: "Topic not found" };

  return {
    title: topicData.name,
    description: `Essays in ${topicData.name} from Dialectic Drift.`,
    alternates: { canonical: getCanonicalUrl(`/topics/${topicData.slug}`) },
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;
  const topicData = getTopics().find((item) => item.slug === topic);
  const articles = getArticlesByTopic(topic);

  if (!topicData || !articles.length) notFound();

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Link href="/topics" className="text-sm font-semibold text-[#c9a227] hover:text-[#e0bd4d]">← All topics</Link>
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.32em] text-[#c9a227]">Topic</p>
        <h1 className="font-title mt-4 text-5xl font-bold tracking-tight sm:text-7xl">{topicData.name}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
          {topicData.count} essay{topicData.count === 1 ? "" : "s"} currently filed under {topicData.name}.
        </p>
        <div className="mt-12 grid gap-5">
          {articles.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`} className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#c9a227]/50 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c9a227]">{article.category}</p>
              <h2 className="font-title mt-3 text-2xl font-bold group-hover:text-[#c9a227] sm:text-3xl">{article.title}</h2>
              <p className="mt-3 max-w-3xl leading-7 text-gray-300">{article.description}</p>
              <p className="mt-5 text-sm text-gray-500">{formatArticleDate(article.date)} · {article.readingTime}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

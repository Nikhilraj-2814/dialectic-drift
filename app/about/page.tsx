import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "About",
  description: "About Dialectic Drift, an independent publication for long-form analysis of power, history, philosophy, technology, and public life.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <Navbar />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#C9A227]">About the journal</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">Dialectic Drift is a publication for thinking in public.</h1>
        <div className="mt-10 space-y-8 text-lg leading-8 text-gray-300">
          <p>
            Dialectic Drift is an independent journal of ideas devoted to the slow work of interpretation. We publish essays on geopolitics, philosophy, history, technology, institutions, and the moral vocabulary of public life. The publication begins from a simple premise: the age of infinite information has not produced a comparable abundance of judgment.
          </p>
          <p>
            Our editorial method is dialectical rather than doctrinal. We are interested in arguments that sharpen one another, assumptions that reveal their hidden architecture, and questions that survive contact with evidence. Drift, in our name, is not aimlessness. It is the recognition that ideas travel, mutate, collide, and return in altered form through institutions, markets, borders, and cultures.
          </p>
          <p>
            We do not chase every headline. We ask what a headline presupposes, what history it forgets, what incentives it conceals, and what language it makes available or impossible. A good Dialectic Drift essay should leave the reader with better questions, a richer map of causality, and enough intellectual humility to keep revising the map.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {[
            ["Context over velocity", "We privilege durable explanations over reactive commentary."],
            ["Argument over posture", "We care less about belonging to a camp than testing whether a claim can stand."],
            ["History over amnesia", "We treat the past as an active force inside the present, not a museum."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="font-semibold text-[#C9A227]">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-400">{copy}</p>
            </div>
          ))}
        </div>

        <section className="mt-16 rounded-3xl border border-[#C9A227]/25 bg-[#C9A227]/[0.06] p-6 sm:p-8">
          <h2 className="text-2xl font-bold">Editorial scope</h2>
          <p className="mt-4 leading-7 text-gray-300">
            Dialectic Drift publishes long-form essays, editorial notes, reading lists, and thematic dossiers. Its recurring concerns include civilizational memory, state power, technological governance, political myth, public reason, social trust, strategic geography, and the philosophical assumptions beneath everyday policy debates.
          </p>
        </section>
      </section>
    </main>
  );
}

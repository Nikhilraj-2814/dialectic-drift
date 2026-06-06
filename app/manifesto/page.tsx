import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Manifesto",
  description: "The Dialectic Drift manifesto: a case for slower thinking, better arguments, and historical consciousness in public life.",
};

const principles = [
  ["Slow the feed", "The first discipline of serious thought is refusing the tempo of outrage. Speed is useful for alerts; it is disastrous as a theory of understanding."],
  ["Name the frame", "Every debate arrives with hidden assumptions about human nature, legitimacy, risk, justice, and power. Analysis begins when the frame becomes visible."],
  ["Respect complexity", "Complexity is not an excuse for paralysis. It is a demand for intellectual honesty: causes multiply, incentives conflict, and unintended consequences matter."],
  ["Interrogate power", "Power is not only coercion. It is agenda-setting, classification, memory, infrastructure, legitimacy, and the quiet ability to decide what counts as normal."],
  ["Keep the argument open", "A publication of ideas should not become a church of conclusions. We reserve the right to revise, refine, and abandon our own claims."],
];

export default function ManifestoPage() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-white">
      <Navbar />
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#C9A227]">Manifesto</p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">Against the poverty of instant certainty.</h1>
        <p className="mt-8 text-xl leading-9 text-gray-300">
          Dialectic Drift exists because public life is drowning in information and starving for interpretation. We live inside a permanent collision of claims: policy briefs, battlefield maps, market signals, algorithmic feeds, moral slogans, historical analogies, and institutional press releases. The problem is not that people lack access to facts. The problem is that facts arrive stripped of proportion, memory, and meaning.
        </p>

        <div className="article-body mt-12">
          <h2>The publication we need</h2>
          <p>
            A functioning intellectual culture needs more than hot takes and credentialed consensus. It needs spaces where questions can be held open long enough to become precise; where the defeated argument is understood before it is dismissed; where history is not reduced to a decorative analogy; and where technology is examined as a political force rather than a sequence of product launches.
          </p>
          <p>
            Dialectic Drift is built for that space. It is not neutral in the sense of having no convictions. It is independent in the sense of refusing inherited scripts. We believe democratic societies require citizens who can distinguish evidence from mood, institutions from mythology, expertise from priesthood, and skepticism from nihilism.
          </p>

          <h2>What we oppose</h2>
          <p>
            We oppose the conversion of every event into tribal confirmation. We oppose the flattening of historical memory into slogans. We oppose the idea that politics can be understood without philosophy, that technology can be governed without ethics, or that geopolitics can be analyzed without geography, culture, and long institutional memory.
          </p>
          <p>
            We also oppose despair dressed up as sophistication. The world is difficult to understand, but it is not unintelligible. Systems can be mapped. Power can be named. Bad arguments can be improved or defeated. Better language can make better action possible.
          </p>

          <h2>Our principles</h2>
        </div>

        <div className="mt-8 grid gap-4">
          {principles.map(([title, copy]) => (
            <section key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-bold text-[#C9A227]">{title}</h2>
              <p className="mt-3 leading-7 text-gray-300">{copy}</p>
            </section>
          ))}
        </div>

        <div className="article-body mt-12">
          <h2>The drift</h2>
          <p>
            The drift is the movement of ideas through time. A concept born in philosophy becomes a legal doctrine. A military necessity becomes a permanent institution. A technical standard becomes a social expectation. A forgotten empire returns as a metaphor. A slogan becomes policy, then infrastructure, then common sense.
          </p>
          <p>
            To follow the drift is to ask where ideas come from, who benefits from their adoption, what they obscure, what they make possible, and how they might be contested. That is the work of this publication: patient reconstruction, adversarial sympathy, and a refusal to confuse attention with understanding.
          </p>
          <p>
            Dialectic Drift will be unfinished by design. Its archive should become a record of inquiry rather than a monument to certainty. We invite readers not to agree reflexively, but to think with us: rigorously, historically, and in motion.
          </p>
        </div>
      </article>
    </main>
  );
}

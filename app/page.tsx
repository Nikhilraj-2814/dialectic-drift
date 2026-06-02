export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D1117] text-white">
      <section className="max-w-7xl mx-auto px-8 py-32">
        <p className="text-[#C9A227] uppercase tracking-[0.25em] mb-6">
          Independent Publication
        </p>

        <h1 className="text-7xl md:text-8xl font-bold mb-8">
          Dialectic Drift
        </h1>

        <p className="text-xl text-gray-300 max-w-3xl mb-10 leading-relaxed">
          Geopolitics. Philosophy. History. Power.
          <br />
          Exploring the forces that shape civilizations,
          challenge narratives, and redefine the future.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-4 bg-[#C9A227] text-black rounded-lg font-semibold hover:opacity-90 transition">
            Read Essays
          </button>

          <button className="px-8 py-4 border border-[#C9A227] rounded-lg hover:bg-[#C9A227]/10 transition">
            Explore Topics
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="border border-gray-800 rounded-2xl p-10 bg-[#161B22]">
          <p className="text-[#C9A227] mb-3 uppercase tracking-widest text-sm">
            Featured Essay
          </p>

          <h2 className="text-4xl font-bold mb-4">
            The Architecture of Modern Power
          </h2>

          <p className="text-gray-300 text-lg max-w-4xl leading-relaxed">
            From empires and nation-states to technology platforms and AI,
            power has continuously evolved. Understanding these shifts is
            essential for navigating the twenty-first century.
          </p>

          <div className="mt-6 text-sm text-gray-400">
            10 min read · Geopolitics
          </div>
        </div>
      </section>
    </main>
  );
}

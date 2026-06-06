export default function Home() {
  const topics = ["Geopolitics", "Philosophy", "History", "Technology", "Society"];

  return (
    <main className="min-h-screen bg-[#0B0F14] text-white overflow-hidden">
      <nav className="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-wide">Dialectic Drift</h1>
            <p className="text-xs text-gray-400">Ideas in Motion</p>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="/articles">Articles</a>
            <a href="/topics/geopolitics">Topics</a>
            <a href="/manifesto">Manifesto</a>
            <a href="/about">About</a>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-28 text-center">
        <p className="uppercase tracking-[0.35em] text-[#C9A227] mb-6 text-sm">Independent Journal of Ideas</p>
        <h2 className="text-5xl md:text-8xl font-bold mb-8 leading-tight">Question Narratives.<br />Understand Power.</h2>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed">
          Essays on geopolitics, philosophy, history, technology and the forces shaping the twenty-first century.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
          <p className="text-[#C9A227] uppercase tracking-widest text-sm mb-3">Featured Essay</p>
          <h3 className="text-3xl md:text-5xl font-bold mb-4">The Architecture of Modern Power</h3>
          <p className="text-gray-300 max-w-4xl leading-relaxed">From empires and nation-states to technology platforms and AI, power continuously evolves. Understanding those shifts is essential to understanding the future.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-8">Topics</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {topics.map((topic) => (<div key={topic} className="border border-white/10 rounded-xl p-6 text-center bg-white/5">{topic}</div>))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-3xl border border-[#C9A227]/30 p-10 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay in the Drift</h3>
          <p className="text-gray-400 mb-6">Receive new essays and editorial notes directly in your inbox.</p>
          <button className="px-8 py-4 bg-[#C9A227] text-black rounded-xl font-semibold">Join Newsletter</button>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        Dialectic Drift · Ideas in Motion
      </footer>
    </main>
  );
}

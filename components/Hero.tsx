import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0B0F14] text-white">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at top left, rgba(201,162,39,0.35), transparent 32rem), linear-gradient(rgba(201,162,39,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,39,0.10) 1px, transparent 1px)", backgroundSize: "auto, 56px 56px, 56px 56px" }} />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#C9A227] sm:text-sm">Independent Publication</p>
        <h1 className="max-w-5xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">Question narratives. Understand power.</h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl">Dialectic Drift publishes essays on geopolitics, philosophy, history, technology, and the institutional forces shaping the twenty-first century.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/articles" className="rounded-full bg-[#C9A227] px-6 py-3 text-center font-semibold text-black transition hover:bg-[#e0bd4d]">Read the archive</Link>
          <Link href="/manifesto" className="rounded-full border border-white/15 px-6 py-3 text-center font-semibold text-white transition hover:border-[#C9A227]/70 hover:text-[#C9A227]">Read the manifesto</Link>
        </div>
      </div>
    </section>
  );
}

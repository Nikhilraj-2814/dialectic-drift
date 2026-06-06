import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/articles", label: "Articles" },
  { href: "/topics", label: "Topics" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f14]/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#C9A227]/40 bg-black/40 shadow-[0_0_30px_rgba(201,162,39,0.18)]">
            <Image src="/logo.png" alt="Dialectic Drift logo" fill sizes="44px" className="object-contain p-1" priority />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-bold tracking-wide text-white sm:text-xl">Dialectic Drift</span>
            <span className="block text-xs uppercase tracking-[0.22em] text-[#C9A227]">Ideas in Motion</span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-xs font-medium text-gray-300 sm:gap-x-6 sm:text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#C9A227]">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

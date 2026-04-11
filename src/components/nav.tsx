"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const navTextClass =
    "text-[0.68rem] font-bold tracking-[0.16em] uppercase text-[color:color-mix(in_srgb,var(--kl-text)_74%,transparent)] hover:text-[var(--kl-text)] transition-colors duration-500";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-700 ${
        scrolled
          ? "bg-[color:color-mix(in_srgb,var(--kl-canvas)_94%,transparent)] backdrop-blur-xl border-b border-[color:color-mix(in_srgb,var(--kl-text)_8%,transparent)]"
          : "bg-[color:color-mix(in_srgb,var(--kl-canvas)_86%,transparent)] backdrop-blur-lg border-b border-[color:color-mix(in_srgb,var(--kl-text)_5%,transparent)]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-[family-name:var(--font-fraunces)] text-[2.1rem] md:text-[2.65rem] font-semibold leading-none tracking-[-0.05em] text-[var(--kl-text)] hover:text-[var(--kl-accent)] transition-colors duration-500"
        >
          Kenotic Labs
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          {["What We Do", "Vision", "Values", "Evidence", "Contact"].map((item) => (
            <Link
              key={item}
              href={sectionHref(item.toLowerCase().replace(/ /g, "-"))}
              className={navTextClass}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/insights"
            className={navTextClass}
          >
            Insights
          </Link>
          <Link
            href="/demo"
            className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-[var(--kl-text)] border border-[color:color-mix(in_srgb,var(--kl-text)_22%,transparent)] px-5 py-2 hover:bg-[var(--kl-text)] hover:text-[var(--kl-canvas)] transition-all duration-500"
          >
            Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}

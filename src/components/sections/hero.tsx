"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionOverlay } from "@/components/section-overlay";

export function Hero() {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--kl-canvas) 0%, var(--kl-surface) 100%)",
      }}
    >
      <SectionOverlay variant="hero" />
      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-6 md:px-16 pt-28 md:pt-36 lg:pt-40 pb-16 md:pb-24 lg:pb-28">
        <div className="max-w-[860px]">
          {/* arXiv badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease }}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            <a
              href="https://arxiv.org/abs/2604.10981"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[color:color-mix(in_srgb,var(--kl-accent)_22%,transparent)] bg-white/60 backdrop-blur-sm hover:border-[color:color-mix(in_srgb,var(--kl-accent)_45%,transparent)] hover:bg-white/80 transition-all duration-500"
            >
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--kl-accent)] opacity-60" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[var(--kl-accent)]" />
              </span>
              <span className="font-[family-name:var(--font-lato)] text-[0.65rem] font-bold tracking-[2.4px] uppercase text-[var(--kl-text)]">
                New &middot; April 13, 2026
              </span>
              <span className="hidden sm:inline font-[family-name:var(--font-lato)] text-[0.72rem] text-[var(--kl-text-muted)] group-hover:text-[var(--kl-text)] transition-colors duration-500">
                ATANT v1.1: Positioning Continuity Evaluation &middot; arXiv:2604.10981 &rarr;
              </span>
              <span className="sm:hidden font-[family-name:var(--font-lato)] text-[0.72rem] text-[var(--kl-text-muted)]">
                arXiv:2604.10981 &rarr;
              </span>
            </a>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease }}
            aria-label="A $50,000 factory robot resumes from exact state after power loss. The most advanced AI on the planet forgets everything when you close the tab."
            className="font-[family-name:var(--font-playfair)] text-[clamp(2.6rem,5.2vw,4.6rem)] font-bold text-[var(--kl-text)] leading-[1.06] tracking-[-1.5px] mb-0"
          >
            <span className="block mb-3">
              A $50,000 factory robot resumes from exact state after power loss.
            </span>
            <span className="block text-[var(--kl-text-muted)]">
              The most advanced AI on the planet forgets everything when you close the tab.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, ease }}
            className="font-[family-name:var(--font-lato)] text-[var(--kl-text)] text-lg md:text-xl font-semibold leading-[1.6] mt-10 mb-4 max-w-[600px]"
          >
            We built the fix.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease }}
            className="font-[family-name:var(--font-lato)] text-[var(--kl-text-muted)] text-[1.05rem] md:text-lg leading-[1.9] mb-10 max-w-[600px]"
          >
            No LLM in the loop. No cloud. Zero cost per query. The system extracts deterministically and knows the exact boundary of what it has. Your data never leaves your machine.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 1, ease }}
            className="origin-left mb-10"
            style={{
              width: "100%",
              maxWidth: "220px",
              height: "1px",
              background:
                "linear-gradient(to right, var(--kl-accent), color-mix(in srgb, var(--kl-accent) 30%, transparent), transparent)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1, ease }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/demo"
              className="inline-flex items-center gap-3 px-7 py-4 bg-[var(--kl-text)] text-[var(--kl-canvas)] text-[0.82rem] tracking-[0.14em] uppercase font-semibold border border-[var(--kl-text)] hover:bg-transparent hover:text-[var(--kl-text)] transition-all duration-500"
            >
              See the demo
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
                <path d="M1 7h12M7 1l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/thesis"
              className="inline-flex items-center gap-3 px-7 py-4 bg-transparent text-[var(--kl-text)] text-[0.82rem] tracking-[0.14em] uppercase font-semibold border border-[var(--kl-text)] hover:bg-[var(--kl-text)] hover:text-[var(--kl-canvas)] transition-all duration-500"
            >
              Read the thesis
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
                <path d="M1 7h12M7 1l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full z-20"
        style={{
          height: "1px",
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, var(--kl-accent) 25%, transparent), transparent)",
        }}
      />
    </section>
  );
}

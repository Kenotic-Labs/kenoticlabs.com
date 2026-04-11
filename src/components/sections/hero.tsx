"use client";

import { motion } from "framer-motion";
import { SectionOverlay } from "@/components/section-overlay";

export function Hero() {
  const line1 = "We gave machines intelligence.".split(" ");
  const line2 = "We never gave them time.".split(" ");

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
      <div className="relative z-10 w-full max-w-[1180px] mx-auto px-8 md:px-16 pt-36 md:pt-40 pb-24 lg:pb-28">
        <div className="max-w-[860px]">
            <motion.a
              href="https://arxiv.org/abs/2604.06710"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease }}
              className="group inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-[color:color-mix(in_srgb,var(--kl-accent)_22%,transparent)] bg-white/60 backdrop-blur-sm hover:border-[color:color-mix(in_srgb,var(--kl-accent)_45%,transparent)] hover:bg-white/80 transition-all duration-500"
            >
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--kl-accent)] opacity-60" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[var(--kl-accent)]" />
              </span>
              <span className="font-[family-name:var(--font-lato)] text-[0.65rem] font-bold tracking-[2.4px] uppercase text-[var(--kl-text)]">
                New &middot; April 8, 2026
              </span>
              <span className="font-[family-name:var(--font-lato)] text-[0.72rem] text-[var(--kl-text-muted)] group-hover:text-[var(--kl-text)] transition-colors duration-500">
                ATANT: An Evaluation Framework for AI Continuity &middot; arXiv:2604.06710 &rarr;
              </span>
            </motion.a>
            <h1
              aria-label="We gave machines intelligence. We never gave them time."
              className="font-[family-name:var(--font-playfair)] text-[clamp(3.4rem,6vw,5.8rem)] font-bold text-[var(--kl-text)] leading-[1.02] tracking-[-1.8px] mb-0"
            >
              <span className="block mb-3">
                {line1.map((word, i) => (
                  <motion.span
                    key={`a-${i}`}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3 + i * 0.12,
                      duration: 1,
                      ease,
                    }}
                    className="inline-block mr-[0.28em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block">
                {line2.map((word, i) => (
                  <motion.span
                    key={`b-${i}`}
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.9 + i * 0.12,
                      duration: 1,
                      ease,
                    }}
                    className="inline-block mr-[0.28em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 1, ease }}
              className="font-[family-name:var(--font-playfair)] text-[clamp(1.1rem,2vw,1.45rem)] text-[var(--kl-text-muted)] italic leading-relaxed mt-8 mb-10 max-w-[560px]"
            >
              What if intelligence was never the hard part?
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2, duration: 1, ease }}
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 1, ease }}
              className="max-w-[620px]"
            >
              <p className="font-[family-name:var(--font-lato)] text-[var(--kl-text-muted)] text-[1.05rem] md:text-lg leading-[1.9] mb-8">
                The hard part is continuity. Preserving the living state of what
                still matters, updating it when reality changes, and keeping
                intelligence oriented across time.
              </p>
              <p className="font-[family-name:var(--font-lato)] text-[var(--kl-text-muted)] text-[1.02rem] md:text-[1.08rem] leading-[1.9] mb-8">
                If that layer exists, the center of gravity in AI shifts.
                Models still matter. But the durable value begins to move toward
                the system that can carry forward understanding across people,
                projects, institutions, and years.
              </p>
              <p className="font-[family-name:var(--font-lato)] text-[var(--kl-text)] text-lg md:text-xl font-semibold leading-[1.6]">
                That is the direction Kenotic is building toward.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.65, duration: 1, ease }}
              className="mt-14 max-w-[700px] rounded-[1.5rem] border border-[color:color-mix(in_srgb,var(--kl-accent)_12%,transparent)] bg-white/70 px-8 py-8 backdrop-blur-sm"
            >
              <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.2rem,2vw,1.5rem)] italic text-[var(--kl-text)] leading-[1.5] mb-5">
                What begins to happen when intelligence no longer starts over?
              </p>
              <p className="font-[family-name:var(--font-lato)] text-[var(--kl-text-muted)] text-[1rem] md:text-[1.04rem] leading-[1.9]">
                Machines begin to understand why something matters, when action
                should happen, and what should happen next without being
                re-instructed from zero every time. In software, that changes
                how systems work. In hardware, it changes what systems can
                become.
              </p>
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

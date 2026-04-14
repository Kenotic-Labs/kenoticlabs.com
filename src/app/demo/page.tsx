"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Seal } from "@/components/seal";

export default function DemoPage() {
  // StringTune cursor effects intentionally disabled on /demo —
  // they run a 60fps animation loop that competes with video decoding.
  // The SiteOverlay is also omitted for the same reason.

  return (
    <div className="min-h-screen bg-[var(--kl-text)] relative overflow-hidden flex flex-col">
      <div aria-hidden="true" className="site-tech-overlay pointer-events-none absolute inset-0 z-[0] opacity-50" />
      <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[color:color-mix(in_srgb,var(--kl-accent)_22%,transparent)] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-[color:color-mix(in_srgb,var(--kl-signal)_15%,transparent)] blur-[150px] pointer-events-none" />

      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--kl-signal)_45%,transparent)] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--kl-signal)_45%,transparent)] to-transparent" />

      <div className="flex-1 flex flex-col items-center justify-start pt-32 md:pt-40 pb-20 px-6 relative z-[2]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-[1080px] w-full"
        >
          {/* Kenotic seal — floats over the dark page as a signal of presence */}
          <div className="mb-10">
            <Seal variant="dark" size="xl" priority />
          </div>
          <p className="text-[var(--kl-signal)] text-xs font-bold tracking-[8px] uppercase mb-8 font-[family-name:var(--font-lato)]">
            Kenotic Labs
          </p>

          <div
            // @ts-expect-error StringTune attributes
            string="impulse"
            string-id="demo-title"
            string-strength="2.2"
            string-rotation-strength="0.32"
            className="impulse-element"
          >
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.75rem,7vw,5.5rem)] font-bold text-[var(--kl-canvas)] leading-[0.95] tracking-[-0.02em] mb-6">
              The continuity layer, demonstrated.
            </h1>
          </div>

          <div
            // @ts-expect-error StringTune attributes
            string="impulse"
            string-id="demo-divider"
            string-strength="0.9"
            string-rotation-strength="0.08"
            className="impulse-element mb-8"
          >
            <div className="w-16 h-[2px] bg-[var(--kl-signal)] mx-auto mb-8" />
          </div>

          <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.1rem,2vw,1.4rem)] italic text-[color:color-mix(in_srgb,var(--kl-canvas)_80%,transparent)] max-w-[680px] mx-auto leading-[1.55] mb-14">
            Local language model on consumer hardware. No internet. The model is fully shut down between sessions, and the system retains what it learned across the kill.
          </p>
        </motion.div>

        {/* Video frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1080px] relative"
        >
          {/* Caption header above the frame */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-[6px] w-[6px] rounded-full bg-[var(--kl-signal)]" />
              <span className="font-[family-name:var(--font-lato)] text-[0.66rem] tracking-[0.22em] uppercase text-[color:color-mix(in_srgb,var(--kl-canvas)_70%,transparent)] font-semibold">
                Continuity survives a full model kill
              </span>
            </div>
            <span className="font-[family-name:var(--font-lato)] text-[0.62rem] tracking-[0.18em] uppercase text-[color:color-mix(in_srgb,var(--kl-canvas)_45%,transparent)]">
              Recorded live &middot; unedited
            </span>
          </div>

          {/* Gold frame accent */}
          <div className="absolute inset-x-0 top-[30px] bottom-0 -m-[1px] bg-gradient-to-br from-[color:color-mix(in_srgb,var(--kl-signal)_55%,transparent)] via-[color:color-mix(in_srgb,var(--kl-accent)_40%,transparent)] to-[color:color-mix(in_srgb,var(--kl-signal)_35%,transparent)] opacity-50 blur-[1px] pointer-events-none" />

          <div className="relative aspect-video bg-[color:color-mix(in_srgb,var(--kl-text)_92%,black)] rounded-sm border border-[color:color-mix(in_srgb,var(--kl-signal)_22%,transparent)] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
            <video
              controls
              controlsList="nodownload noplaybackrate noremoteplayback"
              disablePictureInPicture
              playsInline
              preload="metadata"
              poster="/videos/demo-poster.jpg"
              className="w-full h-full object-contain"
            >
              <source src="/videos/demo-polished.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Meta row beneath video */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.7rem] tracking-[0.18em] uppercase text-[color:color-mix(in_srgb,var(--kl-canvas)_55%,transparent)] font-medium">
            <span>Phi 4 Mini · 4B params · Q4 K_M quantized</span>
            <span className="text-[var(--kl-signal)]">·</span>
            <span>Local inference · offline</span>
            <span className="text-[var(--kl-signal)]">·</span>
            <span>8GB GPU</span>
          </div>

          {/* What you're about to see — one-line description */}
          <p className="mt-4 font-[family-name:var(--font-newsreader)] italic text-[0.95rem] text-[color:color-mix(in_srgb,var(--kl-canvas)_62%,transparent)] text-center max-w-[720px] mx-auto leading-[1.55]">
            A local Phi-4 Mini is force-killed mid-session. The process restarts from scratch. Without prompting, it resumes with full awareness of what the user had been doing, feeling, and saying.
          </p>
        </motion.div>

        {/* Detail block below video */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[880px] mt-20 grid md:grid-cols-3 gap-6 text-center"
        >
          <DemoBeat
            label="Property one"
            title="Persistence beyond session"
            body="State survives a full model kill. Process terminates, process restarts, the system greets the user by name."
          />
          <DemoBeat
            label="Property six"
            title="Model independence"
            body="The continuity layer is below the model. Swap Phi for Llama for Claude for whatever. The traces do not change."
          />
          <DemoBeat
            label="Property four"
            title="Reconstruction"
            body="The system does not return isolated facts. It reconstructs the situation: who, where, what work, what preference."
          />
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[0.72rem] tracking-[0.2em] uppercase font-semibold"
        >
          <Link
            href="/thesis"
            className="text-[color:color-mix(in_srgb,var(--kl-signal)_70%,transparent)] hover:text-[var(--kl-signal)] transition-colors duration-500"
          >
            Read the thesis →
          </Link>
          <a
            href="https://arxiv.org/abs/2604.06710"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:color-mix(in_srgb,var(--kl-signal)_70%,transparent)] hover:text-[var(--kl-signal)] transition-colors duration-500"
          >
            v1.0 Paper →
          </a>
          <a
            href="https://arxiv.org/abs/2604.10981"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:color-mix(in_srgb,var(--kl-signal)_70%,transparent)] hover:text-[var(--kl-signal)] transition-colors duration-500"
          >
            v1.1 Paper →
          </a>
          <a
            href="https://github.com/Kenotic-Labs/ATANT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:color-mix(in_srgb,var(--kl-signal)_70%,transparent)] hover:text-[var(--kl-signal)] transition-colors duration-500"
          >
            Run the benchmark →
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="w-full pb-10 flex justify-center relative z-[2]"
      >
        <Link
          href="/"
          className="text-[color:color-mix(in_srgb,var(--kl-signal)_45%,transparent)] text-xs tracking-[2px] uppercase hover:text-[var(--kl-signal)] transition-colors duration-500 font-[family-name:var(--font-lato)]"
        >
          Back to Kenotic Labs
        </Link>
      </motion.div>
    </div>
  );
}

function DemoBeat({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="p-6 border border-[color:color-mix(in_srgb,var(--kl-signal)_15%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-canvas)_4%,transparent)]">
      <div className="text-[0.68rem] tracking-[0.2em] uppercase text-[var(--kl-signal)] font-semibold mb-3">
        {label}
      </div>
      <h3 className="font-[family-name:var(--font-playfair)] text-[1.15rem] leading-[1.25] text-[var(--kl-canvas)] mb-3 font-semibold">
        {title}
      </h3>
      <p className="text-[0.88rem] leading-[1.55] text-[color:color-mix(in_srgb,var(--kl-canvas)_70%,transparent)]">
        {body}
      </p>
    </div>
  );
}

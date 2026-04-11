"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { SiteOverlay } from "@/components/site-overlay";

export default function DemoPage() {
  useEffect(() => {
    async function init() {
      const mod = await import("@fiddle-digital/string-tune");
      const StringTune = mod.default;
      const st = StringTune.getInstance();
      if (mod.StringImpulse) st.use(mod.StringImpulse);
      if (mod.StringCursor) st.use(mod.StringCursor, { lerp: 0.7 });
      st.start(60);
    }
    init().catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--kl-text)] flex flex-col items-center justify-center relative overflow-hidden">
      <div aria-hidden="true" className="site-tech-overlay pointer-events-none absolute inset-0 z-[0]" />
      <SiteOverlay />
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-[color:color-mix(in_srgb,var(--kl-accent)_26%,transparent)] blur-[180px]" />
      <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-[color:color-mix(in_srgb,var(--kl-signal)_18%,transparent)] blur-[150px]" />

      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--kl-signal)_45%,transparent)] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--kl-signal)_45%,transparent)] to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center relative z-[2]"
      >
        <div className="flex flex-col items-center">
          <div
            // @ts-expect-error StringTune attributes
            string="impulse"
            string-id="demo-kicker"
            string-strength="1.2"
            string-rotation-strength="0.12"
            className="impulse-element"
          >
          <p className="text-[var(--kl-signal)] text-xs font-bold tracking-[8px] uppercase mb-8 font-[family-name:var(--font-lato)]">
            Kenotic Labs
          </p>
          </div>
          <div
            // @ts-expect-error StringTune attributes
            string="impulse"
            string-id="demo-title"
            string-strength="2.2"
            string-rotation-strength="0.32"
            className="impulse-element"
          >
          <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(3rem,8vw,7rem)] font-bold text-[var(--kl-canvas)] leading-[0.95] tracking-[-2px] mb-8">
            Demo
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
          <div
            // @ts-expect-error StringTune attributes
            string="impulse"
            string-id="demo-caption"
            string-strength="1.5"
            string-rotation-strength="0.18"
            className="impulse-element"
          >
          <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.2rem,2.5vw,1.8rem)] italic text-[color:color-mix(in_srgb,var(--kl-accent-soft)_78%,white)] max-w-[500px] mx-auto leading-relaxed">
            Coming soon.
          </p>
          </div>
        </div>
      </motion.div>

      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        href="/"
        className="absolute bottom-12 z-[2] text-[color:color-mix(in_srgb,var(--kl-signal)_45%,transparent)] text-sm tracking-[2px] uppercase hover:text-[var(--kl-signal)] transition-colors duration-500 font-[family-name:var(--font-lato)]"
      >
        Back to Kenotic Labs
      </motion.a>
    </div>
  );
}

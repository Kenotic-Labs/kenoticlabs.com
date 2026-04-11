"use client";

import { Reveal } from "@/components/reveal";
import { SectionOverlay } from "@/components/section-overlay";

export function Vision() {
  return (
    <section id="vision" className="bg-[#FAFAF8] relative overflow-hidden">
      <SectionOverlay variant="left" />
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 xl:px-24 py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 relative">
          {/* LEFT */}
          <div className="relative lg:pr-16 xl:pr-24">
            <Reveal>
              <h2 className="relative z-10 font-[family-name:var(--font-playfair)] text-[clamp(1.8rem,3.2vw,2.6rem)] font-bold text-[#1A1A1A] leading-[1.12] mb-10">
                If this layer becomes real, the world above it begins to change.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="relative z-10 text-[#6B6B6B] text-[1.05rem] leading-[1.85] max-w-[480px]">
                Systems become able to understand why something matters, when
                action should happen, and what should happen next without
                needing to be re-instructed from zero every time. In software,
                that makes intelligence steadier. In hardware, it points toward
                a different kind of machine substrate.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div
                className="relative z-10 mt-10 rounded-[1.35rem] p-8 md:p-9"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid color-mix(in srgb, var(--kl-accent) 14%, transparent)",
                }}
              >
                <p className="font-[family-name:var(--font-playfair)] text-[1.2rem] italic text-[#1A1A1A] leading-[1.6] mb-5">
                  What begins to happen when intelligence no longer starts over?
                </p>
                <p className="text-[#6B6B6B] text-[1rem] leading-[1.85]">
                  Software becomes steadier. Work becomes more compounding.
                  Entire categories that still depend on humans to hold the
                  thread begin to change. The result is not only better AI. It
                  is a different kind of infrastructure underneath products,
                  institutions, and devices.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Vertical green separator, desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#2D6A4F]/40 to-transparent" />

          {/* RIGHT */}
          <div className="lg:pl-16 xl:pl-24 flex flex-col justify-center">
            <Reveal delay={0.1}>
              <p className="text-[#6B6B6B] text-[1.05rem] leading-[1.85] max-w-[460px] mb-12">
                That is why this is not only a product thesis. Once continuity
                exists as infrastructure, new business categories, new
                operating models, and new forms of machine usefulness begin to
                emerge above it.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="font-[family-name:var(--font-playfair)] text-[1.15rem] italic text-[#2D6A4F]">
                The layer is the company. What gathers around it is the future.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

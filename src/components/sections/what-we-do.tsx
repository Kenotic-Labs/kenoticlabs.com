"use client";

import { Reveal } from "@/components/reveal";
import { SectionOverlay } from "@/components/section-overlay";

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="relative py-32 lg:py-40" style={{ backgroundColor: "#FAFAF8" }}>
      <SectionOverlay variant="right" />
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24 items-start">
          {/* LEFT -- Heading + body text */}
          <div>
            <Reveal>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2.2rem,4vw,3.4rem)] font-bold text-[#1A1A1A] leading-[1.06] mb-12">
                We build the<br />continuity layer.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="font-[family-name:var(--font-lato)] text-[#6B6B6B] text-[1.05rem] leading-[1.9] mb-6 max-w-[540px]">
                Continuity is the system property that lets an AI carry forward what still matters,
                update it when reality changes, and reconstruct useful context later, in the right
                form, at the right time, for the right situation.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="font-[family-name:var(--font-lato)] text-[#6B6B6B] text-[1.05rem] leading-[1.9] mb-6 max-w-[540px]">
                This is a layer, not a feature. It sits underneath the current
                generation of AI products and quietly changes what they can
                become over time.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <p className="font-[family-name:var(--font-lato)] text-[#6B6B6B] text-[1.05rem] leading-[1.9] max-w-[540px]">
                A database can store facts. A retriever can find related text.
                But neither can preserve the living state of a situation. That
                is why continuity belongs beneath the stack, not at its edges.
              </p>
            </Reveal>
          </div>

          {/* RIGHT -- Wonder quote card */}
          <Reveal delay={0.2} direction="right">
            <div className="relative lg:mt-8">
              {/* Card */}
              <div
                className="relative rounded-[1.5rem] p-10 md:p-14 overflow-hidden shadow-lg"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderLeft: "3px solid #2D6A4F",
                }}
              >
                <div className="relative z-10">
                  <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.1rem,1.8vw,1.3rem)] italic text-[#1A1A1A]/85 leading-[1.7]">
                    Once intelligence can remain oriented across time, the stack
                    above it does not stay the same.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

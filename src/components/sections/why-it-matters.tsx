"use client";

import { Reveal } from "@/components/reveal";
import { SectionOverlay } from "@/components/section-overlay";

export function WhyItMatters() {
  return (
    <section id="why" className="relative py-32 lg:py-40" style={{ backgroundColor: "#F5F3EE" }}>
      <SectionOverlay variant="left" />
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 xl:px-24">
        {/* Two cards side by side — Goethe slightly larger */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-10">
          {/* LEFT — Goethe card (larger) */}
          <Reveal>
            <div
              className="relative rounded-2xl p-10 md:p-14 h-full shadow-lg"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
              }}
            >
              <blockquote className="font-[family-name:var(--font-playfair)] text-[clamp(1.6rem,3vw,2.4rem)] italic text-[#1A1A1A] leading-[1.2] mb-6">
                &ldquo;The things that matter most must never be at the mercy of
                the things that matter least.&rdquo;
              </blockquote>
              <p className="font-[family-name:var(--font-lato)] text-[#B39B5C] text-sm tracking-wide font-semibold mb-10">
                Johann Wolfgang von Goethe
              </p>
              <p className="font-[family-name:var(--font-lato)] text-[#6B6B6B] text-[1.05rem] leading-[1.85] max-w-[520px]">
                That is the problem continuity solves. The things that matter to
                you (what you&apos;re going through, what changed, what&apos;s
                unfinished) are at the mercy of systems that forget the moment
                you leave.
              </p>
              <p className="font-[family-name:var(--font-lato)] text-[#6B6B6B] text-[1.05rem] leading-[1.85] max-w-[520px] mt-6">
                This is not a product flaw. It is a structural limit in the
                current stack. Every assistant, agent, workflow, clinic,
                institution, and device eventually reaches the same boundary.
              </p>
            </div>
          </Reveal>

          {/* RIGHT — Butler card + Retrieval vs Continuity stacked */}
          <div className="flex flex-col gap-8 lg:gap-10">
            {/* Butler quote card */}
            <Reveal delay={0.15}>
              <div
                className="relative rounded-2xl p-10 shadow-lg"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                }}
              >
                <blockquote className="font-[family-name:var(--font-playfair)] text-[clamp(1.1rem,1.8vw,1.3rem)] italic text-[#1A1A1A] leading-[1.55] mb-5">
                  &ldquo;All that you touch, You Change. All that you Change,
                  Changes you. The only lasting truth is Change.&rdquo;
                </blockquote>
                <p className="font-[family-name:var(--font-lato)] text-[#B39B5C] text-sm tracking-wide font-semibold">
                  Octavia E. Butler
                </p>
              </div>
            </Reveal>

            {/* Retrieval vs Continuity card */}
            <Reveal delay={0.3}>
              <div
                className="relative rounded-2xl p-10 shadow-lg"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                }}
              >
                <p className="font-[family-name:var(--font-lato)] text-[#6B6B6B] text-[1.05rem] leading-[1.85]">
                  <span className="text-[#2D6A4F] font-bold">Retrieval</span>{" "}
                  says:{" "}
                  <em>here are some related past things.</em>
                </p>
                <p className="font-[family-name:var(--font-lato)] text-[#6B6B6B] text-[1.05rem] leading-[1.85] mt-5">
                  <span className="text-[#2D6A4F] font-bold">Continuity</span>{" "}
                  says:{" "}
                  <em>
                    here is the current living state of your situation.
                  </em>
                </p>
                <p className="font-[family-name:var(--font-lato)] text-[#6B6B6B] text-[1rem] leading-[1.85] mt-6">
                  That difference begins to change where value lives. Not only
                  in the system that answers best in the moment, but in the one
                  that remains useful over time.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

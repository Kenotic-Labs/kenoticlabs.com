"use client";

import { Reveal } from "@/components/reveal";
import { SectionOverlay } from "@/components/section-overlay";

export function Properties() {
  return (
    <section id="properties" className="relative py-32 lg:py-40" style={{ backgroundColor: "#F7F5F2" }}>
      <SectionOverlay variant="center" />
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 xl:px-24">
        <Reveal>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-[#1A1A1A] leading-[1.1] mb-16">
            What makes continuity real.
          </h2>
        </Reveal>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Card 1 -- Reconstruction -- spans 2 cols, taller */}
          <Reveal delay={0} className="lg:col-span-2 lg:row-span-2">
            <div
              className="relative rounded-[1.5rem] h-full p-10 md:p-14 overflow-hidden
                flex flex-col justify-center
                shadow-lg hover:shadow-xl
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                group cursor-default"
              style={{
                backgroundColor: "#FFFFFF",
                borderLeft: "3px solid #2D6A4F",
              }}
            >
              <span className="font-[family-name:var(--font-lato)] text-[#B39B5C] text-xs font-bold tracking-[4px]">01</span>
              <h3 className="font-[family-name:var(--font-playfair)] text-[clamp(1.6rem,2.5vw,2.2rem)] font-bold text-[#1A1A1A] mt-4 mb-6 group-hover:translate-x-2 transition-transform duration-500">
                Reconstruction
              </h3>
              <p className="font-[family-name:var(--font-lato)] text-[#6B6B6B] text-[1.05rem] leading-[1.85] max-w-[480px]">
                Not just finding old facts. Rebuilding the current picture. &apos;Summarize my situation&apos; is a harder question than &apos;when is my interview?&apos; (and the one that actually matters).
              </p>
            </div>
          </Reveal>

          {/* Card 2 -- Disambiguation */}
          <Reveal delay={0.1}>
            <div
              className="relative rounded-[1.5rem] p-8 md:p-10 overflow-hidden
                shadow-lg hover:shadow-xl
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                group cursor-default"
              style={{
                backgroundColor: "#FFFFFF",
              }}
            >
              <span className="font-[family-name:var(--font-lato)] text-[#B39B5C] text-xs font-bold tracking-[4px]">02</span>
              <h3 className="font-[family-name:var(--font-playfair)] text-[1.35rem] font-bold text-[#1A1A1A] mt-3 mb-3 group-hover:translate-x-1 transition-transform duration-500">
                Disambiguation
              </h3>
              <p className="font-[family-name:var(--font-lato)] text-[#6B6B6B] text-[0.95rem] leading-[1.8]">
                250 lives in one system. Your sister&apos;s story stays separate from your boss&apos;s. When narratives overlap, the system must know which one you mean.
              </p>
            </div>
          </Reveal>

          {/* Card 3 -- Update Handling */}
          <Reveal delay={0.2}>
            <div
              className="relative rounded-[1.5rem] p-8 md:p-10 overflow-hidden
                shadow-lg hover:shadow-xl
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                group cursor-default"
              style={{
                backgroundColor: "#FFFFFF",
              }}
            >
              <span className="font-[family-name:var(--font-lato)] text-[#B39B5C] text-xs font-bold tracking-[4px]">03</span>
              <h3 className="font-[family-name:var(--font-playfair)] text-[1.35rem] font-bold text-[#1A1A1A] mt-3 mb-3 group-hover:translate-x-1 transition-transform duration-500">
                Update Handling
              </h3>
              <p className="font-[family-name:var(--font-lato)] text-[#6B6B6B] text-[0.95rem] leading-[1.8]">
                You were nervous. Now you&apos;re not. The appointment moved. The plan changed. A continuity system knows the difference between what was true and what is true now.
              </p>
            </div>
          </Reveal>

          {/* Card 4 -- Temporal Ordering -- spans full 3 cols, horizontal layout */}
          <Reveal delay={0.3} className="lg:col-span-3">
            <div
              className="relative rounded-[1.2rem] p-8 md:p-10 overflow-hidden
                flex flex-col md:flex-row md:items-center md:justify-between gap-6
                shadow-lg hover:shadow-xl
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                group cursor-default"
              style={{
                backgroundColor: "#FFFFFF",
              }}
            >
              <div className="shrink-0">
                <span className="font-[family-name:var(--font-lato)] text-[#B39B5C] text-xs font-bold tracking-[4px]">04</span>
                <h3 className="font-[family-name:var(--font-playfair)] text-[1.35rem] font-bold text-[#1A1A1A] mt-2 group-hover:translate-x-2 transition-transform duration-500">
                  Temporal Ordering
                </h3>
              </div>
              <p className="font-[family-name:var(--font-lato)] text-[#6B6B6B] text-[0.95rem] leading-[1.8] max-w-[560px]">
                Not just what happened. When, in what order, and what&apos;s still true. &apos;Last time this failed&apos; is different from &apos;this is what we do now.&apos;
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Reveal } from "@/components/reveal";
import { SectionOverlay } from "@/components/section-overlay";

const values = [
  {
    title: "Your data is yours.",
    desc: "It stays on your device. Privacy is physics, not policy. We do not collect what we cannot see.",
    border: "#2D6A4F",
  },
  {
    title: "You are not the product.",
    desc: "You are not training data. You are not an engagement metric. The system carries your life forward, not extracts value from it.",
    border: "#B39B5C",
  },
  {
    title: "AI should be fair.",
    desc: "It works for everyone. Not just the users who generate the most revenue.",
    border: "#2D6A4F",
  },
  {
    title: "We publish our evidence.",
    desc: "Our results include our failures. If we cannot prove it, we do not claim it.",
    border: "#B39B5C",
  },
];

export function Values() {
  return (
    <section id="values" className="bg-[#F7F5F2] py-32 lg:py-40 relative overflow-hidden scroll-mt-24">
      <SectionOverlay variant="right" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 xl:px-24">
        <Reveal>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2.2rem,3.5vw,3rem)] font-bold text-[#1A1A1A] leading-[1.1] mb-20">
            Software serves people.
          </h2>
        </Reveal>

        {/* Staggered 2-col grid. Right column offset down */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((val, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div
                className="p-8 md:p-10 bg-white rounded-sm shadow-md
                  hover:translate-y-[-4px]
                  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  group cursor-default relative overflow-hidden"
                style={{
                  borderLeft: `2px solid ${val.border}`,
                  marginTop: i % 2 === 1 ? "2.5rem" : 0,
                }}
              >
                <h3 className="font-[family-name:var(--font-playfair)] text-[clamp(1.3rem,2vw,1.6rem)] font-bold text-[#1A1A1A] mb-3 group-hover:translate-x-1 transition-transform duration-500">
                  {val.title}
                </h3>
                <p className="text-[#6B6B6B] text-[0.95rem] leading-[1.75] max-w-[380px]">
                  {val.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

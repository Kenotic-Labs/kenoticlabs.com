"use client";

import { Reveal } from "@/components/reveal";
import { SectionOverlay } from "@/components/section-overlay";

const clients = [
  "Schneider Electric",
  "Continental Automotive",
  "Brose",
  "Tenneco",
  "Tata Electronics",
];

const lineage = [
  {
    label: "Hardware",
    body: "Three years designing industrial automation systems. $1.5M of production machinery shipped to Fortune 500 manufacturers. The machines build iPhone bodies and Tesla components. They run 24/7. Downtime is not an option.",
  },
  {
    label: "Determinism",
    body: "Industrial controllers hold persistent state across power cycles, restarts, and shift changes. They are deterministic by construction. The continuity layer is the same idea, one stack higher.",
  },
  {
    label: "Full stack",
    body: "Mechatronics. Electronics and Computer Engineering. Information Systems (M.S., Central Michigan University). Silicon, board, firmware, software, and the manufacturing process underneath all of it.",
  },
];

export function Provenance() {
  return (
    <section
      id="provenance"
      className="relative bg-[#F7F5F2] py-16 md:py-24 lg:py-40 overflow-hidden"
    >
      <SectionOverlay variant="left" />
      {/* Top accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B39B5C]/60 to-transparent" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 md:gap-16 lg:gap-24">
          {/* LEFT: framing */}
          <div>
            <Reveal>
              <span className="text-[#B39B5C] text-[0.6rem] font-bold tracking-[3px] uppercase font-[family-name:var(--font-lato)]">
                Provenance
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3.4vw,2.8rem)] font-bold text-[#1A1A1A] leading-[1.1] mt-5 mb-8">
                The continuity layer is being designed by someone who has shipped
                production hardware.
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-[#6B6B6B] text-[1.05rem] leading-[1.85] mb-6 max-w-[520px]">
                Most AI infrastructure is designed by people who have never had to
                keep something running through a power cycle. The continuity
                problem is invisible from inside a Jupyter notebook. From inside
                a factory, it is the first thing you solve.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="text-[#6B6B6B] text-[1.05rem] leading-[1.85] max-w-[520px]">
                The roadmap ends in silicon. A continuity node that any device
                can integrate. The path there starts on the floor of a
                manufacturing line.
              </p>
            </Reveal>
          </div>

          {/* RIGHT: three lineage cards */}
          <div className="flex flex-col gap-5">
            {lineage.map((item, i) => (
              <Reveal key={i} delay={0.15 + i * 0.1}>
                <div
                  className="bg-white rounded-sm shadow-md p-7 md:p-8
                    hover:translate-y-[-3px]
                    transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ borderLeft: "2px solid #B39B5C" }}
                >
                  <span className="text-[#2D6A4F] text-[0.58rem] font-bold tracking-[2.4px] uppercase font-[family-name:var(--font-lato)]">
                    {item.label}
                  </span>
                  <p className="text-[#1A1A1A] text-[0.98rem] leading-[1.8] mt-3 font-[family-name:var(--font-lato)]">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* Client strip */}
            <Reveal delay={0.55}>
              <div className="mt-4 border-t border-[#E5E5E5] pt-6">
                <span className="text-[#6B6B6B] text-[0.58rem] font-bold tracking-[2.4px] uppercase font-[family-name:var(--font-lato)]">
                  Production hardware shipped to
                </span>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                  {clients.map((c, i) => (
                    <span
                      key={i}
                      className="text-[#1A1A1A] text-sm font-[family-name:var(--font-playfair)] font-semibold"
                    >
                      {c}
                      {i < clients.length - 1 && (
                        <span className="text-[#B39B5C] ml-6">&middot;</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

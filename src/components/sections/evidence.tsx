"use client";

import { Reveal } from "@/components/reveal";
import { SectionOverlay } from "@/components/section-overlay";

const metrics = [
  { value: "250", label: "Narratives" },
  { value: "1,835", label: "Questions" },
  { value: "10", label: "Checkpoints" },
  { value: "6", label: "Domains" },
];

const tests = [
  { test: "Legacy architecture", result: "58%", note: "starting point", isHeadline: false },
  { test: "50 stories, isolated", result: "100%", note: "one life at a time", isHeadline: false },
  { test: "250 stories, isolated", result: "100%", note: "one life at a time", isHeadline: false },
  { test: "50 stories, cumulative", result: "100%", note: "shared store", isHeadline: false },
  { test: "250 stories, cumulative", result: "96%", note: "the moat", isHeadline: true },
];

export function Evidence() {
  return (
    <section id="evidence" className="bg-[#FAFAF8] py-32 lg:py-40 relative">
      <SectionOverlay variant="center" />
      {/* Green top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2D6A4F]/60 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24">
          {/* LEFT */}
          <div>
            <Reveal>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3vw,2.6rem)] font-bold text-[#1A1A1A] leading-[1.12] mb-10">
                How do we prove it works?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[#6B6B6B] text-[1.05rem] leading-[1.85] mb-6 max-w-[520px]">
                We built ATANT. An open evaluation framework with 250 real-life
                narratives, 1,835 verification questions, 10 checkpoints, 6 life
                domains. Each story simulates how a person actually talks over days
                and weeks. The system ingests the conversations, then answers questions
                about them. <span className="text-[#1A1A1A] font-semibold">No LLM in the evaluation loop.</span> Deterministic.
                Reproducible.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-[#6B6B6B] text-[1.05rem] leading-[1.85] mb-6 max-w-[520px]">
                The number that matters is the last one. <span className="text-[#1A1A1A] font-semibold">96% at 250 stories cumulative</span> means
                250 distinct life narratives coexist in the same store, and the
                system retrieves the correct fact for the correct context with
                no cross-contamination across people, situations, or time.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="text-[#6B6B6B] text-[1.05rem] leading-[1.85] mb-10 max-w-[520px]">
                Most memory systems collapse before they reach 100. The cumulative
                test is what separates a continuity layer from a database that
                happened to remember a few things. The standard is open. Any team
                building memory or continuity systems can run it against their
                own architecture and publish results.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://arxiv.org/abs/2604.06710"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-[#2D6A4F] text-white text-sm font-bold tracking-[1.5px] uppercase
                    hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(45,106,79,0.25)]
                    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  Read the Paper
                </a>
                <a
                  href="https://github.com/Kenotic-Labs/ATANT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 border border-[#2D6A4F] text-[#2D6A4F] text-sm font-bold tracking-[1.5px] uppercase
                    hover:bg-[#2D6A4F] hover:text-white hover:translate-y-[-2px]
                    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  Run the Standard
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT */}
          <div>
            {/* Metric cards, 2x2 */}
            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {metrics.map((m, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-sm shadow-md p-6 text-center
                      hover:translate-y-[-3px]
                      transition-all duration-500"
                  >
                    <div className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3vw,2.6rem)] font-bold text-[#B39B5C]">
                      {m.value}
                    </div>
                    <div className="text-[#6B6B6B] text-[0.65rem] font-bold tracking-[2px] uppercase mt-1 font-[family-name:var(--font-lato)]">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Results table: progression, with the headline number highlighted */}
            <Reveal delay={0.3}>
              <div className="bg-white rounded-sm shadow-md p-6">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-[#B39B5C] text-[0.6rem] font-bold tracking-[2px] uppercase py-3 px-2">
                        Test
                      </th>
                      <th className="text-[#B39B5C] text-[0.6rem] font-bold tracking-[2px] uppercase py-3 px-2 text-right">
                        Result
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((t, i) => (
                      <tr
                        key={i}
                        className={`border-b border-gray-100 last:border-b-0 ${
                          t.isHeadline ? "bg-[#FBF7EC]" : ""
                        }`}
                      >
                        <td
                          className={`font-[family-name:var(--font-playfair)] text-sm py-3 px-2 ${
                            t.isHeadline
                              ? "font-bold text-[#1A1A1A]"
                              : "font-semibold text-[#1A1A1A]"
                          }`}
                        >
                          {t.test}
                          <span className="block text-[0.65rem] font-[family-name:var(--font-lato)] font-normal not-italic text-[#6B6B6B] tracking-normal mt-[2px]">
                            {t.note}
                          </span>
                        </td>
                        <td
                          className={`font-bold text-sm py-3 px-2 text-right ${
                            t.isHeadline ? "text-[#2D6A4F] text-base" : "text-[#1A1A1A]"
                          }`}
                        >
                          {t.result}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-[#6B6B6B] text-xs italic mt-4 px-2">
                  NURA reference implementation, ATANT v1.0. Results published
                  in arXiv:2604.06710. The corpus grows. The standard evolves.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

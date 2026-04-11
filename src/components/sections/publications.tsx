"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionOverlay } from "@/components/section-overlay";

export function Publications() {
  return (
    <section className="relative bg-[#FAFAF8] px-8 md:px-16 lg:px-20 py-24 lg:py-32">
      <SectionOverlay variant="left" />
      <div className="max-w-[1100px] mx-auto">
        <Reveal>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3.5vw,2.8rem)] font-bold text-[#1A1A1A] leading-[1.1] mb-12">
            Publications
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1: Paper (now leading; gold border, dated marker) */}
          <Reveal delay={0.1}>
            <a
              href="https://arxiv.org/abs/2604.06710"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 bg-white rounded-lg border-l-[3px] border-l-[#B39B5C] shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)]
                hover:shadow-[0_2px_8px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-[2px]
                transition-all duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)] group"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[#B39B5C] text-[0.6rem] font-bold tracking-[3px] uppercase font-[family-name:var(--font-lato)]">
                  Paper &middot; arXiv cs.AI
                </span>
                <span className="text-[#2D6A4F] text-[0.58rem] font-bold tracking-[2.4px] uppercase font-[family-name:var(--font-lato)] px-2 py-[2px] border border-[#2D6A4F]/40 rounded-full">
                  New &middot; April 8, 2026
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1A1A1A] mt-3 mb-2">
                ATANT: An Evaluation Framework for AI Continuity
              </h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-3">
                Single-author research paper. Defines continuity as a system property,
                introduces the 10-checkpoint methodology, reports the reference
                implementation results, names the limitations.
              </p>
              <p className="text-[#6B6B6B] text-xs font-[family-name:var(--font-lato)]">
                Samuel Sameer Tanguturi &middot; arXiv:2604.06710 &rarr;
              </p>
            </a>
          </Reveal>

          {/* Card 2: Standard (green left border) */}
          <Reveal delay={0.2}>
            <a
              href="https://github.com/Kenotic-Labs/ATANT"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 bg-white rounded-lg border-l-[3px] border-l-[#2D6A4F] shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)]
                hover:shadow-[0_2px_8px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-[2px]
                transition-all duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)] group"
            >
              <span className="text-[#B39B5C] text-[0.6rem] font-bold tracking-[3px] uppercase font-[family-name:var(--font-lato)]">
                Standard &middot; Open
              </span>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1A1A1A] mt-3 mb-2">
                ATANT v1.0
              </h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-3">
                The evaluation framework as a runnable standard. 7 required properties,
                10 checkpoints, 4 compliance levels. Reference implementation included.
                Any team can run it against their own architecture and publish results.
              </p>
              <p className="text-[#6B6B6B] text-xs font-[family-name:var(--font-lato)]">
                github.com/Kenotic-Labs/ATANT &rarr;
              </p>
            </a>
          </Reveal>
        </div>

        {/* Thesis essay link */}
        <Reveal delay={0.25}>
          <Link
            href="/insights/why-continuity-becomes-the-layer"
            className="block mb-10 p-6 bg-white rounded-lg border-l-[3px] border-l-[#1A1A1A] shadow-[0_1px_3px_rgba(0,0,0,0.06)]
              hover:shadow-[0_4px_18px_rgba(0,0,0,0.08)] hover:-translate-y-[2px]
              transition-all duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)] group"
          >
            <span className="text-[#B39B5C] text-[0.6rem] font-bold tracking-[3px] uppercase font-[family-name:var(--font-lato)]">
              Thesis &middot; Long Read
            </span>
            <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1A1A1A] mt-3 mb-2 group-hover:text-[#2D6A4F] transition-colors duration-700">
              Why Continuity Becomes The Layer
            </h3>
            <p className="text-[#6B6B6B] text-sm leading-relaxed">
              The argument for why the durable value in AI infrastructure is moving
              from the weights to the layer underneath them. The four-layer arc.
              Why now. Read the thesis &rarr;
            </p>
          </Link>
        </Reveal>

        {/* Community row */}
        <Reveal delay={0.3}>
          <div className="border-t border-[#E5E5E5] pt-8 flex items-center gap-10 flex-wrap">
            <span className="text-[#6B6B6B] text-xs font-bold tracking-[2px] uppercase font-[family-name:var(--font-lato)]">
              Community
            </span>
            <a
              href="https://linkedin.com/company/kenotic-labs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B6B6B] text-sm font-semibold hover:text-[#2D6A4F] transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              LinkedIn &rarr;
            </a>
            <a
              href="https://reddit.com/r/Kenoticlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B6B6B] text-sm font-semibold hover:text-[#2D6A4F] transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              r/Kenoticlabs &rarr;
            </a>
            <a
              href="https://github.com/Kenotic-Labs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B6B6B] text-sm font-semibold hover:text-[#2D6A4F] transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              GitHub &rarr;
            </a>
            <a
              href="https://huggingface.co/Kenotic-Labs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B6B6B] text-sm font-semibold hover:text-[#2D6A4F] transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              Hugging Face &rarr;
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

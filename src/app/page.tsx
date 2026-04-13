"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Existing sections from the live site — preserved and slotted into the new arc
import { Hero } from "@/components/sections/hero";
import { WhyItMatters } from "@/components/sections/why-it-matters";
import { Publications } from "@/components/sections/publications";
import { Values } from "@/components/sections/values";
import { Provenance } from "@/components/sections/provenance";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden bg-[var(--kl-canvas)] text-[var(--kl-text)]"
    >
      {/* ═══════════ 1. HERO ═══════════
          "We gave machines intelligence. We never gave them time."
          The existing hero with the word-by-word cascading animation.
          Claim of the page. */}
      <Hero />

      {/* ═══════════ 2. POSITION STATEMENT ═══════════
          Single sentence on a surface break. The belief the rest of the
          page defends. */}
      <section className="py-24 md:py-32 border-y border-[var(--kl-border)] bg-[var(--kl-surface)]">
        <div className="mx-auto max-w-[960px] px-6 md:px-10 text-center">
          <div className="inline-block h-[1px] w-16 bg-[color:color-mix(in_srgb,var(--kl-signal)_60%,transparent)] mb-10" />
          <blockquote className="font-[family-name:var(--font-newsreader)] italic text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.3] text-[var(--kl-text)] tracking-[-0.01em]">
            We believe the company that owns the continuity layer will define the next decade of AI infrastructure.
          </blockquote>
          <div className="inline-block h-[1px] w-16 bg-[color:color-mix(in_srgb,var(--kl-signal)_60%,transparent)] mt-10" />
        </div>
      </section>

      {/* ═══════════ 3. WHY IT MATTERS ═══════════
          Goethe + Butler + Retrieval vs Continuity framing.
          The memory-vs-continuity distinction with philosophical weight. */}
      <WhyItMatters />

      {/* ═══════════ 4. SEVEN PROPERTIES ═══════════
          The full specification. Derived empirically, formalized in ATANT. */}
      <section id="properties" className="py-28 md:py-36 bg-[var(--kl-surface)] border-y border-[var(--kl-border)]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <SectionEyebrow>The specification</SectionEyebrow>
          <SectionTitle>Seven required properties of continuity.</SectionTitle>
          <SectionLede>
            Derived empirically. Any system claiming continuity must satisfy all seven. A system that satisfies six is something else.
          </SectionLede>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {[
              ["Property One", "Persistence Beyond Session", "State survives shutdown, restart, time. The system that ends today is the same system that resumes tomorrow."],
              ["Property Two", "Update Handling", "When reality changes, the system revises what is true now without erasing the historical record."],
              ["Property Three", "Temporal Ordering", "The system knows when things happened, in what sequence, and which events are still active versus resolved."],
              ["Property Four", "Disambiguation", "Distinct narratives stay separate. Two situations with similar people or themes are not collapsed."],
              ["Property Five", "Reconstruction", "The system answers situation-level questions, not isolated fact lookups. A coherent picture, not a ranked list."],
              ["Property Six", "Model Independence", "Continuity lives below the intelligence layer. The accumulated understanding belongs to the layer, not the processor."],
              ["Property Seven", "Operational Usefulness", "The same primitive serves a doctor tracking a patient and a developer tracking a project, without modification."],
            ].map(([label, title, desc]) => (
              <div
                key={title}
                className="p-8 border border-[var(--kl-border)] bg-[var(--kl-canvas)] hover:border-[var(--kl-signal)] hover:bg-[var(--kl-panel)] transition-all duration-500"
              >
                <div className="font-[family-name:var(--font-fraunces)] italic text-[0.82rem] tracking-[0.1em] uppercase text-[var(--kl-signal)] mb-4">{label}</div>
                <h4 className="font-[family-name:var(--font-fraunces)] text-[1.35rem] font-semibold leading-tight text-[var(--kl-text)] mb-3">{title}</h4>
                <p className="text-[0.95rem] leading-[1.6] text-[var(--kl-text-muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 6. THE WORK, IN PUBLIC ═══════════
          Dark inverted band. Four receipt cards + the 96% callout.
          The proof that the specification is met. */}
      <section id="receipts" className="py-28 md:py-36 bg-[var(--kl-text)] text-[var(--kl-canvas)] border-y border-[var(--kl-text)]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="mb-6 flex items-center gap-4 text-[0.7rem] tracking-[0.2em] uppercase text-[var(--kl-signal)] font-semibold">
            <span className="h-[1px] w-10 bg-[color:color-mix(in_srgb,var(--kl-signal)_60%,transparent)]" />
            The proof
          </div>
          <h2 className="font-[family-name:var(--font-fraunces)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-[-0.015em] font-semibold max-w-[900px] mb-6">
            The work, in public.
          </h2>
          <p className="font-[family-name:var(--font-newsreader)] italic text-[clamp(1.1rem,2vw,1.35rem)] text-[color:color-mix(in_srgb,var(--kl-canvas)_72%,transparent)] max-w-[700px] mb-16 leading-[1.55]">
            Every artifact is verifiable. Every number is reproducible. Every benchmark runs without any language model in the evaluation loop.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <Receipt
              label="Paper"
              title="ATANT framework, on arXiv"
              meta="2604.06710 · April 2026 · cs.AI"
              href="https://arxiv.org/abs/2604.06710"
            />
            <Receipt
              label="Benchmark"
              title="Open standard on GitHub"
              meta="250 stories · 1,835 questions · 10 checkpoints"
              href="https://github.com/Kenotic-Labs/ATANT"
            />
            <Receipt
              label="Dataset"
              title="Narrative corpus on Hugging Face"
              meta="250 stories · 6 life domains · public"
              href="https://huggingface.co/datasets/Kenotic-Labs/ATANTV1.0-corpus"
            />
            <Receipt
              label="Paper page"
              title="Hugging Face paper index"
              meta="Linked to dataset · indexed"
              href="https://huggingface.co/papers/2604.06710"
            />
          </div>

          <div className="mt-16 p-12 border border-[color:color-mix(in_srgb,var(--kl-canvas)_14%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-signal)_8%,transparent)] text-center">
            <div className="font-[family-name:var(--font-fraunces)] text-[clamp(3.5rem,9vw,7rem)] leading-none tracking-[-0.02em] font-semibold text-[var(--kl-signal)] mb-5">
              96<span className="text-[0.45em] text-[color:color-mix(in_srgb,var(--kl-canvas)_55%,transparent)]">%</span>
            </div>
            <p className="font-[family-name:var(--font-newsreader)] italic text-[clamp(1.05rem,1.8vw,1.25rem)] text-[color:color-mix(in_srgb,var(--kl-canvas)_85%,transparent)] max-w-[680px] mx-auto leading-[1.5]">
              on the 250-story cumulative benchmark. 100% in isolated mode. No language model in the evaluation loop. Reproducible on an 8GB GPU.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ 6. USE CASES ═══════════
          One primitive. Many applications. */}
      <section id="use-cases" className="py-28 md:py-36 bg-[var(--kl-surface)] border-y border-[var(--kl-border)]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <SectionEyebrow>The scope</SectionEyebrow>
          <SectionTitle>One primitive. Many applications.</SectionTitle>
          <SectionLede>
            Anything that has to act in context, against history, without being told step by step, needs the same layer underneath.
          </SectionLede>

          <div className="grid md:grid-cols-2 gap-5 mt-12">
            <UseCase title="Industrial systems" glyph="Ⓘ">
              A manufacturing line that carries forward a failure pattern from three months ago, without operator intervention, and pauses before the bearing fails again.
            </UseCase>
            <UseCase title="Healthcare devices" glyph="Ⓗ">
              An insulin pump that decides the next dose by reconstructing the patient&rsquo;s current situation, not by querying a database of past readings.
            </UseCase>
            <UseCase title="Robotics" glyph="Ⓡ">
              A robot that does not need to be re-taught when the environment changes. The differences are updates to a state the robot is already holding.
            </UseCase>
            <UseCase title="Autonomous agents" glyph="Ⓐ">
              An agent inside a codebase that does not start every session from scratch. The state of the project is already in the layer before the session begins.
            </UseCase>
          </div>
        </div>
      </section>

      {/* ═══════════ 9. THESIS CTA ═══════════
          The invitation to the full argument. */}
      <section id="thesis" className="py-32 md:py-40 bg-[var(--kl-panel)] border-y border-[var(--kl-border)]">
        <div className="mx-auto max-w-[900px] px-6 md:px-10 text-center">
          <div className="mb-6 flex items-center justify-center gap-4 text-[0.7rem] tracking-[0.2em] uppercase text-[var(--kl-signal)] font-semibold">
            <span className="h-[1px] w-10 bg-[color:color-mix(in_srgb,var(--kl-signal)_60%,transparent)]" />
            The full argument
            <span className="h-[1px] w-10 bg-[color:color-mix(in_srgb,var(--kl-signal)_60%,transparent)]" />
          </div>
          <h2 className="font-[family-name:var(--font-fraunces)] text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.1] tracking-[-0.015em] font-semibold text-[var(--kl-text)] mb-6">
            Read the full thesis.
          </h2>
          <p className="font-[family-name:var(--font-newsreader)] italic text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.5] text-[var(--kl-text-muted)] max-w-[720px] mx-auto mb-12">
            Thirteen sections. Roughly 8,000 words. The canonical worldview document: why continuity is the missing layer, why the physics wall makes it necessary now, and why the pattern traces back to a two-thousand-year-old theological precedent.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/thesis"
              className="inline-flex items-center gap-3 px-7 py-4 bg-[var(--kl-text)] text-[var(--kl-canvas)] text-[0.82rem] tracking-[0.14em] uppercase font-semibold border border-[var(--kl-text)] hover:bg-transparent hover:text-[var(--kl-text)] transition-all duration-500"
            >
              The Continuity Layer
              <Arrow />
            </Link>
            <Link
              href="/insights"
              className="inline-flex items-center gap-3 px-7 py-4 bg-transparent text-[var(--kl-text)] text-[0.82rem] tracking-[0.14em] uppercase font-semibold border border-[var(--kl-text)] hover:bg-[var(--kl-text)] hover:text-[var(--kl-canvas)] transition-all duration-500"
            >
              Supporting essays
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ 10. PUBLICATIONS ═══════════
          Concrete artifacts with their own individual framing.
          arXiv + GitHub + Thesis essay + Community row. */}
      <Publications />

      {/* ═══════════ 11. VALUES ═══════════
          Software serves people. Four pillars. What we commit to. */}
      <Values />

      {/* ═══════════ 12. PROVENANCE ═══════════
          Industrial credentials. Schneider, Continental, Brose, Tenneco, Tata.
          The moat against "no pedigree." */}
      <Provenance />

      {/* ═══════════ 13. RESEARCH LAB CLOSE ═══════════
          Identity statement before the conversion surface. */}
      <section className="py-28 md:py-36 bg-[var(--kl-canvas)]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-start">
            <div>
              <SectionEyebrow>About</SectionEyebrow>
              <h2 className="font-[family-name:var(--font-fraunces)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] tracking-[-0.01em] font-semibold text-[var(--kl-text)]">
                A research lab, not a product company.
              </h2>
            </div>
            <div className="space-y-6 font-[family-name:var(--font-source-serif)] text-[1.1rem] md:text-[1.15rem] leading-[1.7] text-[var(--kl-text-muted)]">
              <p>
                Kenotic Labs builds the continuity layer for AI. The name comes from <em className="font-[family-name:var(--font-newsreader)] italic text-[var(--kl-accent)] not-italic font-medium">kenosis</em>, a Greek term for self-pouring without loss of self. The architecture and the name describe the same pattern: a structured state that moves forward into the next moment without losing what it was.
              </p>
              <p>
                The work is in public. The framework is on arXiv. The benchmark is on GitHub. The reference implementation passes the framework. The corpus is on Hugging Face. The thesis is on this site.
              </p>
              <p className="font-[family-name:var(--font-newsreader)] italic text-[var(--kl-text)] text-[1.2rem] md:text-[1.3rem] leading-[1.5]">
                The layer is the company. The model is the processor. The layer is what stays.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════ 14. CONTACT ═══════════
          The conversion surface. Dual CTA: partnership + waitlist. */}
      <Contact />

      {/* ═══════════ 15. FOOTER ═══════════ */}
      <Footer />
    </motion.main>
  );
}

/* ───────── Helper Components ───────── */

function Arrow() {
  return (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
      <path d="M1 7h12M7 1l6 6-6 6" />
    </svg>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4 text-[0.7rem] tracking-[0.2em] uppercase text-[var(--kl-signal)] font-semibold">
      <span className="h-[1px] w-10 bg-[color:color-mix(in_srgb,var(--kl-signal)_60%,transparent)]" />
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-fraunces)] text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-[-0.015em] font-semibold text-[var(--kl-text)] max-w-[860px] mb-6">
      {children}
    </h2>
  );
}

function SectionLede({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-newsreader)] italic text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.55] text-[var(--kl-text-muted)] max-w-[720px]">
      {children}
    </p>
  );
}

function Receipt({
  label,
  title,
  meta,
  href,
}: {
  label: string;
  title: string;
  meta: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-8 border border-[color:color-mix(in_srgb,var(--kl-canvas)_14%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-canvas)_3%,transparent)] hover:bg-[color:color-mix(in_srgb,var(--kl-canvas)_6%,transparent)] hover:border-[var(--kl-signal)] transition-all duration-500"
    >
      <div className="text-[0.68rem] tracking-[0.14em] uppercase text-[var(--kl-signal)] font-semibold mb-4">{label}</div>
      <div className="font-[family-name:var(--font-fraunces)] text-[1.25rem] leading-[1.25] font-semibold mb-2 group-hover:text-[var(--kl-signal)] transition-colors duration-500">
        {title}
      </div>
      <div className="text-[0.85rem] text-[color:color-mix(in_srgb,var(--kl-canvas)_60%,transparent)]">{meta}</div>
    </a>
  );
}

function UseCase({
  title,
  glyph,
  children,
}: {
  title: string;
  glyph: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-10 border border-[var(--kl-border)] bg-[var(--kl-canvas)] hover:bg-[var(--kl-panel)] transition-colors duration-500">
      <div className="font-[family-name:var(--font-fraunces)] italic text-[2.25rem] text-[var(--kl-signal)] mb-4 leading-none">{glyph}</div>
      <h4 className="font-[family-name:var(--font-fraunces)] text-[1.4rem] font-semibold text-[var(--kl-text)] mb-3 leading-tight">
        {title}
      </h4>
      <p className="text-[var(--kl-text-muted)] leading-[1.65] text-[1rem]">{children}</p>
    </div>
  );
}

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
import { articles } from "@/lib/articles";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Kenotic Labs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kenotic Labs is an AI infrastructure company building the continuity layer for AI — infrastructure that preserves and reconstructs the living state of a situation across time. Founded in 2025 by Samuel Sameer Tanguturi. Core architecture: DTCM (Decomposed Trace Convergence Memory). Validated by the ATANT evaluation framework (arXiv:2604.06710, arXiv:2604.10981). Thesis: The Continuity Layer (arXiv:2604.17273). Not to be confused with Kinetic Labs (keyboards) or Kenosis Group.",
      },
    },
    {
      "@type": "Question",
      name: "Why does AI forget everything between sessions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI systems are session-based - they process each conversation independently with no persistent state. This is why ChatGPT forgets what you told it, why Siri can't remember your preferences, and why chatbots make you repeat yourself. The solution is a continuity layer - infrastructure that persists, updates, and reconstructs context across sessions. Kenotic Labs builds this layer.",
      },
    },
    {
      "@type": "Question",
      name: "Why is ChatGPT getting worse at remembering things?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT and other AI assistants appear to get worse because they lack true continuity - the ability to carry forward what matters, update it when things change, and reconstruct it when needed. Context windows and memory features are band-aids. Real continuity requires a dedicated infrastructure layer that handles persistence, temporal ordering, disambiguation, and reconstruction.",
      },
    },
    {
      "@type": "Question",
      name: "How do I add persistent memory to my AI agent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most AI agents fail because they lose state between tasks. Solving that requires a continuity layer that preserves what still matters, keeps track of change, and reconstructs the current situation when needed. Kenotic Labs provides this as infrastructure so AI agents can carry persistent context, temporal reasoning, and disambiguation across sessions.",
      },
    },
    {
      "@type": "Question",
      name: "Why do AI agents fail 80% of the time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI agent reliability is fundamentally a memory and state management problem. With 85% per-step accuracy, a 10-step workflow only succeeds 20% of the time. Agents fail because they cannot maintain context across steps, forget previous failures, and lose track of what has changed. A continuity layer solves this by providing persistent state, update tracking, and situation reconstruction.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between RAG and continuity?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RAG (Retrieval Augmented Generation) retrieves similar chunks of text. Continuity reconstructs the current living state of a situation - including what changed, what still matters, and what should happen next. RAG finds related past things. Continuity understands the present. This is why RAG still hallucinates 17-33% of the time while deterministic reconstruction achieves near-perfect accuracy.",
      },
    },
    {
      "@type": "Question",
      name: "What is DTCM and why is it not just a database?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DTCM stands for Decomposed Trace Convergence Memory. It is Kenotic Labs' architecture for preserving and reconstructing the living state of a situation. A normal database stores facts and makes the model interpret them again from scratch. DTCM is designed as a continuity architecture, not just storage, so the system can remain oriented to what is active, what changed, and what should happen next.",
      },
    },
    {
      "@type": "Question",
      name: "What is ATANT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ATANT (Automated Test for Acceptance of Narrative Truth) is the first open evaluation framework for measuring AI continuity. It tests whether an AI system can persist, update, disambiguate, and reconstruct meaningful context across time using 250 narrative tests and 1,835 verification questions across 10 checkpoints. Published by Kenotic Labs (arXiv:2604.06710).",
      },
    },
    {
      "@type": "Question",
      name: "Why do chatbots make me repeat myself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "90% of customers have to repeat information to chatbots because these systems lack continuity - they cannot carry forward context from previous interactions. Each session starts from zero. A continuity layer would let chatbots remember your history, track what changed, and reconstruct your situation without asking again.",
      },
    },
    {
      "@type": "Question",
      name: "Why can't Siri or Alexa remember anything?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Voice assistants like Siri and Alexa are session-based - they process each command independently. They lack a continuity layer that would let them remember your preferences, track recurring patterns, and build understanding over time. The technology exists to fix this - it requires persistent memory infrastructure that survives across sessions, updates, and device restarts.",
      },
    },
  ],
};

export default function Home() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden bg-[var(--kl-canvas)] text-[var(--kl-text)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* ═══════════ 1. HERO ═══════════
          "We gave machines intelligence. We never gave them time."
          The existing hero with the word-by-word cascading animation.
          Claim of the page. */}
      <Hero />

      {/* ═══════════ 2. POSITION STATEMENT ═══════════
          Single sentence on a surface break. The belief the rest of the
          page defends. */}
      <section id="vision" className="py-24 md:py-32 border-y border-[var(--kl-border)] bg-[var(--kl-surface)]">
        <div className="mx-auto max-w-[960px] px-6 md:px-10 text-center">
          <div className="inline-block h-[1px] w-16 bg-[color:color-mix(in_srgb,var(--kl-signal)_60%,transparent)] mb-10" />
          <blockquote className="font-[family-name:var(--font-newsreader)] italic text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.3] text-[var(--kl-text)] tracking-[-0.01em]">
            We believe the company that owns the continuity layer will define the next decade of AI infrastructure.
          </blockquote>
          <div className="inline-block h-[1px] w-16 bg-[color:color-mix(in_srgb,var(--kl-signal)_60%,transparent)] mt-10" />
        </div>
      </section>

      {/* ═══════════ 2.5 THE DISTINCTION ═══════════
          Type 1 retrieval memory vs. Type 2 understanding continuity.
          Investor-facing differentiation from Mem0 / Rewind / Personal.ai / ChatGPT Memory. */}
      <section className="py-28 md:py-36 bg-[var(--kl-canvas)]">
        <div className="mx-auto max-w-[1120px] px-6 md:px-10">
          <p className="text-[var(--kl-signal)] text-[0.72rem] font-bold tracking-[3px] uppercase font-[family-name:var(--font-lato)] mb-5">
            The distinction
          </p>
          <h2 className="font-[family-name:var(--font-fraunces)] text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.14] text-[var(--kl-text)] tracking-[-0.02em] mb-10 max-w-[900px]">
            Other memory products store what you said. Kenotic stores what the AI understood about you while you were saying it.
          </h2>
          <p className="font-[family-name:var(--font-newsreader)] text-[clamp(1.05rem,1.5vw,1.2rem)] leading-[1.6] text-[var(--kl-text-muted)] max-w-[820px] mb-16">
            Two categories get called &ldquo;memory.&rdquo; They are not the same primitive.
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="rounded-lg border border-[var(--kl-border)] bg-[var(--kl-surface)] p-8 md:p-10">
              <p className="text-[var(--kl-text-muted)] text-[0.68rem] font-bold tracking-[2.5px] uppercase font-[family-name:var(--font-lato)] mb-4">
                Type 1 · Retrieval memory
              </p>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[var(--kl-text)] mb-5 leading-[1.2]">
                What you said.
              </h3>
              <p className="font-[family-name:var(--font-newsreader)] text-[1rem] leading-[1.65] text-[var(--kl-text-muted)] mb-5">
                Stores facts. &ldquo;User lives in Michigan. Prefers Python. Has a sister named Mia.&rdquo; When asked, it looks up the fact and injects it into the prompt.
              </p>
              <p className="font-[family-name:var(--font-newsreader)] text-[0.95rem] leading-[1.6] text-[var(--kl-text-soft)] italic">
                Mem0, Rewind, Personal.ai, ChatGPT Memory, Letta, Zep. A filing cabinet of index cards.
              </p>
            </div>

            <div className="rounded-lg border-l-[3px] border-l-[var(--kl-accent)] border-t border-r border-b border-[var(--kl-border)] bg-[var(--kl-panel)] p-8 md:p-10">
              <p className="text-[var(--kl-accent)] text-[0.68rem] font-bold tracking-[2.5px] uppercase font-[family-name:var(--font-lato)] mb-4">
                Type 2 · Understanding continuity
              </p>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[var(--kl-text)] mb-5 leading-[1.2]">
                What the AI understood about you.
              </h3>
              <p className="font-[family-name:var(--font-newsreader)] text-[1rem] leading-[1.65] text-[var(--kl-text-muted)] mb-5">
                Stores the AI&rsquo;s evolving perception of you. Not &ldquo;what you said&rdquo; but the arc of the conversation, the thread you were on, the things left unresolved, the working model. Switch to a new AI and it resumes the same understanding.
              </p>
              <p className="font-[family-name:var(--font-newsreader)] text-[0.95rem] leading-[1.6] text-[var(--kl-text-soft)] italic">
                Kenotic. The impression a long-time friend has of you. Not a diff; the entire working tree.
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-[var(--kl-border)] pt-10 max-w-[880px]">
            <p className="font-[family-name:var(--font-newsreader)] text-[1.05rem] leading-[1.7] text-[var(--kl-text-muted)]">
              The labs with the capital to build Type 2 are incentivized not to — portable understanding across Claude, GPT, and Gemini is anti-platform-moat for them. The companies building memory today are architecturally committed to fact retrieval. Kenotic sits in the gap, with an architecture designed to encode the structured understanding state itself.
            </p>
          </div>
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
      <section id="evidence" className="py-28 md:py-36 bg-[var(--kl-text)] text-[var(--kl-canvas)] border-y border-[var(--kl-text)]">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            <Receipt
              label="Paper v1.0"
              title="ATANT framework, on arXiv"
              meta="2604.06710 · April 8, 2026 · cs.AI"
              href="https://arxiv.org/abs/2604.06710"
            />
            <Receipt
              label="Paper v1.1"
              title="Positioning against memory benchmarks"
              meta="2604.10981 · April 13, 2026 · cs.AI"
              href="https://arxiv.org/abs/2604.10981"
            />
            <Receipt
              label="Thesis"
              title="The Continuity Layer, on arXiv"
              meta="2604.17273 · April 2026 · cs.AI"
              href="https://arxiv.org/abs/2604.17273"
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

          <div className="mt-14 border-t border-[var(--kl-border)] pt-10 max-w-[720px] mx-auto">
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--kl-text-soft)] font-semibold mb-6 text-center">
              Latest research
            </p>
            <ul className="space-y-4">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="group flex items-baseline gap-3"
                  >
                    <span className="shrink-0 text-[0.65rem] tracking-[0.15em] uppercase text-[var(--kl-signal)] font-semibold">
                      {article.category}
                    </span>
                    <span className="font-[family-name:var(--font-newsreader)] text-[1.05rem] text-[var(--kl-text-muted)] group-hover:text-[var(--kl-text)] transition-colors duration-500">
                      {article.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
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
      <section id="about" className="py-28 md:py-36 bg-[var(--kl-canvas)] scroll-mt-24">
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
                <strong className="text-[var(--kl-text)]">Kenotic Labs is an AI infrastructure company building the continuity layer for AI</strong> — infrastructure that preserves and reconstructs the living state of a situation across time. Founded in 2025 by <strong className="text-[var(--kl-text)]">Samuel Sameer Tanguturi</strong>. Based in Michigan, USA. Core architecture: DTCM (Decomposed Trace Convergence Memory). Validated by the ATANT evaluation framework (arXiv:2604.06710, arXiv:2604.10981). Thesis: arXiv:2604.17273.
              </p>
              <p>
                The name comes from <em className="font-[family-name:var(--font-newsreader)] italic text-[var(--kl-accent)] not-italic font-medium">kenosis</em>, a Greek term for self-pouring without loss of self. The architecture and the name describe the same pattern: a structured state that moves forward into the next moment without losing what it was.
              </p>
              <p>
                The work is in public. The framework is on arXiv. The benchmark is on GitHub. The reference implementation passes the framework. The corpus is on Hugging Face. The thesis is on arXiv and on this site.
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

import type { Metadata } from "next";
import {
  Fraunces,
  IBM_Plex_Sans,
  Instrument_Serif,
  Inter,
  Manrope,
  Newsreader,
  Playfair_Display,
  Source_Serif_4,
} from "next/font/google";
import { Nav } from "@/components/nav";
import { SiteEffects } from "@/components/site-effects";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kenotic Labs - The Continuity Layer for AI Systems",
    template: "%s | Kenotic Labs",
  },
  description:
    "AI forgets everything between sessions. ChatGPT loses context. Chatbots make you repeat yourself. AI agents fail because they cannot preserve the living state of a situation. Kenotic Labs builds the continuity layer for AI: a situation-aware infrastructure primitive based on DTCM and situational reconstruction. The missing layer between session intelligence and situational intelligence.",
  keywords: [
    // Core identity
    "Kenotic Labs",
    "continuity layer",
    "AI continuity",
    "AI continuity layer",
    "AI continuity primitive",
    "continuity primitive",
    "situational intelligence",
    "session intelligence",
    "situation store",
    "situational reconstruction",
    "living state of a situation",
    "continuity architecture",
    "AI relationship layer",
    "continuity infrastructure",
    "situation-aware AI",
    "situation awareness AI",
    "state that stays active",
    "what changed what matters what next",
    // Architecture terms
    "DTCM",
    "Decomposed Trace Convergence Memory",
    "write-path decomposition",
    "read-path reconstruction",
    "trace convergence",
    "episodic emotional temporal relational schematic traces",
    "trace-based memory architecture",
    "situation reconstruction engine",
    "deterministic situational reconstruction",
    "living situation reconstruction",
    "coherent present reconstruction",
    "model as processor",
    "continuity layer as durable value",
    // Competitor/customer keywords
    "AI memory layer",
    "AI agent memory",
    "long-term memory for AI",
    "persistent memory AI",
    "stateful AI agents",
    "context engineering",
    "memory infrastructure",
    "AI memory benchmark",
    "AI memory evaluation",
    "memory SDK",
    "LLM memory",
    "AI memory framework",
    "agent memory framework",
    "memory layer for LLM",
    "conversational memory",
    "AI context persistence",
    // High-volume frustration keywords (2.8M-4.2M monthly searches)
    "ChatGPT getting worse",
    "AI is getting dumber",
    "why is AI so bad",
    "AI doesnt understand context",
    "AI cant remember",
    "AI forgot everything",
    "ChatGPT doesnt remember",
    "ChatGPT memory not working",
    "why does AI forget",
    "how to make AI remember",
    "AI loses context",
    "chatbot forgot my name",
    "AI memory problem",
    "AI keeps forgetting",
    "AI assistant forgets conversation",
    "chatbot memory loss",
    "make chatbot remember",
    "AI ignores what I said",
    "AI cant follow instructions",
    // Voice assistant frustrations
    "Siri doesnt remember",
    "Alexa forgot",
    "voice assistant memory",
    // Customer support frustrations
    "chatbot made me repeat myself",
    "AI customer service frustrating",
    "customer service bot useless",
    "chatbot cant remember conversation",
    // AI coding assistant context
    "Copilot context window",
    "Cursor loses context",
    "AI coding assistant forgets",
    "AI doesnt understand my codebase",
    // AI agent failures
    "AI agent keeps failing",
    "AI agent reliability",
    "why do AI agents fail",
    "AI agent state management",
    "AI agent memory loss",
    // RAG failures
    "RAG hallucination",
    "RAG not working",
    "RAG limitations",
    "beyond RAG",
    "deterministic reconstruction",
    // Gaming/companion AI
    "character AI memory",
    "AI companion memory",
    "NPC memory system",
    "AI character forgets",
    "context rot",
    // Healthcare
    "care continuity technology",
    "patient context AI",
    "healthcare AI memory",
    // Enterprise
    "enterprise AI memory",
    "institutional knowledge loss",
    "knowledge management AI",
    // Education
    "AI tutor memory",
    "adaptive learning AI",
    // Workflow
    "AI workflow memory",
    "automation loses context",
    // Technical/evaluation
    "ATANT evaluation framework",
    "narrative truth testing",
    "AI memory testing",
    "temporal reasoning AI",
    "disambiguation AI",
    "memory reconstruction",
    // Developer keywords
    "how to add memory to AI",
    "add memory to LLM",
    "agent memory python",
    "persistent context LLM",
    "stateful AI",
    "persistent AI",
    // Real natural-language variations people actually use (verified from forums/GitHub/OpenAI community)
    // "chat gpt" as two words (extremely common variant)
    "chat gpt getting worse",
    "chat gpt memory",
    "chat gpt forgets",
    "chat gpt forgot everything",
    "chat gpt lost context",
    "chat gpt wont remember",
    "chat gpt cant remember",
    // Informal frustration phrases (from OpenAI forums, GitHub issues, Quora)
    "chatgpt suddenly forgot everything",
    "chatgpt abandoned me",
    "chatgpt memory doesnt work even when I tell it to remember",
    "chatgpt memory will not save",
    "chatgpt got worse over the months",
    "why is chatgpt so bad now",
    "chatgpt is useless now",
    "chatgpt quality regression",
    // AI brain rot / dumber (real phrases from Medium, Elephas, forums)
    "ai brain rot",
    "chatgpt brain rot",
    "ai getting dumber 2026",
    "ai getting stupider",
    "chatgpt feels dumber",
    "chatgpt lazy responses",
    "chatgpt gives shorter answers now",
    // Context rot (real emerging term from ProductTalk, SubStack)
    "context rot AI",
    "context rot chatbot",
    "ai gets worse the longer you talk",
    "chatbot gets worse longer conversation",
    // Copilot/Cursor real phrases (from GitHub Issues)
    "copilot loses context",
    "copilot losing context",
    "copilot lost context of my conversation",
    "copilot agent context loss",
    "copilot summarized conversation history",
    "copilot cannot retain context",
    "copilot starts from scratch",
    "copilot is missing context",
    "copilot feels dumber",
    "cursor loses context",
    "cursor context compaction",
    // Character AI real phrases (from Medium, RoboRhythms, AI-Character)
    "character ai memory feels broken",
    "character ai forgetting names",
    "character ai switching personalities",
    "character ai repeating questions",
    "ai character forgets relationship",
    "ai companion forgets everything",
    "ai roleplay memory broken",
    // Voice assistant real phrases (from XDA, 9to5Mac, TechRadar)
    "voice assistants getting worse",
    "siri getting worse",
    "alexa plus problems",
    "alexa plus bad",
    "alexa failing simple commands",
    "siri still cant remember",
    // Chatbot customer service real phrases (from CNBC, CMSWire, Zendesk)
    "i hate customer service chatbots",
    "chatbot made me start over",
    "chatbot doesnt know my history",
    "have to repeat myself to chatbot",
    "chatbot cant remember previous conversation",
    // RAG real failure phrases (from TechCrunch, Mindee, HuggingFace)
    "rag still hallucinates",
    "rag retrieves wrong documents",
    "rag not accurate",
    "rag fragile dance of glue code",
    // Agent failure real phrases (from Fortune, RAND, Composio)
    "ai agent project failed",
    "ai agent unreliable",
    "ai agent deleted my database",
    "agentic ai failure rate",
    "80 percent ai projects fail",
    // Patient/healthcare real phrases (from Healthcare IT News, Nature)
    "patient has to repeat history every visit",
    "doctor doesnt know my history",
    "ehr doesnt capture context",
  ],
  authors: [{ name: "Kenotic Labs" }, { name: "Samuel Sameer Tanguturi" }],
  creator: "Kenotic Labs",
  publisher: "Kenotic Labs",
  metadataBase: new URL("https://kenoticlabs.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kenoticlabs.com",
    siteName: "Kenotic Labs",
    title: "Kenotic Labs - The Continuity Layer for AI Systems",
    description:
      "AI forgets everything between sessions because it cannot preserve the living state of a situation. Kenotic Labs builds the continuity layer for AI: DTCM-based infrastructure for situational reconstruction, temporal reasoning, disambiguation, and situational intelligence.",
    // Image is auto-populated from src/app/opengraph-image.tsx (Next.js file convention).
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenotic Labs - The Continuity Layer for AI Systems",
    description:
      "Kenotic Labs builds the continuity layer for AI: infrastructure that preserves and reconstructs the living state of a situation across time.",
    // Image is auto-populated from src/app/twitter-image.tsx (Next.js file convention).
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${playfairDisplay.variable} ${newsreader.variable} ${sourceSerif4.variable} ${ibmPlexSans.variable} ${fraunces.variable} ${manrope.variable} antialiased`}
    >
      <head>
        {/* WebSite schema (enables branded sitelinks) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Kenotic Labs",
              alternateName: "Kenotic",
              url: "https://kenoticlabs.com",
              inLanguage: "en",
              publisher: {
                "@type": "Organization",
                name: "Kenotic Labs",
                url: "https://kenoticlabs.com",
              },
              description:
                "The continuity layer for AI systems. Infrastructure that preserves and reconstructs the living state of a situation across time. Built around DTCM and validated by ATANT.",
            }),
          }}
        />
        {/* Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kenotic Labs",
              alternateName: [
                "Kenotic",
                "Kenotic Labs AI",
                "Kenotic Continuity Layer",
              ],
              url: "https://kenoticlabs.com",
              logo: "https://kenoticlabs.com/logo.svg",
              description:
                "Kenotic Labs builds the continuity layer for AI systems. The company's thesis is that AI fails not because it lacks information, but because it cannot preserve the living state of a situation across time. Kenotic is building a continuity primitive and situation-aware infrastructure layer based on DTCM, reconstruction, and persistent structured understanding.",
              founder: {
                "@type": "Person",
                name: "Samuel Sameer Tanguturi",
                givenName: "Samuel",
                additionalName: "Sameer",
                familyName: "Tanguturi",
                jobTitle: "Founder",
                description:
                  "Founder of Kenotic Labs. Author of ATANT (arXiv:2604.06710), the first open evaluation framework for AI continuity. Background in industrial automation, having designed production systems for Schneider Electric, Continental Automotive, Brose, Tenneco, and Tata Electronics. Holds engineering credentials in Mechatronics, Electronics and Computer Engineering, and Information Systems.",
                alumniOf: {
                  "@type": "CollegeOrUniversity",
                  name: "Central Michigan University",
                },
                knowsAbout: [
                  "AI continuity",
                  "DTCM",
                  "Decomposed Trace Convergence Memory",
                  "AI evaluation frameworks",
                  "industrial automation",
                  "PLC programming",
                  "deterministic systems",
                  "embedded systems",
                  "mechatronics",
                ],
                sameAs: [
                  "https://github.com/Kenotic-Labs",
                  "https://arxiv.org/abs/2604.06710",
                ],
              },
              foundingDate: "2025",
              sameAs: [
                "https://github.com/Kenotic-Labs",
                "https://github.com/Kenotic-Labs/ATANT",
                "https://arxiv.org/abs/2604.06710",
                "https://linkedin.com/company/kenotic-labs",
                "https://reddit.com/r/Kenoticlabs",
              ],
              knowsAbout: [
                "AI continuity",
                "AI continuity layer",
                "continuity primitive",
                "situational intelligence",
                "situation store",
                "situational reconstruction",
                "DTCM",
                "Decomposed Trace Convergence Memory",
                "AI memory systems",
                "AI memory layer",
                "long-term memory for AI agents",
                "persistent memory for AI",
                "AI evaluation frameworks",
                "ATANT evaluation framework",
                "conversational memory",
                "temporal reasoning",
                "AI agent memory",
                "stateful AI agents",
                "context engineering",
                "memory reconstruction",
                "deterministic reconstruction",
                "AI disambiguation",
                "RAG alternatives",
                "beyond RAG",
                "AI agent reliability",
                "AI agent state management",
                "care continuity technology",
                "enterprise AI memory",
                "AI coding assistant context",
                "NPC memory systems",
                "AI companion memory",
                "voice assistant memory",
                "chatbot memory",
                "adaptive learning AI memory",
              ],
              areaServed: "Worldwide",
              serviceType: [
                "AI Infrastructure",
                "AI Memory Layer",
                "AI Continuity Layer",
                "Memory SDK for AI Agents",
                "AI Evaluation Framework",
              ],
            }),
          }}
        />
        {/* Software product schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Kenotic Continuity Layer",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Cross-platform",
              description:
                "The continuity layer for AI systems. Infrastructure that lets AI preserve and reconstruct the living state of a situation across time through DTCM and situational reconstruction. Solves context collapse, agent failures, chatbot amnesia, and RAG limitations by enabling situational intelligence rather than fragment retrieval.",
              offers: {
                "@type": "Offer",
                availability: "https://schema.org/ComingSoon",
              },
              creator: {
                "@type": "Organization",
                name: "Kenotic Labs",
              },
              featureList: [
                "Persistent memory across sessions - AI never forgets",
                "Situation store for the living state of a situation",
                "Update handling - context changes tracked automatically",
                "Temporal ordering - time-aware memory reconstruction",
                "Disambiguation - separate overlapping contexts correctly",
                "Situation reconstruction - rebuild full context from traces",
                "Model independence - works with any LLM",
                "Deterministic reconstruction - no hallucinated connections",
                "ATANT validated - 250 stories, 1835 questions, 100% accuracy",
              ],
            }),
          }}
        />
        {/* FAQ schema - targets frustration searches */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Why does AI forget everything between sessions?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "AI systems are session-based - they process each conversation independently with no persistent state. This is why ChatGPT forgets what you told it, why Siri cant remember your preferences, and why chatbots make you repeat yourself. The solution is a continuity layer - infrastructure that persists, updates, and reconstructs context across sessions. Kenotic Labs builds this layer.",
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
                  name: "If this layer became real, what would begin to change?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "If the continuity layer becomes real, machines begin to understand why something matters, when action should happen, and what should happen next without being re-instructed from zero every time. In software, that changes how systems behave. In hardware, it points toward a different kind of machine substrate. The larger implication is that new businesses, new product categories, and new operating models become possible once situational coherence exists as infrastructure.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is ATANT?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "ATANT (Automated Test for Acceptance of Narrative Truth) is the first open evaluation framework for measuring AI continuity. It tests whether an AI system can persist, update, disambiguate, and reconstruct meaningful context across time using 250 narrative tests and 1,835 verification questions across 10 checkpoints. Published by Kenotic Labs.",
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
                  name: "Why cant Siri or Alexa remember anything?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Voice assistants like Siri and Alexa are session-based - they process each command independently. They lack a continuity layer that would let them remember your preferences, track recurring patterns, and build understanding over time. The technology exists to fix this - it requires persistent memory infrastructure that survives across sessions, updates, and device restarts.",
                  },
                },
              ],
            }),
          }}
        />
        {/* ScholarlyArticle schema for the arXiv paper (April 8, 2026) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ScholarlyArticle",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": "https://kenoticlabs.com",
              },
              headline: "ATANT: An Evaluation Framework for AI Continuity",
              name: "ATANT: An Evaluation Framework for AI Continuity",
              author: {
                "@type": "Person",
                name: "Samuel Sameer Tanguturi",
                affiliation: {
                  "@type": "Organization",
                  name: "Kenotic Labs",
                },
              },
              datePublished: "2026-04-08",
              identifier: {
                "@type": "PropertyValue",
                propertyID: "arXiv",
                value: "2604.06710",
                url: "https://arxiv.org/abs/2604.06710",
              },
              url: "https://arxiv.org/abs/2604.06710",
              sameAs: "https://arxiv.org/abs/2604.06710",
              about: [
                "AI continuity",
                "AI memory evaluation",
                "deterministic reconstruction",
                "DTCM",
                "Decomposed Trace Convergence Memory",
                "situational intelligence",
              ],
              keywords:
                "AI continuity, ATANT, DTCM, AI memory, evaluation framework, situation reconstruction, deterministic memory",
              isAccessibleForFree: true,
              inLanguage: "en",
              publisher: {
                "@type": "Organization",
                name: "arXiv",
                url: "https://arxiv.org",
              },
              description:
                "An open evaluation framework for AI continuity. Defines continuity as a system property with seven required characteristics, introduces a 10-checkpoint methodology with no LLM in the evaluation loop, and tests across 250 narrative stories and 1,835 verification questions in 6 life domains. The reference implementation reaches 100 percent accuracy in isolated mode and 96 percent at 250-story cumulative scale.",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#FAFAF8] text-[#1A1A1A] font-[family-name:var(--font-manrope)]" suppressHydrationWarning>
        <SiteEffects />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.02]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />
        <Nav />
        {children}
      </body>
    </html>
  );
}

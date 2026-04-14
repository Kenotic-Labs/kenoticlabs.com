import type { Metadata } from "next";
import Link from "next/link";
import { SiteOverlay } from "@/components/site-overlay";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog - AI Continuity Research and Analysis",
  description:
    "Why AI forgets everything. Why chatbots make you repeat yourself. Why AI agents fail. Why RAG hallucinates. Research and analysis from Kenotic Labs on the AI continuity problem and how to fix it.",
  keywords: [
    "AI continuity blog",
    "AI memory research",
    "why AI forgets",
    "ChatGPT getting worse",
    "AI agent failures",
    "RAG limitations",
    "AI memory layer",
    "Kenotic Labs blog",
  ],
  alternates: { canonical: "/insights" },
};

export default function BlogIndex() {
  return (
    <div className="relative min-h-screen bg-[var(--kl-canvas)] overflow-hidden">
      <div aria-hidden="true" className="site-tech-overlay pointer-events-none absolute inset-0 z-[0]" />
      <SiteOverlay />
      <div className="relative z-[2]">
      {/* Header */}
      <header className="bg-[var(--kl-surface)] pt-32 pb-20 border-b border-[color:color-mix(in_srgb,var(--kl-accent)_10%,transparent)]">
        <div className="max-w-[900px] mx-auto px-8">
          <Link
            href="/"
            className="text-[var(--kl-signal)] text-xs font-bold tracking-[6px] uppercase font-[family-name:var(--font-lato)] hover:opacity-80 transition-opacity"
          >
            Kenotic Labs
          </Link>
          <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.4rem,5vw,3.8rem)] font-bold text-[var(--kl-text)] leading-[1.06] mt-8 mb-6">
            Research &amp; Analysis
          </h1>
          <p className="text-[var(--kl-text-muted)] text-lg leading-relaxed max-w-[600px] font-[family-name:var(--font-lato)]">
            Why AI forgets. What continuity means. How to fix it.
          </p>
        </div>
      </header>

      {/* Article List */}
      <main className="max-w-[900px] mx-auto px-8 py-16">
        <div className="flex flex-col gap-12">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="group block"
            >
              <article
                className="bg-white rounded-[1.5rem] p-8 md:p-10 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-500"
                style={{ borderLeft: "3px solid var(--kl-accent)", backgroundColor: "var(--kl-panel)" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[var(--kl-signal)] text-xs font-bold tracking-[2px] uppercase font-[family-name:var(--font-lato)]">
                    {article.category}
                  </span>
                  <span className="text-[var(--kl-text-muted)] text-xs font-[family-name:var(--font-lato)]">
                    {article.readingTime} read
                  </span>
                  <span className="text-[var(--kl-text-muted)] text-xs font-[family-name:var(--font-lato)]">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.3rem,2.5vw,1.8rem)] font-bold text-[var(--kl-text)] leading-[1.15] mb-4 group-hover:text-[var(--kl-accent)] transition-colors duration-500">
                  {article.title}
                </h2>
                <p className="text-[var(--kl-text-muted)] text-[1rem] leading-[1.8] line-clamp-2 font-[family-name:var(--font-lato)]">
                  {article.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[color:color-mix(in_srgb,var(--kl-accent)_10%,transparent)] py-12">
        <div className="max-w-[900px] mx-auto px-8 text-center">
          <Link
            href="/"
            className="text-[var(--kl-text-muted)] text-sm font-[family-name:var(--font-lato)] hover:text-[var(--kl-text)] transition-colors"
          >
            Back to Kenotic Labs
          </Link>
        </div>
      </footer>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteOverlay } from "@/components/site-overlay";
import { articles } from "@/lib/articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      authors: ["Kenotic Labs"],
      siteName: "Kenotic Labs",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const markdownComponents = {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--kl-text)] leading-[1.1] mt-14 mb-8">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-[var(--kl-text)] leading-[1.15] mt-14 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-[family-name:var(--font-playfair)] text-[1.3rem] font-bold text-[var(--kl-text)] leading-[1.2] mt-10 mb-4">
        {children}
      </h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-[var(--kl-text-muted)] text-[1.05rem] leading-[1.9] mb-6 font-[family-name:var(--font-lato)]">
        {children}
      </p>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="text-[var(--kl-text)]">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="text-[var(--kl-text-soft)]">{children}</em>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-6 ml-6 flex flex-col gap-2">{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-6 ml-6 flex flex-col gap-2 list-decimal">{children}</ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-[var(--kl-text-muted)] text-[1.05rem] leading-[1.8] list-disc font-[family-name:var(--font-lato)]">
        {children}
      </li>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-3 border-[color:color-mix(in_srgb,var(--kl-accent)_30%,transparent)] pl-6 my-6 italic text-[var(--kl-text-soft)]">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-10 border-[color:color-mix(in_srgb,var(--kl-accent)_10%,transparent)]" />,
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
      <a href={href} className="text-[var(--kl-accent)] underline hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    table: ({ children }: { children?: React.ReactNode }) => (
      <div className="my-8 overflow-x-auto rounded-[1.1rem] border border-[var(--kl-border)] bg-[var(--kl-panel)]">
        <table className="min-w-full border-collapse text-left font-[family-name:var(--font-lato)]">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
      <thead className="bg-[color:color-mix(in_srgb,var(--kl-accent)_7%,var(--kl-surface))]">
        {children}
      </thead>
    ),
    tbody: ({ children }: { children?: React.ReactNode }) => (
      <tbody className="divide-y divide-[color:color-mix(in_srgb,var(--kl-border)_70%,transparent)]">
        {children}
      </tbody>
    ),
    tr: ({ children }: { children?: React.ReactNode }) => (
      <tr className="align-top">
        {children}
      </tr>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
      <th className="px-5 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[var(--kl-text)]">
        {children}
      </th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
      <td className="px-5 py-4 text-[0.98rem] leading-[1.75] text-[var(--kl-text-muted)]">
        {children}
      </td>
    ),
  };

  return (
    <div className="relative min-h-screen bg-[var(--kl-canvas)] overflow-hidden">
      <div aria-hidden="true" className="site-tech-overlay pointer-events-none absolute inset-0 z-[0]" />
      <SiteOverlay />
      <div className="relative z-[2]">
      {/* BlogPosting JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            description: article.description,
            datePublished: article.date,
            dateModified: article.date,
            inLanguage: "en",
            author: {
              "@type": "Person",
              name: "Samuel Sameer Tanguturi",
              url: "https://kenoticlabs.com",
              sameAs: [
                "https://arxiv.org/abs/2604.06710",
                "https://github.com/Kenotic-Labs",
              ],
            },
            publisher: {
              "@type": "Organization",
              name: "Kenotic Labs",
              url: "https://kenoticlabs.com",
              logo: {
                "@type": "ImageObject",
                url: "https://kenoticlabs.com/Main-Logo-BGR.png",
              },
            },
            image: [`https://kenoticlabs.com/insights/${article.slug}/opengraph-image`],
            keywords: article.keywords.join(", "),
            articleSection: article.category,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://kenoticlabs.com/insights/${article.slug}`,
            },
            url: `https://kenoticlabs.com/insights/${article.slug}`,
          }),
        }}
      />
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Kenotic Labs",
                item: "https://kenoticlabs.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Insights",
                item: "https://kenoticlabs.com/insights",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: `https://kenoticlabs.com/insights/${article.slug}`,
              },
            ],
          }),
        }}
      />

      {/* Header */}
      <header className="bg-[var(--kl-surface)] pt-32 pb-20 border-b border-[color:color-mix(in_srgb,var(--kl-accent)_10%,transparent)]">
        <div className="max-w-[740px] mx-auto px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/insights"
              className="text-[var(--kl-signal)] text-xs font-bold tracking-[4px] uppercase font-[family-name:var(--font-lato)] hover:opacity-80 transition-opacity"
            >
              Blog
            </Link>
            <span className="text-[color:color-mix(in_srgb,var(--kl-accent)_30%,transparent)]">/</span>
            <span className="text-[color:color-mix(in_srgb,var(--kl-accent)_60%,transparent)] text-xs font-bold tracking-[2px] uppercase font-[family-name:var(--font-lato)]">
              {article.category}
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] font-bold text-[var(--kl-text)] leading-[1.1] mb-8">
            {article.title}
          </h1>
          <div className="flex items-center gap-6 text-[var(--kl-text-muted)] text-sm font-[family-name:var(--font-lato)]">
            <span>Kenotic Labs</span>
            <span>
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>{article.readingTime} read</span>
          </div>
        </div>
      </header>

      {/* Article Body */}
      <main className="max-w-[740px] mx-auto px-8 py-16">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {article.content}
        </ReactMarkdown>
      </main>

      {/* CTA */}
      <div className="max-w-[740px] mx-auto px-8 pb-16">
        <div className="rounded-[1.5rem] p-10 md:p-12 shadow-lg" style={{ borderLeft: "3px solid var(--kl-accent)", backgroundColor: "var(--kl-panel)" }}>
          <div className="pl-8">
            <p className="font-[family-name:var(--font-playfair)] text-[var(--kl-text)] text-xl leading-relaxed mb-4">
              The continuity layer is the missing layer between AI interaction
              and AI relationship.
            </p>
            <p className="text-[var(--kl-text-muted)] text-sm mb-6 font-[family-name:var(--font-lato)]">
              Kenotic Labs builds this layer.
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-[var(--kl-accent)] text-white text-xs font-bold tracking-[2px] uppercase px-6 py-2.5 rounded hover:opacity-90 transition-opacity duration-500 font-[family-name:var(--font-lato)]"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[color:color-mix(in_srgb,var(--kl-accent)_10%,transparent)] py-12">
        <div className="max-w-[740px] mx-auto px-8 flex justify-between items-center">
          <Link
            href="/insights"
            className="text-[var(--kl-text-muted)] text-sm font-[family-name:var(--font-lato)] hover:text-[var(--kl-text)] transition-colors"
          >
            All articles
          </Link>
          <Link
            href="/"
            className="text-[var(--kl-text-muted)] text-sm font-[family-name:var(--font-lato)] hover:text-[var(--kl-text)] transition-colors"
          >
            Kenotic Labs
          </Link>
        </div>
      </footer>
      </div>
    </div>
  );
}

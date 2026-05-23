import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cross-Platform AI Memory Demo - Break Free from AI Memory Silos",
  description:
    "Your AI memory is locked inside each platform. Claude doesn't know what you told ChatGPT. Watch one conversation flow across six AI platforms with nothing lost. See how portable AI memory solves AI memory fragmentation.",
  keywords: [
    "AI memory silo",
    "AI memory silos",
    "AI context portability",
    "cross-platform AI memory",
    "AI memory lock-in",
    "portable AI memory",
    "AI continuity",
    "AI memory fragmentation",
    "switch AI lose context",
    "ChatGPT Claude memory transfer",
    "use multiple AI assistants same memory",
    "switch from ChatGPT to Claude",
    "ChatGPT memory not working",
    "best AI for memory",
    "AI assistant comparison",
    "ChatGPT memory full",
  ],
  alternates: { canonical: "https://kenoticlabs.com/demo" },
  openGraph: {
    type: "website",
    title:
      "Your AI Memory Is Trapped. Watch It Break Free Across 6 Platforms.",
    description:
      "Claude doesn't know what you told ChatGPT. Switch platforms, start over. We fix that. Watch one conversation flow across Claude, GPT, Gemini, Ollama, Cursor, and more -- nothing lost, nothing re-explained.",
    url: "https://kenoticlabs.com/demo",
    siteName: "Kenotic Labs",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Kenotic Labs — Cross-Platform AI Memory Demo" }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Your AI Memory Is Trapped. Watch It Break Free Across 6 Platforms.",
    description:
      "Claude doesn't know what you told ChatGPT. Switch platforms, start over. We fix that. Watch one conversation flow across 6 AI platforms with nothing lost.",
    images: [{ url: "/opengraph-image", alt: "Kenotic Labs — Cross-Platform AI Memory Demo" }],
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo - AI Continuity in Action",
  description:
    "Watch a local Phi-4 Mini model survive a full process kill and resume with full situational awareness. No internet. No prompting. Continuity reconstructed from trace.",
  alternates: { canonical: "/demo" },
  openGraph: {
    type: "video.other",
    title: "Demo - AI Continuity in Action | Kenotic Labs",
    description:
      "Watch a local Phi-4 Mini model survive a full process kill and resume with full situational awareness. No internet. No prompting.",
    url: "https://kenoticlabs.com/demo",
    siteName: "Kenotic Labs",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Kenotic Labs continuity demo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Demo - AI Continuity in Action | Kenotic Labs",
    description:
      "Watch a local model survive a full process kill and resume with full situational awareness.",
    images: ["/opengraph-image"],
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo - AI Continuity in Action",
  description:
    "See the continuity layer in action. Watch AI that actually remembers, updates, and reconstructs context across sessions. No more forgotten conversations.",
  alternates: { canonical: "/demo" },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

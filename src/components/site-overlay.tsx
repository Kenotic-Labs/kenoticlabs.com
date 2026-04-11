"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";

type Tone = "signal" | "accent";

type Module = {
  x: number;
  y: number;
  w: number;
  h: number;
  tone: Tone;
  a: number;
};

type Cluster = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  width: number;
  height: number;
  modules: Module[];
};

const TONES: Record<Tone, string> = {
  signal: "var(--kl-signal)",
  accent: "var(--kl-accent)",
};

const homeClusters: Cluster[] = [
  {
    left: "6.5%",
    top: "10rem",
    width: 120,
    height: 300,
    modules: [
      { x: 0, y: 0, w: 44, h: 44, tone: "signal", a: 0.18 },
      { x: 0, y: 56, w: 18, h: 18, tone: "accent", a: 0.16 },
      { x: 26, y: 56, w: 18, h: 18, tone: "signal", a: 0.14 },
      { x: 0, y: 86, w: 18, h: 18, tone: "accent", a: 0.12 },
      { x: 0, y: 116, w: 44, h: 44, tone: "signal", a: 0.16 },
      { x: 56, y: 116, w: 18, h: 18, tone: "accent", a: 0.12 },
      { x: 56, y: 144, w: 18, h: 18, tone: "accent", a: 0.16 },
      { x: 30, y: 172, w: 18, h: 18, tone: "signal", a: 0.12 },
      { x: 56, y: 200, w: 44, h: 44, tone: "accent", a: 0.1 },
      { x: 0, y: 214, w: 18, h: 18, tone: "signal", a: 0.14 },
      { x: 28, y: 258, w: 18, h: 18, tone: "accent", a: 0.12 },
    ],
  },
  {
    right: "6%",
    top: "5.6rem",
    width: 220,
    height: 300,
    modules: [
      { x: 0, y: 0, w: 22, h: 22, tone: "accent", a: 0.14 },
      { x: 34, y: 0, w: 44, h: 44, tone: "signal", a: 0.14 },
      { x: 90, y: 0, w: 22, h: 22, tone: "accent", a: 0.18 },
      { x: 0, y: 34, w: 22, h: 22, tone: "signal", a: 0.16 },
      { x: 90, y: 34, w: 44, h: 44, tone: "accent", a: 0.14 },
      { x: 146, y: 18, w: 22, h: 22, tone: "signal", a: 0.16 },
      { x: 56, y: 58, w: 22, h: 22, tone: "signal", a: 0.12 },
      { x: 88, y: 88, w: 22, h: 22, tone: "accent", a: 0.16 },
      { x: 120, y: 88, w: 44, h: 44, tone: "signal", a: 0.14 },
      { x: 0, y: 120, w: 22, h: 22, tone: "accent", a: 0.12 },
      { x: 32, y: 120, w: 22, h: 22, tone: "signal", a: 0.12 },
      { x: 176, y: 128, w: 22, h: 22, tone: "accent", a: 0.16 },
      { x: 58, y: 152, w: 22, h: 22, tone: "signal", a: 0.14 },
      { x: 120, y: 168, w: 22, h: 22, tone: "accent", a: 0.12 },
      { x: 176, y: 184, w: 44, h: 44, tone: "signal", a: 0.14 },
      { x: 32, y: 198, w: 22, h: 22, tone: "accent", a: 0.14 },
      { x: 90, y: 216, w: 22, h: 22, tone: "signal", a: 0.12 },
      { x: 146, y: 232, w: 22, h: 22, tone: "accent", a: 0.14 },
      { x: 0, y: 244, w: 22, h: 22, tone: "signal", a: 0.12 },
    ],
  },
  {
    right: "8%",
    top: "38%",
    width: 126,
    height: 206,
    modules: [
      { x: 0, y: 0, w: 22, h: 22, tone: "signal", a: 0.1 },
      { x: 34, y: 0, w: 22, h: 22, tone: "accent", a: 0.12 },
      { x: 68, y: 24, w: 44, h: 44, tone: "signal", a: 0.08 },
      { x: 0, y: 58, w: 22, h: 22, tone: "accent", a: 0.1 },
      { x: 34, y: 88, w: 22, h: 22, tone: "signal", a: 0.1 },
      { x: 92, y: 118, w: 22, h: 22, tone: "accent", a: 0.12 },
      { x: 34, y: 148, w: 44, h: 44, tone: "accent", a: 0.07 },
    ],
  },
  {
    left: "7%",
    top: "72%",
    width: 108,
    height: 170,
    modules: [
      { x: 0, y: 0, w: 18, h: 18, tone: "accent", a: 0.1 },
      { x: 28, y: 28, w: 18, h: 18, tone: "signal", a: 0.12 },
      { x: 56, y: 0, w: 44, h: 44, tone: "signal", a: 0.08 },
      { x: 0, y: 72, w: 18, h: 18, tone: "signal", a: 0.1 },
      { x: 28, y: 100, w: 44, h: 44, tone: "accent", a: 0.08 },
      { x: 82, y: 126, w: 18, h: 18, tone: "signal", a: 0.1 },
    ],
  },
];

const insightsClusters: Cluster[] = [
  {
    left: "5%",
    top: "7.5rem",
    width: 96,
    height: 250,
    modules: [
      { x: 0, y: 0, w: 18, h: 18, tone: "signal", a: 0.14 },
      { x: 26, y: 0, w: 18, h: 18, tone: "accent", a: 0.14 },
      { x: 0, y: 28, w: 44, h: 44, tone: "signal", a: 0.12 },
      { x: 56, y: 28, w: 18, h: 18, tone: "accent", a: 0.12 },
      { x: 56, y: 56, w: 18, h: 18, tone: "signal", a: 0.14 },
      { x: 0, y: 88, w: 18, h: 18, tone: "accent", a: 0.1 },
      { x: 26, y: 116, w: 18, h: 18, tone: "signal", a: 0.12 },
      { x: 52, y: 144, w: 44, h: 44, tone: "accent", a: 0.1 },
      { x: 0, y: 198, w: 18, h: 18, tone: "signal", a: 0.12 },
    ],
  },
  {
    right: "6%",
    top: "9rem",
    width: 144,
    height: 228,
    modules: [
      { x: 0, y: 0, w: 22, h: 22, tone: "accent", a: 0.12 },
      { x: 32, y: 0, w: 22, h: 22, tone: "signal", a: 0.14 },
      { x: 64, y: 0, w: 44, h: 44, tone: "signal", a: 0.1 },
      { x: 0, y: 34, w: 22, h: 22, tone: "signal", a: 0.12 },
      { x: 94, y: 56, w: 22, h: 22, tone: "accent", a: 0.14 },
      { x: 32, y: 86, w: 44, h: 44, tone: "accent", a: 0.1 },
      { x: 0, y: 132, w: 22, h: 22, tone: "signal", a: 0.12 },
      { x: 94, y: 144, w: 22, h: 22, tone: "signal", a: 0.14 },
      { x: 64, y: 174, w: 22, h: 22, tone: "accent", a: 0.12 },
    ],
  },
  {
    left: "7%",
    top: "44%",
    width: 112,
    height: 182,
    modules: [
      { x: 0, y: 0, w: 22, h: 22, tone: "signal", a: 0.1 },
      { x: 34, y: 22, w: 44, h: 44, tone: "accent", a: 0.08 },
      { x: 82, y: 0, w: 22, h: 22, tone: "signal", a: 0.1 },
      { x: 0, y: 84, w: 22, h: 22, tone: "accent", a: 0.1 },
      { x: 34, y: 112, w: 22, h: 22, tone: "signal", a: 0.1 },
      { x: 62, y: 140, w: 44, h: 44, tone: "accent", a: 0.08 },
    ],
  },
  {
    right: "8%",
    top: "76%",
    width: 120,
    height: 160,
    modules: [
      { x: 0, y: 0, w: 18, h: 18, tone: "accent", a: 0.1 },
      { x: 28, y: 28, w: 18, h: 18, tone: "signal", a: 0.1 },
      { x: 56, y: 0, w: 44, h: 44, tone: "signal", a: 0.08 },
      { x: 0, y: 72, w: 18, h: 18, tone: "signal", a: 0.1 },
      { x: 28, y: 100, w: 44, h: 44, tone: "accent", a: 0.08 },
    ],
  },
];

const articleClusters: Cluster[] = [
  {
    left: "7%",
    top: "10rem",
    width: 76,
    height: 188,
    modules: [
      { x: 0, y: 0, w: 18, h: 18, tone: "accent", a: 0.12 },
      { x: 28, y: 0, w: 18, h: 18, tone: "signal", a: 0.12 },
      { x: 0, y: 28, w: 46, h: 46, tone: "signal", a: 0.1 },
      { x: 56, y: 58, w: 18, h: 18, tone: "accent", a: 0.12 },
      { x: 28, y: 116, w: 18, h: 18, tone: "signal", a: 0.12 },
    ],
  },
  {
    right: "8%",
    top: "58%",
    width: 110,
    height: 170,
    modules: [
      { x: 0, y: 0, w: 22, h: 22, tone: "signal", a: 0.12 },
      { x: 32, y: 0, w: 22, h: 22, tone: "accent", a: 0.12 },
      { x: 64, y: 24, w: 22, h: 22, tone: "signal", a: 0.12 },
      { x: 0, y: 54, w: 44, h: 44, tone: "accent", a: 0.08 },
      { x: 64, y: 86, w: 22, h: 22, tone: "signal", a: 0.12 },
      { x: 32, y: 118, w: 22, h: 22, tone: "accent", a: 0.12 },
    ],
  },
  {
    left: "8%",
    top: "82%",
    width: 94,
    height: 146,
    modules: [
      { x: 0, y: 0, w: 18, h: 18, tone: "signal", a: 0.1 },
      { x: 28, y: 0, w: 18, h: 18, tone: "accent", a: 0.1 },
      { x: 0, y: 28, w: 44, h: 44, tone: "accent", a: 0.07 },
      { x: 56, y: 58, w: 18, h: 18, tone: "signal", a: 0.1 },
      { x: 28, y: 88, w: 44, h: 44, tone: "signal", a: 0.07 },
    ],
  },
];

const demoClusters: Cluster[] = [
  {
    left: "9%",
    top: "8rem",
    width: 138,
    height: 244,
    modules: [
      { x: 0, y: 0, w: 22, h: 22, tone: "accent", a: 0.16 },
      { x: 32, y: 0, w: 44, h: 44, tone: "signal", a: 0.14 },
      { x: 88, y: 0, w: 22, h: 22, tone: "accent", a: 0.14 },
      { x: 0, y: 34, w: 22, h: 22, tone: "signal", a: 0.12 },
      { x: 88, y: 56, w: 44, h: 44, tone: "signal", a: 0.12 },
      { x: 32, y: 88, w: 22, h: 22, tone: "accent", a: 0.14 },
      { x: 0, y: 122, w: 22, h: 22, tone: "signal", a: 0.12 },
      { x: 58, y: 148, w: 22, h: 22, tone: "accent", a: 0.14 },
      { x: 88, y: 178, w: 22, h: 22, tone: "signal", a: 0.12 },
    ],
  },
  {
    right: "10%",
    top: "11rem",
    width: 138,
    height: 210,
    modules: [
      { x: 0, y: 0, w: 44, h: 44, tone: "signal", a: 0.12 },
      { x: 56, y: 24, w: 22, h: 22, tone: "accent", a: 0.14 },
      { x: 88, y: 0, w: 22, h: 22, tone: "signal", a: 0.12 },
      { x: 0, y: 58, w: 22, h: 22, tone: "accent", a: 0.12 },
      { x: 30, y: 88, w: 22, h: 22, tone: "signal", a: 0.12 },
      { x: 88, y: 98, w: 44, h: 44, tone: "accent", a: 0.1 },
      { x: 56, y: 152, w: 22, h: 22, tone: "signal", a: 0.12 },
    ],
  },
  {
    right: "12%",
    top: "52%",
    width: 108,
    height: 184,
    modules: [
      { x: 0, y: 0, w: 18, h: 18, tone: "signal", a: 0.12 },
      { x: 28, y: 28, w: 18, h: 18, tone: "accent", a: 0.12 },
      { x: 56, y: 0, w: 44, h: 44, tone: "signal", a: 0.08 },
      { x: 0, y: 72, w: 18, h: 18, tone: "accent", a: 0.1 },
      { x: 28, y: 102, w: 44, h: 44, tone: "signal", a: 0.08 },
      { x: 82, y: 132, w: 18, h: 18, tone: "accent", a: 0.12 },
    ],
  },
];

function getClusters(pathname: string): Cluster[] {
  if (pathname === "/") return homeClusters;
  if (pathname === "/demo") return demoClusters;
  if (pathname.startsWith("/insights/")) return articleClusters;
  if (pathname === "/insights") return insightsClusters;
  return insightsClusters;
}

function ClusterView({ cluster }: { cluster: Cluster }) {
  return (
    <div
      className="absolute hidden lg:block"
      style={{
        left: cluster.left,
        right: cluster.right,
        top: cluster.top,
        bottom: cluster.bottom,
      }}
    >
      <div className="relative" style={{ width: cluster.width, height: cluster.height }}>
        {cluster.modules.map((module, index) => {
          const shellStyle: CSSProperties = {
            left: module.x,
            top: module.y,
            width: module.w,
            height: module.h,
            animationDelay: `${index * 0.28}s`,
            animationDuration: `${4.4 + (index % 4) * 0.55}s`,
            ["--node-x" as keyof CSSProperties]: `${module.w >= 40 ? 4 : 3}px`,
            ["--node-y" as keyof CSSProperties]: `${module.w >= 40 ? 6 : 4}px`,
          };

          const innerStyle: CSSProperties = {
            backgroundColor: TONES[module.tone],
            color: TONES[module.tone],
            animationDelay: `${index * 0.22}s`,
            animationDuration: `${3.9 + (index % 5) * 0.45}s`,
            ["--node-base" as keyof CSSProperties]: module.a,
            ["--node-scale" as keyof CSSProperties]: module.w >= 40 ? 1.035 : 1.055,
            ["--node-glow" as keyof CSSProperties]: module.w >= 40 ? 14 : 9,
          };

          return (
            <div key={index} className="absolute section-node-shell" style={shellStyle}>
              <div className="h-full w-full rounded-[2px] section-node" style={innerStyle} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SiteOverlay() {
  const pathname = usePathname();
  const clusters = getClusters(pathname);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3] overflow-hidden mix-blend-multiply">
      {clusters.map((cluster, index) => (
        <ClusterView key={index} cluster={cluster} />
      ))}
    </div>
  );
}

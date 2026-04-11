"use client";

import type { CSSProperties } from "react";

type Tone = "signal" | "accent";

type Block = {
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
  blocks: Block[];
};

const TONES: Record<Tone, string> = {
  signal: "var(--kl-signal)",
  accent: "var(--kl-accent)",
};

const variants: Record<string, Cluster[]> = {
  hero: [
    { left: "6%", top: "16%", width: 112, height: 220, blocks: [
      { x: 0, y: 0, w: 42, h: 42, tone: "signal", a: 0.14 },
      { x: 54, y: 18, w: 18, h: 18, tone: "accent", a: 0.14 },
      { x: 24, y: 74, w: 18, h: 18, tone: "signal", a: 0.12 },
      { x: 0, y: 112, w: 18, h: 18, tone: "accent", a: 0.12 },
      { x: 48, y: 130, w: 42, h: 42, tone: "signal", a: 0.1 },
    ]},
    { right: "6%", top: "10%", width: 168, height: 248, blocks: [
      { x: 0, y: 0, w: 20, h: 20, tone: "accent", a: 0.12 },
      { x: 32, y: 0, w: 42, h: 42, tone: "signal", a: 0.12 },
      { x: 86, y: 22, w: 20, h: 20, tone: "accent", a: 0.14 },
      { x: 118, y: 0, w: 42, h: 42, tone: "signal", a: 0.1 },
      { x: 32, y: 86, w: 20, h: 20, tone: "signal", a: 0.12 },
      { x: 86, y: 112, w: 42, h: 42, tone: "accent", a: 0.08 },
      { x: 0, y: 166, w: 20, h: 20, tone: "signal", a: 0.12 },
    ]},
  ],
  left: [
    { right: "7%", top: "18%", width: 120, height: 180, blocks: [
      { x: 0, y: 0, w: 18, h: 18, tone: "signal", a: 0.1 },
      { x: 28, y: 28, w: 18, h: 18, tone: "accent", a: 0.12 },
      { x: 56, y: 0, w: 42, h: 42, tone: "signal", a: 0.08 },
      { x: 84, y: 70, w: 18, h: 18, tone: "accent", a: 0.12 },
      { x: 28, y: 110, w: 42, h: 42, tone: "signal", a: 0.08 },
    ]},
  ],
  right: [
    { left: "6%", top: "24%", width: 120, height: 180, blocks: [
      { x: 0, y: 0, w: 42, h: 42, tone: "accent", a: 0.08 },
      { x: 54, y: 0, w: 18, h: 18, tone: "signal", a: 0.12 },
      { x: 0, y: 74, w: 18, h: 18, tone: "signal", a: 0.12 },
      { x: 28, y: 102, w: 18, h: 18, tone: "accent", a: 0.12 },
      { x: 56, y: 126, w: 42, h: 42, tone: "signal", a: 0.08 },
    ]},
  ],
  center: [
    { right: "8%", top: "30%", width: 108, height: 156, blocks: [
      { x: 0, y: 0, w: 18, h: 18, tone: "accent", a: 0.1 },
      { x: 28, y: 28, w: 42, h: 42, tone: "signal", a: 0.08 },
      { x: 80, y: 56, w: 18, h: 18, tone: "accent", a: 0.12 },
      { x: 28, y: 100, w: 18, h: 18, tone: "signal", a: 0.1 },
    ]},
  ],
  split: [
    { left: "4%", top: "18%", width: 96, height: 150, blocks: [
      { x: 0, y: 0, w: 18, h: 18, tone: "signal", a: 0.1 },
      { x: 28, y: 0, w: 42, h: 42, tone: "accent", a: 0.07 },
      { x: 0, y: 70, w: 18, h: 18, tone: "accent", a: 0.1 },
      { x: 28, y: 96, w: 18, h: 18, tone: "signal", a: 0.1 },
    ]},
    { right: "4%", bottom: "18%", width: 112, height: 156, blocks: [
      { x: 0, y: 0, w: 18, h: 18, tone: "accent", a: 0.1 },
      { x: 28, y: 26, w: 18, h: 18, tone: "signal", a: 0.1 },
      { x: 56, y: 0, w: 42, h: 42, tone: "signal", a: 0.08 },
      { x: 28, y: 82, w: 42, h: 42, tone: "accent", a: 0.07 },
    ]},
  ],
};

export function SectionOverlay({ variant }: { variant: keyof typeof variants }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] overflow-hidden mix-blend-multiply">
      {variants[variant].map((cluster, i) => (
        <div key={i} className="absolute hidden lg:block" style={{ left: cluster.left, right: cluster.right, top: cluster.top, bottom: cluster.bottom }}>
          <div className="relative" style={{ width: cluster.width, height: cluster.height }}>
            {cluster.blocks.map((block, j) => {
              const style: CSSProperties = {
                left: block.x,
                top: block.y,
                width: block.w,
                height: block.h,
                animationDelay: `${(i * 0.8) + (j * 0.34)}s`,
                animationDuration: `${4.8 + ((j + i) % 4) * 0.65}s`,
                ["--node-x" as keyof CSSProperties]: `${block.w >= 40 ? 4 : 3}px`,
                ["--node-y" as keyof CSSProperties]: `${block.w >= 40 ? 6 : 4}px`,
              };

              const innerStyle: CSSProperties = {
                backgroundColor: TONES[block.tone],
                color: TONES[block.tone],
                animationDelay: `${(i * 0.7) + (j * 0.3)}s`,
                animationDuration: `${4.2 + ((j + i) % 5) * 0.55}s`,
                ["--node-base" as keyof CSSProperties]: block.a,
                ["--node-scale" as keyof CSSProperties]: block.w >= 40 ? 1.035 : 1.055,
                ["--node-glow" as keyof CSSProperties]: block.w >= 40 ? 14 : 9,
              };

              return (
                <div key={j} className="absolute section-node-shell" style={style}>
                  <div className="h-full w-full rounded-[2px] section-node" style={innerStyle} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

const stops = [
  { id: "hero", label: "Intelligence" },
  { id: "why", label: "The Problem" },
  { id: "what-we-do", label: "The Layer" },
  { id: "properties", label: "Properties" },
  { id: "vision", label: "Vision" },
  { id: "values", label: "Values" },
  { id: "evidence", label: "Evidence" },
  { id: "contact", label: "Connect" },
];

export function VisionMap() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const viewportCenter = window.innerHeight / 2;
      let activeIndex = 0;
      stops.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < viewportCenter && rect.bottom > 0) {
            activeIndex = i;
          }
        }
      });
      setActive(activeIndex);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-4">
      {stops.map((stop, i) => (
        <a
          key={stop.id}
          href={`#${stop.id}`}
          className="flex items-center gap-2 group"
        >
          {/* Label — only visible for active or on hover */}
          <span
            className={`text-[0.55rem] font-bold tracking-[1px] uppercase transition-all duration-500 ${
              i === active
                ? "text-[var(--kl-signal)] opacity-100"
                : "text-[var(--kl-text-soft)] opacity-0 group-hover:opacity-50"
            }`}
          >
            {stop.label}
          </span>
          {/* Dot */}
          <div
            className={`rounded-full transition-all duration-500 ${
              i === active
                ? "w-2 h-2 bg-[var(--kl-signal)]"
                : i < active
                ? "w-1.5 h-1.5 bg-[color:color-mix(in_srgb,var(--kl-text-soft)_40%,transparent)]"
                : "w-1 h-1 bg-[color:color-mix(in_srgb,var(--kl-text-soft)_20%,transparent)]"
            }`}
          />
        </a>
      ))}
    </div>
  );
}

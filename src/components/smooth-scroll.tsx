"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Pages where Lenis is disabled because its rAF loop competes with heavy
// content (video playback, etc.) and causes visible stutter.
const NO_SMOOTH_SCROLL = new Set<string>(["/demo"]);

export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (NO_SMOOTH_SCROLL.has(pathname)) {
      // Native scroll is faster than Lenis when the page has video or other
      // high-priority rendering work. Skip Lenis on these routes.
      return;
    }

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const target = document.querySelector(hash);
      if (target) {
        lenis.scrollTo(target as HTMLElement, { offset: -80, immediate: true });
      }
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (href.startsWith("#")) {
        event.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          history.replaceState(null, "", href);
          lenis.scrollTo(target as HTMLElement, { offset: -80 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    window.setTimeout(scrollToHash, 0);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}

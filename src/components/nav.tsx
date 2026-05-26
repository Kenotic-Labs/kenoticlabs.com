"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";


export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const navTextClass =
    "text-[0.68rem] font-bold tracking-[0.16em] uppercase text-[color:color-mix(in_srgb,var(--kl-text)_74%,transparent)] hover:text-[var(--kl-text)] transition-colors duration-500";

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      if (menuOpen) closeMenu();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen, closeMenu]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const sectionLinks = [
    { label: "What We Do", href: sectionHref("what-we-do") },
    { label: "Vision", href: sectionHref("vision") },
    { label: "Values", href: sectionHref("values") },
    { label: "Evidence", href: sectionHref("evidence") },
    { label: "Contact", href: sectionHref("contact") },
  ];

  const pageLinks = [
    { label: "Thesis", href: "/thesis" },
    { label: "Insights", href: "/insights" },
  ];

  const mobileNavTextClass =
    "text-[0.85rem] font-bold tracking-[0.12em] uppercase font-[family-name:var(--font-lato)] text-[color:color-mix(in_srgb,var(--kl-text)_74%,transparent)] hover:text-[var(--kl-text)] transition-colors duration-300";

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-700 ${
        scrolled
          ? "bg-[color:color-mix(in_srgb,var(--kl-canvas)_94%,transparent)] backdrop-blur-xl border-b border-[color:color-mix(in_srgb,var(--kl-text)_8%,transparent)]"
          : "bg-[color:color-mix(in_srgb,var(--kl-canvas)_86%,transparent)] backdrop-blur-lg border-b border-[color:color-mix(in_srgb,var(--kl-text)_5%,transparent)]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 md:gap-4 group"
          aria-label="Kenotic Labs home"
        >
          <span className="relative w-10 h-10 md:w-12 md:h-12 flex-none overflow-hidden">
            <Image
              src="/Main-Logo-BGR.png"
              alt="Kenotic Labs"
              fill
              sizes="48px"
              priority
              className="object-contain transition-opacity duration-500 group-hover:opacity-85"
            />
          </span>
          <span className="font-[family-name:var(--font-fraunces)] text-[1.75rem] md:text-[2.15rem] font-semibold leading-none tracking-[-0.04em] text-[var(--kl-text)] group-hover:text-[var(--kl-accent)] transition-colors duration-500">
            Kenotic Labs
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8 items-center">
          {["What We Do", "Vision", "Values", "Evidence", "Contact"].map((item) => (
            <Link
              key={item}
              href={sectionHref(item.toLowerCase().replace(/ /g, "-"))}
              className={navTextClass}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/thesis"
            className={navTextClass}
          >
            Thesis
          </Link>
          <Link
            href="/insights"
            className={navTextClass}
          >
            Insights
          </Link>
          <Link
            href="/demo"
            className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-[var(--kl-text)] border border-[color:color-mix(in_srgb,var(--kl-text)_22%,transparent)] px-5 py-2 hover:bg-[var(--kl-text)] hover:text-[var(--kl-canvas)] transition-all duration-500"
          >
            Demo
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden relative w-8 h-8 flex items-center justify-center z-[210]"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="relative w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-[2px] w-full bg-[var(--kl-text)] transition-all duration-300 origin-center ${
                menuOpen ? "translate-y-[9px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-full bg-[var(--kl-text)] transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[2px] w-full bg-[var(--kl-text)] transition-all duration-300 origin-center ${
                menuOpen ? "-translate-y-[9px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu overlay — static opaque backdrop + animated content.
          Separated because iOS Safari breaks fixed+transform compositing. */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 z-[200]"
          style={{ backgroundColor: "#f7f5ef" }}
        >
          <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-8 pt-20">
            {sectionLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={mobileNavTextClass}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}

            <span className="block w-12 h-[1px] bg-[color:color-mix(in_srgb,var(--kl-text)_12%,transparent)] my-1" />

            {pageLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={mobileNavTextClass}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-2">
              <Link
                href="/demo"
                className="inline-block text-[0.85rem] font-bold tracking-[0.12em] uppercase font-[family-name:var(--font-lato)] text-[var(--kl-canvas)] bg-[var(--kl-accent)] px-8 py-3.5 hover:opacity-90 transition-opacity duration-300"
                onClick={closeMenu}
              >
                Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

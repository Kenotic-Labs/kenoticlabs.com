"use client";

export function Footer() {
  return (
    <footer className="bg-[var(--kl-panel)] pt-0 pb-0 px-8 text-center relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[color:color-mix(in_srgb,var(--kl-signal)_60%,transparent)] to-transparent" />

      <div className="pt-18 pb-12">
        <p className="mx-auto max-w-[840px] font-[family-name:var(--font-fraunces)] text-[clamp(1.7rem,2.8vw,2.45rem)] leading-[1.18] text-[var(--kl-text)] mb-10 tracking-[-0.025em]">
          What knows you well, should wish you well.
        </p>
        <div className="flex justify-center gap-8 mb-10">
          <a
            href="https://github.com/Kenotic-Labs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--kl-text-muted)] text-sm font-semibold hover:text-[var(--kl-accent)]
              transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/company/kenotic-labs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--kl-text-muted)] text-sm font-semibold hover:text-[var(--kl-accent)]
              transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="border-t border-[color:color-mix(in_srgb,var(--kl-text)_8%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-surface)_52%,white)]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-center px-6 py-5 md:justify-between">
          <p className="text-[0.76rem] tracking-[0.14em] uppercase text-[var(--kl-text-soft)]">
            &copy; 2026 Kenotic Labs
          </p>
          <div className="hidden md:flex items-center gap-3 text-[0.68rem] tracking-[0.18em] uppercase text-[var(--kl-signal)]">
            <span className="h-[1px] w-12 bg-[color:color-mix(in_srgb,var(--kl-signal)_40%,transparent)]" />
            Continuity
          </div>
        </div>
      </div>
    </footer>
  );
}

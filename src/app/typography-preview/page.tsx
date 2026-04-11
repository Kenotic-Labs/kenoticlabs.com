import Link from "next/link";

export const metadata = {
  title: "Typography Preview",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

type Option = {
  name: string;
  rationale: string;
  companyFont: string;
  uiFont: string;
  taglineFont?: string;
  companyClass: string;
  taglineClass: string;
  bodyClass: string;
};

const options: Option[] = [
  {
    name: "Newsreader + Inter",
    rationale: "Calm authority. Editorial, but not fragile.",
    companyFont: "Newsreader",
    uiFont: "Inter",
    companyClass:
      "font-[family-name:var(--font-newsreader)] text-[3.25rem] md:text-[4.2rem] font-semibold leading-none tracking-[-0.045em] text-[var(--kl-text)]",
    taglineClass:
      "font-[family-name:var(--font-newsreader)] text-[1.4rem] md:text-[1.7rem] leading-[1.25] text-[var(--kl-text)]",
    bodyClass:
      "font-[family-name:var(--font-lato)] text-[1rem] leading-[1.8] text-[var(--kl-text-muted)]",
  },
  {
    name: "Source Serif 4 + IBM Plex Sans",
    rationale: "Most institutional. Strongest lab / infrastructure signal.",
    companyFont: "Source Serif 4",
    uiFont: "IBM Plex Sans",
    companyClass:
      "font-[family-name:var(--font-source-serif)] text-[3.2rem] md:text-[4.1rem] font-semibold leading-none tracking-[-0.04em] text-[var(--kl-text)]",
    taglineClass:
      "font-[family-name:var(--font-source-serif)] text-[1.38rem] md:text-[1.65rem] leading-[1.24] text-[var(--kl-text)]",
    bodyClass:
      "font-[family-name:var(--font-plex-sans)] text-[1rem] leading-[1.8] text-[var(--kl-text-muted)]",
  },
  {
    name: "Fraunces + Manrope",
    rationale: "Premium and confident. More personality, still firm.",
    companyFont: "Fraunces",
    uiFont: "Manrope",
    companyClass:
      "font-[family-name:var(--font-fraunces)] text-[3.15rem] md:text-[4rem] font-semibold leading-none tracking-[-0.05em] text-[var(--kl-text)]",
    taglineClass:
      "font-[family-name:var(--font-fraunces)] text-[1.36rem] md:text-[1.62rem] leading-[1.24] text-[var(--kl-text)]",
    bodyClass:
      "font-[family-name:var(--font-manrope)] text-[1rem] leading-[1.8] text-[var(--kl-text-muted)]",
  },
  {
    name: "IBM Plex Sans",
    rationale: "Hardest and clearest. Zero ornament.",
    companyFont: "IBM Plex Sans",
    uiFont: "IBM Plex Sans",
    companyClass:
      "font-[family-name:var(--font-plex-sans)] text-[2.85rem] md:text-[3.7rem] font-semibold leading-none tracking-[-0.055em] text-[var(--kl-text)]",
    taglineClass:
      "font-[family-name:var(--font-plex-sans)] text-[1.18rem] md:text-[1.42rem] font-medium leading-[1.28] text-[var(--kl-text)]",
    bodyClass:
      "font-[family-name:var(--font-plex-sans)] text-[1rem] leading-[1.8] text-[var(--kl-text-muted)]",
  },
];

function OptionCard({ option }: { option: Option }) {
  return (
    <section className="rounded-[28px] border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-panel)_92%,white)] p-6 shadow-[0_24px_60px_rgba(24,24,23,0.05)]">
      <div className="rounded-[22px] border border-[var(--kl-border)] bg-[var(--kl-panel)] px-8 py-8 md:px-10 md:py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[var(--kl-signal)]">
              {option.name}
            </p>
            <p className="mt-3 max-w-[460px] text-[0.98rem] leading-[1.75] text-[var(--kl-text-muted)]">
              {option.rationale}
            </p>
          </div>
          <div className="text-right text-[0.72rem] uppercase tracking-[0.18em] text-[var(--kl-text-soft)]">
            <div>{option.companyFont}</div>
            <div className="mt-2">{option.uiFont}</div>
          </div>
        </div>

        <div className="mt-10 rounded-[22px] border border-[color:color-mix(in_srgb,var(--kl-text)_8%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-canvas)_76%,white)] px-8 py-8">
          <div className="flex items-center justify-between gap-6 border-b border-[color:color-mix(in_srgb,var(--kl-text)_8%,transparent)] pb-6">
            <div className={option.companyClass}>Kenotic Labs</div>
            <div className={`${option.bodyClass} hidden md:block text-[0.74rem] uppercase tracking-[0.18em]`}>
              What We Do
            </div>
          </div>

          <div className="pt-8">
            <p className={option.taglineClass}>What knows you well, should wish you well.</p>
            <p className={`${option.bodyClass} mt-8 max-w-[620px]`}>
              We build the continuity layer for AI systems: infrastructure that lets systems carry forward what matters, update when reality changes, and reconstruct context when it is needed again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TypographyPreviewPage() {
  return (
    <main
      className="min-h-screen px-6 py-24"
      style={{ background: "linear-gradient(180deg, #f7f5ef 0%, #ede8de 100%)" }}
    >
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[var(--kl-signal)]">
              Typography Preview
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] text-[var(--kl-text)]">
              Company name and principle options
            </h1>
          </div>
          <Link
            href="/#hero"
            className="border border-[color:color-mix(in_srgb,var(--kl-text)_16%,transparent)] px-5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[var(--kl-text)] transition-colors duration-300 hover:bg-[var(--kl-text)] hover:text-[var(--kl-canvas)]"
          >
            Back
          </Link>
        </div>

        <div className="space-y-10">
          {options.map((option) => (
            <OptionCard key={option.name} option={option} />
          ))}
        </div>
      </div>
    </main>
  );
}

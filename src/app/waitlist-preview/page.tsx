import Link from "next/link";

export const metadata = {
  title: "Waitlist Preview",
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

type PreviewVariant = {
  title: string;
  interests: string[];
  prompt: string;
};

const variants: PreviewVariant[] = [
  {
    title: "Continuity SDK",
    interests: ["Continuity SDK"],
    prompt:
      "If technology could truly understand continuity, what would you want it to become capable of?",
  },
  {
    title: "Raya",
    interests: ["Raya"],
    prompt:
      "If a system could grow in understanding over time, what would you hope it could become?",
  },
  {
    title: "Both",
    interests: ["Continuity SDK", "Raya"],
    prompt:
      "If technology could carry understanding across time, what would you want it to make possible?",
  },
];

function InterestPill({ active, children }: { active: boolean; children: string }) {
  return (
    <div
      className={`rounded-full border px-4 py-2 text-[0.82rem] font-semibold transition-colors ${
        active
          ? "border-[var(--kl-accent)] bg-[color:color-mix(in_srgb,var(--kl-accent)_8%,white)] text-[var(--kl-text)]"
          : "border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-white/55 text-[var(--kl-text-muted)]"
      }`}
    >
      {children}
    </div>
  );
}

function WaitlistCard({ variant }: { variant: PreviewVariant }) {
  return (
    <section className="rounded-[28px] border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-panel)_94%,white)] p-6 shadow-[0_24px_80px_rgba(24,24,23,0.08)]">
      <div className="rounded-[22px] border border-[var(--kl-border)] bg-[var(--kl-panel)] px-8 py-9 md:px-12 md:py-12">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[var(--kl-signal)]">
              Join the waitlist
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-[clamp(2.1rem,4vw,3rem)] font-bold leading-[1.02] text-[var(--kl-text)]">
              {variant.title}
            </h2>
          </div>
          <div className="hidden md:block text-right text-[0.76rem] uppercase tracking-[0.18em] text-[var(--kl-text-soft)]">
            Preview
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--kl-signal)]">
                Email
              </label>
              <div className="border-b border-[color:color-mix(in_srgb,var(--kl-text)_12%,transparent)] py-3 text-[1rem] text-[var(--kl-text-soft)]">
                you@company.com
              </div>
            </div>
            <div>
              <label className="mb-2 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--kl-signal)]">
                Name
              </label>
              <div className="border-b border-[color:color-mix(in_srgb,var(--kl-text)_12%,transparent)] py-3 text-[1rem] text-[var(--kl-text-soft)]">
                Full name
              </div>
            </div>
            <div>
              <label className="mb-3 block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--kl-signal)]">
                Interested in
              </label>
              <div className="flex flex-wrap gap-3">
                <InterestPill active={variant.interests.includes("Continuity SDK")}>
                  Continuity SDK
                </InterestPill>
                <InterestPill active={variant.interests.includes("Raya")}>
                  Raya
                </InterestPill>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-canvas)_74%,white)] px-6 py-6">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--kl-signal)]">
              If this sparks something
            </p>
            <p className="mt-4 font-[family-name:var(--font-playfair)] text-[1.22rem] italic leading-[1.6] text-[var(--kl-text)]">
              {variant.prompt}
            </p>
            <div className="mt-5 min-h-[170px] rounded-[18px] border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-white/65 px-5 py-5 text-[1rem] leading-[1.8] text-[var(--kl-text-soft)]">
              Write whatever comes to mind.
            </div>
            <div className="mt-6">
              <button className="bg-[var(--kl-accent)] px-8 py-4 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-white">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function WaitlistPreviewPage() {
  return (
    <main
      className="min-h-screen px-6 py-24"
      style={{ background: "linear-gradient(180deg, #f7f5ef 0%, #ede8de 100%)" }}
    >
      <div className="mx-auto max-w-[1040px]">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[var(--kl-signal)]">
              Waitlist Preview
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] text-[var(--kl-text)]">
              Interest-based prompt variants
            </h1>
          </div>
          <Link
            href="/#contact"
            className="border border-[color:color-mix(in_srgb,var(--kl-text)_16%,transparent)] px-5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[var(--kl-text)] transition-colors duration-300 hover:bg-[var(--kl-text)] hover:text-[var(--kl-canvas)]"
          >
            Back
          </Link>
        </div>

        <div className="space-y-12">
          {variants.map((variant) => (
            <div key={variant.title}>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-[1px] flex-1 bg-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)]" />
                <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[var(--kl-signal)]">
                  {variant.title}
                </p>
                <div className="h-[1px] flex-1 bg-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)]" />
              </div>
              <WaitlistCard variant={variant} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

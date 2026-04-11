import Link from "next/link";

export const metadata = {
  title: "Waitlist Email Preview",
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

type Variant = {
  title: string;
  interests: string[];
  futurePrompt: string;
  interestCopy: string[];
};

const variants: Variant[] = [
  {
    title: "Continuity SDK",
    interests: ["Continuity SDK"],
    futurePrompt:
      "If technology could truly understand continuity, what would you want it to become capable of?",
    interestCopy: [
      "The SDK will be a developer layer for systems that need more than retrieval. It will let products write, update, and reconstruct living context so assistants, agents, and tools can stay oriented across time instead of resetting at every interaction.",
      "In practice, that means software that can remain aware of what is still in progress, what changed, what should return later, and what matters in this particular situation.",
    ],
  },
  {
    title: "Raya",
    interests: ["Raya"],
    futurePrompt:
      "If a system could grow in understanding over time, what would you hope it could become?",
    interestCopy: [
      "Raya will explore what it means for technology to know a person across time with more depth, steadiness, and care. Not just a tool that completes requests, but a system that can stay oriented to a life as it unfolds.",
    ],
  },
  {
    title: "Both",
    interests: ["Continuity SDK", "Raya"],
    futurePrompt:
      "If technology could carry understanding across time, what would you want it to make possible?",
    interestCopy: [
      "The SDK will be a developer layer for systems that need more than retrieval. It will let products write, update, and reconstruct living context so assistants, agents, and tools can stay oriented across time instead of resetting at every interaction.",
      "Raya will explore what it means for technology to know a person across time with more depth, steadiness, and care. Not just a tool that completes requests, but a system that can stay oriented to a life as it unfolds.",
    ],
  },
];

function EmailCard({ variant }: { variant: Variant }) {
  return (
    <section className="rounded-[28px] border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-panel)_94%,white)] p-5 shadow-[0_24px_80px_rgba(24,24,23,0.08)]">
      <div className="rounded-[22px] border border-[var(--kl-border)] bg-[var(--kl-panel)] px-8 py-10 md:px-12 md:py-14">
        <div className="mb-8 flex items-center justify-between gap-6">
          <p className="text-[0.78rem] font-bold uppercase tracking-[0.2em] text-[var(--kl-signal)]">
            Kenotic Labs
          </p>
          <div className="hidden md:flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.18em] text-[var(--kl-text-soft)]">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--kl-signal)] shadow-[0_0_14px_color-mix(in_srgb,var(--kl-signal)_35%,transparent)]" />
            {variant.title}
          </div>
        </div>

        <h2 className="max-w-[520px] font-[family-name:var(--font-playfair)] text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[0.95] text-[var(--kl-text)]">
          You are on the list.
        </h2>

        <div className="mt-10 max-w-[560px] space-y-5 text-[1.05rem] leading-[1.85] text-[var(--kl-text-muted)]">
          <p>Hi Samuel,</p>
          <p>
            Thanks for your interest in Kenotic Labs. You asked to hear about:{" "}
            <span className="text-[var(--kl-text)]">{variant.interests.join(", ")}.</span>
          </p>
          <p>
            We are building technology that can hold onto the shape of a life,
            not just the residue of a prompt. Something that can understand what
            remains active, what changed, and what still matters across time.
          </p>
          <div className="rounded-[20px] border border-[color:color-mix(in_srgb,var(--kl-accent)_18%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-accent)_4%,white)] px-5 py-5">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--kl-signal)]">
              {variant.title}
            </p>
            <div className="mt-3 space-y-3">
              {variant.interestCopy.map((paragraph, index) => (
                <p key={index} className="text-[1rem] leading-[1.8] text-[var(--kl-text-muted)]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <p>
            If that layer exists, the more interesting question is what gets
            built once technology can do more than respond, and can begin to
            understand.
          </p>
        </div>

        <div className="mt-10 rounded-[20px] border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-canvas)_70%,white)] px-6 py-6">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--kl-signal)]">
            If this sparks something
          </p>
          <p className="mt-4 font-[family-name:var(--font-playfair)] text-[1.18rem] italic leading-[1.65] text-[var(--kl-text)]">
            {variant.futurePrompt}
          </p>
          <p className="mt-5 text-[0.98rem] leading-[1.8] text-[var(--kl-text-soft)]">
            If you shared a thought when you joined, we keep it with your place on the list.
          </p>
        </div>

        <div className="mt-12 border-t border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] pt-6">
          <p className="text-[0.95rem] text-[var(--kl-text-soft)]">
            info@kenoticlabs.com
          </p>
        </div>
      </div>
    </section>
  );
}

export default function EmailPreviewPage() {
  return (
    <main
      className="min-h-screen px-6 py-24"
      style={{ background: "linear-gradient(180deg, #f7f5ef 0%, #ede8de 100%)" }}
    >
      <div className="mx-auto max-w-[980px]">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[var(--kl-signal)]">
              Email Preview
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.04] text-[var(--kl-text)]">
              Waitlist variants
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
              <EmailCard variant={variant} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

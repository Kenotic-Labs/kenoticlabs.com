"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionOverlay } from "@/components/section-overlay";

type WaitlistState = {
  pending: boolean;
  message: string;
  error: string;
};

type ContactState = {
  pending: boolean;
  message: string;
  error: string;
};

export function Contact() {
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [waitlistState, setWaitlistState] = useState<WaitlistState>({
    pending: false,
    message: "",
    error: "",
  });
  const [waitlistPrompt, setWaitlistPrompt] = useState(
    "If technology could truly understand continuity, what would you want it to become capable of?",
  );
  const [contactState, setContactState] = useState<ContactState>({
    pending: false,
    message: "",
    error: "",
  });

  useEffect(() => {
    let cancelled = false;

    async function loadWaitlistCount() {
      try {
        const response = await fetch("/api/waitlist", { cache: "no-store" });
        const data = (await response.json()) as { success?: boolean; count?: number | null };

        if (!cancelled && data.success && typeof data.count === "number") {
          setWaitlistCount(data.count);
        }
      } catch {
        if (!cancelled) {
          setWaitlistCount(null);
        }
      }
    }

    loadWaitlistCount();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactState({ pending: true, message: "", error: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      organization: String(formData.get("organization") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        mailtoUrl?: string;
        error?: string;
      };

      if (!response.ok || !data.success) {
        if (data.mailtoUrl) {
          window.location.href = data.mailtoUrl;
          setContactState({
            pending: false,
            message: "Your mail app is opening with the draft prefilled.",
            error: "",
          });
          return;
        }

        setContactState({
          pending: false,
          message: "",
          error: data.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      form.reset();
      setContactState({
        pending: false,
        message: data.message ?? "Your message was sent.",
        error: "",
      });
    } catch {
      setContactState({
        pending: false,
        message: "",
        error: "Something went wrong. Please try again.",
      });
    }
  }

  async function handleWaitlistSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWaitlistState({ pending: true, message: "", error: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: String(formData.get("email") ?? "").trim(),
      name: String(formData.get("name") ?? "").trim(),
      interests: formData.getAll("interest").map((value) => String(value)),
      imagination: String(formData.get("imagination") ?? "").trim(),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        success?: boolean;
        count?: number | null;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.success) {
        setWaitlistState({
          pending: false,
          message: "",
          error: data.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      if (typeof data.count === "number") {
        setWaitlistCount(data.count);
      } else if (waitlistCount !== null) {
        setWaitlistCount(waitlistCount + 1);
      }

      form.reset();
      setWaitlistState({
        pending: false,
        message: data.message ?? "You have joined the waitlist.",
        error: "",
      });
    } catch {
      setWaitlistState({
        pending: false,
        message: "",
        error: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <section id="contact" className="relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      <SectionOverlay variant="split" />

      <div className="bg-[#F5F3EE] px-8 md:px-16 lg:px-20 py-24 lg:py-32 flex flex-col justify-center">
        <Reveal>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3vw,2.4rem)] font-bold text-[#1A1A1A] mb-4">
            Let&apos;s talk.
          </h2>
          <p className="text-[#6B6B6B] text-[0.95rem] leading-relaxed mb-10 max-w-[400px]">
            Partnership inquiries, investment, research collaboration, or joining the team.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <form className="max-w-[760px]" onSubmit={handleContactSubmit}>
            <div className="rounded-[24px] border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-panel)_92%,white)] p-5 shadow-[0_24px_60px_rgba(24,24,23,0.05)]">
              <div className="rounded-[20px] border border-[var(--kl-border)] bg-[var(--kl-panel)] px-6 py-6 md:px-8 md:py-8">
                <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="space-y-6">
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="contact-website">Website</label>
                      <input
                        id="contact-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-[#B39B5C] text-[0.65rem] font-bold tracking-[2px] uppercase font-[family-name:var(--font-lato)]"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        className="w-full border-b border-[#D4D4D4] bg-transparent py-3 text-[#1A1A1A] placeholder:text-[#B0B0B0]
                          focus:border-[#2D6A4F] outline-none transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-[#B39B5C] text-[0.65rem] font-bold tracking-[2px] uppercase font-[family-name:var(--font-lato)]"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        className="w-full border-b border-[#D4D4D4] bg-transparent py-3 text-[#1A1A1A] placeholder:text-[#B0B0B0]
                          focus:border-[#2D6A4F] outline-none transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-organization"
                        className="mb-2 block text-[#B39B5C] text-[0.65rem] font-bold tracking-[2px] uppercase font-[family-name:var(--font-lato)]"
                      >
                        Organization
                      </label>
                      <input
                        id="contact-organization"
                        name="organization"
                        type="text"
                        className="w-full border-b border-[#D4D4D4] bg-transparent py-3 text-[#1A1A1A] placeholder:text-[#B0B0B0]
                          focus:border-[#2D6A4F] outline-none transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                    </div>
                  </div>

                  <div className="rounded-[20px] border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-canvas)_72%,white)] px-5 py-5">
                    <p className="text-[#B39B5C] text-[0.68rem] font-bold tracking-[2px] uppercase font-[family-name:var(--font-lato)]">
                      What this opens
                    </p>
                    <p className="mt-4 font-[family-name:var(--font-playfair)] text-[1.14rem] italic leading-[1.65] text-[#1A1A1A]">
                      Tell us what you are exploring, where you see continuity mattering, or why Kenotic caught your attention.
                    </p>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Write whatever you want to discuss."
                      className="mt-5 min-h-[170px] w-full rounded-[18px] border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-white/65 px-5 py-5 text-[1rem] leading-[1.8] text-[#1A1A1A] placeholder:text-[#8A8880]
                        focus:border-[#2D6A4F] outline-none transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)] resize-none"
                    />
                    <div className="mt-6 flex items-center gap-4">
                      <button
                        type="submit"
                        disabled={contactState.pending}
                        className="bg-[#B39B5C] px-8 py-4 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-[#1A1A1A]
                          hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(179,155,92,0.2)] disabled:opacity-60 disabled:hover:translate-y-0
                          transition-all duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      >
                        {contactState.pending ? "Sending" : "Send"}
                      </button>
                      {(contactState.message || contactState.error) && (
                        <p
                          aria-live="polite"
                          className={`text-sm leading-relaxed ${
                            contactState.error ? "text-[#9E4B4B]" : "text-[#2D6A4F]"
                          }`}
                        >
                          {contactState.error || contactState.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <a
            href="mailto:info@kenoticlabs.com"
            className="text-[#B39B5C] text-sm mt-8 inline-block hover:text-[#2D6A4F] transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            info@kenoticlabs.com
          </a>
        </Reveal>
      </div>

      <div className="bg-[#FAFAF8] px-8 md:px-16 lg:px-20 py-24 lg:py-32 flex flex-col justify-center">
        <Reveal delay={0.1}>
          <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,3vw,2.4rem)] font-bold text-[#1A1A1A] mb-4">
            Join the waitlist.
          </h2>
          <p className="text-[#6B6B6B] text-[0.95rem] leading-relaxed mb-4 max-w-[400px]">
            Be first to access the Continuity SDK or try Raya when it launches.
          </p>
          {typeof waitlistCount === "number" && waitlistCount > 0 && (
            <p className="text-[#B39B5C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-8 font-[family-name:var(--font-lato)]">
              {waitlistCount} people on the waitlist
            </p>
          )}
        </Reveal>

        <Reveal delay={0.2}>
          <form className="max-w-[760px]" onSubmit={handleWaitlistSubmit}>
            <div className="rounded-[24px] border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-panel)_92%,white)] p-5 shadow-[0_24px_60px_rgba(24,24,23,0.05)]">
              <div className="rounded-[20px] border border-[var(--kl-border)] bg-[var(--kl-panel)] px-6 py-6 md:px-8 md:py-8">
                <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="space-y-6">
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="waitlist-website">Website</label>
                      <input
                        id="waitlist-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="waitlist-email"
                        className="mb-2 block text-[#B39B5C] text-[0.65rem] font-bold tracking-[2px] uppercase font-[family-name:var(--font-lato)]"
                      >
                        Email
                      </label>
                      <input
                        id="waitlist-email"
                        name="email"
                        type="email"
                        required
                        className="w-full border-b border-[#D4D4D4] bg-transparent py-3 text-[#1A1A1A] placeholder:text-[#B0B0B0]
                          focus:border-[#2D6A4F] outline-none transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="waitlist-name"
                        className="mb-2 block text-[#B39B5C] text-[0.65rem] font-bold tracking-[2px] uppercase font-[family-name:var(--font-lato)]"
                      >
                        Name
                      </label>
                      <input
                        id="waitlist-name"
                        name="name"
                        type="text"
                        className="w-full border-b border-[#D4D4D4] bg-transparent py-3 text-[#1A1A1A] placeholder:text-[#B0B0B0]
                          focus:border-[#2D6A4F] outline-none transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      />
                    </div>
                    <div>
                      <label className="mb-3 block text-[#B39B5C] text-[0.65rem] font-bold tracking-[2px] uppercase font-[family-name:var(--font-lato)]">
                        Interested in
                      </label>
                      <div className="flex flex-wrap gap-3">
                        <label className="cursor-pointer">
                          <input
                            type="checkbox"
                            name="interest"
                            value="Continuity SDK"
                            className="peer sr-only"
                            onChange={(event) => {
                              const form = event.currentTarget.form;
                              if (!form) return;
                              const selected = Array.from(
                                form.querySelectorAll<HTMLInputElement>('input[name="interest"]:checked'),
                              ).map((input) => input.value);
                              setWaitlistPrompt(
                                selected.includes("Continuity SDK") && selected.includes("Raya")
                                  ? "If technology could carry understanding across time, what would you want it to make possible?"
                                  : selected.includes("Raya")
                                    ? "If a system could grow in understanding over time, what would you hope it could become?"
                                    : "If technology could truly understand continuity, what would you want it to become capable of?",
                              );
                            }}
                          />
                          <span className="block rounded-full border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-white/60 px-4 py-2 text-[0.82rem] font-semibold text-[#6B6B6B] transition-colors peer-checked:border-[#2D6A4F] peer-checked:bg-[color:color-mix(in_srgb,var(--kl-accent)_8%,white)] peer-checked:text-[#1A1A1A]">
                            Continuity SDK
                          </span>
                        </label>
                        <label className="cursor-pointer">
                          <input
                            type="checkbox"
                            name="interest"
                            value="Raya"
                            className="peer sr-only"
                            onChange={(event) => {
                              const form = event.currentTarget.form;
                              if (!form) return;
                              const selected = Array.from(
                                form.querySelectorAll<HTMLInputElement>('input[name="interest"]:checked'),
                              ).map((input) => input.value);
                              setWaitlistPrompt(
                                selected.includes("Continuity SDK") && selected.includes("Raya")
                                  ? "If technology could carry understanding across time, what would you want it to make possible?"
                                  : selected.includes("Raya")
                                    ? "If a system could grow in understanding over time, what would you hope it could become?"
                                    : "If technology could truly understand continuity, what would you want it to become capable of?",
                              );
                            }}
                          />
                          <span className="block rounded-full border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-white/60 px-4 py-2 text-[0.82rem] font-semibold text-[#6B6B6B] transition-colors peer-checked:border-[#2D6A4F] peer-checked:bg-[color:color-mix(in_srgb,var(--kl-accent)_8%,white)] peer-checked:text-[#1A1A1A]">
                            Raya
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[20px] border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-[color:color-mix(in_srgb,var(--kl-canvas)_72%,white)] px-5 py-5">
                    <p className="text-[#B39B5C] text-[0.68rem] font-bold tracking-[2px] uppercase font-[family-name:var(--font-lato)]">
                      If this sparks something (Optional)
                    </p>
                    <p className="mt-4 font-[family-name:var(--font-playfair)] text-[1.14rem] italic leading-[1.65] text-[#1A1A1A]">
                      {waitlistPrompt}
                    </p>
                    <textarea
                      id="waitlist-imagination"
                      name="imagination"
                      rows={5}
                      placeholder="Write whatever comes to mind, if you want to."
                      className="mt-5 min-h-[170px] w-full rounded-[18px] border border-[color:color-mix(in_srgb,var(--kl-text)_10%,transparent)] bg-white/65 px-5 py-5 text-[1rem] leading-[1.8] text-[#1A1A1A] placeholder:text-[#8A8880]
                        focus:border-[#2D6A4F] outline-none transition-colors duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)] resize-none"
                    />
                    <div className="mt-6 flex items-center gap-4">
                      <button
                        type="submit"
                        disabled={waitlistState.pending}
                        className="bg-[#2D6A4F] px-8 py-4 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-white
                          hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(45,106,79,0.25)] disabled:opacity-60 disabled:hover:translate-y-0
                          transition-all duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      >
                        {waitlistState.pending ? "Joining" : "Join"}
                      </button>
                      {(waitlistState.message || waitlistState.error) && (
                        <p
                          aria-live="polite"
                          className={`text-sm leading-relaxed ${
                            waitlistState.error ? "text-[#9E4B4B]" : "text-[#2D6A4F]"
                          }`}
                        >
                          {waitlistState.error || waitlistState.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

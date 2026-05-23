'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/reveal';
import { SectionOverlay } from '@/components/section-overlay';
import { Shield, ArrowLeftRight, Clock, Download } from 'lucide-react';
import { personas } from './data/personas';
import type { Persona } from './data/types';

/* ─── Hook animation: chain continuity demo ─── */

interface ChainMessage {
  sender: 'user' | 'ai';
  text: string;
}

interface ChainStep {
  platform: string;
  color: string;
  contextLabel: string;
  messages: ChainMessage[];
  priorSummary?: string;
}

const CHAIN_STEPS: ChainStep[] = [
  {
    platform: 'Claude',
    color: '#a85de8',
    contextLabel: 'Work laptop',
    messages: [
      { sender: 'user', text: "I'm building a home automation system. Python backend, React dashboard. The garage sensor keeps dropping." },
      { sender: 'ai', text: "Sounds like an I2C bus issue. Have you checked the pull-up resistors? For the dashboard, a WebSocket connection would give you real-time sensor data." },
      { sender: 'user', text: "Pull-ups are fine. I think the wiring run is too long for I2C. Maybe MQTT instead?" },
      { sender: 'ai', text: "MQTT would be much better for that distance. You'd need a broker, mosquitto is lightweight. I can help you set up the config." },
    ],
  },
  {
    platform: 'GPT',
    color: '#4ae88a',
    contextLabel: 'Home laptop',
    priorSummary: 'Claude: Home automation, Python/React, garage sensor I2C too long, switching to MQTT with mosquitto',
    messages: [
      { sender: 'user', text: "Hey, picking up where I left off on the garage sensor." },
      { sender: 'ai', text: "The I2C dropout issue. You were considering switching to MQTT with mosquitto since the wiring run is too long for I2C. Want to start with the broker config?" },
      { sender: 'user', text: "Yeah, and I need to update the React dashboard to handle MQTT." },
      { sender: 'ai', text: "Right, the WebSocket bridge approach from your earlier session would work here too. I can draft both the mosquitto config and a React hook for MQTT subscriptions." },
    ],
  },
  {
    platform: 'Gemini',
    color: '#4a90e8',
    contextLabel: 'Phone',
    priorSummary: 'Claude + GPT: MQTT replacing I2C, mosquitto broker, React dashboard with WebSocket bridge',
    messages: [
      { sender: 'user', text: "Quick check on my home project while I'm out." },
      { sender: 'ai', text: "Your home automation: garage sensor moving from I2C to MQTT, mosquitto broker, React dashboard with WebSocket bridge. GPT was about to draft the configs. Want a summary of where things stand?" },
      { sender: 'user', text: "Yeah, and I realized I need TLS on the MQTT broker since the dashboard is exposed." },
    ],
  },
  {
    platform: 'Openclaw',
    color: '#e8a85d',
    contextLabel: 'Browser',
    priorSummary: 'Claude + GPT + Gemini: MQTT migration, mosquitto broker, needs TLS, React WebSocket bridge',
    messages: [
      { sender: 'user', text: "Draft the mosquitto config with TLS." },
      { sender: 'ai', text: "Based on your setup: Python backend, MQTT replacing I2C for the garage sensor, React dashboard on WebSocket. Here's the mosquitto.conf with TLS on port 8883, using Let's Encrypt certs..." },
      { sender: 'user', text: "Perfect. Now I need to scaffold the actual code." },
    ],
  },
  {
    platform: 'Cursor',
    color: '#00d4aa',
    contextLabel: 'Coding agent',
    priorSummary: 'Full chain: mosquitto TLS config drafted, MQTT on 8883, Python + React + WebSocket bridge',
    messages: [
      { sender: 'user', text: "Scaffold the MQTT listener and React component for my project." },
      { sender: 'ai', text: "I have the full context. Creating: mqtt_listener.py for the garage sensor on port 8883 with TLS, and SensorDashboard.tsx with a useMQTT hook over WebSocket bridge. Using your existing Python backend structure." },
      { sender: 'user', text: "Ship it. I'll review the security config offline tonight." },
    ],
  },
  {
    platform: 'Ollama',
    color: '#e8e8e8',
    contextLabel: 'Local, offline',
    priorSummary: 'Full chain: MQTT listener + React component scaffolded, TLS on 8883, WebSocket bridge',
    messages: [
      { sender: 'user', text: "Review this MQTT config for security issues. No internet right now." },
      { sender: 'ai', text: "Looking at your mosquitto setup. Port 8883 with TLS is good, but the ACL file is missing. Without it, any client with creds can publish to any topic. I'd also restrict the bridge listener to localhost since your React dashboard is the only consumer." },
      { sender: 'user', text: "Good catches. This is exactly why I run security reviews offline." },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

/* Typing dots indicator */
function TypingDots({ color }: { color: string }) {
  return (
    <span className="inline-flex items-center gap-[3px] py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[5px] h-[5px] rounded-full"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

/* Message bubble */
function MessageBubble({
  msg,
  stepColor,
  delay,
  onComplete,
}: {
  msg: ChainMessage;
  stepColor: string;
  delay: number;
  onComplete?: () => void;
}) {
  const [phase, setPhase] = useState<'hidden' | 'typing' | 'visible'>('hidden');

  useEffect(() => {
    const isAI = msg.sender === 'ai';
    // User: 0.4s think delay before showing; AI: 0.4s typing dots then text
    const thinkDelay = isAI ? 0 : 400;
    const typingDuration = isAI ? 400 : 200;
    const revealDelay = isAI ? 800 : 400;

    const t1 = setTimeout(() => setPhase('typing'), delay * 1000 + thinkDelay);
    const t2 = setTimeout(() => {
      setPhase('visible');
      onComplete?.();
    }, delay * 1000 + thinkDelay + typingDuration);
    // For AI messages, the total extra delay (typing indicator visible for 0.6s + initial delay) = 1.2s
    // For user messages, the total extra delay (think 0.8s + short typing 0.4s) = 1.2s
    void revealDelay; // keep for documentation
    return () => { clearTimeout(t1); clearTimeout(t2); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  if (phase === 'hidden') return null;

  const isUser = msg.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-lg px-3.5 py-2.5 ${
          isUser
            ? 'bg-[var(--kl-surface)] border border-[var(--kl-border)]'
            : ''
        }`}
        style={
          !isUser
            ? { backgroundColor: `${stepColor}12`, border: `1px solid ${stepColor}25` }
            : undefined
        }
      >
        {phase === 'typing' ? (
          <TypingDots color={isUser ? 'var(--kl-text-soft)' : stepColor} />
        ) : (
          <p className="font-[family-name:var(--font-lato)] text-[0.82rem] leading-[1.65] text-[var(--kl-text-muted)]">
            {msg.text}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* Per-step timing (seconds) */
const MSG_BASE_DELAY = 0.3;
const MSG_GAP = 0.7;
const STEP_LINGER = 2.0;
const FADE_DURATION = 0.4;

function stepDuration(step: ChainStep) {
  // Each message: MSG_GAP spacing + ~0.6s for typing/think animation
  const msgTime = MSG_BASE_DELAY + step.messages.length * (MSG_GAP + 0.6) + 0.3;
  return msgTime + STEP_LINGER + FADE_DURATION;
}

const TOTAL_CHAIN_DURATION = CHAIN_STEPS.reduce((t, s) => t + stepDuration(s), 0);
const PAUSE_AFTER = 3;
const CYCLE_MS = (TOTAL_CHAIN_DURATION + PAUSE_AFTER) * 1000;

function ContinuityChain() {
  const [currentStep, setCurrentStep] = useState(0);
  const [chainComplete, setChainComplete] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;

    for (let i = 0; i < CHAIN_STEPS.length; i++) {
      const startAt = elapsed;
      timers.push(setTimeout(() => {
        setCurrentStep(i);
        setChainComplete(false);
      }, startAt * 1000));
      elapsed += stepDuration(CHAIN_STEPS[i]);
    }

    // Chain complete
    timers.push(setTimeout(() => setChainComplete(true), elapsed * 1000));

    // Restart
    timers.push(setTimeout(() => {
      setCurrentStep(0);
      setChainComplete(false);
      setCycleKey((k) => k + 1);
    }, CYCLE_MS));

    return () => timers.forEach(clearTimeout);
  }, [cycleKey]);

  const step = CHAIN_STEPS[currentStep];

  return (
    <div className="max-w-[700px] mx-auto">
      {/* Chain trail breadcrumbs */}
      <div className="flex items-center justify-center gap-0 mb-6 flex-wrap">
        {CHAIN_STEPS.map((s, i) => {
          const visited = i <= currentStep;
          const isCurrent = i === currentStep;
          return (
            <div key={s.platform} className="flex items-center">
              {/* Dot */}
              <motion.div
                className="relative flex items-center justify-center"
                animate={{
                  scale: isCurrent ? 1.3 : 1,
                }}
                transition={{ duration: 0.3, ease }}
              >
                <motion.div
                  className="w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: visited ? (chainComplete ? '#b08c4a' : s.color) : 'var(--kl-border)',
                    backgroundColor: visited ? (chainComplete ? '#b08c4a' : s.color) : 'transparent',
                  }}
                  animate={{
                    boxShadow: isCurrent
                      ? `0 0 10px ${s.color}60`
                      : chainComplete && visited
                      ? '0 0 8px rgba(176,140,74,0.5)'
                      : 'none',
                  }}
                  transition={{ duration: 0.4 }}
                />
                {/* Platform label on current */}
                {isCurrent && !chainComplete && (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-5 font-[family-name:var(--font-lato)] text-[0.55rem] font-bold tracking-[1px] uppercase whitespace-nowrap"
                    style={{ color: s.color }}
                  >
                    {s.platform}
                  </motion.span>
                )}
              </motion.div>
              {/* Connector line */}
              {i < CHAIN_STEPS.length - 1 && (
                <motion.div
                  className="w-8 md:w-12 h-[2px]"
                  style={{
                    backgroundColor: i < currentStep
                      ? (chainComplete ? '#b08c4a' : CHAIN_STEPS[i + 1].color)
                      : 'var(--kl-border)',
                  }}
                  animate={{
                    boxShadow: chainComplete && i < currentStep
                      ? '0 0 6px rgba(176,140,74,0.5)'
                      : 'none',
                  }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Spacer for the platform label */}
      <div className="h-3" />

      {/* Main chat panel */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          borderColor: chainComplete ? '#b08c4a' : step.color,
          backgroundColor: 'var(--kl-panel)',
          boxShadow: chainComplete
            ? '0 0 30px rgba(176,140,74,0.15)'
            : `0 0 25px ${step.color}18`,
          transition: 'border-color 0.5s, box-shadow 0.5s',
        }}
      >
        {/* Header bar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`header-${currentStep}-${cycleKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_DURATION, ease }}
            className="px-5 py-3 border-b flex items-center gap-2.5"
            style={{
              borderColor: chainComplete ? 'rgba(176,140,74,0.25)' : `${step.color}30`,
              transition: 'border-color 0.5s',
            }}
          >
            <motion.span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: chainComplete ? '#b08c4a' : step.color }}
              layoutId="platform-dot"
            />
            <span
              className="font-[family-name:var(--font-lato)] text-[0.7rem] font-bold tracking-[2px] uppercase"
              style={{ color: chainComplete ? '#b08c4a' : step.color }}
            >
              {step.platform}
            </span>
            <span className="font-[family-name:var(--font-lato)] text-[0.65rem] text-[var(--kl-text-soft)] ml-auto tracking-[0.5px]">
              {step.contextLabel}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Message area */}
        <div className="px-5 py-4 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`msgs-${currentStep}-${cycleKey}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: FADE_DURATION, ease }}
              className="flex flex-col gap-3"
            >
              {/* Prior context summary — compact single line */}
              {step.priorSummary && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, ease }}
                  className="px-2.5 py-1 rounded mb-1 overflow-hidden"
                  style={{ backgroundColor: 'var(--kl-surface)', border: '1px solid var(--kl-border)' }}
                >
                  <p className="font-[family-name:var(--font-lato)] text-[0.65rem] text-[var(--kl-text-soft)] leading-[1.3] italic whitespace-nowrap overflow-hidden text-ellipsis">
                    {step.priorSummary}
                  </p>
                </motion.div>
              )}

              {/* Chat messages */}
              {step.messages.map((msg, mi) => (
                <MessageBubble
                  key={`${currentStep}-${mi}-${cycleKey}`}
                  msg={msg}
                  stepColor={step.color}
                  delay={MSG_BASE_DELAY + mi * MSG_GAP}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Callout */}
      <motion.p
        animate={{ opacity: chainComplete ? 1 : 0.25 }}
        transition={{ duration: 0.8 }}
        className="font-[family-name:var(--font-lato)] text-[0.9rem] font-semibold text-[var(--kl-signal)] text-center mt-8 tracking-[0.5px]"
      >
        Six platforms. One memory. Nothing lost.
      </motion.p>
    </div>
  );
}

/* ─── Persona Card ─── */

function PersonaCard({ persona, index }: { persona: Persona; index: number }) {
  return (
    <Reveal delay={index * 0.12}>
      <Link
        href={`/demo/${persona.slug}`}
        className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--kl-signal)] rounded-lg"
        aria-label={`Explore ${persona.name}'s story`}
      >
        <div
          className="bg-[var(--kl-panel)] rounded-lg border border-[var(--kl-border)]
            hover:border-[var(--kl-signal)] hover:translate-y-[-4px]
            hover:shadow-[0_4px_16px_rgba(0,0,0,0.1),0_12px_40px_rgba(0,0,0,0.08)]
            transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)]
            p-8 md:p-10 h-full flex flex-col"
        >
          {/* Session count badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--kl-surface)] text-[var(--kl-text-muted)] font-[family-name:var(--font-lato)] text-[0.7rem] font-semibold tracking-[1px] uppercase">
              {persona.sessions.length} sessions
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--kl-surface)] text-[var(--kl-text-muted)] font-[family-name:var(--font-lato)] text-[0.7rem] font-semibold tracking-[1px] uppercase">
              {Array.from(new Set(persona.sessions.map((s) => s.host))).length} platforms
            </span>
          </div>

          {/* Persona name */}
          <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[var(--kl-text)] mb-3">
            {persona.name}
          </h3>

          {/* Descriptor */}
          <p className="font-[family-name:var(--font-lato)] text-[0.92rem] text-[var(--kl-text-muted)] leading-[1.7] mb-5 flex-1">
            {persona.descriptor}
          </p>

          {/* Arrow hint */}
          <div className="mt-auto flex items-center gap-1.5 text-[var(--kl-accent)] font-[family-name:var(--font-lato)] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            See the proof <span className="text-lg">&rarr;</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

/* ─── Differentiators ─── */

const DIFFERENTIATORS = [
  {
    icon: <Shield size={22} />,
    label: 'Your data never leaves your device',
    descriptor: 'No cloud. No upload. The memory file is on your machine.',
  },
  {
    icon: <ArrowLeftRight size={22} />,
    label: 'Switch AI anytime',
    descriptor: 'Claude today, GPT tomorrow, a local model when you want privacy. Context follows you.',
  },
  {
    icon: <Clock size={22} />,
    label: 'It tracks how things changed',
    descriptor: 'When facts were corrected, when context shifted, what superseded what.',
  },
  {
    icon: <Download size={22} />,
    label: 'You own it',
    descriptor: 'It\'s a SQLite file. Open it, inspect it, back it up, delete it. No API required.',
  },
];

/* ─── Main page ─── */

export default function DemoOverviewPage() {
  const headlineWords = 'Your AI remembers you. But only on one platform.'.split(' ');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Kenotic Continuity Bridge',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    description:
      'Break free from AI memory silos. Kenotic Continuity Bridge gives you portable AI memory across ChatGPT, Claude, Gemini, Cursor, and local models. One memory file on your device. No cloud. No lock-in. Switch AI platforms without losing context.',
    url: 'https://kenoticlabs.com/demo',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/ComingSoon',
      description: 'Join the waitlist for early access',
    },
    creator: {
      '@type': 'Organization',
      name: 'Kenotic Labs',
      url: 'https://kenoticlabs.com',
    },
    featureList: [
      'Cross-platform AI memory -- use Claude, ChatGPT, Gemini, and local models with the same memory',
      'Portable AI memory -- your data stays on your device as a SQLite file',
      'AI context portability -- switch platforms without re-explaining',
      'Correction tracking -- when facts change, the history is preserved',
      'Entity disambiguation -- distinguishes people, projects, and contexts',
      'Deterministic retrieval -- no LLM at read time, answers stay consistent',
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--kl-canvas)]">
      <Script
        id="demo-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ═══ SECTION 1: THE HOOK ═══ */}
      <section
        className="relative pt-28 md:pt-36 pb-20 md:pb-32 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, var(--kl-canvas) 0%, var(--kl-surface) 100%)',
        }}
      >
        <SectionOverlay variant="hero" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24">
          {/* Headline — word-by-word cascade */}
          <h1
            aria-label="Your AI remembers you. But only on one platform."
            className="font-[family-name:var(--font-playfair)] text-[clamp(2.4rem,5vw,4rem)] font-bold text-[var(--kl-text)] leading-[1.08] tracking-[-1.2px] mb-5 max-w-[740px]"
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={`hw-${i}`}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.12,
                  duration: 1,
                  ease,
                }}
                className="inline-block mr-[0.28em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1, ease }}
            className="font-[family-name:var(--font-lato)] text-[clamp(1rem,1.6vw,1.15rem)] text-[var(--kl-text-muted)] leading-[1.85] max-w-[620px] mb-14"
          >
            What if it didn&apos;t have to be? Watch one conversation flow across six platforms. Nothing lost. Nothing re-explained.
          </motion.p>

          {/* Chain demo — elevated container */}
          <div className="mb-14 relative">
            {/* Radial glow behind the chain */}
            <div
              className="absolute inset-0 -inset-x-8 -inset-y-12 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(176,140,74,0.06) 0%, transparent 70%)',
              }}
            />
            <div className="relative">
              <ContinuityChain />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Gold divider: hook → product definition ─── */}
      <div className="max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, ease }}
          className="origin-left h-px"
          style={{
            background: 'linear-gradient(to right, var(--kl-signal), color-mix(in srgb, var(--kl-signal) 30%, transparent), transparent)',
            opacity: 0.15,
          }}
        />
      </div>

      {/* ═══ SECTION 2: THE PRODUCT DEFINITION ═══ */}
      <section className="py-24 md:py-32 bg-[var(--kl-canvas)]">
        <div className="max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24">
          <Reveal>
            <span className="font-[family-name:var(--font-lato)] text-[0.65rem] font-bold tracking-[3px] uppercase text-[var(--kl-signal)] mb-6 block">
              The Continuity Bridge
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="border-l-2 pl-8 md:pl-10 max-w-[700px] mb-10"
              style={{ borderColor: 'var(--kl-signal)' }}
            >
              <p className="font-[family-name:var(--font-newsreader)] italic text-[clamp(1.35rem,2.8vw,2.1rem)] text-[var(--kl-text)] leading-[1.35]">
                Kenotic Continuity Bridge is a local memory layer that runs on your device. Connect any AI that speaks MCP: Claude, GPT, Gemini, Cursor, local models through llama.cpp or Ollama. One memory file. Every platform. You own it.
              </p>
            </div>
          </Reveal>

          {/* MCP config code snippet */}
          <Reveal delay={0.2}>
            <div className="max-w-[640px] rounded-lg border border-[var(--kl-border)] bg-[#1a1f1c] overflow-hidden mb-10">
              <div className="px-4 py-2.5 border-b border-[rgba(176,140,74,0.18)] flex items-center gap-2">
                <span className="font-[family-name:var(--font-lato)] text-[0.65rem] tracking-[1.5px] uppercase text-[rgba(255,255,255,0.4)]">
                  mcp.json
                </span>
              </div>
              <pre className="p-5 overflow-x-auto text-[0.82rem] leading-[1.7]">
                <code className="font-mono">
                  <span className="text-[rgba(255,255,255,0.3)]">{`{`}</span>{'\n'}
                  <span className="text-[rgba(255,255,255,0.3)]">{`  `}</span>
                  <span className="text-[#b08c4a]">&quot;mcpServers&quot;</span>
                  <span className="text-[rgba(255,255,255,0.3)]">{`: {`}</span>{'\n'}
                  <span className="text-[rgba(255,255,255,0.3)]">{`    `}</span>
                  <span className="text-[#b08c4a]">&quot;kenotic&quot;</span>
                  <span className="text-[rgba(255,255,255,0.3)]">{`: {`}</span>{'\n'}
                  <span className="text-[rgba(255,255,255,0.3)]">{`      `}</span>
                  <span className="text-[#4ae88a]">&quot;command&quot;</span>
                  <span className="text-[rgba(255,255,255,0.5)]">{`: `}</span>
                  <span className="text-[#e8a85d]">&quot;py&quot;</span>
                  <span className="text-[rgba(255,255,255,0.3)]">,</span>{'\n'}
                  <span className="text-[rgba(255,255,255,0.3)]">{`      `}</span>
                  <span className="text-[#4ae88a]">&quot;args&quot;</span>
                  <span className="text-[rgba(255,255,255,0.5)]">{`: `}</span>
                  <span className="text-[rgba(255,255,255,0.3)]">[</span>
                  <span className="text-[#e8a85d]">&quot;-m&quot;</span>
                  <span className="text-[rgba(255,255,255,0.3)]">, </span>
                  <span className="text-[#e8a85d]">&quot;mcp.server&quot;</span>
                  <span className="text-[rgba(255,255,255,0.3)]">],</span>{'\n'}
                  <span className="text-[rgba(255,255,255,0.3)]">{`      `}</span>
                  <span className="text-[#4ae88a]">&quot;env&quot;</span>
                  <span className="text-[rgba(255,255,255,0.5)]">{`: { `}</span>
                  <span className="text-[#4ae88a]">&quot;KENOTIC_DB_PATH&quot;</span>
                  <span className="text-[rgba(255,255,255,0.5)]">{`: `}</span>
                  <span className="text-[#e8a85d]">&quot;~/.kenotic/memory.db&quot;</span>
                  <span className="text-[rgba(255,255,255,0.3)]">{` }`}</span>{'\n'}
                  <span className="text-[rgba(255,255,255,0.3)]">{`    }`}</span>{'\n'}
                  <span className="text-[rgba(255,255,255,0.3)]">{`  }`}</span>{'\n'}
                  <span className="text-[rgba(255,255,255,0.3)]">{`}`}</span>
                </code>
              </pre>
            </div>
          </Reveal>

          {/* Anchoring metric */}
          <Reveal delay={0.25}>
            <p className="font-[family-name:var(--font-lato)] text-[0.95rem] text-[var(--kl-text-muted)] leading-[1.85] max-w-[640px]">
              <span className="text-[var(--kl-text)] font-semibold">Tested against ATANT, an open evaluation standard for AI continuity (arXiv:2604.06710).</span>{' '}
              Corrections tracked. Temporal ordering preserved. Disambiguation across entities. No LLM at read time. Retrieval is deterministic, so answers don&apos;t change when you switch models or when the provider ships an update.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 3: WHAT'S DIFFERENT ═══ */}
      <section className="py-16 md:py-22 bg-[var(--kl-surface)]">
        <div className="max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24">
          <Reveal>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-[var(--kl-text)] text-center mb-12">
              What&apos;s Different
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-[800px] mx-auto md:ml-[calc(50%-420px)] rounded-lg border border-[var(--kl-border)] overflow-hidden">
              {/* Column headers */}
              <div className="bg-[var(--kl-panel)] px-6 py-4 border-b border-[var(--kl-border)] md:border-r">
                <h3 className="font-[family-name:var(--font-lato)] text-sm font-bold tracking-[1px] uppercase text-[var(--kl-text-soft)]">
                  How memory works today
                </h3>
              </div>
              <div className="bg-[var(--kl-panel)] px-6 py-4 border-b border-[var(--kl-border)]">
                <h3 className="font-[family-name:var(--font-lato)] text-sm font-bold tracking-[1px] uppercase text-[var(--kl-signal)]">
                  How Kenotic works
                </h3>
              </div>

              {/* Row 1 */}
              <div className="bg-[var(--kl-panel)] px-6 py-5 border-b border-[var(--kl-border)] md:border-r">
                <p className="font-[family-name:var(--font-lato)] text-[0.9rem] text-[var(--kl-text-soft)] leading-[1.7]">
                  Each AI stores its own flat list of facts about you
                </p>
              </div>
              <div className="bg-[var(--kl-panel)] px-6 py-5 border-b border-[var(--kl-border)]">
                <p className="font-[family-name:var(--font-lato)] text-[0.9rem] text-[var(--kl-text)] leading-[1.7]">
                  One structured memory file tracks facts, corrections, temporal ordering, and context
                </p>
              </div>

              {/* Row 2 */}
              <div className="bg-[var(--kl-panel)] px-6 py-5 border-b border-[var(--kl-border)] md:border-r">
                <p className="font-[family-name:var(--font-lato)] text-[0.9rem] text-[var(--kl-text-soft)] leading-[1.7]">
                  Switch platforms = start over with that platform&apos;s separate memory
                </p>
              </div>
              <div className="bg-[var(--kl-panel)] px-6 py-5 border-b border-[var(--kl-border)]">
                <p className="font-[family-name:var(--font-lato)] text-[0.9rem] text-[var(--kl-text)] leading-[1.7]">
                  Switch platforms = same memory, same understanding, nothing lost
                </p>
              </div>

              {/* Row 3 */}
              <div className="bg-[var(--kl-panel)] px-6 py-5 border-b border-[var(--kl-border)] md:border-r">
                <p className="font-[family-name:var(--font-lato)] text-[0.9rem] text-[var(--kl-text-soft)] leading-[1.7]">
                  Memory lives on their servers
                </p>
              </div>
              <div className="bg-[var(--kl-panel)] px-6 py-5 border-b border-[var(--kl-border)]">
                <p className="font-[family-name:var(--font-lato)] text-[0.9rem] text-[var(--kl-text)] leading-[1.7]">
                  Memory lives on your device. A SQLite file you can inspect, export, or delete
                </p>
              </div>

              {/* Row 4 */}
              <div className="bg-[var(--kl-panel)] px-6 py-5 md:border-r border-[var(--kl-border)]">
                <p className="font-[family-name:var(--font-lato)] text-[0.9rem] text-[var(--kl-text-soft)] leading-[1.7]">
                  Stores isolated key-value pairs like "likes Python" and "lives in Portland" with no relationship between them
                </p>
              </div>
              <div className="bg-[var(--kl-panel)] px-6 py-5">
                <p className="font-[family-name:var(--font-lato)] text-[0.9rem] text-[var(--kl-text)] leading-[1.7]">
                  Stores structured traces: identity, corrections, temporal ordering. The system reconstructs context, not isolated facts
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ DIFFERENTIATOR BAR ═══ */}
      <section className="bg-[var(--kl-panel)] border-y border-[var(--kl-border)] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {DIFFERENTIATORS.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="flex justify-center mb-3 text-[var(--kl-signal)]">
                    {item.icon}
                  </div>
                  <h3 className="font-[family-name:var(--font-lato)] text-sm font-semibold text-[var(--kl-text)] mb-1">
                    {item.label}
                  </h3>
                  <p className="font-[family-name:var(--font-lato)] text-[0.82rem] text-[var(--kl-text-muted)] leading-[1.6]">
                    {item.descriptor}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 4: PROOF STORIES ═══ */}
      <section
        className="relative py-28 md:py-36 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, var(--kl-canvas) 0%, color-mix(in srgb, var(--kl-surface) 40%, var(--kl-canvas)) 50%, var(--kl-canvas) 100%)',
        }}
      >
        <SectionOverlay variant="right" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24">
          <Reveal>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,4.5vw,3rem)] font-bold text-[var(--kl-text)] text-center mb-4">
              See Continuity in Action
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-[family-name:var(--font-lato)] text-[1.05rem] text-[var(--kl-text-muted)] text-center leading-[1.85] max-w-[560px] mx-auto mb-14">
              Four human stories. Sessions across Claude, ChatGPT, Gemini, and local models.
              Corrections, platform switches, emotional arcs. See what continuity looks like when memory persists.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personas.map((persona, index) => (
              <PersonaCard key={persona.slug} persona={persona} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: CTA BLOCK ═══ */}
      <section className="py-28 md:py-36 bg-[var(--kl-surface)]">
        <div className="max-w-[900px] mx-auto px-8 md:px-16 text-center">
          {/* Separator */}
          <div
            className="w-2/5 h-px mx-auto mb-14"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--kl-signal), transparent)',
              opacity: 0.3,
            }}
          />

          <Reveal>
            <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-[var(--kl-text)] mb-12">
              Where to go from here
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Investors */}
            <Reveal delay={0.1}>
              <div className="bg-[var(--kl-panel)] rounded-lg border border-[var(--kl-border)] p-8 text-center">
                <span className="font-[family-name:var(--font-lato)] text-[0.65rem] font-bold tracking-[2.5px] uppercase text-[var(--kl-signal)] mb-3 block">
                  For Investors
                </span>
                <p className="font-[family-name:var(--font-lato)] text-[0.9rem] text-[var(--kl-text-muted)] leading-[1.7] mb-6">
                  See the deck. Talk to Sam.
                </p>
                <Link
                  href="/#contact"
                  className="inline-block font-[family-name:var(--font-lato)] text-sm font-bold tracking-[1.5px] uppercase px-8 py-3 bg-[var(--kl-accent)] text-white rounded-sm
                    hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(39,78,61,0.25)]
                    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  Request Investor Access
                </Link>
              </div>
            </Reveal>

            {/* Developers */}
            <Reveal delay={0.2}>
              <div className="bg-[var(--kl-panel)] rounded-lg border border-[var(--kl-border)] p-8 text-center">
                <span className="font-[family-name:var(--font-lato)] text-[0.65rem] font-bold tracking-[2.5px] uppercase text-[var(--kl-signal)] mb-3 block">
                  For Developers
                </span>
                <p className="font-[family-name:var(--font-lato)] text-[0.9rem] text-[var(--kl-text-muted)] leading-[1.7] mb-6">
                  Read the paper. See the architecture.
                </p>
                <a
                  href="https://arxiv.org/abs/2604.06710"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-[family-name:var(--font-lato)] text-sm font-bold tracking-[1.5px] uppercase px-8 py-3 bg-[var(--kl-accent)] text-white rounded-sm
                    hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(39,78,61,0.25)]
                    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  Read the Paper
                </a>
              </div>
            </Reveal>

            {/* Everyone */}
            <Reveal delay={0.3}>
              <div className="bg-[var(--kl-panel)] rounded-lg border border-[var(--kl-border)] p-8 text-center">
                <span className="font-[family-name:var(--font-lato)] text-[0.65rem] font-bold tracking-[2.5px] uppercase text-[var(--kl-signal)] mb-3 block">
                  For Everyone
                </span>
                <p className="font-[family-name:var(--font-lato)] text-[0.9rem] text-[var(--kl-text-muted)] leading-[1.7] mb-6">
                  Get notified when it ships.
                </p>
                <Link
                  href="/#contact"
                  className="inline-block font-[family-name:var(--font-lato)] text-sm font-bold tracking-[1.5px] uppercase px-8 py-3 bg-[var(--kl-accent)] text-white rounded-sm
                    hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgba(39,78,61,0.25)]
                    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  Join the Waitlist
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

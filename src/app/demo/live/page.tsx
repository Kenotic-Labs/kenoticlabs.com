'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { TimelineCanvas } from '../components/TimelineCanvas';
import type { LifeTimeline } from '../data/types';

/* ═══════════════════════════════════════════════════════════
   LIVE TIMELINE — connects to the local Reconstruct server
   and renders the user's real memory as a Living Timeline.

   Same TimelineCanvas, same gold stream, same branches.
   Live data instead of hardcoded personas.
   ═══════════════════════════════════════════════════════════ */

const DEFAULT_URL = process.env.NEXT_PUBLIC_RECONSTRUCT_URL ?? 'http://localhost:7130';
const STORAGE_KEY = 'reconstruct-server-url';
const TOKEN_KEY = 'reconstruct-server-token';

type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error';

export default function LiveTimelinePage() {
  const [serverUrl, setServerUrl] = useState(DEFAULT_URL);
  const [token, setToken] = useState('');
  const [state, setState] = useState<ConnectionState>('disconnected');
  const [error, setError] = useState('');
  const [timeline, setTimeline] = useState<LifeTimeline | null>(null);
  const [edgeCount, setEdgeCount] = useState(0);
  const [lastRefresh, setLastRefresh] = useState<string>('');

  // Load saved connection from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (saved) setServerUrl(saved);
    if (savedToken) setToken(savedToken);
  }, []);

  const fetchTimeline = useCallback(async (url: string, bearerToken: string) => {
    setState('connecting');
    setError('');

    try {
      // Health check first
      const healthRes = await fetch(`${url}/healthz`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!healthRes.ok) throw new Error('Server not responding');

      // Fetch timeline
      const res = await fetch(`${url}/api/timeline`, {
        headers: { Authorization: `Bearer ${bearerToken}` },
        signal: AbortSignal.timeout(15000),
      });

      if (res.status === 401) {
        throw new Error('Invalid token — check your bearer token');
      }
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data: LifeTimeline = await res.json();
      setTimeline(data);
      setEdgeCount(
        data.branches.reduce((sum, b) => sum + b.eventCount, 0)
      );
      setState('connected');
      setLastRefresh(new Date().toLocaleTimeString());

      // Save connection
      localStorage.setItem(STORAGE_KEY, url);
      localStorage.setItem(TOKEN_KEY, bearerToken);
    } catch (err: any) {
      setState('error');
      const msg = err?.message || String(err);
      console.error('[Reconstruct] Connection error:', err);
      if (err.name === 'AbortError' || err.name === 'TimeoutError') {
        setError(`Timeout reaching ${url} — is Reconstruct running?`);
      } else if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('fetch')) {
        setError(`Cannot reach ${url} — is Reconstruct running? (${msg})`);
      } else {
        setError(msg);
      }
    }
  }, []);

  const handleConnect = () => {
    fetchTimeline(serverUrl, token);
  };

  const handleRefresh = () => {
    if (state === 'connected') {
      fetchTimeline(serverUrl, token);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--kl-canvas)]">
      {/* ═══ HEADER ═══ */}
      <section
        className="relative pt-24 md:pt-28 pb-8"
        style={{
          background:
            'linear-gradient(180deg, var(--kl-canvas) 0%, var(--kl-surface) 100%)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24">
          <Reveal>
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 font-[family-name:var(--font-lato)] text-sm text-[var(--kl-text-muted)] hover:text-[var(--kl-accent)] transition-colors duration-300 mb-8"
            >
              &larr; Demo
            </Link>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-[var(--kl-text)] mb-3 text-center">
              Your Living Timeline
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-[family-name:var(--font-lato)] text-[1rem] text-[var(--kl-text-muted)] leading-[1.85] text-center max-w-[520px] mx-auto mb-8">
              Connect to your local Reconstruct server to see your real memory rendered as a living timeline.
            </p>
          </Reveal>

          {/* ═══ CONNECTION PANEL ═══ */}
          <Reveal delay={0.15}>
            <div
              className="max-w-[600px] mx-auto rounded-xl p-6 mb-8"
              style={{
                background: 'var(--kl-panel, #1a1f1c)',
                border: '1px solid rgba(176,140,74,0.18)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                {state === 'connected' ? (
                  <Wifi size={16} className="text-[#4ae88a]" />
                ) : (
                  <WifiOff size={16} className="text-[var(--kl-text-muted)]" />
                )}
                <span className="font-[family-name:var(--font-lato)] text-sm text-[var(--kl-text-muted)]">
                  {state === 'connected'
                    ? `Connected — ${edgeCount} facts`
                    : state === 'connecting'
                      ? 'Connecting...'
                      : 'Not connected'}
                </span>
                {state === 'connected' && (
                  <button
                    onClick={handleRefresh}
                    className="ml-auto text-[var(--kl-text-muted)] hover:text-[var(--kl-accent)] transition-colors"
                    title="Refresh"
                  >
                    <RefreshCw size={14} />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="font-[family-name:var(--font-lato)] text-xs text-[var(--kl-text-muted)] mb-1 block">
                    Server URL
                  </label>
                  <input
                    type="text"
                    value={serverUrl}
                    onChange={(e) => setServerUrl(e.target.value)}
                    placeholder="http://localhost:7130"
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(176,140,74,0.12)] rounded-lg px-3 py-2 font-[family-name:var(--font-lato)] text-sm text-[var(--kl-text)] placeholder:text-[var(--kl-text-muted)] focus:outline-none focus:border-[var(--kl-accent)]"
                  />
                </div>
                <div>
                  <label className="font-[family-name:var(--font-lato)] text-xs text-[var(--kl-text-muted)] mb-1 block">
                    Bearer Token
                  </label>
                  <input
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Your --token value"
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(176,140,74,0.12)] rounded-lg px-3 py-2 font-[family-name:var(--font-lato)] text-sm text-[var(--kl-text)] placeholder:text-[var(--kl-text-muted)] focus:outline-none focus:border-[var(--kl-accent)]"
                  />
                </div>
                <button
                  onClick={handleConnect}
                  disabled={state === 'connecting' || !token}
                  className="w-full bg-[var(--kl-accent,#b08c4a)] hover:bg-[var(--kl-accent-hi,#d4b06a)] text-[var(--kl-panel,#1a1f1c)] font-[family-name:var(--font-lato)] text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors disabled:opacity-40"
                >
                  {state === 'connecting' ? 'Connecting...' : 'Connect'}
                </button>

                {error && (
                  <p className="font-[family-name:var(--font-lato)] text-xs text-[#e85d4a]">
                    {error}
                  </p>
                )}

                {state === 'disconnected' && (
                  <div className="mt-2 p-3 rounded-lg bg-[rgba(255,255,255,0.03)]">
                    <p className="font-[family-name:var(--font-lato)] text-xs text-[var(--kl-text-muted)] leading-relaxed">
                      Start your local server first:
                    </p>
                    <pre className="mt-2 font-mono text-xs text-[var(--kl-accent)] bg-[rgba(0,0,0,0.3)] rounded px-2 py-1.5">
                      reconstruct serve --http --token YOUR_TOKEN
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      {timeline && timeline.branches.length > 0 && (
        <section className="py-12 md:py-16 bg-[var(--kl-surface)]">
          <div className="max-w-[1200px] mx-auto px-8 md:px-16 xl:px-24 mb-6">
            <Reveal>
              <h2 className="font-[family-name:var(--font-playfair)] text-[clamp(1.4rem,3vw,2rem)] font-bold text-[var(--kl-text)] mb-2 text-center">
                The Living Timeline
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-[family-name:var(--font-lato)] text-sm text-[var(--kl-text-muted)] text-center">
                {edgeCount} facts across {timeline.branches.length} life domains
                {lastRefresh && ` — last updated ${lastRefresh}`}
              </p>
            </Reveal>
          </div>

          <div className="w-full px-4 md:px-8">
            <TimelineCanvas timeline={timeline} />
          </div>
        </section>
      )}

      {/* ═══ EMPTY STATE ═══ */}
      {state === 'connected' && timeline && timeline.branches.length === 0 && (
        <section className="py-24 bg-[var(--kl-surface)]">
          <div className="max-w-[500px] mx-auto px-8 text-center">
            <p className="font-[family-name:var(--font-playfair)] text-xl text-[var(--kl-text)] mb-3">
              No memories yet
            </p>
            <p className="font-[family-name:var(--font-lato)] text-sm text-[var(--kl-text-muted)] leading-relaxed">
              Start talking to any AI tool connected to your Reconstruct server.
              Facts, corrections, and context will appear here as they build.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

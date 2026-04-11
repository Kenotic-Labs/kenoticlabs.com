const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 6;

const buckets = new Map<string, { count: number; resetAt: number }>();

type GuardResult =
  | { ok: true }
  | { ok: false; status: number; error: string; silent?: boolean };

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function rateLimit(key: string): GuardResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (existing.count >= MAX_ATTEMPTS) {
    return {
      ok: false,
      status: 429,
      error: "Too many requests. Please wait a few minutes and try again.",
    };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { ok: true };
}

export function checkHoneypot(value: string | undefined): GuardResult {
  if (value && value.trim().length > 0) {
    return {
      ok: false,
      status: 200,
      error: "",
      silent: true,
    };
  }

  return { ok: true };
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateLength(
  value: string,
  max: number,
  label: string,
): GuardResult {
  if (value.length > max) {
    return {
      ok: false,
      status: 400,
      error: `${label} is too long.`,
    };
  }

  return { ok: true };
}

export function validateOrigin(request: Request): GuardResult {
  const allowedOrigins = new Set([
    "http://localhost:3000",
    "http://localhost:3001",
    "https://kenoticlabs.com",
    "https://www.kenoticlabs.com",
  ]);

  const origin = request.headers.get("origin");
  if (origin && allowedOrigins.has(origin)) {
    return { ok: true };
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const refererOrigin = new URL(referer).origin;
      if (allowedOrigins.has(refererOrigin)) {
        return { ok: true };
      }
    } catch {
      return {
        ok: false,
        status: 403,
        error: "Invalid request origin.",
      };
    }
  }

  return {
    ok: false,
    status: 403,
    error: "Invalid request origin.",
  };
}

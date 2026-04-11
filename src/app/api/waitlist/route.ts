import { NextResponse } from "next/server";
import {
  checkHoneypot,
  getClientIp,
  isValidEmail,
  rateLimit,
  validateLength,
  validateOrigin,
} from "@/lib/form-security";
import { isMailerConfigured, sendWaitlistEmail } from "@/lib/mailer";

const scriptUrl =
  process.env.KENOTIC_WAITLIST_SCRIPT_URL ?? process.env.KENOTIC_APPS_SCRIPT_URL;

function getCountError() {
  return NextResponse.json({
    success: false,
    configured: false,
    count: null,
  });
}

export async function GET() {
  if (!scriptUrl) {
    return getCountError();
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Waitlist count request failed");
    }

    const data = (await response.json()) as { success?: boolean; count?: number };

    return NextResponse.json({
      success: Boolean(data.success),
      configured: true,
      count: typeof data.count === "number" ? data.count : null,
    });
  } catch {
    return getCountError();
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    name?: string;
    interests?: string[];
    imagination?: string;
    website?: string;
  };

  const originCheck = validateOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json({ success: false, error: originCheck.error }, { status: originCheck.status });
  }

  const limitCheck = rateLimit(`waitlist:${getClientIp(request)}`);
  if (!limitCheck.ok) {
    return NextResponse.json({ success: false, error: limitCheck.error }, { status: limitCheck.status });
  }

  const honeypotCheck = checkHoneypot(body.website);
  if (!honeypotCheck.ok) {
    return NextResponse.json({ success: true, message: "You are on the waitlist." }, { status: honeypotCheck.status });
  }

  const email = body.email?.trim();
  const name = body.name?.trim() ?? "";
  const interests = Array.isArray(body.interests)
    ? body.interests.map((value) => value.trim()).filter(Boolean)
    : [];
  const imagination = body.imagination?.trim() ?? "";

  if (!email) {
    return NextResponse.json({ success: false, error: "Email is required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, error: "Enter a valid email address." }, { status: 400 });
  }

  for (const validation of [
    validateLength(email, 254, "Email"),
    validateLength(name, 120, "Name"),
    validateLength(imagination, 1200, "Imagination"),
  ]) {
    if (!validation.ok) {
      return NextResponse.json({ success: false, error: validation.error }, { status: validation.status });
    }
  }

  if (!scriptUrl) {
    return NextResponse.json(
      { success: false, error: "Waitlist endpoint is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const submitResponse = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "waitlist",
        email,
        name,
        interests,
        imagination,
        skipEmail: true,
        source: "kenoticlabs.com",
        timestamp: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    if (!submitResponse.ok) {
      throw new Error("Waitlist submission failed");
    }

    let count: number | null = null;

    try {
      const countResponse = await fetch(scriptUrl, {
        method: "GET",
        cache: "no-store",
      });
      if (countResponse.ok) {
        const countData = (await countResponse.json()) as { success?: boolean; count?: number };
        if (countData.success && typeof countData.count === "number") {
          count = countData.count;
        }
      }
    } catch {
      count = null;
    }

    let emailDelivered = false;

    if (isMailerConfigured()) {
      try {
        await sendWaitlistEmail({
          to: email,
          name,
          interests,
          imagination,
          existing: false,
        });
        emailDelivered = true;
      } catch {
        emailDelivered = false;
      }
    }

    return NextResponse.json({
      success: true,
      count,
      emailDelivered,
      message: emailDelivered
        ? count
          ? `You are on the waitlist. Spot #${count}.`
          : "You are on the waitlist."
        : count
          ? `You are on the waitlist. Spot #${count}. Your confirmation email could not be sent yet.`
          : "You are on the waitlist. Your confirmation email could not be sent yet.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Waitlist submission failed. Please try again." },
      { status: 502 },
    );
  }
}

import { NextResponse } from "next/server";
import {
  checkHoneypot,
  getClientIp,
  isValidEmail,
  rateLimit,
  validateLength,
  validateOrigin,
} from "@/lib/form-security";
import { isMailerConfigured, sendContactNotification } from "@/lib/mailer";

const scriptUrl =
  process.env.KENOTIC_CONTACT_SCRIPT_URL ?? process.env.KENOTIC_APPS_SCRIPT_URL;
const contactEmail = "info@kenoticlabs.com";

function buildMailtoUrl({
  name,
  email,
  organization,
  message,
}: {
  name: string;
  email: string;
  organization: string;
  message: string;
}) {
  const subject = encodeURIComponent(`Kenotic Labs inquiry from ${name}`);
  const body = encodeURIComponent(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      organization ? `Organization: ${organization}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    organization?: string;
    message?: string;
    website?: string;
  };

  const originCheck = validateOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json({ success: false, error: originCheck.error }, { status: originCheck.status });
  }

  const limitCheck = rateLimit(`contact:${getClientIp(request)}`);
  if (!limitCheck.ok) {
    return NextResponse.json({ success: false, error: limitCheck.error }, { status: limitCheck.status });
  }

  const honeypotCheck = checkHoneypot(body.website);
  if (!honeypotCheck.ok) {
    return NextResponse.json({ success: true, message: "Your message was received." }, { status: honeypotCheck.status });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const organization = body.organization?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  for (const validation of [
    validateLength(name, 120, "Name"),
    validateLength(email, 254, "Email"),
    validateLength(organization, 160, "Organization"),
    validateLength(message, 4000, "Message"),
  ]) {
    if (!validation.ok) {
      return NextResponse.json({ success: false, error: validation.error }, { status: validation.status });
    }
  }

  if (!scriptUrl && !isMailerConfigured()) {
    return NextResponse.json({
      success: false,
      error: "Contact endpoint is not configured yet.",
      mailtoUrl: buildMailtoUrl({ name, email, organization, message }),
    });
  }

  try {
    if (scriptUrl) {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name,
          email,
          organization,
          message,
          skipAdminEmail: true,
          source: "kenoticlabs.com",
          timestamp: new Date().toISOString(),
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Contact submission failed");
      }
    }

    if (!isMailerConfigured()) {
      return NextResponse.json({
        success: true,
        message: "Your message was saved. Email delivery is not configured yet.",
      });
    }

    await sendContactNotification({ name, email, organization, message });

    return NextResponse.json({
      success: true,
      message: `Your message has been sent to ${contactEmail}.`,
    });
  } catch {
    if (scriptUrl) {
      return NextResponse.json({
        success: true,
        message: "Your message was saved, but the email notification could not be sent yet.",
      });
    }

    return NextResponse.json({
      success: false,
      error: "Contact submission failed. Opening your mail app instead.",
      mailtoUrl: buildMailtoUrl({ name, email, organization, message }),
    });
  }
}

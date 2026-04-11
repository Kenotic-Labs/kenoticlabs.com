import nodemailer from "nodemailer";

const smtpHost = process.env.ZOHO_SMTP_HOST;
const smtpPort = Number(process.env.ZOHO_SMTP_PORT ?? "465");
const smtpUser = process.env.ZOHO_SMTP_USER;
const smtpPass = process.env.ZOHO_SMTP_PASS;
const fromEmail = process.env.ZOHO_FROM_EMAIL ?? smtpUser ?? "info@kenoticlabs.com";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!smtpHost || !smtpUser || !smtpPass) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  return transporter;
}

export function isMailerConfigured() {
  return Boolean(getTransporter());
}

function buildInterestSection(interests: string[]) {
  const sections: string[] = [];

  if (interests.includes("Continuity SDK")) {
    sections.push(`
      <div style="margin:22px 0;padding:18px 20px;border:1px solid rgba(39,78,61,0.16);background:rgba(39,78,61,0.03);">
        <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#b08c4a;font-family:Arial,sans-serif;">
          Continuity SDK
        </p>
        <p style="margin:0;font-size:17px;line-height:1.75;color:#5f655f;">
          The SDK will be a developer layer for systems that need more than retrieval. It will let products write, update, and reconstruct living context so assistants, agents, and tools can stay oriented across time instead of resetting at every interaction. In practice, that means software that can remain aware of what is still in progress, what changed, what should return later, and what matters in this particular situation.
        </p>
      </div>
    `);
  }

  if (interests.includes("Raya")) {
    sections.push(`
      <div style="margin:22px 0;padding:18px 20px;border:1px solid rgba(176,140,74,0.18);background:rgba(176,140,74,0.04);">
        <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#b08c4a;font-family:Arial,sans-serif;">
          Raya
        </p>
        <p style="margin:0;font-size:17px;line-height:1.75;color:#5f655f;">
          Raya will explore what it means for technology to know a person across time with more depth, steadiness, and care. Not just a tool that completes requests, but a system that can stay oriented to a life as it unfolds.
        </p>
      </div>
    `);
  }

  return sections.join("");
}

function getFuturePrompt(interests: string[]) {
  if (interests.includes("Continuity SDK") && interests.includes("Raya")) {
    return "If technology could carry understanding across time, what would you want it to make possible?";
  }
  if (interests.includes("Raya")) {
    return "If a system could grow in understanding over time, what would you hope it could become?";
  }
  return "If technology could truly understand continuity, what would you want it to become capable of?";
}

export async function sendWaitlistEmail({
  to,
  name,
  interests,
  imagination,
  existing,
}: {
  to: string;
  name: string;
  interests: string[];
  imagination: string;
  existing: boolean;
}) {
  const activeTransporter = getTransporter();
  if (!activeTransporter) {
    throw new Error("Mailer is not configured.");
  }

  const greeting = name ? `Hi ${name},` : "Hi,";
  const interestLine = interests.length
    ? `You asked to hear about: ${interests.join(", ")}.`
    : "We will keep you posted as things become available.";
  const futurePrompt = getFuturePrompt(interests);

  const htmlBody = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f7f5ef;color:#181817;font-family:Georgia,serif;">
  <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
    <div style="background:#fffdf8;border:1px solid #d8d1c3;padding:36px;">
      <p style="margin:0 0 20px;font-size:14px;letter-spacing:0.18em;text-transform:uppercase;color:#b08c4a;font-family:Arial,sans-serif;">
        Kenotic Labs
      </p>
      <h1 style="margin:0 0 20px;font-size:34px;line-height:1.05;font-weight:700;">
        ${existing ? "Your waitlist preferences were updated." : "You are on the list."}
      </h1>
      <p style="margin:0 0 18px;font-size:17px;line-height:1.75;">${greeting}</p>
      <p style="margin:0 0 18px;font-size:17px;line-height:1.75;">
        Thanks for your interest in Kenotic Labs. ${interestLine}
      </p>
      <p style="margin:0 0 18px;font-size:17px;line-height:1.75;">
        We are building technology that can hold onto the shape of a life, not just the residue of a prompt. Something that can understand what remains active, what changed, and what still matters across time.
      </p>
      ${buildInterestSection(interests)}
      <p style="margin:0 0 18px;font-size:17px;line-height:1.75;">
        The real question is not how many tasks a machine can complete. It is what becomes possible when a system can recognize a person, a situation, and a direction well enough to grow with them.
      </p>
      <div style="margin:28px 0;padding:20px;border:1px solid rgba(24,24,23,0.1);background:rgba(247,245,239,0.75);">
        <p style="margin:0 0 14px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#b08c4a;font-family:Arial,sans-serif;">
          ${imagination ? "What you shared" : "If this sparks something"}
        </p>
        <p style="margin:0 0 16px;font-size:20px;line-height:1.6;font-style:italic;color:#181817;">
          ${futurePrompt}
        </p>
        ${
          imagination
            ? `<div style="min-height:88px;padding:14px 16px;border:1px solid rgba(24,24,23,0.1);background:rgba(255,255,255,0.65);font-size:16px;line-height:1.7;color:#5f655f;">
                ${escapeHtml(imagination)}
              </div>`
            : `<p style="margin:0;font-size:16px;line-height:1.75;color:#7a7f79;">
                If you left a thought when you joined, we keep it with your place on the list.
              </p>`
        }
      </div>
      <p style="margin:28px 0 0;font-size:15px;line-height:1.7;color:#5f655f;">
        ${fromEmail}
      </p>
    </div>
  </div>
</body>
</html>
  `;

  const plainBody = [
    greeting,
    "",
    existing ? "Your Kenotic Labs waitlist preferences were updated." : "You are on the Kenotic Labs waitlist.",
    "",
    interestLine,
    "",
    "Kenotic Labs is building technology that can hold onto the shape of a life, not just the residue of a prompt. Something that can understand what remains active, what changed, and what still matters across time.",
    "",
    "The real question is not how many tasks a machine can complete. It is what becomes possible when a system can recognize a person, a situation, and a direction well enough to grow with them.",
    "",
    imagination ? "What you shared" : "If this sparks something",
    "",
    futurePrompt,
    "",
    imagination || "If you left a thought when you joined, we keep it with your place on the list.",
    "",
    fromEmail,
  ].join("\n");

  await activeTransporter.sendMail({
    from: fromEmail,
    to,
    subject: existing
      ? "Kenotic Labs waitlist preferences updated"
      : "You are on the Kenotic Labs waitlist",
    html: htmlBody,
    text: plainBody,
  });
}

export async function sendContactNotification({
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
  const activeTransporter = getTransporter();
  if (!activeTransporter) {
    throw new Error("Mailer is not configured.");
  }

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#181817;">
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${organization ? `<p><strong>Organization:</strong> ${escapeHtml(organization)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <div style="padding:16px;border:1px solid #d8d1c3;background:#fffdf8;white-space:pre-wrap;">${escapeHtml(message)}</div>
    </div>
  `;

  await activeTransporter.sendMail({
    from: fromEmail,
    to: fromEmail,
    replyTo: email,
    subject: `[Kenotic Labs] New inquiry from ${name}`,
    html,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      organization ? `Organization: ${organization}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

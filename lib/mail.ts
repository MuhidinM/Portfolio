import { Resend } from "resend";

const DEFAULT_TO = "misbahmuhidin@gmail.com";
// Resend's shared sender only delivers to the Resend account owner's address.
// Set CONTACT_FROM to an address on a verified domain to lift that limit.
const DEFAULT_FROM = "Portfolio contact <onboarding@resend.dev>";

interface SendMessageProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const sendMessage = async ({
  name,
  email,
  subject,
  message,
}: SendMessageProps): Promise<{ ok: true } | { ok: false; reason: string }> => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "RESEND_API_KEY is not set" };

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM || DEFAULT_FROM,
    to: [process.env.CONTACT_TO || DEFAULT_TO],
    reply_to: email,
    subject: `[Portfolio] ${subject || `Message from ${name}`}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
  });

  if (error) return { ok: false, reason: `${error.name}: ${error.message}` };
  return { ok: true };
};

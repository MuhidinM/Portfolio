"use server";

import { headers } from "next/headers";
import { sendMessage } from "@/lib/mail";
import { EmailSchema, type EmailValues } from "@/schemas";

type Result = { success: string } | { error: string };

const FALLBACK = "Something went wrong. Please email me directly instead.";

// Best-effort limit: memory is per server instance, so this slows abuse
// rather than guaranteeing a hard cap.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const recent = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(ip, hits);
    return true;
  }
  hits.push(now);
  recent.set(ip, hits);
  return false;
}

export const sendEmail = async (values: EmailValues): Promise<Result> => {
  const parsed = EmailSchema.safeParse(values);
  if (!parsed.success) return { error: "Please check the highlighted fields." };

  const { website, ...fields } = parsed.data;
  // Honeypot filled: pretend it worked so the bot moves on.
  if (website) return { success: "Thanks — your message is on its way." };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return { error: "Too many messages. Please try again in a few minutes." };
  }

  try {
    const result = await sendMessage(fields);
    if (!result.ok) {
      console.error("[contact] send failed:", result.reason);
      return { error: FALLBACK };
    }
  } catch (err) {
    console.error("[contact] send threw:", err);
    return { error: FALLBACK };
  }

  return { success: "Thanks — your message is on its way. I'll reply by email." };
};

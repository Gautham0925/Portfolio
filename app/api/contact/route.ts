import { after, NextResponse } from "next/server";

import { escapeHtml, mailerConfigured, sendMail, singleLine } from "@/lib/mailer";
import { limited } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function fail(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return fail(403, "Forbidden");

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0]?.trim() ?? "unknown";
  if (limited(`ip:${ip}`, 5, 10 * 60 * 1000)) return fail(429, "Too many messages. Please try again later.");

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return fail(400, "Invalid request.");
  }

  if (typeof body.company === "string" && body.company.trim() !== "") return NextResponse.json({ ok: true });

  const text = (key: string, max: number) => (typeof body[key] === "string" ? (body[key] as string).trim().slice(0, max) : "");
  const firstname = singleLine(text("firstname", 80));
  const lastname = singleLine(text("lastname", 80));
  const email = singleLine(text("email", 254));
  const phone = singleLine(text("phone", 20));
  const message = text("message", 2000);

  if (!firstname || !lastname || !emailPattern.test(email) || message.length < 5) return fail(400, "Please check your details and try again.");
  if (limited(`mail:${email.toLowerCase()}`, 2, 60 * 60 * 1000)) return fail(429, "You have already sent a message recently. Please try again later.");
  if (!mailerConfigured()) return fail(503, "The contact service is not available right now. Please email directly.");

  const to = process.env.CONTACT_TO ?? "gautham@secworks.dpdns.org";
  const name = `${firstname} ${lastname}`;

  try {
    await sendMail({
      to,
      subject: `Portfolio contact: ${name}`,
      html: `<p><b>${escapeHtml(name)}</b><br>Reply to: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>${phone ? `<br>Phone: ${escapeHtml(phone)}` : ""}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
  } catch (error) {
    console.error("contact: owner mail failed", error instanceof Error ? error.message : error);
    return fail(502, "Could not send your message. Please email directly.");
  }

  after(async () => {
    try {
      await sendMail({
        to: email,
        subject: "Thanks for reaching out",
        html: `<p>Hi ${escapeHtml(firstname)},</p><p>Thanks for your message. I have received it and will reply soon.</p><p>Gautham P Kini</p>`,
      });
    } catch (error) {
      console.error("contact: auto-reply failed", error instanceof Error ? error.message : error);
    }
  });

  return NextResponse.json({ ok: true });
}

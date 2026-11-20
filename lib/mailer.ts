type Mail = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export function mailerConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export function mailFrom(label: string) {
  const address = process.env.MAIL_FROM_ADDRESS ?? "gautham@secworks.dpdns.org";
  return `${label} <${address}>`;
}

export async function sendMail(from: string, mail: Mail) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [mail.to],
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      reply_to: mail.replyTo,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Mail API ${response.status}: ${detail.slice(0, 300)}`);
  }
}

export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
export const singleLine = (value: string) => value.replace(/[\r\n\u2028\u2029]+/g, " ").trim();

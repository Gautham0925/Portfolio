const regions: Record<string, { accounts: string; mail: string }> = {
  in: { accounts: "https://accounts.zoho.in", mail: "https://mail.zoho.in" },
  com: { accounts: "https://accounts.zoho.com", mail: "https://mail.zoho.com" },
  eu: { accounts: "https://accounts.zoho.eu", mail: "https://mail.zoho.eu" },
  "com.au": { accounts: "https://accounts.zoho.com.au", mail: "https://mail.zoho.com.au" },
  jp: { accounts: "https://accounts.zoho.jp", mail: "https://mail.zoho.jp" },
};

const required = ["ZOHO_CLIENT_ID", "ZOHO_CLIENT_SECRET", "ZOHO_REFRESH_TOKEN", "ZOHO_ACCOUNT_ID"] as const;

let cached: { value: string; expires: number } | null = null;

function region() {
  return regions[process.env.ZOHO_REGION ?? "in"] ?? regions.in!;
}

export function mailerConfigured() {
  return required.every((key) => Boolean(process.env[key]));
}

export function senderAddress() {
  return process.env.ZOHO_FROM ?? "gautham@secworks.dpdns.org";
}

async function accessToken() {
  if (cached && cached.expires > Date.now() + 60000) return cached.value;
  const response = await fetch(`${region().accounts}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: process.env.ZOHO_CLIENT_ID as string,
      client_secret: process.env.ZOHO_CLIENT_SECRET as string,
      refresh_token: process.env.ZOHO_REFRESH_TOKEN as string,
    }),
    signal: AbortSignal.timeout(10000),
  });
  const data = (await response.json().catch(() => null)) as { access_token?: string; expires_in?: number; error?: string } | null;
  if (!response.ok || !data?.access_token) throw new Error(`Zoho token ${response.status}: ${data?.error ?? "no access token"}`);
  cached = { value: data.access_token, expires: Date.now() + (data.expires_in ?? 3600) * 1000 };
  return cached.value;
}

export async function sendMail(mail: { to: string; subject: string; html: string }) {
  const token = await accessToken();
  const response = await fetch(`${region().mail}/api/accounts/${process.env.ZOHO_ACCOUNT_ID}/messages`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json", Authorization: `Zoho-oauthtoken ${token}` },
    body: JSON.stringify({
      fromAddress: senderAddress(),
      toAddress: mail.to,
      subject: mail.subject,
      content: mail.html,
      mailFormat: "html",
      askReceipt: "no",
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    if (response.status === 401) cached = null;
    const detail = await response.text().catch(() => "");
    throw new Error(`Zoho mail ${response.status}: ${detail.slice(0, 300)}`);
  }
}

export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
export const singleLine = (value: string) => value.replace(/[\r\n\u2028\u2029]+/g, " ").trim();

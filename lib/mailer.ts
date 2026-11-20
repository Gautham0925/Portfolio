import nodemailer, { type Transporter } from "nodemailer";

let cached: Transporter | null = null;

export function mailerConfigured() {
  return Boolean(process.env.ZOHO_USER && process.env.ZOHO_PASS);
}

export function getMailer() {
  if (!cached) {
    cached = nodemailer.createTransport({
      host: process.env.ZOHO_HOST ?? "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: { user: process.env.ZOHO_USER, pass: process.env.ZOHO_PASS },
      connectionTimeout: 6000,
      greetingTimeout: 6000,
      socketTimeout: 8000,
    });
  }
  return cached;
}

export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
export const singleLine = (value: string) => value.replace(/[\r\n\u2028\u2029]+/g, " ").trim();

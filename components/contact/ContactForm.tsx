"use client";

import { useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz9jMg3-sCsYEqvfyphaUdzQEEtZZaop1gN4Xt_0K73l9dUUchnIqxyKWCwpbWJW5fORQ/exec";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: "sending" });
    try {
      const response = await fetch(SCRIPT_URL, { method: "POST", body: new FormData(form) });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.result === "error") {
        setStatus({ kind: "error", message: "Failed to send message. Please check your details or email directly." });
        return;
      }
      form.reset();
      setStatus({ kind: "success" });
    } catch {
      setStatus({ kind: "error", message: "Error sending message. Please try again or email directly." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-5" aria-describedby="form-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="firstname" label="First name">
          <Input id="firstname" name="firstname" autoComplete="given-name" maxLength={80} required />
        </Field>
        <Field id="lastname" label="Last name">
          <Input id="lastname" name="lastname" autoComplete="family-name" maxLength={80} required />
        </Field>
        <Field id="email" label="Email">
          <Input id="email" type="email" name="email" autoComplete="email" maxLength={254} required />
        </Field>
        <Field id="phone" label="Phone (optional)">
          <Input id="phone" type="tel" name="phone" autoComplete="tel" maxLength={20} />
        </Field>
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <Field id="message" label="Message">
        <Textarea id="message" name="Message" maxLength={2000} required />
      </Field>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send message"}
        </Button>
        <p
          id="form-status"
          role="status"
          aria-live="polite"
          className={status.kind === "error" ? "text-sm text-danger" : "text-sm text-success"}
        >
          {status.kind === "success" && "Thank you for contacting me — a confirmation email is on its way."}
          {status.kind === "error" && status.message}
        </p>
      </div>
    </form>
  );
}

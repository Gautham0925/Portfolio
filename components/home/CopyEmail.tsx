"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

import { Button } from "@/components/ui/Button";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <Button variant="secondary" size="lg" onClick={copy}>
      {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
      <span className="font-mono text-sm">{email}</span>
      <span className="sr-only" role="status">
        {copied ? "Email address copied" : "Copy email address"}
      </span>
    </Button>
  );
}

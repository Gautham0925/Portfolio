"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { FiArrowUp, FiX } from "react-icons/fi";

import { reply, type Reply } from "@/lib/chatbot/answer";
import { greeting, suggested } from "@/lib/chatbot/knowledge";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Message = { id: number; role: "user" | "bot"; text: string; link?: Reply["link"] };

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: "bot", text: greeting }]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const counter = useRef(1);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    input.current?.focus();
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, reduce]);

  const ask = (question: string) => {
    const text = question.trim().slice(0, 300);
    if (!text || typing) return;
    const answer = reply(text);
    setMessages((current) => [...current, { id: counter.current++, role: "user", text }]);
    setDraft("");
    setTyping(true);
    const delay = reduce ? 0 : Math.min(900, 350 + answer.text.length * 1.2);
    timer.current = window.setTimeout(() => {
      setMessages((current) => [...current, { id: counter.current++, role: "bot", text: answer.text, link: answer.link }]);
      setTyping(false);
    }, delay);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    ask(draft);
  };

  const onKey = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
    }
  };

  return (
    <motion.section
      role="dialog"
      aria-label="Ask Gautham"
      onKeyDown={onKey}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.25, ease: ease.out }}
      style={{ transformOrigin: "bottom right" }}
      className="fixed inset-x-0 bottom-0 z-50 flex max-h-[80dvh] flex-col overflow-hidden rounded-t-[var(--radius-card)] border border-border-strong bg-surface shadow-2xl sm:absolute sm:inset-x-auto sm:bottom-[4.5rem] sm:right-0 sm:h-[32rem] sm:w-[24rem] sm:rounded-[var(--radius-card)]"
    >
      <header className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold">Ask Gautham</h2>
          <p className="text-xs text-muted">Answers come from the verified details on this site. No external AI.</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close chat" className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg">
          <FiX aria-hidden="true" />
        </button>
      </header>
      <div ref={list} role="log" aria-live="polite" aria-relevant="additions" className="flex min-h-48 flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: ease.out }}
            className={cn("max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed", message.role === "user" ? "self-end bg-accent text-accent-fg" : "self-start bg-surface-2 text-fg")}
          >
            <p className="whitespace-pre-line break-words">{message.text}</p>
            {message.link &&
              (message.link.external ? (
                <a href={message.link.href} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-medium text-accent-text underline underline-offset-4">
                  {message.link.label}
                </a>
              ) : (
                <Link href={message.link.href} onClick={onClose} className="mt-2 inline-block font-medium text-accent-text underline underline-offset-4">
                  {message.link.label}
                </Link>
              ))}
          </motion.div>
        ))}
        {typing && (
          <div role="status" aria-label="Assistant is typing" className="flex w-fit gap-1 self-start rounded-2xl bg-surface-2 px-4 py-3.5">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="size-1.5 rounded-full bg-muted" style={{ animation: `typing-dot 1s ease-in-out ${dot * 0.15}s infinite` }} />
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-2 overflow-x-auto px-5 pb-3 [scrollbar-width:none]">
        {suggested.map((question) => (
          <button
            key={question}
            type="button"
            disabled={typing}
            onClick={() => ask(question)}
            className="shrink-0 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-muted transition-[color,border-color,transform] hover:border-border-strong hover:text-fg active:scale-[0.97] disabled:opacity-50"
          >
            {question}
          </button>
        ))}
      </div>
      <form onSubmit={submit} className="flex items-center gap-2 border-t border-border p-3">
        <label htmlFor="chat-input" className="sr-only">
          Your question
        </label>
        <input
          id="chat-input"
          ref={input}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={300}
          autoComplete="off"
          placeholder="Ask about projects, skills, contact…"
          className="h-11 min-w-0 flex-1 rounded-[var(--radius-control)] border border-border-strong bg-bg px-4 text-sm placeholder:text-subtle"
        />
        <button type="submit" aria-label="Send question" disabled={typing || !draft.trim()} className="inline-flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-accent text-accent-fg transition-[transform,opacity] active:scale-95 disabled:opacity-40">
          <FiArrowUp aria-hidden="true" />
        </button>
      </form>
    </motion.section>
  );
}

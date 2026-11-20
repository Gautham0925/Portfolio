"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";

const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const close = () => {
    setOpen(false);
    button.current?.focus();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>{open && <ChatPanel onClose={close} />}</AnimatePresence>
      <div style={{ perspective: 600 }} className={open ? "max-sm:hidden" : undefined}>
        <motion.button
          ref={button}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label={open ? "Close chat" : "Ask Gautham"}
          whileHover={reduce ? undefined : { rotateX: 10, rotateY: -10, y: -2 }}
          whileTap={reduce ? undefined : { scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative inline-flex h-14 items-center gap-2.5 rounded-full bg-accent px-5 font-medium text-accent-fg shadow-[0_10px_30px_-8px_var(--accent),inset_0_1px_0_rgb(255_255_255/0.4),inset_0_-3px_0_rgb(0_0_0/0.18)]"
        >
          <span className="relative size-5">
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={open ? "x" : "chat"}
                initial={reduce ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0"
              >
                {open ? <FiX className="size-5" aria-hidden="true" /> : <FiMessageCircle className="size-5" aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="hidden text-sm sm:inline">{open ? "Close" : "Ask Gautham"}</span>
        </motion.button>
      </div>
    </div>
  );
}

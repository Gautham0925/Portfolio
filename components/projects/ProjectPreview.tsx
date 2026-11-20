"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import { duration, ease } from "@/lib/motion";

type ProjectPreviewProps = {
  overview: string;
  problem: string;
};

export function ProjectPreview({ overview, problem }: ProjectPreviewProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = useId();
  return (
    <div className="relative z-10 flex flex-col gap-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
      >
        Quick look
        <FiChevronDown aria-hidden="true" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: duration.base, ease: ease.out }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface-2 p-4 text-sm leading-relaxed text-muted">
              <p>
                <span className="mb-1 block font-mono text-xs uppercase tracking-wider text-subtle">Overview</span>
                {overview}
              </p>
              <p>
                <span className="mb-1 block font-mono text-xs uppercase tracking-wider text-subtle">Problem</span>
                {problem}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

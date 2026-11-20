"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import type { ArchitectureItem } from "@/lib/content";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ArchitectureDiagram({ items }: { items: readonly ArchitectureItem[] }) {
  const [selected, setSelected] = useState(0);
  const reduce = useReducedMotion();
  const current = items[selected];
  if (!current) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,18rem)_1fr]">
      <div role="tablist" aria-label="System components" aria-orientation="vertical" className="relative flex flex-col gap-2">
        <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-border" />
        {items.map((item, index) => {
          const active = index === selected;
          return (
            <button
              key={item.component}
              type="button"
              role="tab"
              id={`arch-tab-${index}`}
              aria-selected={active}
              aria-controls="arch-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") setSelected((selected + 1) % items.length);
                if (event.key === "ArrowUp") setSelected((selected - 1 + items.length) % items.length);
              }}
              className={cn(
                "relative flex items-center gap-4 rounded-xl border px-3 py-3 text-left transition-colors",
                active ? "border-border-strong bg-surface-2" : "border-transparent hover:bg-surface",
              )}
            >
              <span
                className={cn(
                  "relative z-10 inline-flex size-6 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] transition-colors",
                  active ? "border-accent bg-accent text-accent-fg" : "border-border-strong bg-bg text-muted",
                )}
              >
                {index + 1}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{item.component}</span>
                <span className="block truncate font-mono text-xs text-subtle">{item.technology}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div id="arch-panel" role="tabpanel" aria-labelledby={`arch-tab-${selected}`} className="min-h-48 rounded-[var(--radius-card)] border border-border bg-surface p-6 md:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.component}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast, ease: ease.out }}
            className="flex flex-col gap-4"
          >
            <p className="eyebrow">Component {selected + 1} of {items.length}</p>
            <h3 className="text-2xl font-semibold">{current.component}</h3>
            <p className="font-mono text-sm text-accent-text">{current.technology}</p>
            <p className="max-w-2xl leading-relaxed text-muted">{current.role}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { ease, stagger, stairs } from "@/lib/motion";

type Phase = "idle" | "cover" | "reveal";

export function StairTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [seenPath, setSeenPath] = useState(pathname);
  const target = useRef<string | null>(null);
  const safety = useRef<number | null>(null);

  if (seenPath !== pathname) {
    setSeenPath(pathname);
    if (phase === "cover") setPhase("reveal");
  }

  const clearSafety = () => {
    if (safety.current !== null) {
      window.clearTimeout(safety.current);
      safety.current = null;
    }
  };

  useEffect(() => {
    if (reduce) return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      event.preventDefault();
      target.current = url.pathname + url.search + url.hash;
      setPhase("cover");
      clearSafety();
      safety.current = window.setTimeout(() => setPhase("idle"), stairs.safetyMs);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearSafety();
    };
  }, [reduce]);

  const coverDone = useCallback(() => {
    if (target.current) {
      router.push(target.current);
      target.current = null;
    }
  }, [router]);

  const revealDone = useCallback(() => {
    clearSafety();
    setPhase("idle");
  }, []);

  if (phase === "idle" || reduce) return null;

  const last = stairs.steps - 1;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60] flex">
      {Array.from({ length: stairs.steps }, (_, index) => {
        const order = phase === "cover" ? index : last - index;
        return (
          <motion.div
            key={`${phase}-${index}`}
            className="h-full flex-1 border-r border-border bg-surface-2 last:border-r-0"
            initial={{ y: phase === "cover" ? "100%" : "0%" }}
            animate={{ y: phase === "cover" ? "0%" : "100%" }}
            transition={{ duration: stairs.duration, ease: ease.inOut, delay: order * stagger.stairs }}
            onAnimationComplete={order === last ? (phase === "cover" ? coverDone : revealDone) : undefined}
          />
        );
      })}
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import { duration, ease } from "@/lib/motion";

let hydrated = false;

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const animateIn = hydrated;

  useEffect(() => {
    hydrated = true;
  }, []);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: reduce ? 0 : 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.15 : duration.page, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}

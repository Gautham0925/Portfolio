"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

import { useFinePointer } from "@/hooks/useSceneTier";
import { magnetic, spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
};

export function Magnetic({ children, className }: MagneticProps) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  if (!fine || reduce) return <div className={cn("inline-flex", className)}>{children}</div>;

  const clamp = (value: number) => Math.max(-magnetic.maxPx, Math.min(magnetic.maxPx, value));
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(clamp((event.clientX - (rect.left + rect.width / 2)) * magnetic.strength));
    y.set(clamp((event.clientY - (rect.top + rect.height / 2)) * magnetic.strength));
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div className={cn("inline-flex", className)} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </motion.div>
  );
}

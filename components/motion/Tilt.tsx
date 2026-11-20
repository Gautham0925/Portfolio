"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { ReactNode, PointerEvent } from "react";

import { useFinePointer } from "@/hooks/useSceneTier";
import { hover, spring, tilt } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TiltProps = {
  children: ReactNode;
  className?: string;
};

export function Tilt({ children, className }: TiltProps) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduce;
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotateY = useTransform(sx, [0, 1], [-tilt.maxDeg, tilt.maxDeg]);
  const rotateX = useTransform(sy, [0, 1], [tilt.maxDeg, -tilt.maxDeg]);
  const glare = useTransform([sx, sy], ([x, y]) => `radial-gradient(420px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgb(255 255 255 / 0.07), transparent 60%)`);
  const shadowX = useTransform(sx, [0, 1], [14, -14]);
  const shadowY = useTransform(sy, [0, 1], [14, -14]);

  if (!enabled) return <div className={className}>{children}</div>;

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className={cn("relative", className)} style={{ perspective: tilt.perspective }} onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 -z-10 rounded-[var(--radius-card)] bg-black/30 blur-xl"
        style={{ x: shadowX, y: shadowY, opacity: 0.5 }}
      />
      <motion.div className="relative h-full" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} whileHover={{ y: hover.lift }} transition={{ duration: 0.2 }}>
        {children}
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)]" style={{ background: glare, transform: "translateZ(1px)" }} />
      </motion.div>
    </div>
  );
}

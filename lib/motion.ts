import type { Variants } from "framer-motion";

export const ease = {
  out: [0.2, 0.7, 0.2, 1],
  inOut: [0.65, 0, 0.35, 1],
  in: [0.4, 0, 1, 1],
} as const;

export const duration = {
  fast: 0.2,
  base: 0.45,
  slow: 0.7,
  page: 0.35,
} as const;

export const stagger = {
  children: 0.08,
  stairs: 0.05,
} as const;

export const stairs = {
  steps: 6,
  duration: 0.32,
  safetyMs: 2500,
} as const;

export const reveal = {
  distance: 18,
  amount: 0.2,
  margin: "0px 0px -8% 0px",
} as const;

export const hover = {
  lift: -4,
  press: 0.97,
} as const;

export const tilt = {
  maxDeg: 6,
  perspective: 900,
} as const;

export const magnetic = {
  strength: 0.25,
  maxPx: 10,
} as const;

export const spring = {
  stiffness: 220,
  damping: 22,
  mass: 0.6,
} as const;

export type SceneTier = "desktop" | "tablet" | "mobile";

export const scene = {
  desktop: { nodes: 52, neighbours: 3, particles: 42, floaters: 6, dpr: [1, 1.75], antialias: true },
  tablet: { nodes: 34, neighbours: 2, particles: 18, floaters: 4, dpr: [1, 1.5], antialias: false },
  mobile: { nodes: 22, neighbours: 2, particles: 0, floaters: 0, dpr: [1, 1.25], antialias: false },
  connectSeconds: 1.8,
  parallax: 0.55,
  lowFpsThreshold: 18,
  lowFpsSeconds: 3,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: reveal.distance },
  visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: ease.out } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger.children, delayChildren: 0.05 } },
};

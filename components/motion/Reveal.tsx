"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

import { fadeUp, reveal, staggerContainer } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div">;

export function Reveal({ children, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={props.className as string | undefined}>{children as React.ReactNode}</div>;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: reveal.amount, margin: reveal.margin }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({ children, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={props.className as string | undefined}>{children as React.ReactNode}</div>;
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: reveal.amount, margin: reveal.margin }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={props.className as string | undefined}>{children as React.ReactNode}</div>;
  return (
    <motion.div variants={fadeUp} {...props}>
      {children}
    </motion.div>
  );
}

"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type CounterProps = {
  value: number;
  className?: string;
  seconds?: number;
};

export function Counter({ value, className, seconds = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  useLayoutEffect(() => {
    if (reduce) return;
    const frame = requestAnimationFrame(() => {
      setDisplay(0);
      setArmed(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [reduce]);

  useEffect(() => {
    if (!armed || !inView || reduce) return;
    const controls = animate(0, value, {
      duration: seconds,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [armed, inView, reduce, value, seconds]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true" className="tabular-nums">
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

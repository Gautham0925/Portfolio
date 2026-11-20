"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Experience } from "@/lib/content";
import { duration, ease } from "@/lib/motion";

export function ExperienceTimeline({ items }: { items: readonly Experience[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  if (items.length === 0) return null;
  return (
    <section aria-labelledby="experience-title" className="mt-24 flex flex-col gap-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Experience" title={<span id="experience-title">Where I have worked</span>} />
        <Link href="/resume" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-fg">
          <span className="link-underline">Full resume</span>
          <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
      <ol ref={ref} className="relative flex flex-col gap-6 pl-8">
        <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
        <motion.span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent" style={{ scaleY: reduce ? 1 : scaleY }} />
        {items.map((item) => (
          <motion.li
            key={`${item.organization}-${item.period}`}
            className="relative"
            initial={reduce ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: duration.base, ease: ease.out }}
          >
            <span aria-hidden="true" className="absolute -left-[31px] top-7 size-3.5 rounded-full border-2 border-accent bg-bg" />
            <Card className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold">{item.role}</h3>
                  <p className="text-sm text-muted">{item.organization}</p>
                </div>
                <p className="font-mono text-xs text-subtle">{item.period}</p>
              </div>
              {item.highlights && item.highlights.length > 0 && (
                <ul className="flex flex-col gap-2 border-t border-border pt-4">
                  {item.highlights.slice(0, 2).map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

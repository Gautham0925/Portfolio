"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import { FiArrowLeft, FiArrowRight, FiGithub } from "react-icons/fi";

import { Tilt } from "@/components/motion/Tilt";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatMonth, type Project } from "@/lib/content";
import { duration, ease } from "@/lib/motion";

type ProjectSliderProps = {
  projects: readonly Project[];
};

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectSlider({ projects }: ProjectSliderProps) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotion();
  const project = projects[index];
  if (!project) return null;

  const go = (step: number) => setState(([current]) => [(current + step + projects.length) % projects.length, step]);
  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") go(1);
    if (event.key === "ArrowLeft") go(-1);
  };
  const shift = reduce ? 0 : 36;

  return (
    <div role="group" aria-roledescription="carousel" aria-label="Featured projects" onKeyDown={onKey} className="flex flex-col gap-6">
      <div className="grid min-h-[26rem] gap-6 lg:grid-cols-2">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={project.slug}
            custom={direction}
            initial={{ opacity: 0, x: direction * shift }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * shift }}
            transition={{ duration: duration.base, ease: ease.out }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            dragDirectionLock
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              if (info.offset.x > 80) go(-1);
            }}
            className="contents"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${projects.length}`}
          >
            <div className="flex flex-col justify-between gap-6" aria-live="polite">
              <div className="flex flex-col gap-4">
                <p aria-hidden="true" className="select-none text-7xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_var(--border-strong)] md:text-8xl">
                  {pad(index + 1)}
                </p>
                <p className="eyebrow">{project.category}</p>
                <h3 className="text-3xl font-semibold md:text-4xl">{project.title}</h3>
                <p className="max-w-lg leading-relaxed text-muted">{project.summary}</p>
                <ul className="flex flex-wrap gap-2" aria-label="Technology stack">
                  {project.stack.slice(0, 6).map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild>
                  <Link href={`/projects/${project.slug}`}>
                    Case study
                    <FiArrowRight aria-hidden="true" />
                  </Link>
                </Button>
                {project.github && (
                  <Button asChild variant="secondary">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <FiGithub aria-hidden="true" />
                      Source
                      <span className="sr-only">code for {project.title} (opens in new tab)</span>
                    </a>
                  </Button>
                )}
                <span className="font-mono text-xs text-subtle">Updated {formatMonth(project.updated)}</span>
              </div>
            </div>
            <Tilt className="h-full">
              <Card className="bg-grid relative flex h-full min-h-72 flex-col justify-between gap-6 overflow-hidden bg-surface-2 p-6 md:p-8">
                <p className="font-mono text-xs text-subtle">/{project.slug}</p>
                <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {project.highlights.map((item) => (
                    <li key={item.label} className="rounded-xl border border-border bg-surface p-4">
                      <p className="font-mono text-2xl font-semibold text-accent-text">{item.value}</p>
                      <p className="mt-1 text-xs leading-snug text-muted">{item.label}</p>
                    </li>
                  ))}
                </ul>
              </Card>
            </Tilt>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
        <div className="flex items-center gap-2" role="group" aria-label="Choose project">
          {projects.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              aria-label={`Show ${item.title}`}
              aria-current={i === index}
              onClick={() => setState([i, i > index ? 1 : -1])}
              className="group flex h-8 items-center"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-accent" : "w-3 bg-border-strong group-hover:bg-muted"}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="icon" onClick={() => go(-1)} aria-label="Previous project">
            <FiArrowLeft aria-hidden="true" />
          </Button>
          <Button variant="secondary" size="icon" onClick={() => go(1)} aria-label="Next project">
            <FiArrowRight aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}

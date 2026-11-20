"use client";

import { useReducedMotion } from "framer-motion";
import { useRef, useState, type PointerEvent } from "react";

import { Badge } from "@/components/ui/Badge";
import { useFinePointer } from "@/hooks/useSceneTier";
import type { SkillGroup } from "@/lib/content";
import { cn } from "@/lib/utils";

type TechFieldProps = {
  groups: readonly SkillGroup[];
};

export function TechField({ groups }: TechFieldProps) {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const layer = useRef<HTMLUListElement>(null);
  const tilt = fine && !reduce;

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = layer.current;
    if (!el || !tilt) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    if (layer.current) layer.current.style.transform = "";
  };

  const items = groups.flatMap((group) => group.items.map((item) => ({ item, group: group.group })));

  return (
    <div className="flex flex-col gap-6">
      <div role="group" aria-label="Filter tools by area" className="flex flex-wrap gap-2">
        {[null, ...groups.map((g) => g.group)].map((name) => {
          const pressed = active === name;
          return (
            <button
              key={name ?? "all"}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(name)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 font-mono text-xs transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.97]",
                pressed ? "border-transparent bg-accent text-accent-fg" : "border-border bg-surface text-muted hover:border-border-strong hover:text-fg",
              )}
            >
              {name ?? "All"}
            </button>
          );
        })}
      </div>
      <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 md:p-8" style={{ perspective: 900 }} onPointerMove={onMove} onPointerLeave={onLeave}>
        <ul
          ref={layer}
          aria-label="Tools and technologies"
          className="flex flex-wrap gap-3 transition-transform duration-300 ease-out"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map(({ item, group }, index) => {
            const dim = active !== null && active !== group;
            return (
              <li
                key={`${group}-${item}`}
                className={cn("transition-opacity duration-300", dim ? "opacity-25" : "opacity-100")}
                style={{ transform: `translateZ(${(index % 4) * 8}px)`, animation: `float-chip ${5 + (index % 5)}s ease-in-out ${(index % 7) * -0.7}s infinite` }}
              >
                <Badge size="md" tone={active === group ? "accent" : "neutral"} className="transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:text-fg">
                  {item}
                </Badge>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

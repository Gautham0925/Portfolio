"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/site";

type NavLinksProps = {
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
};

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLinks({ orientation = "horizontal", onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const group = orientation === "horizontal" ? "nav-pill-h" : "nav-pill-v";
  return (
    <ul className={cn("flex", orientation === "horizontal" ? "items-center gap-1" : "flex-col gap-1")}>
      {navLinks.map((link) => {
        const active = isActivePath(pathname, link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                orientation === "vertical" && "px-4 py-3 text-base",
                active ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {active && (
                <motion.span
                  layoutId={group}
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-lg bg-surface-2"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="link-underline">{link.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

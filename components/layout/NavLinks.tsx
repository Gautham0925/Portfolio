"use client";

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
                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                orientation === "vertical" && "px-4 py-3 text-base",
                active ? "bg-surface-2 text-fg" : "text-muted hover:text-fg",
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

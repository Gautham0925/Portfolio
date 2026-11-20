"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navLinks } from "./navLinks";

const Nav = () => {
  const currentPath = usePathname();
  return (
    <nav aria-label="Main" className="flex gap-8">
      {navLinks.map((link) => {
        const active = link.path === currentPath;
        return (
          <Link
            href={link.path}
            key={link.path}
            aria-current={active ? "page" : undefined}
            className={cn(
              "capitalize font-medium hover:text-accent transition-all",
              active && "text-accent border-b-2 border-accent",
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;

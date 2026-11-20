"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { navLinks } from "./navLinks";

const MobileNav = () => {
  const currentPath = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center" aria-label="Open menu">
        <CiMenuFries className="text-[32px] text-accent" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <SheetDescription className="sr-only">Site pages</SheetDescription>
        <div className="mt-32 mb-32 text-2xl text-center">
          <Link href="/" className="text-3xl font-semibold">
            <span className="gradient-text">Gautham</span>
          </Link>
        </div>
        <nav aria-label="Mobile" className="flex flex-col gap-8 text-2xl text-center">
          {navLinks.map((link) => {
            const active = link.path === currentPath;
            return (
              <div key={link.path}>
                <Link
                  href={link.path}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-xl capitalize hover:text-accent transition-all",
                    active && "text-accent border-b-2 border-accent",
                  )}
                >
                  {link.name}
                </Link>
              </div>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

import Link from "next/link";

import { site } from "@/lib/site";

export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5 font-mono text-sm font-semibold" aria-label={`${site.name} — home`}>
      <span
        aria-hidden="true"
        className="inline-flex size-8 items-center justify-center rounded-lg bg-accent text-accent-fg transition-transform group-hover:-rotate-6"
      >
        GK
      </span>
      <span className="hidden sm:inline">{site.shortName.toLowerCase()}<span className="text-accent-text">.sec</span></span>
    </Link>
  );
}

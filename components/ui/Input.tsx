import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-[var(--radius-control)] border border-border bg-bg px-4 text-base text-fg placeholder:text-subtle transition-colors hover:border-border-strong focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 aria-[invalid=true]:border-danger disabled:opacity-50";

function Input({ className, type = "text", ...props }: ComponentProps<"input">) {
  return <input type={type} className={cn(fieldBase, "h-11", className)} {...props} />;
}

export { Input, fieldBase };

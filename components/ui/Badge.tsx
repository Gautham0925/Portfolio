import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1.5 rounded-full border font-mono text-xs leading-none", {
  variants: {
    tone: {
      neutral: "border-border bg-surface-2 text-muted",
      accent: "border-transparent bg-accent-soft text-accent-text",
      info: "border-transparent bg-info-soft text-info",
    },
    size: {
      sm: "px-2.5 py-1",
      md: "px-3 py-1.5",
    },
  },
  defaultVariants: {
    tone: "neutral",
    size: "sm",
  },
});

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

function Badge({ className, tone, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, size, className }))} {...props} />;
}

export { Badge };

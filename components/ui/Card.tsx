import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type CardProps = ComponentProps<"div"> & {
  interactive?: boolean;
};

function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-border bg-surface p-6",
        interactive && "transition-colors hover:border-border-strong",
        className,
      )}
      {...props}
    />
  );
}

export { Card };

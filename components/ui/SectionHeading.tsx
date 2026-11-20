import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

function SectionHeading({ eyebrow, title, description, as: Tag = "h2", className }: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-3", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={cn("font-semibold", Tag === "h1" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl")}>{title}</Tag>
      {description && <p className="text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </div>
  );
}

export { SectionHeading };

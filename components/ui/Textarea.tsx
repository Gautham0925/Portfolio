import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { fieldBase } from "./Input";

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(fieldBase, "min-h-40 resize-y py-3", className)} {...props} />;
}

export { Textarea };

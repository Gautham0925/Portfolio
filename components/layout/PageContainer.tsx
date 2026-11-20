import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PageContainer({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-page animate-rise pt-12 md:pt-20", className)}>{children}</div>;
}

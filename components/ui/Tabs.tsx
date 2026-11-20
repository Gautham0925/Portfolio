"use client";

import type { ComponentProps } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "flex gap-1 overflow-x-auto rounded-[var(--radius-control)] border border-border bg-surface p-1 [scrollbar-width:none]",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-fg data-[state=active]:bg-surface-2 data-[state=active]:text-fg",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("mt-8 animate-rise", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

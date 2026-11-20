"use client";

import type { SceneTier } from "@/lib/motion";
import { useMediaQuery } from "./useMediaQuery";

export function useSceneTier(): SceneTier {
  const desktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const tablet = useMediaQuery("(min-width: 640px)");
  if (desktop) return "desktop";
  if (tablet) return "tablet";
  return "mobile";
}

export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

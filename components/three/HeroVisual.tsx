"use client";

import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";

import { useSceneTier } from "@/hooks/useSceneTier";
import { useTheme } from "@/hooks/useTheme";
import { HeroFallback } from "./HeroFallback";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

let webglCache: boolean | null = null;

function detectWebGL() {
  if (webglCache !== null) return webglCache;
  try {
    const canvas = document.createElement("canvas");
    webglCache = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    webglCache = false;
  }
  return webglCache;
}

const noopSubscribe = () => () => {};

export function HeroVisual() {
  const reduce = useReducedMotion();
  const tier = useSceneTier();
  const { theme } = useTheme();
  const webgl = useSyncExternalStore(noopSubscribe, detectWebGL, () => false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 250));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => setArmed(true));
    return () => cancel(handle as number);
  }, []);

  useEffect(() => {
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: 0 });
    observer.observe(container);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [container]);

  const useScene = webgl && !reduce && !slow;

  return (
    <div ref={setContainer} role="img" aria-label="Interactive illustration of a security shield surrounded by a connected network of nodes" className="absolute inset-0">
      <div className={`absolute inset-0 transition-opacity duration-700 ${useScene && ready ? "opacity-0" : "opacity-60"}`}>
        <HeroFallback />
      </div>
      {useScene && armed && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene theme={theme} tier={tier} active={visible && tabVisible} onReady={() => setReady(true)} onSlow={() => setSlow(true)} eventSource={container?.parentElement} />
        </div>
      )}
    </div>
  );
}

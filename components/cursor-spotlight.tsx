"use client";

import React, { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

/**
 * Full-viewport subtle radial highlight that follows the pointer.
 * Sits above the page background, below content (sibling z-index in layout).
 */
export function CursorSpotlight() {
  const layerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = layerRef.current;
    if (!el) return;

    const update = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      el.style.setProperty("--cursor-x", `${x}%`);
      el.style.setProperty("--cursor-y", `${y}%`);
    };

    window.addEventListener("pointermove", update, { passive: true });
    return () => window.removeEventListener("pointermove", update);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-0 z-[2]"
      style={{
        background:
          "radial-gradient(720px circle at var(--cursor-x, 50%) var(--cursor-y, 42%), rgba(250,250,249,0.065), transparent 62%)",
      }}
      aria-hidden
    />
  );
}

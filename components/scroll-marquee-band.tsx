"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

const LINE_A =
  "FULL STACK — REACT — NEXT.JS — TYPESCRIPT — NODE — CRAFT — ";
const LINE_B =
  "WEB — APIS — PERFORMANCE — ACCESSIBILITY — MOTION — ";

/**
 * Foreground strip between achievements and projects: scroll-scrubbed horizontal type.
 */
export function ScrollMarqueeBand() {
  const bandRef = useRef<HTMLElement>(null);
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !bandRef.current || !rowARef.current || !rowBRef.current)
      return;
    registerGsap();

    const ctx = gsap.context(() => {
      gsap.to(rowARef.current, {
        xPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: bandRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.05,
        },
      });

      gsap.to(rowBRef.current, {
        xPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: bandRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.75,
        },
      });
    }, bandRef);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) return null;

  return (
    <section
      ref={bandRef}
      className="relative z-10 w-full overflow-hidden border-y border-stone-800/60 bg-zinc-950/25 py-8 md:py-10 my-2"
      aria-hidden
    >
      <div className="pointer-events-none -mx-4 md:mx-0">
        <div className="mb-3 overflow-hidden opacity-[0.14] md:opacity-[0.12]">
          <div
            ref={rowARef}
            className="whitespace-nowrap text-[clamp(1.75rem,6vw,3.5rem)] font-semibold tracking-tight text-stone-100"
          >
            {Array(3)
              .fill(LINE_A)
              .map((t, i) => (
                <span key={i}>{t}</span>
              ))}
          </div>
        </div>
        <div className="overflow-hidden opacity-[0.1] md:opacity-[0.09]">
          <div
            ref={rowBRef}
            className="whitespace-nowrap text-[clamp(1.5rem,5vw,2.75rem)] font-medium tracking-tight text-stone-300"
          >
            {Array(3)
              .fill(LINE_B)
              .map((t, i) => (
                <span key={i}>{t}</span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!marqueeRef.current || reduced) return;
    registerGsap();
    const main = document.getElementById("page-root");
    if (!main) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: main,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
      });
    }, footerRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer
      ref={footerRef}
      className="footer relative z-10 mt-auto mb-10 overflow-hidden border-t border-stone-800/90 text-stone-400 md:mb-16"
    >
      {!reduced && (
        <div
          className="pointer-events-none absolute bottom-4 left-0 right-0 overflow-hidden opacity-[0.06]"
          aria-hidden
        >
          <div
            ref={marqueeRef}
            className="whitespace-nowrap pl-4 text-[clamp(1.5rem,4vw,2.25rem)] font-light tracking-[0.35em] text-stone-100"
          >
            {Array(5)
              .fill("OPEN TO OPPORTUNITIES — CRAFT — MOTION — WEB — ")
              .map((t, i) => (
                <span key={i}>{t}</span>
              ))}
          </div>
        </div>
      )}
      <div className="container relative z-10 px-6 pb-14 pt-10 md:pb-16 md:pt-12">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <span className="text-sm font-medium tracking-tight text-stone-300">
            {"<Muhidin Misbah />"}
          </span>
          <p className="text-sm text-stone-600">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

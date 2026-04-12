"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!lineRef.current || !footerRef.current || reduced) return;
    registerGsap();
    const path = lineRef.current;
    const len = path.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.set(path, {
        strokeDasharray: len,
        strokeDashoffset: len,
      });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 94%",
          once: true,
        },
      });
    }, footerRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <footer
      ref={footerRef}
      className="footer border z-10 border-t border-stone-800/90 border-l-transparent border-r-transparent text-stone-400 mt-auto"
    >
      <div className="container px-6 py-10 md:py-12">
        <svg
          className="w-full h-3 mb-8 text-stone-700"
          viewBox="0 0 1200 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            ref={lineRef}
            d="M0 4 H1200"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <span className="text-stone-300 text-sm font-medium tracking-tight">
            {"<Muhidin Misbah />"}
          </span>
          <p className="text-stone-600 text-sm">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

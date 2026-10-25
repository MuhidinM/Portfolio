"use client";

import Link from "next/link";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./menu-overlay";
import { navLinks } from "@/constants";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const logoRef = useRef<HTMLSpanElement>(null);
  const mobileListRef = useRef<HTMLUListElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!logoRef.current || reduced) return;
    registerGsap();
    const el = logoRef.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.22);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  useLayoutEffect(() => {
    if (!mobileListRef.current || reduced || !navbarOpen) return;
    registerGsap();
    gsap.fromTo(
      mobileListRef.current.querySelectorAll("li"),
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.38, stagger: 0.07, ease: "power2.out" }
    );
  }, [navbarOpen, reduced]);

  useLayoutEffect(() => {
    mobileListRef.current?.toggleAttribute("inert", !navbarOpen);
  }, [navbarOpen]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="glass mx-auto max-w-6xl !rounded-2xl">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <Link
            href="/"
            className="inline-block text-xl font-semibold tracking-tight text-zinc-50 md:text-2xl"
          >
            <span ref={logoRef} className="inline-block will-change-transform">
              {"<"}
              <span className="text-cobalt-300">Muhidin</span>
              {" />"}
            </span>
          </Link>
          <button
            type="button"
            aria-label={navbarOpen ? "Close menu" : "Open menu"}
            aria-expanded={navbarOpen}
            aria-controls="mobile-menu"
            onClick={() => setNavbarOpen((o) => !o)}
            className="glass-key h-10 w-10 md:hidden"
          >
            {navbarOpen ? (
              <XMarkIcon className="h-5 w-5" aria-hidden />
            ) : (
              <Bars3Icon className="h-5 w-5" aria-hidden />
            )}
          </button>
          <ul className="hidden items-center gap-1 md:flex">
            <MenuOverlay links={navLinks} />
          </ul>
        </div>
        <ul
          ref={mobileListRef}
          id="mobile-menu"
          className={`flex flex-col items-stretch gap-1 overflow-hidden px-3 transition-[max-height,padding] duration-300 ease-out md:hidden ${
            navbarOpen ? "max-h-64 pb-3" : "max-h-0 pb-0"
          }`}
        >
          <MenuOverlay links={navLinks} onNavigate={() => setNavbarOpen(false)} />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

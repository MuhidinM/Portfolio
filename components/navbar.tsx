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
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const mobileListRef = useRef<HTMLUListElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!navRef.current || reduced) return;
    registerGsap();
    const nav = navRef.current;
    const home = document.getElementById("home");
    if (!home) return;

    const ctx = gsap.context(() => {
      gsap.to(nav, {
        backgroundColor: "rgba(9, 9, 11, 0.9)",
        backdropFilter: "blur(12px)",
        borderColor: "rgba(63, 63, 70, 0.9)",
        ease: "none",
        scrollTrigger: {
          trigger: home,
          start: "bottom 88px",
          end: "bottom 40px",
          scrub: 0.65,
        },
      });
    }, navRef);
    return () => ctx.revert();
  }, [reduced]);

  useLayoutEffect(() => {
    if (!logoRef.current || reduced) return;
    registerGsap();
    const el = logoRef.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      xTo((e.clientX - cx) * 0.22);
      yTo((e.clientY - cy) * 0.22);
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
    if (!mobileListRef.current || reduced) return;
    registerGsap();
    const items = mobileListRef.current.querySelectorAll("li");
    if (!items.length) return;
    if (navbarOpen) {
      gsap.fromTo(
        items,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.38,
          stagger: 0.07,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(items, {
        opacity: 0,
        y: -6,
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.in",
      });
    }
  }, [navbarOpen, reduced]);

  return (
    <nav
      ref={navRef}
      className="fixed mx-auto border border-zinc-800/80 top-0 left-0 right-0 z-50 bg-[#121212]/95 supports-[backdrop-filter]:bg-[#121212]/88 transition-colors"
    >
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-4xl text-stone-100 font-semibold tracking-tight inline-block will-change-transform"
        >
          <span ref={logoRef} className="inline-block">
            {"<"}
            <span className="text-stone-400">Muhidin</span>
            {" />"}
          </span>
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              type="button"
              aria-expanded={false}
              aria-controls="mobile-menu"
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded-md border-stone-600 text-stone-300 hover:text-stone-100 hover:border-stone-500"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              aria-expanded={true}
              aria-controls="mobile-menu"
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded-md border-stone-600 text-stone-300 hover:text-stone-100 hover:border-stone-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            <MenuOverlay links={navLinks} />
          </ul>
        </div>
      </div>
      <ul
        ref={mobileListRef}
        id="mobile-menu"
        className={`flex flex-col items-center md:hidden border-t border-zinc-800/90 overflow-hidden transition-[max-height] duration-300 ease-out ${
          navbarOpen
            ? "max-h-[min(24rem,70vh)] py-4 opacity-100"
            : "max-h-0 py-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!navbarOpen}
      >
        <MenuOverlay links={navLinks} />
      </ul>
    </nav>
  );
};

export default Navbar;

"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { heroMobile } from "@/constants";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap-client";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import KeycapOrb, { type Keycap } from "@/components/ui/keycap-orb";

// Centre first: the stack from the CV, spiralling outward.
const ORB_KEYS: Keycap[] = [
  { label: "TS", finish: "cobalt", hotkey: "t" },
  { label: "React", finish: "ink", hotkey: "r" },
  { icon: "terminal", finish: "ash" },
  { label: "Next", finish: "ink", hotkey: "n" },
  { label: "K8s", finish: "ash", hotkey: "k" },
  { icon: "braces", finish: "ink" },
  { label: "SQL", finish: "glass", hotkey: "s" },
  { icon: "gear", finish: "ink" },
  { label: "Node", finish: "ash" },
  { icon: "code", finish: "ink" },
  { label: "CI", finish: "lime", hotkey: "c" },
  { icon: "layers", finish: "glass" },
  { label: "API", finish: "ink", hotkey: "a" },
  { icon: "shield", finish: "ash" },
  { icon: "cube", finish: "glass" },
  { icon: "check", finish: "lime" },
  { label: "Git", finish: "ink", hotkey: "g" },
  { icon: "hash", finish: "cobalt" },
  { label: "⌘", finish: "ash" },
  { label: "Esc", finish: "lime", hotkey: "Escape" },
  // The rest of the ball, one cap per slot (82 at the default 9 rings), so no
  // legend repeats.
  { label: "JS", finish: "glass", hotkey: "j" },
  { icon: "search", finish: "ash" },
  { label: "HTML", finish: "glass", hotkey: "h" },
  { label: "CSS", finish: "ash" },
  { icon: "bolt", finish: "ash" },
  { label: "Redux", finish: "ash" },
  { label: "Nest", finish: "ink" },
  { icon: "chevrons", finish: "lime" },
  { label: "REST", finish: "cobalt" },
  { label: "GQL", finish: "lime" },
  { icon: "folder", finish: "lime" },
  { label: "PG", finish: "glass", hotkey: "p" },
  { label: "Redis", finish: "glass" },
  { label: "Mongo", finish: "ink", hotkey: "m" },
  { icon: "cursor", finish: "ash" },
  { label: "Docker", finish: "ash", hotkey: "d" },
  { label: "AWS", finish: "lime", hotkey: "w" },
  { label: "Linux", finish: "ink", hotkey: "l" },
  { icon: "at", finish: "lime" },
  { label: "YAML", finish: "ash", hotkey: "y" },
  { label: "Bash", finish: "lime", hotkey: "b" },
  { label: "Helm", finish: "ink" },
  { icon: "pen", finish: "ink" },
  { label: "JWT", finish: "ink" },
  { label: "RBAC", finish: "ash" },
  { label: "JSON", finish: "ash" },
  { icon: "frame", finish: "ink" },
  { label: "MySQL", finish: "ink" },
  { label: "Supa", finish: "lime" },
  { label: "Query", finish: "cobalt", hotkey: "q" },
  { icon: "quote", finish: "ink" },
  { label: "Vercel", finish: "ink", hotkey: "v" },
  { label: "Nginx", finish: "ash" },
  { label: "Sentry", finish: "ash" },
  { icon: "slash", finish: "glass" },
  { label: "Graf", finish: "cobalt" },
  { label: "Prom", finish: "ink" },
  { label: "HTTP", finish: "ash" },
  { icon: "star", finish: "ink" },
  { label: "pnpm", finish: "ink" },
  { label: "Zod", finish: "ash", hotkey: "z" },
  { label: "Tab", finish: "lime" },
  { icon: "arrow", finish: "ash" },
  { label: "Shift", finish: "lime", hotkey: "Shift" },
  { label: "Ctrl", finish: "ink", hotkey: "Control" },
  { label: "Alt", finish: "cobalt", hotkey: "Alt" },
  { icon: "plus", finish: "cobalt" },
  { label: "Enter", finish: "glass", hotkey: "Enter" },
  { label: "⌫", finish: "ink", hotkey: "Backspace" },
  { label: "Fn", finish: "ash", hotkey: "f" },
  { icon: "heart", finish: "ink" },
  { label: "←", finish: "lime", hotkey: "ArrowLeft" },
  { label: "→", finish: "cobalt", hotkey: "ArrowRight" },
  { label: "↑", finish: "ink", hotkey: "ArrowUp" },
  { label: "↓", finish: "ash", hotkey: "ArrowDown" },
  { label: "⌥", finish: "cobalt" },
  { label: "=>", finish: "cobalt" },
  { label: "&&", finish: "ink" },
  { label: "λ", finish: "lime" },
  { label: "[ ]", finish: "glass" },
  { label: "$", finish: "ash" },
  { label: "0x", finish: "lime", hotkey: "0" },
];

// Short words of similar length, so the rotating line never wraps or
// changes the hero height.
const ROLES = ["Muhidin.", "a builder.", "full-stack."];

const HeroSection = () => {
  const rootRef = useRef<HTMLElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hireRef = useRef<HTMLSpanElement>(null);
  const cvRef = useRef<HTMLSpanElement>(null);
  const avatarWrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!rootRef.current || reduced) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(rootRef);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(
        q(".hero-word"),
        {
          opacity: 0,
          y: 40,
          rotateX: -42,
          stagger: 0.09,
          duration: 0.62,
          transformOrigin: "50% 100%",
        },
        0
      )
        .from(
          roleRef.current,
          { opacity: 0, y: 22, duration: 0.55 },
          "-=0.28"
        )
        .from(subRef.current, { opacity: 0, y: 16, duration: 0.5 }, "-=0.32")
        .from(
          ctaRef.current?.children || [],
          { opacity: 0, y: 12, duration: 0.45, stagger: 0.1 },
          "-=0.28"
        )
        .from(
          avatarWrapRef.current,
          { opacity: 0, scale: 0.94, duration: 0.7 },
          "-=0.5"
        );

      const roleEl = roleRef.current;
      if (roleEl) {
        let idx = 0;
        gsap.delayedCall(1.35, () => {
          gsap
            .timeline({ repeat: -1, repeatDelay: 0.4 })
            .to(roleEl, { opacity: 0, duration: 0.35, ease: "power2.in" })
            .call(() => {
              idx = (idx + 1) % ROLES.length;
              roleEl.textContent = ROLES[idx];
            })
            .to(roleEl, { opacity: 1, duration: 0.4, ease: "power2.out" })
            .to({}, { duration: 1.35 });
        });
      }

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(q(".hero-word-line"), {
            y: p * 12,
            opacity: 1 - p * 0.22,
          });
          gsap.set(subRef.current, {
            y: p * 14,
            opacity: 1 - p * 0.25,
          });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  useLayoutEffect(() => {
    if (reduced || !hireRef.current || !cvRef.current) return;
    registerGsap();
    const strength = 0.22;

    const magnetic = (el: HTMLElement) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        xTo(dx);
        yTo(dy);
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
    };

    const a = magnetic(hireRef.current);
    const b = magnetic(cvRef.current);
    return () => {
      a();
      b();
    };
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative overflow-visible pt-8 lg:py-16 [perspective:1200px]"
    >
      <div className="relative z-10 grid grid-cols-1 items-center gap-10 sm:grid-cols-12">
        <div className="min-w-0 text-center sm:col-span-7 sm:text-left">
          <h1 className="mb-6 text-5xl font-semibold leading-[1.05] tracking-tight text-zinc-50 sm:text-6xl lg:text-7xl">
            <span className="hero-word-line block [transform-style:preserve-3d]">
              <span className="hero-word inline-block text-zinc-400">Hello,</span>{" "}
              <span className="hero-word inline-block text-zinc-400">I&apos;m</span>
            </span>
            <span
              ref={roleRef}
              className="block whitespace-nowrap bg-gradient-to-r from-zinc-50 via-cobalt-200 to-cobalt-400 bg-clip-text text-transparent"
            >
              {ROLES[0]}
            </span>
          </h1>
          <p
            ref={subRef}
            className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-zinc-400 sm:mx-0"
          >
            {heroMobile}
          </p>
          <div
            ref={ctaRef}
            className="relative z-20 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Link href="/#contact" className="inline-block rounded-2xl">
              <span
                ref={hireRef}
                className="glass-key glass-key-primary w-full px-6 py-3 font-medium will-change-transform sm:w-auto"
              >
                Get in touch
              </span>
            </Link>
            <a href="/MuhidinMisbah.pdf" download className="inline-block rounded-2xl">
              <span
                ref={cvRef}
                className="glass-key w-full px-6 py-3 font-medium will-change-transform sm:w-auto"
              >
                Download CV
              </span>
            </a>
          </div>
        </div>
        <div className="w-full sm:col-span-5">
          <div
            ref={avatarWrapRef}
            className="relative mx-auto w-full max-w-[460px] [container-type:inline-size] [--orb-max:360px] lg:[--orb-max:460px] [mask-image:radial-gradient(closest-side,black_72%,transparent)]"
          >
            <KeycapOrb
              keys={ORB_KEYS}
              background="#121212"
              height="min(100cqw, var(--orb-max))"
              scale={0.78}
              speed={0.8}
              aria-label="Interactive ball of keycaps showing my stack. Drag to spin it, or focus it and type."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

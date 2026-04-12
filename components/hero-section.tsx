"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { handleDownload } from "@/lib/download";
import { heroMobile } from "@/constants";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap-client";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

const ROLES = ["<Muhidin />", "Web Developer", "UI/UX Designer"];

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

      if (avatarWrapRef.current) {
        gsap.to(avatarWrapRef.current, {
          y: 8,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
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
      className="relative overflow-visible lg:py-16 [perspective:1200px]"
    >
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-8 min-w-0 place-self-center text-center sm:text-left justify-self-start overflow-visible">
          <h1 className="text-stone-100 mb-4 text-4xl sm:text-5xl lg:text-7xl xl:text-8xl lg:leading-[1.08] font-semibold tracking-tight">
            <span className="hero-word-line block [transform-style:preserve-3d]">
              <span className="hero-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-stone-300 via-stone-200 to-stone-500">
                Hello,
              </span>{" "}
              <span className="hero-word inline-block text-transparent bg-clip-text bg-gradient-to-r from-stone-300 via-stone-200 to-stone-500">
                I&apos;m
              </span>
            </span>
            <span ref={roleRef} className="block mt-1 text-stone-100">
              {ROLES[0]}
            </span>
          </h1>
          <p
            ref={subRef}
            className="text-stone-500 text-base sm:text-lg mb-8 lg:text-xl max-w-xl leading-relaxed"
          >
            {heroMobile}
          </p>
          <div
            ref={ctaRef}
            className="relative z-20 flex flex-col gap-3 overflow-visible py-2 sm:flex-row sm:gap-4 sm:items-start"
          >
            <Link
              href="/#contact"
              className="inline-block w-full overflow-visible rounded-full sm:w-fit"
            >
              <span
                ref={hireRef}
                className="relative z-10 block rounded-full border border-stone-700/80 bg-zinc-800/90 px-6 py-3 text-center text-stone-100 transition-colors duration-300 will-change-transform hover:border-stone-600 hover:bg-zinc-700/90"
              >
                Hire Me
              </span>
            </Link>
            <Link
              href="/"
              className="inline-block w-full overflow-visible rounded-full sm:w-fit"
              onClick={handleDownload}
            >
              <span
                ref={cvRef}
                className="relative z-10 block rounded-full border border-stone-700 bg-zinc-900 px-6 py-3 text-center text-stone-200 transition-colors duration-300 will-change-transform hover:border-stone-600 hover:bg-zinc-800/80"
              >
                Download CV
              </span>
            </Link>
          </div>
        </div>
        <div className="col-span-4 place-self-center mt-10 lg:mt-0">
          <div
            ref={avatarWrapRef}
            className="relative mx-auto h-[250px] w-[250px] overflow-hidden rounded-full border border-stone-800 bg-zinc-900/80 lg:h-[400px] lg:w-[400px]"
          >
            <Image
              src="/images/hero-image.png"
              alt="Muhidin Misbah"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 250px, 400px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

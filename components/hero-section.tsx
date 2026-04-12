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
  const helloRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hireRef = useRef<HTMLAnchorElement>(null);
  const cvRef = useRef<HTMLAnchorElement>(null);
  const avatarWrapRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!rootRef.current || reduced) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(helloRef.current, { opacity: 0, y: 28, duration: 0.65 }, 0)
        .from(roleRef.current, { opacity: 0, y: 20, duration: 0.55 }, "-=0.35")
        .from(subRef.current, { opacity: 0, y: 16, duration: 0.5 }, "-=0.3")
        .from(ctaRef.current?.children || [], { opacity: 0, y: 12, duration: 0.45, stagger: 0.1 }, "-=0.25")
        .from(
          avatarWrapRef.current,
          { opacity: 0, scale: 0.94, duration: 0.7 },
          "-=0.55"
        );

      const roleEl = roleRef.current;
      if (roleEl) {
        let idx = 0;
        gsap.delayedCall(1.4, () => {
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
          gsap.set([helloRef.current, subRef.current], {
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
    const strength = 0.35;

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
    <section ref={rootRef} className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="col-span-8 place-self-center text-center sm:text-left justify-self-start">
          <h1 className="text-stone-100 mb-4 text-4xl sm:text-5xl lg:text-7xl xl:text-8xl lg:leading-[1.08] font-semibold tracking-tight">
            <span
              ref={helloRef}
              className="text-transparent bg-clip-text bg-gradient-to-r from-stone-300 via-stone-200 to-stone-500"
            >
              Hello, I&apos;m{" "}
            </span>
            <br />
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
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-start">
            <Link
              href="/#contact"
              className="inline-block w-full sm:w-fit rounded-full will-change-transform"
            >
              <span
                ref={hireRef}
                className="block px-6 py-3 text-center text-stone-100 bg-zinc-800/90 border border-stone-700/80 hover:bg-zinc-700/90 hover:border-stone-600 transition-colors duration-300 rounded-full"
              >
                Hire Me
              </span>
            </Link>
            <Link
              href="/"
              className="inline-block w-full sm:w-fit rounded-full will-change-transform"
              onClick={handleDownload}
            >
              <span
                ref={cvRef}
                className="block px-6 py-3 text-center text-stone-200 bg-zinc-900 border border-stone-700 hover:border-stone-600 hover:bg-zinc-800/80 transition-colors duration-300 rounded-full"
              >
                Download CV
              </span>
            </Link>
          </div>
        </div>
        <div className="col-span-4 place-self-center mt-10 lg:mt-0">
          <div
            ref={avatarWrapRef}
            className="rounded-full bg-zinc-900/80 border border-stone-800 w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative mx-auto"
          >
            <Image
              src="/images/hero-image.png"
              alt="Muhidin Misbah"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full object-cover"
              width={300}
              height={300}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

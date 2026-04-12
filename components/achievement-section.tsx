"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap-client";
import { achievementsList } from "@/constants";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

const AchievementsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!sectionRef.current || reduced) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll("[data-count]");
      if (!items?.length) return;

      items.forEach((el) => {
        const target = parseInt(el.getAttribute("data-count") || "0", 10);
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 1.15,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = Math.round(obj.val).toLocaleString("en-US");
              },
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="py-8 px-4 sm:py-12 xl:px-16"
      aria-label="Achievements"
    >
      <div className="rounded-lg border border-stone-800/90 bg-zinc-900/40 py-10 px-8 sm:px-16 flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-4">
        {achievementsList.map((achievement, index) => {
          const n = parseInt(achievement.value, 10);
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center"
            >
              <h2 className="text-stone-100 text-3xl sm:text-4xl font-semibold tracking-tight flex flex-row items-baseline gap-0.5 tabular-nums">
                <span className="sr-only">{achievement.metric}: </span>
                {achievement.prefix}
                <span data-count={n}>
                  {reduced ? n.toLocaleString("en-US") : "0"}
                </span>
                {achievement.postfix}
              </h2>
              <p className="text-stone-500 text-sm mt-2">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AchievementsSection;

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
    <section ref={sectionRef} className="py-8 sm:py-12" aria-label="Highlights">
      <dl className="glass grid grid-cols-2 gap-px overflow-hidden lg:grid-cols-4">
        {achievementsList.map((achievement) => {
          const n = parseInt(achievement.value, 10);
          return (
            <div
              key={achievement.metric}
              className="flex min-w-0 flex-col gap-2 px-4 py-6 text-left sm:px-8 sm:py-8"
            >
              <dt className="eyebrow order-2 !tracking-[0.12em]">{achievement.metric}</dt>
              <dd className="order-1 flex items-baseline whitespace-nowrap text-[1.75rem] font-semibold tracking-tight text-zinc-50 tabular-nums sm:text-4xl">
                {achievement.prefix && (
                  <span className="mr-1 text-base text-zinc-400 sm:text-lg">{achievement.prefix.trim()}</span>
                )}
                <span data-count={n}>{n.toLocaleString("en-US")}</span>
                <span className="text-cobalt-400">{achievement.postfix}</span>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
};

export default AchievementsSection;

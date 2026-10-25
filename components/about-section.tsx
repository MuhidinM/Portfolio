"use client";

import React, { useLayoutEffect, useRef } from "react";
import {
  aboutFacts,
  aboutParagraphs,
  education,
  experience,
  stackGroups,
} from "@/constants";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (!sectionRef.current || reduced) return;
    registerGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="scroll-mt-28 py-16 sm:py-24"
      aria-labelledby="about-title"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* The story: what I do, then the proof. */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2
              id="about-title"
              className="about-reveal mb-6 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl"
            >
              I ship systems,
              <br />
              <span className="text-zinc-400">not just screens.</span>
            </h2>
            <div className="about-reveal space-y-4 text-lg leading-relaxed text-zinc-400">
              {aboutParagraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <dl className="about-reveal mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {aboutFacts.map((fact) => (
                <div key={fact.label} className="glass !rounded-2xl px-4 py-3">
                  <dt className="eyebrow !text-[0.6875rem] !tracking-[0.14em]">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-zinc-100">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-7">
          {/* Experience, newest first. */}
          <div className="about-reveal glass p-6 sm:p-8">
            <h3 className="eyebrow mb-6">Experience</h3>
            <ol className="relative space-y-8 border-l border-white/10 pl-6">
              {experience.map((job) => (
                <li key={job.company} className="relative">
                  <span
                    className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-cobalt-400 shadow-[0_0_0_4px_#18181b,0_0_14px_2px_rgba(123,140,255,0.5)]"
                    aria-hidden
                  />
                  <p className="text-lg font-semibold text-zinc-50">{job.company}</p>
                  <p className="text-sm text-zinc-400">{job.context}</p>
                  <ul className="mt-3 space-y-1">
                    {job.roles.map((role) => (
                      <li
                        key={role.title}
                        className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                      >
                        <span className="text-zinc-200">{role.title}</span>
                        <span className="shrink-0 font-mono text-xs text-zinc-400">{role.period}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`Work at ${job.company}`}>
                    {job.work.map((w) => (
                      <li key={w} className="keycap">
                        {w}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          {/* Stack, grouped the way the CV groups it. */}
          <div className="about-reveal glass p-6 sm:p-8">
            <h3 className="eyebrow mb-6">Stack</h3>
            <dl className="space-y-5">
              {stackGroups.map((group) => (
                <div key={group.name} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-4">
                  <dt className="pt-1 text-sm font-medium text-zinc-300">{group.name}</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span key={item} className="keycap">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="about-reveal glass p-6 sm:p-8">
            <h3 className="eyebrow mb-6">Education &amp; certification</h3>
            <ul className="space-y-4">
              {education.map((item) => (
                <li key={item.title}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-zinc-100 underline decoration-cobalt-400/50 underline-offset-4 hover:decoration-cobalt-300"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <p className="font-medium text-zinc-100">{item.title}</p>
                  )}
                  <p className="text-sm text-zinc-400">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

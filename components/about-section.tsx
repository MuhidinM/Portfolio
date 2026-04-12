"use client";

import React, { useLayoutEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import TabButton from "./tab-button";
import { TAB_DATA, aboutMe } from "@/constants";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap-client";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

const AboutSection = () => {
  const [tab, setTab] = useState<string>("skills");
  const [, startTransition] = useTransition();
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const content = TAB_DATA.find((t) => t.id === tab)?.content ?? null;

  useLayoutEffect(() => {
    if (!sectionRef.current || reduced) return;
    registerGsap();

    const ctx = gsap.context(() => {
      if (imageWrapRef.current && imageRef.current) {
        gsap.set(imageRef.current, {
          clipPath: "inset(100% 0% 0% 0%)",
          yPercent: 8,
          scale: 1.04,
        });
        ScrollTrigger.create({
          trigger: imageWrapRef.current,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(imageRef.current, {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.05,
              ease: "power3.out",
            });
            gsap.to(imageRef.current, {
              yPercent: 0,
              scale: 1,
              duration: 1.1,
              ease: "power3.out",
            });
          },
        });
      }

      if (titleRef.current && copyRef.current) {
        const q = gsap.utils.selector(sectionRef);
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap
              .timeline()
              .from(q(".about-word"), {
                opacity: 0,
                y: 28,
                rotateX: -38,
                stagger: 0.11,
                duration: 0.58,
                ease: "power2.out",
                transformOrigin: "50% 100%",
              })
              .from(
                copyRef.current,
                { opacity: 0, y: 16, duration: 0.55, ease: "power2.out" },
                "-=0.22"
              );
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  useLayoutEffect(() => {
    if (!panelRef.current) return;
    if (reduced) {
      gsap.set(panelRef.current, { opacity: 1, y: 0 });
      return;
    }
    registerGsap();
    gsap.fromTo(
      panelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [tab, reduced]);

  return (
    <section
      ref={sectionRef}
      className="text-stone-100 [perspective:1000px]"
      id="about"
    >
      <div className="md:grid md:grid-cols-2 gap-8 py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <div
          ref={imageWrapRef}
          className="relative overflow-hidden rounded-xl border border-stone-800/90 bg-zinc-900/40"
        >
          <div ref={imageRef} className="relative w-full aspect-square max-h-[min(100vw,28rem)] md:max-h-none">
            <Image
              src="/images/code.gif"
              width={800}
              height={800}
              alt="Code animation"
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl font-semibold text-stone-100 mb-4 tracking-tight [transform-style:preserve-3d]"
          >
            <span className="about-word inline-block">About</span>{" "}
            <span className="about-word inline-block">Me</span>
          </h2>
          <p
            ref={copyRef}
            className="text-base lg:text-lg text-stone-400 leading-relaxed max-w-prose"
          >
            {aboutMe}
          </p>
          <div className="flex flex-row flex-wrap justify-start gap-2 mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              Certifications
            </TabButton>
          </div>
          <div ref={panelRef} className="mt-8 text-stone-300 [&_a]:text-stone-400 [&_a]:underline-offset-2 [&_a]:hover:text-stone-200">
            {content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

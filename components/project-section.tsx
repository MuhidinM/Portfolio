"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import ProjectTag from "./project-tag";
import ProjectCard from "./project-card";
import { projectsData } from "@/constants";
import { Flip, gsap, registerGsap } from "@/lib/gsap-client";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const [visibleProjects, setVisibleProjects] = useState(6);
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const loadBtnRef = useRef<HTMLButtonElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const prevSliceLen = useRef(0);
  const reduced = usePrefersReducedMotion();

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );
  const slice = filteredProjects.slice(0, visibleProjects);

  useLayoutEffect(() => {
    if (!sectionRef.current || reduced) return;
    registerGsap();
    const q = gsap.utils.selector(sectionRef);
    gsap.fromTo(
      q(".proj-head-word"),
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.55,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          once: true,
        },
      }
    );
  }, [reduced]);

  const handleTagChange = (newTag: string) => {
    if (newTag === tag) return;
    prevSliceLen.current = 0;
    if (listRef.current && !reduced) {
      registerGsap();
      flipState.current = Flip.getState(listRef.current.children, {
        simple: true,
      });
    }
    setTag(newTag);
    setVisibleProjects(6);
  };

  const handleLoadMore = () => {
    if (loadBtnRef.current && !reduced) {
      registerGsap();
      gsap
        .timeline()
        .to(loadBtnRef.current, { scale: 0.97, duration: 0.1, ease: "power2.in" })
        .to(loadBtnRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
    }
    setVisibleProjects((prev) => prev + 6);
  };

  useLayoutEffect(() => {
    if (!flipState.current || !listRef.current || reduced) return;
    const state = flipState.current;
    flipState.current = null;
    registerGsap();
    Flip.from(state, {
      duration: 0.48,
      ease: "power2.out",
      stagger: 0.03,
      absolute: true,
      scale: true,
      prune: true,
      onEnter: (elements) => {
        gsap.from(elements, {
          opacity: 0,
          scale: 0.97,
          duration: 0.35,
          ease: "power2.out",
        });
      },
      onLeave: (elements) => {
        gsap.to(elements, { opacity: 0, duration: 0.22, ease: "power2.in" });
      },
      onComplete: () => {
        const list = listRef.current;
        if (!list) return;
        gsap.set(Array.from(list.children), {
          clearProps:
            "width,height,top,left,right,bottom,margin,zIndex,position,maxWidth",
        });
      },
    });
  }, [tag, filteredProjects.length, visibleProjects, reduced]);

  useLayoutEffect(() => {
    if (!listRef.current || reduced) return;
    registerGsap();
    const len = slice.length;
    const prev = prevSliceLen.current;
    if (len <= prev) {
      prevSliceLen.current = len;
      return;
    }
    const newLis = Array.from(listRef.current.querySelectorAll("li")).slice(
      prev
    );
    prevSliceLen.current = len;
    newLis.forEach((li) => {
      gsap.fromTo(
        li,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: "power2.out",
          scrollTrigger: {
            trigger: li,
            start: "top 93%",
            once: true,
          },
        }
      );
    });
  }, [slice.length, tag, reduced]);

  return (
    <section ref={sectionRef} id="projects" className="scroll-mt-24">
      <h2 className="mt-6 mb-6 text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl md:mb-10">
        <span className="proj-head-word inline-block text-white">My</span>{" "}
        <span className="proj-head-word inline-block text-white">Projects</span>
      </h2>
      <div className="flex flex-row flex-wrap justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="API"
          isSelected={tag === "API"}
        />
      </div>
      <ul
        ref={listRef}
        className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        {slice.map((project) => (
          <li
            key={project.id}
            data-project-id={project.id}
            className="project-card-item flex h-full min-w-0 w-full max-w-full"
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
              app={project.app}
            />
          </li>
        ))}
      </ul>
      {visibleProjects < filteredProjects.length && (
        <div className="mt-10 flex justify-center">
          <button
            ref={loadBtnRef}
            type="button"
            onClick={handleLoadMore}
            className="px-8 py-3 rounded-full border border-stone-700 bg-zinc-900/60 text-stone-200 text-sm font-medium hover:bg-zinc-800/80 hover:border-stone-600 transition-colors"
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;

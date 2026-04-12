"use client";

import React, { useLayoutEffect, useRef } from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

interface ProjectCardProps {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  previewUrl: string;
  app: string[];
}

const ProjectCard = ({
  imgUrl,
  title,
  description,
  gitUrl,
  previewUrl,
  app,
}: ProjectCardProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    const media = mediaRef.current;
    if (!root || !media || reduced) return;
    registerGsap();

    const rotX = gsap.quickTo(root, "rotationX", { duration: 0.45, ease: "power2.out" });
    const rotY = gsap.quickTo(root, "rotationY", { duration: 0.45, ease: "power2.out" });
    const scaleM = gsap.quickTo(media, "scale", { duration: 0.35, ease: "power2.out" });

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      rotY(x * 7);
      rotX(-y * 6);
      scaleM(1.03);
    };
    const onLeave = () => {
      rotY(0);
      rotX(0);
      scaleM(1);
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className="group rounded-xl overflow-hidden border border-stone-800/90 bg-zinc-900/30 shadow-sm will-change-transform [perspective:1100px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={mediaRef}
        className="h-52 md:h-72 rounded-t-xl relative overflow-hidden"
        style={{
          background: `url(${imgUrl}) center/cover no-repeat`,
          transformOrigin: "center center",
        }}
      >
        <div className="overlay items-center justify-center absolute inset-0 bg-zinc-950/0 opacity-0 group-hover:opacity-100 group-hover:bg-zinc-950/75 flex transition-opacity duration-500 pointer-events-none group-hover:pointer-events-auto">
          {gitUrl !== "/" && (
            <Link
              target="_blank"
              href={gitUrl}
              className="h-12 w-12 mr-2 border relative rounded-full border-stone-500 hover:border-stone-300 group/link"
              aria-label="View repository"
            >
              <CodeBracketIcon className="h-7 w-7 text-stone-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-stone-100" />
            </Link>
          )}
          {previewUrl !== "/" && (
            <Link
              target="_blank"
              href={previewUrl}
              className="h-12 w-12 border relative rounded-full border-stone-500 hover:border-stone-300 group/link"
              aria-label="Live preview"
            >
              <EyeIcon className="h-7 w-7 text-stone-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-stone-100" />
            </Link>
          )}
        </div>
      </div>
      <div className="text-stone-100 rounded-b-xl mt-0 bg-zinc-950/60 py-5 px-4 border-t border-stone-800/80">
        <h5 className="text-lg font-semibold mb-2 tracking-tight">{title}</h5>
        <p className="text-stone-500 text-sm leading-relaxed line-clamp-4">{description}</p>
        <div className="rounded-lg pt-3 flex flex-wrap gap-1.5">
          {app.map((item, index) => (
            <Badge
              key={index}
              variant="outline"
              className="border-stone-700/90 bg-stone-900/50 text-stone-400 font-normal text-xs hover:bg-stone-800/60"
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

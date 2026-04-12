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
  const magRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const mag = magRef.current;
    const root = rootRef.current;
    const media = mediaRef.current;
    if (!mag || !root || !media || reduced) return;
    registerGsap();

    const magX = gsap.quickTo(mag, "x", { duration: 0.55, ease: "power3.out" });
    const magY = gsap.quickTo(mag, "y", { duration: 0.55, ease: "power3.out" });
    const rotX = gsap.quickTo(root, "rotationX", {
      duration: 0.45,
      ease: "power2.out",
    });
    const rotY = gsap.quickTo(root, "rotationY", {
      duration: 0.45,
      ease: "power2.out",
    });
    const scaleX = gsap.quickTo(media, "scaleX", {
      duration: 0.35,
      ease: "power2.out",
    });
    const scaleY = gsap.quickTo(media, "scaleY", {
      duration: 0.35,
      ease: "power2.out",
    });

    const onMove = (e: PointerEvent) => {
      const r = mag.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      magX(px * 12);
      magY(py * 10);
      rotY(px * 7);
      rotX(-py * 6);
      scaleX(1.03);
      scaleY(1.03);
    };
    const onLeave = () => {
      magX(0);
      magY(0);
      rotY(0);
      rotX(0);
      scaleX(1);
      scaleY(1);
    };

    mag.addEventListener("pointermove", onMove);
    mag.addEventListener("pointerleave", onLeave);
    return () => {
      mag.removeEventListener("pointermove", onMove);
      mag.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div ref={magRef} className="h-full w-full min-w-0 rounded-xl will-change-transform">
      <div
        ref={rootRef}
        className="group flex h-full w-full min-h-[28rem] min-w-0 flex-col overflow-hidden rounded-xl border border-stone-800/90 bg-zinc-900/30 shadow-sm [perspective:1100px] sm:min-h-[30rem]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          ref={mediaRef}
          className="h-52 flex-shrink-0 rounded-t-xl md:h-72 relative overflow-hidden"
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
        <div className="flex flex-1 flex-col rounded-b-xl bg-zinc-950/60 px-4 py-5 border-t border-stone-800/80">
          <h5 className="flex-shrink-0 text-lg font-semibold tracking-tight text-stone-100">
            {title}
          </h5>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-500 line-clamp-4 min-h-[5rem]">
            {description}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
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
    </div>
  );
};

export default ProjectCard;

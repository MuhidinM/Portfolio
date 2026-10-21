"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import GlassFolder, {
  type ArtPreset,
  type FolderFile,
} from "./ui/glass-folder-cards";
import { Badge } from "./ui/badge";

interface ProjectCardProps {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  previewUrl: string;
  app: string[];
  index?: number;
}

const ART: ArtPreset[] = ["aurora", "ember", "dusk", "verdant", "glacier"];
const MAX_WIDTH = 340;

/** Screenshots go through the Next image optimizer: ~60 KB instead of 1–3 MB PNGs. */
function optimized(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

function hasLink(url: string) {
  return Boolean(url) && url !== "/";
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** The folder is drawn at a fixed pixel width, so track the column it sits in. */
function useColumnWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(MAX_WIDTH);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(Math.min(MAX_WIDTH, Math.floor(entry.contentRect.width)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

const ProjectCard = ({
  imgUrl,
  title,
  description,
  gitUrl,
  previewUrl,
  app,
  index = 0,
}: ProjectCardProps) => {
  const [colRef, width] = useColumnWidth<HTMLDivElement>();
  const live = hasLink(previewUrl);
  const source = hasLink(gitUrl);
  const art = ART[index % ART.length];

  // Opening the folder fans out what a visitor can actually do with the project.
  const files: FolderFile[] = [];
  if (imgUrl) {
    files.push({ name: "Screenshot", meta: "Full size", image: optimized(imgUrl, 640) });
  }
  if (source) files.push({ name: "Source code", meta: "GitHub ↗", href: gitUrl });
  if (live) files.push({ name: "Live site", meta: `${hostOf(previewUrl)} ↗`, href: previewUrl });
  if (!live && !source) {
    files.push({ name: "Internal build", meta: "No public link" });
  }

  const openFile = (file: FolderFile) => {
    const url = file.href ?? (file.image ? imgUrl : undefined);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <article ref={colRef} className="flex w-full min-w-0 flex-col items-center">
      <h3 className="sr-only">{title}</h3>
      <GlassFolder
        label={title}
        meta={live ? "Live · open for links" : source ? "Open for source" : "Internal project"}
        tone="dark"
        image={imgUrl ? optimized(imgUrl, 640) : undefined}
        art={art}
        seed={index + 3}
        files={files.map((f) => (f.href ? { ...f, href: undefined } : f))}
        action="none"
        width={width}
        appearDelay={(index % 3) * 120}
        onFileSelect={(file, i) => openFile(files[i] ?? file)}
      />
      <div className="mt-4 w-full max-w-[340px] text-left">
        <p className="line-clamp-4 text-sm leading-relaxed text-stone-400">
          {description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {app.map((item) => (
            <Badge
              key={item}
              variant="outline"
              className="border-stone-700/90 bg-stone-900/50 text-xs font-normal text-stone-400"
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;

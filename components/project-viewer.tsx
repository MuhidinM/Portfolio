"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { XMarkIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { ArtCanvas, type ArtPreset } from "./ui/glass-folder-cards";
import type { CaseStudy } from "@/types/project";

interface ProjectViewerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  meta: string;
  /** Pass one: the screenshot, or the case study to read. */
  image?: string;
  caseStudy?: CaseStudy;
  /** The folder's back-panel picture, so the open folder keeps its colours. */
  backImage?: string;
  art: ArtPreset;
  seed: number;
  liveUrl?: string;
  sourceUrl?: string;
  stack: string[];
}

// The card's folder geometry (glass-folder-cards.tsx), redrawn at any size:
// the back panel's tab rises on the right, the glass front's on the left,
// both joined by the same S-curve. Paths are rebuilt from the measured size
// so the curves never stretch.
const R = 22;
const BACK_RISE = 40;
const FRONT_RISE = 36;
const CURVE = 60;

function backPath(w: number, h: number) {
  const s = Math.round(w * 0.58);
  return (
    `M0 ${BACK_RISE + R}A${R} ${R} 0 0 1 ${R} ${BACK_RISE}` +
    `L${s - CURVE} ${BACK_RISE}C${s - CURVE * 0.54} ${BACK_RISE} ${s - CURVE * 0.5} 0 ${s} 0` +
    `L${w - R} 0A${R} ${R} 0 0 1 ${w} ${R}L${w} ${h - R}A${R} ${R} 0 0 1 ${w - R} ${h}` +
    `L${R} ${h}A${R} ${R} 0 0 1 0 ${h - R}Z`
  );
}

function frontPath(w: number, h: number) {
  const e = Math.max(120, Math.round(w * 0.35));
  return (
    `M0 ${R}A${R} ${R} 0 0 1 ${R} 0L${e} 0` +
    `C${e + CURVE * 0.48} 0 ${e + CURVE * 0.52} ${FRONT_RISE} ${e + CURVE} ${FRONT_RISE}` +
    `L${w - R} ${FRONT_RISE}A${R} ${R} 0 0 1 ${w} ${FRONT_RISE + R}L${w} ${h - R}` +
    `A${R} ${R} 0 0 1 ${w - R} ${h}L${R} ${h}A${R} ${R} 0 0 1 0 ${h - R}Z`
  );
}

function useSize<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!active || !el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [active]);
  return [ref, size] as const;
}

/**
 * A project folder opened up on the page: the card's folder at full size,
 * its colours on the back panel, the screenshot or case study as the sheet
 * inside, and the frosted front panel carrying the label and links.
 *
 * Built on <dialog>, so focus is trapped, Escape closes it and focus returns
 * to the folder that opened it without any extra code.
 */
export default function ProjectViewer({
  open,
  onClose,
  title,
  meta,
  image,
  caseStudy,
  backImage,
  art,
  seed,
  liveUrl,
  sourceUrl,
  stack,
}: ProjectViewerProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [folderRef, folder] = useSize<HTMLDivElement>(open);
  const [frontRef, front] = useSize<HTMLDivElement>(open);
  const measured = folder.w > 0 && front.w > 0;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onDialogClose = () => {
      document.documentElement.style.overflow = "";
      onClose();
    };
    dialog.addEventListener("close", onDialogClose);
    return () => dialog.removeEventListener("close", onDialogClose);
  }, [onClose]);

  const back = measured ? backPath(folder.w, folder.h) : "";
  const glass = measured ? frontPath(front.w, front.h) : "";
  const readMinutes = caseStudy
    ? Math.max(1, Math.round([caseStudy.context, caseStudy.outcome, ...caseStudy.work].join(" ").split(/\s+/).length / 200))
    : 0;

  return (
    <dialog
      ref={ref}
      aria-labelledby="viewer-title"
      className="pv-dialog m-auto w-[min(1100px,calc(100vw-1.5rem))] max-w-none overflow-visible bg-transparent p-0 text-zinc-100 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      // A press on the backdrop lands on the dialog element itself.
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
    >
      {open && (
        <div
          ref={folderRef}
          className="pv-folder relative h-[min(880px,calc(100svh-1.5rem))]"
          style={{ opacity: measured ? undefined : 0 }}
        >
          <div className="pv-shadow" aria-hidden />

          {/* back panel: the folder's own picture, with its tab on the right */}
          <div className="pv-back absolute inset-0" style={{ clipPath: `path('${back}')` }} aria-hidden>
            {backImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={backImage} alt="" className="pv-back-art" draggable={false} />
            ) : (
              <div className="pv-back-art">
                <ArtCanvas art={art} seed={seed} w={680} h={544} density={1} priority={0} />
              </div>
            )}
            <div className="pv-back-sheen" />
          </div>
          <svg className="pv-rim absolute inset-0 h-full w-full" aria-hidden>
            <path d={back} stroke="rgba(255,255,255,.18)" strokeWidth="1" fill="none" />
          </svg>

          <span
            className="absolute top-0 hidden h-10 items-center font-mono sm:flex text-[11px] uppercase tracking-[0.18em] text-white/80"
            style={{ left: `calc(58% + 16px)` }}
          >
            {caseStudy ? "Case study" : "Screenshot"}
          </span>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="pv-close absolute right-3 top-1.5 z-30"
            aria-label="Close project"
            autoFocus
          >
            <XMarkIcon className="h-5 w-5" aria-hidden />
          </button>

          {/* the sheet: rises out of the folder and scrolls under the glass */}
          <div
            className="pv-sheet absolute inset-x-3 bottom-3 flex flex-col overflow-hidden rounded-[18px] sm:inset-x-6"
            style={{ top: BACK_RISE + 18 }}
          >
            <div className="flex items-baseline justify-between gap-3 px-5 pb-3 pt-4 sm:px-6">
              <span className="truncate text-[13px] font-medium tracking-tight text-zinc-50">
                {caseStudy ? "Case study" : "Screenshot"}
              </span>
              <span className="shrink-0 font-mono text-[11px] tracking-[0.03em] text-zinc-400">
                {caseStudy ? `${readMinutes} min read` : "Full page"}
              </span>
            </div>
            <div className="min-h-0 flex-1 overflow-auto" style={{ paddingBottom: front.h + 8 }}>
              {caseStudy ? (
                <CaseStudySheet study={caseStudy} />
              ) : image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/_next/image?url=${encodeURIComponent(image)}&w=1920&q=75`}
                  alt={`Screenshot of ${title}`}
                  className="mx-3 block h-auto w-[calc(100%-1.5rem)] rounded-xl sm:mx-4 sm:w-[calc(100%-2rem)]"
                />
              ) : null}
            </div>
          </div>

          {/* frosted front panel, tab on the left, label bottom-left */}
          <div
            ref={frontRef}
            className="pv-front absolute inset-x-0 bottom-0 z-20"
            style={{ clipPath: `path('${glass}')` }}
          >
            <div className="pv-tint" aria-hidden />
            <svg className="pv-rim absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="pv-rim-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
                  <stop offset="0.35" stopColor="#fff" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              <path d={glass} stroke="url(#pv-rim-grad)" strokeWidth="2.4" fill="none" opacity="0.55" />
            </svg>
            <div
              className="relative flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pb-7"
              style={{ paddingTop: FRONT_RISE + 22 }}
            >
              <div className="min-w-0">
                <h2 id="viewer-title" className="truncate text-2xl font-medium tracking-tight text-zinc-50 sm:text-[28px]">
                  {title}
                </h2>
                <p className="mt-1 font-mono text-xs tracking-[0.03em] text-zinc-400">{meta}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                  {stack.map((item) => (
                    <li key={item} className="keycap">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                {sourceUrl && (
                  <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="glass-key px-4 py-2.5 text-sm">
                    Source code <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
                  </a>
                )}
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-key glass-key-primary px-4 py-2.5 text-sm"
                  >
                    Visit live site <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{PV_CSS}</style>
    </dialog>
  );
}

/** The write-up, set like a one-page brief: context, role, the work, the result. */
function CaseStudySheet({ study }: { study: CaseStudy }) {
  return (
    <article className="mx-auto max-w-2xl px-6 pb-6 pt-2 sm:px-10">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-cobalt-300">{study.role}</p>
      <h3 className="eyebrow mb-2 mt-8">The problem</h3>
      <p className="text-base leading-relaxed text-zinc-300">{study.context}</p>
      <h3 className="eyebrow mb-3 mt-8">What I built</h3>
      <ul className="space-y-2">
        {study.work.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-relaxed text-zinc-300">
            <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt-400" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
      <h3 className="eyebrow mb-3 mt-8">Outcome</h3>
      <p className="rounded-2xl bg-white/[0.04] px-5 py-4 text-lg font-medium leading-relaxed text-zinc-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_0_1px_rgba(255,255,255,0.06)]">
        {study.outcome}
      </p>
    </article>
  );
}

// Values mirror the card's dark tone in glass-folder-cards.tsx (.gf-back,
// .gf-sheet, .gf-tint, .gf-shadow) so the open folder reads as the same object.
const PV_CSS = `
.pv-shadow {
  position: absolute;
  left: 4%;
  right: 4%;
  bottom: -14px;
  height: 120px;
  border-radius: 80px;
  background: rgba(0, 0, 0, .7);
  filter: blur(36px);
}
.pv-back { background: linear-gradient(180deg, #2a2a2e 0%, #121214 100%); overflow: hidden; }
.pv-back-art {
  position: absolute;
  inset: -24px;
  width: calc(100% + 48px);
  height: calc(100% + 48px);
  max-width: none;
  object-fit: cover;
  object-position: top;
  filter: blur(18px) saturate(1.1);
}
.pv-back-art > canvas { width: 100% !important; height: 100% !important; }
.pv-back-sheen {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, .18) 0%, rgba(255, 255, 255, 0) 14%),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 18%, rgba(0, 0, 0, .55) 100%);
}
.pv-close {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  color: #fafafa;
  background: rgba(20, 20, 24, .45);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .22), 0 0 0 .5px rgba(255, 255, 255, .14);
  transition: background .2s ease;
}
.pv-close:hover { background: rgba(20, 20, 24, .7); }
.pv-close:focus-visible { outline: 2px solid #7b8cff; outline-offset: 2px; }
.pv-sheet {
  background: linear-gradient(180deg, #2c2c30 0%, #1c1c1f 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .14), 0 0 0 .5px rgba(255, 255, 255, .08), 0 12px 28px -8px rgba(0, 0, 0, .7);
}
.pv-front {
  -webkit-backdrop-filter: blur(22px) saturate(1.5);
  backdrop-filter: blur(22px) saturate(1.5);
}
.pv-tint {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(18, 18, 20, .18) 0%, rgba(14, 14, 16, .62) 46%, rgba(8, 8, 10, .94) 100%);
}
.pv-dialog[open] .pv-folder { animation: pv-open .55s cubic-bezier(.34, 1.36, .5, 1) both; }
.pv-dialog[open] .pv-sheet { animation: pv-sheet .75s cubic-bezier(.2, .8, .2, 1) .14s both; }
.pv-dialog::backdrop { animation: pv-fade .3s ease both; }
@keyframes pv-open {
  from { opacity: 0; transform: translateY(40px) scale(.96) perspective(1200px) rotateX(8deg); }
  to { opacity: 1; transform: none; }
}
@keyframes pv-sheet {
  from { transform: translateY(70px) rotate(-1deg); }
  to { transform: none; }
}
@keyframes pv-fade { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .pv-dialog[open] .pv-folder, .pv-dialog[open] .pv-sheet, .pv-dialog::backdrop { animation: none; }
}
`;

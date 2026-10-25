"use client";

import React, { useEffect, useRef } from "react";
import { XMarkIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { CaseStudy } from "@/types/project";

interface ProjectViewerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  meta: string;
  /** Pass one: the screenshot, or the case study to read. */
  image?: string;
  caseStudy?: CaseStudy;
  liveUrl?: string;
  sourceUrl?: string;
  stack: string[];
}

/**
 * A project folder opened up on the page: the same smoked glass, tab and rim
 * as the cards, with the screenshot or case study sitting inside it like a sheet.
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
  liveUrl,
  sourceUrl,
  stack,
}: ProjectViewerProps) {
  const ref = useRef<HTMLDialogElement>(null);

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

  return (
    <dialog
      ref={ref}
      aria-labelledby="viewer-title"
      className="pv-dialog m-auto w-[min(1100px,calc(100vw-2rem))] max-w-none overflow-visible bg-transparent p-0 text-zinc-100 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      // A press on the backdrop lands on the dialog element itself.
      onClick={(e) => {
        if (e.target === e.currentTarget) ref.current?.close();
      }}
    >
      {open && (
        <div className="pv-folder flex max-h-[calc(100svh-2rem)] flex-col">
          {/* the tab */}
          <div className="pv-surface relative z-[1] -mb-px self-start rounded-t-[18px] px-6 pb-2 pt-3">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">
              {caseStudy ? "Case study" : "Project"}
            </span>
          </div>

          <div className="pv-surface flex min-h-0 flex-col rounded-[22px] rounded-tl-none">
            <header className="flex items-start justify-between gap-4 px-6 pb-4 pt-5 sm:px-8">
              <div className="min-w-0">
                <h2 id="viewer-title" className="truncate text-2xl font-semibold tracking-tight text-zinc-50">
                  {title}
                </h2>
                <p className="mt-1 font-mono text-xs tracking-[0.06em] text-zinc-400">{meta}</p>
              </div>
              <button
                type="button"
                onClick={() => ref.current?.close()}
                className="glass-key h-11 w-11 shrink-0"
                aria-label="Close project"
                autoFocus
              >
                <XMarkIcon className="h-5 w-5" aria-hidden />
              </button>
            </header>

            {/* the sheet inside the folder */}
            <div className="min-h-0 flex-1 overflow-auto px-4 sm:px-8">
              <div className="pv-sheet overflow-hidden rounded-2xl bg-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_0_0_1px_rgba(255,255,255,0.08),0_24px_48px_-16px_rgba(0,0,0,0.9)]">
                {caseStudy ? (
                  <CaseStudySheet study={caseStudy} />
                ) : image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`/_next/image?url=${encodeURIComponent(image)}&w=1920&q=75`}
                    alt={`Screenshot of ${title}`}
                    className="block h-auto w-full"
                  />
                ) : null}
              </div>
            </div>

            <footer className="flex flex-col gap-4 px-6 pb-6 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
                {stack.map((item) => (
                  <li key={item} className="keycap">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex shrink-0 gap-2">
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
            </footer>
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
    <article className="mx-auto max-w-2xl px-6 py-8 sm:px-10 sm:py-10">
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
      <p className="glass !rounded-2xl px-5 py-4 text-lg font-medium leading-relaxed text-zinc-50">{study.outcome}</p>
    </article>
  );
}

const PV_CSS = `
.pv-surface {
  background: linear-gradient(180deg, #2a2a2e 0%, #161618 60%, #121214 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .16),
    0 0 0 1px rgba(255, 255, 255, .07);
}
.pv-folder > .pv-surface:last-child {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .16),
    0 0 0 1px rgba(255, 255, 255, .07),
    0 40px 80px -24px rgba(0, 0, 0, .9),
    0 0 120px -40px rgba(31, 48, 255, .45);
}
.pv-dialog[open] .pv-folder { animation: pv-open .55s cubic-bezier(.34, 1.36, .5, 1) both; }
.pv-dialog[open] .pv-sheet { animation: pv-sheet .7s cubic-bezier(.2, .8, .2, 1) .12s both; }
.pv-dialog::backdrop { animation: pv-fade .3s ease both; }
@keyframes pv-open {
  from { opacity: 0; transform: translateY(40px) scale(.96) perspective(1200px) rotateX(8deg); }
  to { opacity: 1; transform: none; }
}
@keyframes pv-sheet {
  from { opacity: 0; transform: translateY(48px) rotate(-1.2deg); }
  to { opacity: 1; transform: none; }
}
@keyframes pv-fade { from { opacity: 0; } to { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .pv-dialog[open] .pv-folder, .pv-dialog[open] .pv-sheet, .pv-dialog::backdrop { animation: none; }
}
`;

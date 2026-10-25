"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProjectTag from "./project-tag";
import ProjectCard from "./project-card";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";
import type { Project, ProjectCategory, ProjectSort } from "@/types/project";

const PAGE_SIZE = 9;

const FILTERS: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Front End" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
  { key: "desktop", label: "Desktop" },
];

const SORT_OPTIONS: { value: ProjectSort; label: string }[] = [
  { value: "id", label: "Default" },
  { value: "title-asc", label: "Title A–Z" },
  { value: "title-desc", label: "Title Z–A" },
];

function useDebouncedValue<T>(value: T, delay: number): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

interface GridResponse {
  items: Project[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const ProjectsSection = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const rawCategory = searchParams.get("category") || "all";
  const category = (
    FILTERS.some((f) => f.key === rawCategory) ? rawCategory : "all"
  ) as ProjectCategory | "all";

  const qParam = searchParams.get("q") || "";

  const rawSort = searchParams.get("sort");
  const sort = (
    rawSort === "title-asc" || rawSort === "title-desc" ? rawSort : "id"
  ) as ProjectSort;

  const [searchInput, setSearchInput] = useState(qParam);
  const debouncedSearch = useDebouncedValue(searchInput, 320);

  useEffect(() => {
    setSearchInput(qParam);
  }, [qParam]);

  const replaceQuery = useCallback(
    (updates: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v === null || v === "") next.delete(k);
        else next.set(k, v);
      });
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname || "/", {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    if (debouncedSearch === qParam) return;
    replaceQuery({
      q: debouncedSearch.trim() || null,
      page: "1",
    });
  }, [debouncedSearch, qParam, replaceQuery]);

  const [grid, setGrid] = useState<GridResponse | null>(null);
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    setLoadingGrid(true);
    setError(null);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
      category,
      q: qParam,
      sort,
    });
    fetch(`/api/projects?${params}`, { signal: ac.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load projects");
        return r.json();
      })
      .then((data: GridResponse) => {
        setGrid(data);
        setLoadingGrid(false);
      })
      .catch((e: Error) => {
        if (e.name === "AbortError") return;
        setError(e.message);
        setLoadingGrid(false);
      });
    return () => ac.abort();
  }, [page, category, qParam, sort]);

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

  const handleCategory = (key: ProjectCategory | "all") => {
    replaceQuery({
      category: key === "all" ? null : key,
      page: "1",
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value as ProjectSort;
    replaceQuery({
      sort: v === "id" ? null : v,
      page: "1",
    });
  };

  const goPage = (p: number) => {
    replaceQuery({ page: p <= 1 ? null : String(p) });
    sectionRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  const items = grid?.items ?? [];
  const totalPages = grid?.totalPages ?? 1;
  const currentPage = grid?.page ?? page;

  return (
    <section ref={sectionRef} id="projects" className="relative scroll-mt-28 py-16 sm:py-24">
      <div className="dot-desk pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" aria-hidden />
      <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
            <span className="proj-head-word inline-block">Selected</span>{" "}
            <span className="proj-head-word inline-block text-zinc-400">projects</span>
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex flex-col gap-1.5 sm:w-72">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search title, stack…"
              className="glass-input px-4 py-2.5 text-sm"
              autoComplete="off"
            />
          </label>
          <label className="flex flex-col gap-1.5 sm:w-44">
            <span className="sr-only">Sort projects</span>
            <select
              value={sort}
              onChange={handleSortChange}
              className="glass-input cursor-pointer px-4 py-2.5 text-sm [&>option]:bg-zinc-900"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="mb-6 flex flex-row flex-wrap gap-2" role="group" aria-label="Filter by category">
        {FILTERS.map(({ key, label }) => (
          <ProjectTag
            key={key}
            name={label}
            isSelected={category === key}
            onClick={() => {
              handleCategory(key);
            }}
          />
        ))}
      </div>

      <p className="eyebrow mb-10 !text-[0.6875rem]">
        Hover to peek · Click a folder to open it
      </p>

      {error && (
        <p className="mb-6 text-center text-sm text-red-400/90" role="alert">
          {error}
        </p>
      )}

      {loadingGrid ? (
        <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <li
                key={i}
                className="glass h-[22rem] animate-pulse"
              >
              </li>
            ))}
        </ul>
      ) : (
        <>
          <ul className="grid w-full grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {items.map((project, i) => (
              <li
                key={project.id}
                data-project-id={project.id}
                className="project-card-item relative flex min-w-0 w-full max-w-full justify-center focus-within:z-10 hover:z-10"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imgUrl={project.image}
                  gitUrl={project.gitUrl}
                  previewUrl={project.previewUrl}
                  app={project.stack}
                  caseStudy={project.caseStudy}
                  index={i}
                />
              </li>
            ))}
          </ul>
          {items.length === 0 && (
            <p className="glass py-16 text-center text-zinc-400">
              No projects match your filters. Try another category or search
              term.
            </p>
          )}
        </>
      )}

      {!loadingGrid && totalPages > 1 && (
        <nav
          className="mt-12 flex flex-wrap items-center justify-center gap-2"
          aria-label="Project pages"
        >
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => goPage(currentPage - 1)}
            className="glass-key px-4 py-2 text-sm"
          >
            Previous
          </button>
          <span className="px-3 font-mono text-xs text-zinc-400">
            Page {currentPage} of {totalPages}
            {grid != null && (
              <span className="text-zinc-500"> · {grid.total} total</span>
            )}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => goPage(currentPage + 1)}
            className="glass-key px-4 py-2 text-sm"
          >
            Next
          </button>
        </nav>
      )}
    </section>
  );
};

export default ProjectsSection;

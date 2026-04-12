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
  { key: "web", label: "Web" },
  { key: "api", label: "API" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
  { key: "desktop", label: "Desktop" },
];

const SORT_OPTIONS: { value: ProjectSort; label: string }[] = [
  { value: "date-desc", label: "Newest first" },
  { value: "date-asc", label: "Oldest first" },
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

  const rawSort = searchParams.get("sort") || "date-desc";
  const sort = (
    SORT_OPTIONS.some((o) => o.value === rawSort) ? rawSort : "date-desc"
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

  const [featured, setFeatured] = useState<Project[]>([]);
  const [grid, setGrid] = useState<GridResponse | null>(null);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    setLoadingFeatured(true);
    fetch("/api/projects?featuredOnly=true&featuredLimit=3", {
      signal: ac.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load featured");
        return r.json();
      })
      .then((data: GridResponse) => {
        setFeatured(data.items);
        setLoadingFeatured(false);
      })
      .catch((e: unknown) => {
        if ((e as Error).name === "AbortError") return;
        setLoadingFeatured(false);
      });
    return () => ac.abort();
  }, []);

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
      excludeFeatured: "true",
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
    replaceQuery({ sort: e.target.value, page: "1" });
  };

  const goPage = (p: number) => {
    replaceQuery({ page: p <= 1 ? null : String(p) });
  };

  const items = grid?.items ?? [];
  const totalPages = grid?.totalPages ?? 1;
  const currentPage = grid?.page ?? page;

  return (
    <section ref={sectionRef} id="projects" className="scroll-mt-24">
      <h2 className="mt-6 mb-6 text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl md:mb-10">
        <span className="proj-head-word inline-block text-white">My</span>{" "}
        <span className="proj-head-word inline-block text-white">Projects</span>
      </h2>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <label className="flex w-full max-w-md flex-col gap-1.5 text-left md:max-w-sm">
          <span className="text-xs font-medium uppercase tracking-wide text-stone-500">
            Search
          </span>
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Title, stack, description…"
            className="rounded-full border border-stone-700 bg-zinc-900/50 px-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-600"
            autoComplete="off"
          />
        </label>
        <label className="flex w-full flex-col gap-1.5 text-left md:w-56 md:shrink-0">
          <span className="text-xs font-medium uppercase tracking-wide text-stone-500">
            Sort
          </span>
          <select
            value={sort}
            onChange={handleSortChange}
            className="cursor-pointer rounded-full border border-stone-700 bg-zinc-900/50 px-4 py-2.5 text-sm text-stone-200 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-600"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-2 py-4">
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

      {!loadingFeatured && featured.length > 0 && (
        <div className="mb-12">
          <h3 className="mb-6 text-center text-lg font-medium tracking-tight text-stone-300">
            Featured
          </h3>
          <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
            {featured.map((project) => (
              <li
                key={`feat-${project.id}`}
                className="project-card-item flex h-full min-w-0 w-full max-w-full"
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imgUrl={project.image}
                  gitUrl={project.gitUrl}
                  previewUrl={project.previewUrl}
                  app={project.stack}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3 className="mb-6 text-center text-lg font-medium tracking-tight text-stone-400">
        All projects
      </h3>

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
                className="min-h-[28rem] animate-pulse rounded-xl border border-stone-800/50 bg-zinc-900/20"
              >
                <div className="h-52 bg-zinc-800/50 md:h-72" />
                <div className="space-y-3 p-4">
                  <div className="h-6 w-2/3 rounded bg-zinc-800/60" />
                  <div className="h-16 rounded bg-zinc-800/40" />
                </div>
              </li>
            ))}
        </ul>
      ) : (
        <>
          <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
            {items.map((project) => (
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
                  app={project.stack}
                />
              </li>
            ))}
          </ul>
          {items.length === 0 && (
            <p className="py-16 text-center text-stone-500">
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
            className="rounded-full border border-stone-700 bg-zinc-900/60 px-4 py-2 text-sm text-stone-200 transition-colors hover:border-stone-600 hover:bg-zinc-800/80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span className="px-3 text-sm text-stone-400">
            Page {currentPage} of {totalPages}
            {grid != null && (
              <span className="text-stone-600"> ({grid.total} total)</span>
            )}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => goPage(currentPage + 1)}
            className="rounded-full border border-stone-700 bg-zinc-900/60 px-4 py-2 text-sm text-stone-200 transition-colors hover:border-stone-600 hover:bg-zinc-800/80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      )}
    </section>
  );
};

export default ProjectsSection;

export function ProjectsSectionFallback() {
  return (
    <section className="scroll-mt-24" aria-busy="true" aria-label="Loading projects">
      <div className="mx-auto mb-10 h-10 max-w-md animate-pulse rounded-lg bg-zinc-800/80" />
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-11 w-24 animate-pulse rounded-full bg-zinc-800/70"
            />
          ))}
      </div>
      <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <li key={i} className="min-h-[28rem] rounded-xl border border-stone-800/50 bg-zinc-900/20">
              <div className="h-52 animate-pulse bg-zinc-800/60 md:h-72" />
              <div className="space-y-3 p-4">
                <div className="h-6 w-2/3 animate-pulse rounded bg-zinc-800/70" />
                <div className="h-20 animate-pulse rounded bg-zinc-800/50" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-zinc-800/60" />
                  <div className="h-6 w-16 animate-pulse rounded-full bg-zinc-800/60" />
                </div>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}

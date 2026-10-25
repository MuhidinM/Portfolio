export function ProjectsSectionFallback() {
  return (
    <section className="scroll-mt-28 py-16 sm:py-24" aria-busy="true" aria-label="Loading projects">
      <div className="mb-10 h-12 w-72 animate-pulse rounded-2xl bg-white/5" />
      <div className="mb-10 flex flex-wrap gap-2">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-9 w-24 animate-pulse rounded-[14px] bg-white/5" />
          ))}
      </div>
      <ul className="grid w-full grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <li key={i} className="glass h-[22rem] animate-pulse" />
          ))}
      </ul>
    </section>
  );
}

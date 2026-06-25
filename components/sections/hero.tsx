export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
      aria-label="Introduction"
    >
      <p className="font-mono text-xs uppercase tracking-[0.45em] text-white/80 text-shadow-soft md:text-sm">
        Portfolio
      </p>
      <h1 className="mt-5 max-w-4xl text-balance font-heading text-5xl font-semibold leading-[1.05] text-white text-shadow-soft sm:text-6xl md:text-7xl lg:text-8xl">
        MOHIT SEN
      </h1>
      <p className="mt-6 max-w-xl text-pretty text-base text-white/90 text-shadow-soft sm:text-lg md:text-xl">
        Attention Is All Curiosity Needs.
      </p>

      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-white/85">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-shadow-soft">
          Scroll to wander
        </span>
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/60 p-1.5">
          <span className="animate-float-bob h-2 w-1 rounded-full bg-white" />
        </span>
      </div>
    </section>
  )
}

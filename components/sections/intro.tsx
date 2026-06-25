import { Reveal } from '@/components/reveal'

const STATS = [
  { value: 'ASK', label: 'why?' },
  { value: 'BUILD', label: 'quick' },
  { value: 'OPTIMISE', label: 'daily' },
]

export function Intro() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-5xl px-6 py-28 md:py-36"
    >
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
          acerca de mí
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-6 max-w-3xl text-balance font-heading text-3xl font-medium leading-tight text-foreground sm:text-4xl md:text-5xl">
          LIKE A GARDENER, I BELIEVE GROWTH COMES FROM PATIENCE, 
          OBSERVATION, AND COUNTLESS SMALL REFINEMENTS.
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Electronics and Instrumentation Engineering student. 
          Machine Learning enthusiast . 
          Drawn to building intelligent systems that learn, adapt, and create impact.
        </p>
      </Reveal>

      <Reveal delay={200}>
        <dl className="mt-14 grid grid-cols-1 gap-6 border-t border-border pt-10 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="font-heading text-4xl font-semibold text-foreground md:text-5xl">
                {stat.value}
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}

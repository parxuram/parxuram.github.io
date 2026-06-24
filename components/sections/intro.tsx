import { Reveal } from '@/components/reveal'

const STATS = [
  { value: '12+', label: 'Shipped projects' },
  { value: '5', label: 'Hackathon wins' },
  { value: '8.7', label: 'CGPA / 10' },
]

export function Intro() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-5xl px-6 py-28 md:py-36"
    >
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
          The short version
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-6 max-w-3xl text-balance font-heading text-3xl font-medium leading-tight text-foreground sm:text-4xl md:text-5xl">
          I teach machines to see, listen, and decide — then put them on
          hardware that has to survive the real world.
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          My work lives at the seam between deep learning and embedded systems:
          training models in PyTorch, squeezing them onto microcontrollers, and
          wrapping the whole thing in software people actually enjoy using. I
          care about latency, about edge cases, and about the small details
          that make a system feel alive.
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

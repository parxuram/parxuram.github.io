import { GraduationCap } from 'lucide-react'

import { Reveal } from '@/components/reveal'

interface Entry {
  school: string
  degree: string
  period: string
  detail: string
}

const ENTRIES: Entry[] = [
  {
    school: 'coursera (Andrew Ng)',
    degree: 'Machine Learning & Deep Learning Specializations',
    period: '2025 — 2026',
    detail:
      'PERCEPTION   REASONING   LEARNING',
  },
  {
    school: 'NATIONAL INSTITUTE OF TECHNOLOGY SILCHAR',
    degree: 'B.Tech, Electronics & Instrumentation',
    period: '2024 — 2028',
    detail:
      'SENSORS   SIGNALS   SYSTEMS',
  },
]

export function Education() {
  return (
    <section
      id="education"
      className="relative border-t border-border px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
            Foundations
          </p>
          <h2 className="mt-5 font-heading text-3xl font-medium text-foreground sm:text-4xl md:text-5xl">
            Education
          </h2>
        </Reveal>

        <ol className="mt-14 space-y-4">
          {ENTRIES.map((entry, i) => (
            <Reveal as="li" key={entry.school} delay={i * 80}>
              <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-7 sm:flex-row sm:items-start sm:gap-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-grass/15 text-grass">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      {entry.school}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {entry.period}
                    </span>
                  </div>
                  <p className="mt-1 font-medium text-foreground/80">
                    {entry.degree}
                  </p>
                  <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                    {entry.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

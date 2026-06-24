import { Trophy, BadgeCheck, FileText, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/reveal'

interface Achievement {
  icon: LucideIcon
  title: string
  detail: string
  year: string
}

const ACHIEVEMENTS: Achievement[] = [
  {
    icon: Trophy,
    title: 'Winner — National AI Hackathon',
    detail:
      'First place among 400+ teams for an accessibility tool that captions the physical world in real time.',
    year: '2024',
  },
  {
    icon: FileText,
    title: 'IEEE Conference Publication',
    detail:
      'Co-authored a paper on energy-efficient on-device inference for agricultural sensor networks.',
    year: '2024',
  },
  {
    icon: Sparkles,
    title: 'Top 1% — Kaggle Image Segmentation',
    detail:
      'Finished in the top 1% of a global competition with an ensemble of U-Net variants and test-time augmentation.',
    year: '2023',
  },
  {
    icon: BadgeCheck,
    title: 'GATE Qualified (ECE)',
    detail:
      'Cleared the Graduate Aptitude Test in Engineering with a percentile in the top 2 percent.',
    year: '2023',
  },
]

export function Achievements() {
  return (
    <section
      id="awards"
      className="relative border-t border-border px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
            Milestones
          </p>
          <h2 className="mt-5 font-heading text-3xl font-medium text-foreground sm:text-4xl md:text-5xl">
            Achievements
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {ACHIEVEMENTS.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal as="article" key={item.title} delay={(i % 2) * 90}>
                <div className="flex h-full gap-5 rounded-3xl border border-border bg-card p-7">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        {item.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.year}
                    </span>
                    <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

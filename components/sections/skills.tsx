import { Brain, Cpu, Code2, Boxes } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/reveal'

interface SkillGroup {
  icon: LucideIcon
  title: string
  items: string[]
}

const GROUPS: SkillGroup[] = [
  {
    icon: Brain,
    title: 'Machine Learning',
    items: [
      'PyTorch',
      'TensorFlow (Keras)',
      'scikit-learn',
      'Hugging Face',
      'OpenCV',
      'Model quantization',
    ],
  },
  {
    icon: Code2,
    title: 'Languages',
    items: ['Python', 'C / C++', 'TypeScript', 'MATLAB', 'SQL'],
  },
  {
    icon: Boxes,
    title: 'Tooling & Infra',
    items: ['Git', 'Docker', 'FastAPI', 'pgvector', 'ONNX Runtime'],
  },
]

export function Skills() {
  return (
    <section
      id="skills"
      className="relative border-t border-border bg-card/40 px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
            The toolkit
          </p>
          <h2 className="mt-5 font-heading text-3xl font-medium text-foreground sm:text-4xl md:text-5xl">
            Skills &amp; technologies
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {GROUPS.map((group, i) => {
            const Icon = group.icon
            return (
              <Reveal as="article" key={group.title} delay={(i % 2) * 90}>
                <div className="h-full rounded-3xl border border-border bg-card p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground/80"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

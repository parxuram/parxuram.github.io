import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/reveal'

interface Project {
  title: string
  blurb: string
  tags: string[]
  year: string
}

const PROJECTS: Project[] = [
  {
    title: 'Edge Crop-Disease Scout',
    blurb:
      'A TinyML pipeline that runs a quantized CNN on an ESP32-CAM to flag leaf diseases offline, in the field, with no cloud round-trip. Sub-200ms inference at 94% accuracy.',
    tags: ['TensorFlow Lite', 'ESP32', 'Quantization', 'OpenCV'],
    year: '2025',
  },
  {
    title: 'Lumen — Retrieval-Augmented Assistant',
    blurb:
      'A document-grounded chat assistant that cites its sources. Hybrid vector + keyword retrieval over a pgvector store, streamed through a token-efficient prompt cache.',
    tags: ['LangChain', 'pgvector', 'RAG', 'FastAPI'],
    year: '2024',
  },
  {
    title: 'Gesture-Piloted Quadcopter',
    blurb:
      'Real-time hand-pose recognition turning webcam gestures into MAVLink flight commands. Built a custom dataset and a lightweight MediaPipe + MLP classifier for low-latency control.',
    tags: ['MediaPipe', 'PyTorch', 'MAVLink', 'Control'],
    year: '2024',
  },
  {
    title: 'Neural Style Studio',
    blurb:
      'A browser-based real-time style transfer tool. Trained feed-forward transformer networks exported to ONNX and ran them on-device with WebGPU for instant, private rendering.',
    tags: ['ONNX', 'WebGPU', 'CNN', 'TypeScript'],
    year: '2023',
  },
]

export function Projects() {
  return (
    <section
      id="work"
      className="relative border-t border-border bg-card/40 px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
                Selected work
              </p>
              <h2 className="mt-5 font-heading text-3xl font-medium text-foreground sm:text-4xl md:text-5xl">
                Things I&apos;ve built
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <Reveal as="article" key={project.title} delay={(i % 2) * 90}>
              <a
                href="#contact"
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
                    {project.title}
                  </h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-4 flex-1 text-pretty leading-relaxed text-muted-foreground">
                  {project.blurb}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <span className="mr-1 font-mono text-xs text-muted-foreground">
                    {project.year}
                  </span>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

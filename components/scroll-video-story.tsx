'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Brain,
  Code2,
  Boxes,
  GraduationCap,
  FileText,
  Mail,
} from 'lucide-react'

import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'

/* ----------------------------------------------------------------------------
 * Content
 * ------------------------------------------------------------------------- */

const STATS = [
  { value: 'ASK', label: 'why?' },
  { value: 'BUILD', label: 'quick' },
  { value: 'OPTIMISE', label: 'daily' },
]

const PROJECTS = [
  {
    title: 'Traffic Violation Detection & Analysis System',
    blurb:
      'An AI-powered computer vision system that detects traffic violations, tracks vehicles, recognizes license plates, and generates actionable traffic analytics from video streams.',
    tags: ['YOLOv11', 'EasyOCR', 'OpenCV', 'Computer Vision'],
    link: 'https://github.com/parxuram/emerald',
  },
  {
    title: 'Traffic Demand Prediction',
    blurb:
      'An ensemble forecasting pipeline for transportation demand — CatBoost, LightGBM, and XGBoost stacked with a Ridge meta-learner, tuned via Optuna, with engineered lag features pushing R\u00b2 past 91%.',
    tags: ['CatBoost', 'LightGBM', 'Optuna', 'Feature Engineering'],
    link: 'https://github.com/parxuram/FLIPKART-GRIDLOCK-2026',
  },
  {
    title: 'Adaptive AI Companion for Neurodivergence',
    blurb:
      'An LLM-powered micro-task companion for neurodivergent users — breaks goals into bite-sized steps and adapts support in real time based on behavioral signals.',
    tags: ['LLMs', 'Gemini', 'FastAPI', 'Human-Centered AI'],
    link: 'https://github.com/parxuram/LLM_for_neurodivergence',
  },
  {
    title: 'Khrishi_Mitra \u2013 (solution Framework)',
    blurb:
      'AI-powered farming assistant that predicts crop yield, detects pests and diseases, and provides personalized multilingual recommendations using weather, soil, and crop data.',
    tags: ['Precision Agriculture', 'Crop Yield Prediction', 'AI Advisory'],
  },
]

const EDUCATION = [
  {
    school: 'Coursera (Andrew Ng)',
    degree: 'Machine Learning & Deep Learning Specializations',
    period: '2025 — 2026',
    detail: 'PERCEPTION \u00b7 REASONING \u00b7 LEARNING',
  },
  {
    school: 'National Institute of Technology Silchar',
    degree: 'B.Tech, Electronics & Instrumentation',
    period: '2024 — 2028',
    detail: 'SENSORS \u00b7 SIGNALS \u00b7 SYSTEMS',
  },
]

const SKILL_GROUPS = [
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

const CONTACT_LINKS = [
  { icon: Mail, label: 'Email', value: 'chukundarcodes@gmail.com', href: 'mailto:chukundarcodes@gmail.com' },
  { icon: GithubIcon, label: 'GitHub', value: 'github.com/parxuram', href: 'https://github.com/parxuram' },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'in/mohit-sen', href: 'https://www.linkedin.com/in/mohit-sen-7888ab317' },
  { icon: FileText, label: 'R\u00e9sum\u00e9', value: 'Download PDF', href: '#' },
]

/* Scene order also drives the nav anchors below. */
const SCENE_IDS = ['top', 'about', 'work', 'education', 'skills', 'contact']
const N = SCENE_IDS.length
const SPACING = 1 / (N - 1)
// Crossfade shape (in units of SPACING, where 1 = distance to the next scene):
// panels stay fully opaque within PLATEAU, then fade to 0 across EDGE.
const PLATEAU = 0.32
const EDGE = 0.2

/* ----------------------------------------------------------------------------
 * Component
 * ------------------------------------------------------------------------- */

export function ScrollVideoStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cueRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<Array<HTMLDivElement | null>>([])

  const targetTime = useRef(0)
  const renderedTime = useRef(0)
  const durationRef = useRef(0)
  const rafRef = useRef(0)
  const seekingRef = useRef(false)

  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const handleMeta = () => {
      durationRef.current = video.duration || 0
      setReady(true)
    }
    if (video.readyState >= 1) handleMeta()
    video.addEventListener('loadedmetadata', handleMeta)

    const onSeeked = () => {
      seekingRef.current = false
    }
    video.addEventListener('seeked', onSeeked)

    const computeProgress = () => {
      const total = container.offsetHeight - window.innerHeight
      const scrolled = -container.getBoundingClientRect().top
      return Math.min(1, Math.max(0, scrolled / Math.max(1, total)))
    }

    const onScroll = () => {
      const progress = computeProgress()
      const duration = durationRef.current || video.duration || 1
      targetTime.current = progress * duration * 0.999

      // Crossfade panels: each scene is centered at i/(N-1) of the scroll.
      // A plateau keeps each panel fully visible for most of its range, with
      // a short crossfade at the edges so only one panel reads at a time.
      for (let i = 0; i < N; i++) {
        const el = panelsRef.current[i]
        if (!el) continue
        const center = i * SPACING
        const d = Math.abs(progress - center) / SPACING // 0 at center, 1 at neighbor
        let op: number
        if (d <= PLATEAU) op = 1
        else if (d >= PLATEAU + EDGE) op = 0
        else op = 1 - (d - PLATEAU) / EDGE
        const shift = (progress - center) * -56
        el.style.opacity = String(op)
        el.style.transform = `translateY(${shift}px) scale(${1 - (1 - op) * 0.03})`
        el.style.pointerEvents = op > 0.6 ? 'auto' : 'none'
      }

      if (cueRef.current) {
        cueRef.current.style.opacity = String(Math.max(0, 1 - progress * 12))
      }
    }

    const tick = () => {
      const diff = targetTime.current - renderedTime.current
      renderedTime.current += diff * 0.2
      if (!seekingRef.current && Math.abs(diff) > 0.01 && video.readyState >= 2) {
        seekingRef.current = true
        try {
          video.currentTime = renderedTime.current
        } catch {
          seekingRef.current = false
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      video.removeEventListener('loadedmetadata', handleMeta)
      video.removeEventListener('seeked', onSeeked)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const registerPanel = (i: number) => (el: HTMLDivElement | null) => {
    panelsRef.current[i] = el
  }

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${N * 100}vh` }}
      aria-label="Portfolio"
    >
      {/* Scroll anchors so nav links jump to the right scene */}
      {SCENE_IDS.map((id, i) => (
        <span
          key={id}
          id={id}
          className="pointer-events-none absolute left-0 h-px w-px"
          style={{ top: `calc((100% - 100vh) * ${i * SPACING})` }}
          aria-hidden="true"
        />
      ))}

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/duck-scrub.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />

        {/* Legibility wash */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(12,28,52,0.30) 0%, rgba(12,28,52,0.05) 30%, rgba(8,20,40,0.18) 70%, rgba(8,20,40,0.50) 100%)',
          }}
          aria-hidden="true"
        />

        {/* ---- Scene 0: Hero ---- */}
        <Scene ref={registerPanel(0)}>
          <div className="flex flex-col items-center text-center">
            <p className="font-mono text-xs uppercase tracking-[0.45em] text-black text-shadow-soft md:text-sm">
              Portfolio
            </p>
            <h1 className="mt-5 max-w-4xl text-balance font-heading text-5xl font-semibold leading-[1.05] text-white text-shadow-soft sm:text-6xl md:text-7xl lg:text-8xl">
              MOHIT SEN
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base text-black text-shadow-soft sm:text-lg md:text-xl">
              Attention Is All Curiosity Needs.
            </p>
          </div>
        </Scene>

        {/* ---- Scene 1: Intro ---- */}
        <Scene ref={registerPanel(1)}>
          <article className="glass-panel mx-auto w-full max-w-2xl rounded-4xl p-8 md:p-10">
            <SceneLabel>acerca de mí</SceneLabel>
            <h2 className="mt-5 text-balance font-heading text-2xl font-medium leading-tight text-foreground sm:text-3xl md:text-4xl">
              LIKE A GARDENER, I BELIEVE GROWTH COMES FROM PATIENCE,
              OBSERVATION, AND COUNTLESS SMALL REFINEMENTS.
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              Electronics and Instrumentation Engineering student. Machine
              Learning enthusiast. Drawn to building intelligent systems that
              learn, adapt, and create impact.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border/60 pt-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-heading text-3xl font-semibold text-foreground md:text-4xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </Scene>

        {/* ---- Scene 2: Projects ---- */}
        <Scene ref={registerPanel(2)}>
          <div className="mx-auto w-full max-w-4xl">
            <SceneLabel center>Selected work</SceneLabel>
            <h2 className="mt-3 text-center font-heading text-3xl font-medium text-white text-shadow-soft sm:text-4xl">
              Things I&apos;ve built
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PROJECTS.map((p) => (
                <div key={p.title} className="glass-tile rounded-3xl p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {p.title}
                    </h3>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary/70 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        aria-label={`View ${p.title} on GitHub`}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {p.blurb}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-secondary/70 px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Scene>

        {/* ---- Scene 3: Education ---- */}
        <Scene ref={registerPanel(3)}>
          <div className="mx-auto w-full max-w-2xl">
            <SceneLabel center>Foundations</SceneLabel>
            <h2 className="mt-3 text-center font-heading text-3xl font-medium text-white text-shadow-soft sm:text-4xl">
              Education
            </h2>
            <ol className="mt-8 space-y-3">
              {EDUCATION.map((e) => (
                <li
                  key={e.school}
                  className="glass-tile flex gap-4 rounded-3xl p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-grass/20 text-grass">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {e.school}
                      </h3>
                      <span className="font-mono text-xs text-muted-foreground">
                        {e.period}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm font-medium text-foreground/80">
                      {e.degree}
                    </p>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {e.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Scene>

        {/* ---- Scene 4: Skills ---- */}
        <Scene ref={registerPanel(4)}>
          <div className="mx-auto w-full max-w-3xl">
            <SceneLabel center>The toolkit</SceneLabel>
            <h2 className="mt-3 text-center font-heading text-3xl font-medium text-white text-shadow-soft sm:text-4xl">
              Skills &amp; technologies
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {SKILL_GROUPS.map((g) => {
                const Icon = g.icon
                return (
                  <div key={g.title} className="glass-tile rounded-3xl p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {g.title}
                      </h3>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-xs text-foreground/80"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </Scene>

        {/* ---- Scene 5: Contact ---- */}
        <Scene ref={registerPanel(5)}>
          <div className="mx-auto w-full max-w-2xl text-center">
            <SceneLabel center>Let&apos;s build something</SceneLabel>
            <h2 className="mt-4 text-balance font-heading text-4xl font-semibold leading-tight text-white text-shadow-soft sm:text-5xl">
              Have a problem worth solving?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-pretty leading-relaxed text-white/90 text-shadow-soft">
              I&apos;m open to internships, research collaborations, and
              ambitious side projects. The inbox is always open — say hello.
            </p>
            <div className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
              {CONTACT_LINKS.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="glass-tile group flex items-center gap-3 rounded-2xl p-4 text-left transition-transform hover:-translate-y-0.5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                        {link.label}
                      </span>
                      <span className="block truncate text-sm font-medium text-foreground">
                        {link.value}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )
              })}
            </div>
            <p className="mt-10 font-mono text-xs text-white/70 text-shadow-soft">
              Designed &amp; built by MOHIT SEN · {new Date().getFullYear()}
            </p>
          </div>
        </Scene>

        {/* Scroll cue */}
        <div
          ref={cueRef}
          className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-white/85"
        >
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-shadow-soft">
            Scroll to wander
          </span>
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/60 p-1.5">
            <span className="animate-float-bob h-2 w-1 rounded-full bg-white" />
          </span>
        </div>

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-sky/20">
            <span className="font-mono text-xs uppercase tracking-widest text-white/70">
              Loading scene…
            </span>
          </div>
        )}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------------------
 * Small helpers
 * ------------------------------------------------------------------------- */

const Scene = ({
  ref,
  children,
}: {
  ref: (el: HTMLDivElement | null) => void
  children: React.ReactNode
}) => (
  <div
    ref={ref}
    className="absolute inset-0 flex items-center justify-center overflow-y-auto px-6 py-24 will-change-[opacity,transform]"
    style={{ opacity: 0 }}
  >
    <div className="my-auto w-full">{children}</div>
  </div>
)

function SceneLabel({
  children,
  center = false,
}: {
  children: React.ReactNode
  center?: boolean
}) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-[0.35em] text-primary ${
        center ? 'text-center text-white/85 text-shadow-soft' : ''
      }`}
    >
      {children}
    </p>
  )
}

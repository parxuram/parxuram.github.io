import { Mail, FileText, ArrowUpRight } from 'lucide-react'

import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'

const LINKS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@ariawren.dev',
    href: 'mailto:hello@ariawren.dev',
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/ariawren',
    href: 'https://github.com',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'in/ariawren',
    href: 'https://linkedin.com',
  },
  {
    icon: FileText,
    label: 'Résumé',
    value: 'Download PDF',
    href: '#',
  },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border px-6 py-28 md:py-40"
      style={{
        background:
          'linear-gradient(to bottom, oklch(0.82 0.09 232) 0%, oklch(0.88 0.07 200) 40%, oklch(0.78 0.12 150) 100%)',
      }}
    >
      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-foreground/70">
            Let&apos;s build something
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-6 text-balance font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
            Have a problem worth solving?
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-foreground/80">
            I&apos;m open to internships, research collaborations, and
            ambitious side projects. The inbox is always open — say hello.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            {LINKS.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-4 rounded-2xl border border-foreground/10 bg-background/70 p-5 text-left backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-background"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                      {link.label}
                    </span>
                    <span className="block truncate font-medium text-foreground">
                      {link.value}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )
            })}
          </div>
        </Reveal>

        <Reveal delay={260}>
          <p className="mt-16 font-mono text-xs text-foreground/60">
            Designed &amp; built by Aria Wren · {new Date().getFullYear()}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

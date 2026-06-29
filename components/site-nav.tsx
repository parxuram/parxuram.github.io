'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function SiteNav() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        shown
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0',
      )}
    >
      <nav className="mx-auto mt-3 flex max-w-5xl items-center justify-between gap-4 rounded-full border border-border/70 bg-background/80 px-5 py-2.5 shadow-sm backdrop-blur-md sm:px-6">
        <a
          href="#top"
          className="font-heading text-base font-semibold tracking-tight text-foreground"
        >
          mohit
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Say hello
        </a>
      </nav>
    </header>
  )
}

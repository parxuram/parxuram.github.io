'use client'

import { useEffect, useRef, useState } from 'react'

const SCROLL_LENGTH_VH = 420 // total scroll distance for the scrub, in vh

export function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const cueRef = useRef<HTMLDivElement>(null)

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
      // Leave a touch of the tail so the last frame stays clean.
      targetTime.current = progress * duration * 0.999

      if (overlayRef.current) {
        const fade = Math.max(0, 1 - progress * 2.4)
        overlayRef.current.style.opacity = String(fade)
        overlayRef.current.style.transform = `translateY(${progress * -60}px) scale(${1 - progress * 0.04})`
      }
      if (cueRef.current) {
        cueRef.current.style.opacity = String(Math.max(0, 1 - progress * 6))
      }
    }

    const tick = () => {
      const diff = targetTime.current - renderedTime.current
      // Ease toward the scroll target for a smooth, weighted feel.
      renderedTime.current += diff * 0.2
      // Only issue a new seek once the previous one has resolved. Queuing
      // seeks faster than the decoder can satisfy them is what makes
      // currentTime scrubbing look choppy.
      if (
        !seekingRef.current &&
        Math.abs(diff) > 0.01 &&
        video.readyState >= 2
      ) {
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

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${SCROLL_LENGTH_VH}vh` }}
      aria-label="Introduction"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/duck-scrub.mp4"
          muted
          playsInline
          preload="auto"
          // poster kept as first frame fallback while metadata loads
          aria-hidden="true"
        />

        {/* Gradient legibility wash */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(12,28,52,0.28) 0%, rgba(12,28,52,0) 32%, rgba(12,28,52,0) 58%, rgba(8,20,40,0.55) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Hero copy */}
        <div
          ref={overlayRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.45em] text-white/80 text-shadow-soft md:text-sm">
            Portfolio
          </p>
          <h1 className="mt-5 max-w-4xl text-balance font-heading text-5xl font-semibold leading-[1.05] text-white text-shadow-soft sm:text-6xl md:text-7xl lg:text-8xl">
            Aria Wren
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base text-white/90 text-shadow-soft sm:text-lg md:text-xl">
            AI/ML &amp; Electronics Engineer crafting intelligent systems that
            live where software meets the physical world.
          </p>
        </div>

        {/* Scroll cue */}
        <div
          ref={cueRef}
          className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-white/85"
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

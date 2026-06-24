'use client'

import { useEffect, useRef } from 'react'

/**
 * A fixed, full-viewport video that scrubs across the ENTIRE page scroll.
 * The goose keeps walking through the meadow the whole way down while the
 * content sections float over it inside frosted-glass panels.
 */
export function CinematicBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const washRef = useRef<HTMLDivElement>(null)

  const targetTime = useRef(0)
  const renderedTime = useRef(0)
  const durationRef = useRef(0)
  const rafRef = useRef(0)
  const seekingRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleMeta = () => {
      durationRef.current = video.duration || 0
    }
    if (video.readyState >= 1) handleMeta()
    video.addEventListener('loadedmetadata', handleMeta)

    const onSeeked = () => {
      seekingRef.current = false
    }
    video.addEventListener('seeked', onSeeked)

    const computeProgress = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      return Math.min(1, Math.max(0, scrolled / Math.max(1, total)))
    }

    const onScroll = () => {
      const progress = computeProgress()
      const duration = durationRef.current || video.duration || 1
      // Leave a touch of the tail so the final frame stays clean.
      targetTime.current = progress * duration * 0.999

      // Slightly deepen the legibility wash as we move into denser content.
      if (washRef.current) {
        const intensity = 0.32 + progress * 0.22
        washRef.current.style.opacity = String(intensity)
      }
    }

    const tick = () => {
      const diff = targetTime.current - renderedTime.current
      renderedTime.current += diff * 0.2
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
    <div className="fixed inset-0 -z-10 h-screen w-full overflow-hidden bg-sky">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/duck-scrub.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {/* Adaptive legibility wash */}
      <div
        ref={washRef}
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.32,
          background:
            'linear-gradient(to bottom, rgba(10,24,46,0.35) 0%, rgba(10,24,46,0.12) 30%, rgba(10,24,46,0.12) 60%, rgba(8,20,40,0.5) 100%)',
        }}
        aria-hidden="true"
      />
    </div>
  )
}

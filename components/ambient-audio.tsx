'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * AmbientAudio
 * Synthesizes a gentle meadow soundscape entirely with the Web Audio API
 * (no audio files needed) and sprinkles in randomly-timed duck quacks.
 * Audio only starts after a user gesture, per browser autoplay rules.
 */
export function AmbientAudio() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const nodesRef = useRef<{ stop: () => void }[]>([])
  const quackTimerRef = useRef<number | null>(null)
  const birdTimerRef = useRef<number | null>(null)

  // ---- build the looping meadow bed (wind + airy hiss) ----
  const startAmbience = useCallback((ctx: AudioContext, master: GainNode) => {
    // Pink-ish noise buffer for a soft wind/meadow bed.
    const seconds = 4
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    let b0 = 0
    let b1 = 0
    let b2 = 0
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1
      // simple pink noise filter
      b0 = 0.99765 * b0 + white * 0.099
      b1 = 0.963 * b1 + white * 0.2965
      b2 = 0.57 * b2 + white * 1.0526
      data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.05
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    noise.loop = true

    const windFilter = ctx.createBiquadFilter()
    windFilter.type = 'lowpass'
    windFilter.frequency.value = 650

    const windGain = ctx.createGain()
    windGain.gain.value = 0.6

    // slow LFO so the breeze swells and fades
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.07
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.25
    lfo.connect(lfoGain)
    lfoGain.connect(windGain.gain)

    noise.connect(windFilter)
    windFilter.connect(windGain)
    windGain.connect(master)

    noise.start()
    lfo.start()

    nodesRef.current.push({
      stop: () => {
        try {
          noise.stop()
          lfo.stop()
        } catch {
          /* already stopped */
        }
      },
    })
  }, [])

  // ---- a single duck quack ----
  const playQuack = useCallback((ctx: AudioContext, master: GainNode, when: number) => {
    const dur = 0.18 + Math.random() * 0.12
    const base = 180 + Math.random() * 120

    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    // quacks have a quick downward pitch bend
    osc.frequency.setValueAtTime(base * 1.5, when)
    osc.frequency.exponentialRampToValueAtTime(base, when + dur)

    // formant-ish band to give it that nasal "quack" timbre
    const band = ctx.createBiquadFilter()
    band.type = 'bandpass'
    band.frequency.value = 900 + Math.random() * 400
    band.Q.value = 6

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, when)
    gain.gain.exponentialRampToValueAtTime(0.5, when + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, when + dur)

    osc.connect(band)
    band.connect(gain)
    gain.connect(master)

    osc.start(when)
    osc.stop(when + dur + 0.05)
  }, [])

  // ---- a soft bird chirp for extra meadow life ----
  const playChirp = useCallback((ctx: AudioContext, master: GainNode, when: number) => {
    const dur = 0.08 + Math.random() * 0.06
    const f = 2200 + Math.random() * 1600
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(f, when)
    osc.frequency.exponentialRampToValueAtTime(f * 1.4, when + dur)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.0001, when)
    gain.gain.exponentialRampToValueAtTime(0.08, when + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, when + dur)

    osc.connect(gain)
    gain.connect(master)
    osc.start(when)
    osc.stop(when + dur + 0.05)
  }, [])

  const scheduleQuacks = useCallback(
    (ctx: AudioContext, master: GainNode) => {
      const tick = () => {
        const now = ctx.currentTime
        // bursts of 1–3 quacks close together
        const count = 1 + Math.floor(Math.random() * 3)
        for (let i = 0; i < count; i++) {
          playQuack(ctx, master, now + i * (0.18 + Math.random() * 0.15))
        }
        // next burst somewhere between 4 and 12 seconds out
        const next = 4000 + Math.random() * 8000
        quackTimerRef.current = window.setTimeout(tick, next)
      }
      quackTimerRef.current = window.setTimeout(tick, 1500 + Math.random() * 2500)
    },
    [playQuack],
  )

  const scheduleBirds = useCallback(
    (ctx: AudioContext, master: GainNode) => {
      const tick = () => {
        const now = ctx.currentTime
        const count = 1 + Math.floor(Math.random() * 2)
        for (let i = 0; i < count; i++) {
          playChirp(ctx, master, now + i * (0.12 + Math.random() * 0.1))
        }
        const next = 3000 + Math.random() * 6000
        birdTimerRef.current = window.setTimeout(tick, next)
      }
      birdTimerRef.current = window.setTimeout(tick, 800 + Math.random() * 2000)
    },
    [playChirp],
  )

  const stopAll = useCallback(() => {
    if (quackTimerRef.current) window.clearTimeout(quackTimerRef.current)
    if (birdTimerRef.current) window.clearTimeout(birdTimerRef.current)
    quackTimerRef.current = null
    birdTimerRef.current = null
    nodesRef.current.forEach((n) => n.stop())
    nodesRef.current = []
    if (masterRef.current && ctxRef.current) {
      const now = ctxRef.current.currentTime
      masterRef.current.gain.cancelScheduledValues(now)
      masterRef.current.gain.setValueAtTime(masterRef.current.gain.value, now)
      masterRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.4)
    }
  }, [])

  const toggle = useCallback(async () => {
    if (on) {
      stopAll()
      setOn(false)
      return
    }

    let ctx = ctxRef.current
    if (!ctx) {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      ctxRef.current = ctx
      const master = ctx.createGain()
      master.gain.value = 0.0001
      master.connect(ctx.destination)
      masterRef.current = master
    }
    await ctx.resume()

    const master = masterRef.current!
    const now = ctx.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.setValueAtTime(0.0001, now)
    master.gain.linearRampToValueAtTime(0.28, now + 1.2)

    startAmbience(ctx, master)
    scheduleQuacks(ctx, master)
    scheduleBirds(ctx, master)
    setOn(true)
  }, [on, startAmbience, scheduleQuacks, scheduleBirds, stopAll])

  useEffect(() => {
    return () => {
      stopAll()
      ctxRef.current?.close().catch(() => {})
    }
  }, [stopAll])

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute meadow ambience' : 'Play meadow ambience'}
      className={cn(
        'fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full',
        'border border-border/70 bg-background/80 text-foreground shadow-md backdrop-blur-md',
        'transition-all duration-300 hover:scale-105 hover:bg-secondary',
      )}
    >
      {on ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      {on && (
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-accent/30" />
      )}
      <span className="sr-only">{on ? 'Sound on' : 'Sound off'}</span>
    </button>
  )
}

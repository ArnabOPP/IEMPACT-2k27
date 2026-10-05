import { useCallback, useEffect, useRef, useState } from 'react'
import { events } from '@/data/events'
import './EventsSection.css'

const count = events.length
const AUTOPLAY_MS = 2500 // time each card stays in the centre

// Shortest circular distance of card `i` from the active card (-n/2 .. n/2)
function offsetOf(i, active) {
  let d = (i - active + count) % count
  if (d > count / 2) d -= count
  return d
}

function Chevron({ flip }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function EventsSection() {
  const [active, setActive] = useState(1) // start on Step Up, like the design
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef(null)
  const swipeStart = useRef(null)

  const go = useCallback((step) => setActive((a) => (a + step + count) % count), [])

  useEffect(() => {
    // Preload every card so the carousel never flashes
    events.forEach(({ card }) => { new Image().src = card })
  }, [])

  // Auto-scroll: advance every few seconds while visible and not hovered/focused.
  // Depending on `active` restarts the timer after any manual navigation.
  useEffect(() => {
    const section = sectionRef.current
    if (!section || paused || !inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setTimeout(() => go(1), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [active, paused, inView, go])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 })
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const current = events[active]

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="events"
      aria-roledescription="carousel"
      aria-label="Our events"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1)
        if (e.key === 'ArrowRight') go(1)
      }}
    >
      <h2 className="events__title">Our Events</h2>

      <div
        className="events__stage"
        onPointerDown={(e) => { swipeStart.current = e.clientX }}
        onPointerUp={(e) => {
          if (swipeStart.current == null) return
          const dx = e.clientX - swipeStart.current
          swipeStart.current = null
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
        }}
      >
        {events.map((ev, i) => {
          const d = offsetOf(i, active)
          const near = Math.abs(d) <= 1
          return (
            <button
              key={ev.no}
              type="button"
              className={`events__card${d === 0 ? ' is-active' : ''}`}
              style={{ '--d': Math.max(-2, Math.min(2, d)) }}
              data-near={near}
              tabIndex={near ? 0 : -1}
              aria-hidden={!near}
              aria-label={`${ev.name} — ${ev.category}`}
              onClick={() => d !== 0 && go(d)}
            >
              <img src={ev.card} alt="" draggable="false" />
            </button>
          )
        })}
      </div>

      <button type="button" className="events__arrow events__arrow--prev" aria-label="Previous event" onClick={() => go(-1)}>
        <Chevron flip />
      </button>
      <button type="button" className="events__arrow events__arrow--next" aria-label="Next event" onClick={() => go(1)}>
        <Chevron />
      </button>

      <div className="events__caption" key={current.no} aria-live="polite">
        <h3>{current.name}</h3>
        <p>{current.tagline}</p>
      </div>
    </section>
  )
}

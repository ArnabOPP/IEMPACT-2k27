import { useCallback, useEffect, useRef, useState } from 'react'
import { events } from '@/data/events'
import './EventsSection.css'

const count = events.length

// =====================================================
// EVENTS — "a hand of cards"
// The figure in the artwork reaches out with many arms; the events
// fan out beside her like a hand of cards. Scrolling turns the fan:
// each card swings upright and lifts out as it reaches the centre.
// The section pins while it scrolls through all the cards.
// =====================================================

export default function EventsSection() {
  const [active, setActive] = useState(0)
  const trackRef = useRef(null)
  const stageRef = useRef(null)

  // scroll position at which card i is the one held up
  const scrollFor = useCallback((i) => {
    const track = trackRef.current
    const range = track.offsetHeight - window.innerHeight
    return track.offsetTop + (i / (count - 1)) * range
  }, [])

  const goTo = useCallback(
    (i) => {
      const clamped = Math.max(0, Math.min(count - 1, i))
      window.scrollTo({ top: scrollFor(clamped), behavior: 'smooth' })
    },
    [scrollFor],
  )

  useEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return
    const cards = [...stage.querySelectorAll('.ev__card')]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let target = 0
    let shown = 0
    let raf = 0
    let last = -1

    const read = () => {
      const { top, height } = track.getBoundingClientRect()
      const range = height - window.innerHeight
      const p = range > 0 ? Math.min(1, Math.max(0, -top / range)) : 0
      target = p * (count - 1)
    }

    // write the fan's position into CSS variables, one per card
    const apply = () => {
      stage.style.setProperty('--f', shown.toFixed(4))
      cards.forEach((card, i) => {
        const d = i - shown
        const ad = Math.abs(d)
        card.style.setProperty('--d', d.toFixed(4))
        card.style.setProperty('--ad', ad.toFixed(4))
        card.style.zIndex = String(100 - Math.round(ad * 4))
      })
      const idx = Math.round(shown)
      if (idx !== last) {
        last = idx
        setActive(idx)
      }
    }

    // ease toward the scroll target, so the fan swings like liquid
    const tick = () => {
      shown += (target - shown) * (reduce ? 1 : 0.12)
      if (Math.abs(target - shown) < 0.0005) shown = target
      apply()
      raf = shown !== target ? requestAnimationFrame(tick) : 0
    }

    const onScroll = () => {
      read()
      if (!raf) raf = requestAnimationFrame(tick)
    }

    read()
    shown = target
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const current = events[active]

  return (
    <section
      ref={trackRef}
      className="ev"
      data-nav="light"
      style={{ '--n': count }}
      aria-roledescription="carousel"
      aria-label="Our events"
    >
      <div
        ref={stageRef}
        className="ev__stage"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault()
            goTo(active - 1)
          }
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault()
            goTo(active + 1)
          }
        }}
      >
        <div className="ev__bg" aria-hidden="true" />

        {/* HEADING */}
        <header className="ev__head">
          <p className="eyebrow">IEMPACT 2027</p>
          <h2 className="ev__title display">
            Our <em>Events</em>
          </h2>
        </header>

        {/* THE FAN */}
        <div className="ev__fan">
          {/* the thread the cards travel along */}
          <span className="ev__thread" aria-hidden="true" />

          {events.map((ev, i) => (
            <button
              key={ev.no}
              type="button"
              className={`ev__card${i === active ? ' is-active' : ''}`}
              aria-label={`${ev.name} — ${ev.category}`}
              aria-current={i === active}
              tabIndex={Math.abs(i - active) <= 1 ? 0 : -1}
              onClick={() => i !== active && goTo(i)}
            >
              <img src={ev.card} alt="" draggable="false" loading="lazy" />
            </button>
          ))}
        </div>

        {/* CAPTION */}
        <div className="ev__caption" aria-live="polite">
          <div key={current.no} className="ev__captionInner">
            <p className="ev__cat">{current.category}</p>
            <h3 className="ev__name">{current.name}</h3>
            <p className="ev__tag">{current.tagline}</p>
          </div>

          <div className="ev__nav">
            <button
              type="button"
              className="ev__arrow"
              aria-label="Previous event"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="ev__count">
              <strong>{String(active + 1).padStart(2, '0')}</strong>
              <span>/ {String(count).padStart(2, '0')}</span>
            </p>
            <button
              type="button"
              className="ev__arrow"
              aria-label="Next event"
              onClick={() => goTo(active + 1)}
              disabled={active === count - 1}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* SCROLL HINT + PROGRESS */}
        <div className="ev__progress" aria-hidden="true">
          <span>Scroll to turn the hand</span>
          <i />
        </div>
      </div>
    </section>
  )
}

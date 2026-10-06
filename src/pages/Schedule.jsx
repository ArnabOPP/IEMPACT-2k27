import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { events } from '@/data/events'
import { days } from '@/data/schedule'
import './Schedule.css'

const byNo = Object.fromEntries(events.map((e) => [e.no, e]))

// =====================================================
// THE THREAD — after the Creation-of-Adam artwork: a red
// thread runs from the upper hand's fingertip through every
// event, ties a loop where Day 02 begins, and ends at the
// lower hand. It draws itself as you scroll.
// =====================================================

// Catmull-Rom spline through the points, as cubic Béziers
function smoothPath(pts) {
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Schedule() {
  const lineRef = useRef(null)
  const ghostRef = useRef(null)
  const drawRef = useRef(null)
  const geo = useRef({ len: 0, samples: [], beads: [], knotY: Infinity })
  const [size, setSize] = useState({ w: 0, h: 0, d: '' })
  const [day, setDay] = useState(0)

  // ---------- build the thread from the beads' positions ----------
  useLayoutEffect(() => {
    const wrap = lineRef.current
    if (!wrap) return

    const build = () => {
      const W = wrap.clientWidth
      const H = wrap.offsetHeight
      const mobile = W < 720
      const cx = mobile ? 30 : W / 2
      const sway = mobile ? 16 : Math.min(110, W * 0.08)
      wrap.style.setProperty('--cx', `${cx}px`)

      const box = wrap.getBoundingClientRect()
      const centre = (el) => {
        const r = el.getBoundingClientRect()
        return { x: cx, y: r.top - box.top + r.height / 2 }
      }

      const pts = [{ x: cx, y: 0 }]
      let side = 1
      let knotY = Infinity
      const beads = []

      wrap.querySelectorAll('[data-node]').forEach((el) => {
        const p = centre(el)
        const prev = pts[pts.length - 1]
        // a sway between nodes, so the thread hangs loose like the painting's
        pts.push({ x: cx + side * sway, y: (prev.y + p.y) / 2 })
        side *= -1

        if (el.dataset.node === 'knot') {
          // the loop where Day 02 begins
          const r = mobile ? 20 : 44
          knotY = p.y
          pts.push(
            { x: cx - r * 0.5, y: p.y - r * 1.25 },
            { x: cx + r * 0.95, y: p.y - r * 0.25 },
            { x: cx + r * 0.15, y: p.y + r * 0.9 },
            { x: cx - r * 0.95, y: p.y + r * 0.05 },
            { x: cx - r * 0.1, y: p.y - r * 0.85 },
            { x: cx + r * 0.55, y: p.y + r * 1.5 },
          )
        } else {
          pts.push(p)
          if (el.dataset.node === 'bead') beads.push({ el: el.closest('.sch__slot'), y: p.y })
        }
      })

      const d = smoothPath(pts)
      geo.current = { len: 0, samples: [], beads, knotY }
      setSize({ w: W, h: H, d })
    }

    build()
    const ro = new ResizeObserver(build)
    ro.observe(wrap)
    document.fonts?.ready.then(build)
    return () => ro.disconnect()
  }, [])

  // ---------- once the path exists, measure it and draw on scroll ----------
  useEffect(() => {
    const path = drawRef.current
    const wrap = lineRef.current
    if (!path || !wrap || !size.d) return

    const len = path.getTotalLength()
    const samples = []
    for (let l = 0; l <= len; l += 6) samples.push({ l, y: path.getPointAtLength(l).y })
    samples.push({ l: len, y: path.getPointAtLength(len).y })
    geo.current.len = len
    geo.current.samples = samples
    path.style.strokeDasharray = `${len}`

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let lastDay = -1

    const update = () => {
      raf = 0
      const { top } = wrap.getBoundingClientRect()
      // the thread's tip sits a little below the middle of the screen
      const yv = reduce ? Infinity : window.innerHeight * 0.62 - top

      // walk along the thread until it first passes below that line
      let drawn = len
      for (const s of samples) {
        if (s.y > yv) {
          drawn = s.l
          break
        }
      }
      path.style.strokeDashoffset = `${len - drawn}`
      wrap.style.setProperty('--tip', `${Math.min(1, drawn / len)}`)

      for (const b of geo.current.beads) b.el.classList.toggle('is-on', yv >= b.y)

      const now = yv >= geo.current.knotY ? 1 : 0
      if (now !== lastDay) {
        lastDay = now
        setDay(now)
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [size])

  const jumpTo = (id) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - window.innerHeight * 0.4, behavior: 'smooth' })
  }

  let n = 0 // running index, so entries alternate sides across both days

  return (
    <div className="sch" data-nav="light">
      {/* ================= HEADER ================= */}
      <header className="sch__head">
        <p className="eyebrow">IEMPACT 2027 · Schedule</p>
        <h1 className="sch__title display">
          The <em>Thread</em>
        </h1>
        <p className="sch__lede">Two days, one string. Follow it from the first touch to the last.</p>

        <div className="sch__days">
          {days.map((d) => (
            <button key={d.id} type="button" className="sch__dayChip" onClick={() => jumpTo(d.id)}>
              <strong>{d.label}</strong>
              <span>
                {d.slots.length} events · {d.date}
              </span>
            </button>
          ))}
        </div>

        <p className="sch__note">Timings are indicative and will be confirmed closer to the fest.</p>
      </header>

      {/* ================= TIMELINE ================= */}
      <div className="sch__line" ref={lineRef}>
        <img className="sch__hand sch__hand--up" src="/hand-upper.png" alt="" aria-hidden="true" />

        {/* sticky day marker */}
        <div className="sch__now" aria-hidden="true">
          <span>Now on</span>
          <strong key={day}>{days[day].label}</strong>
        </div>

        <svg
          className="sch__svg"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w || 1} ${size.h || 1}`}
          aria-hidden="true"
        >
          <path ref={ghostRef} d={size.d} className="sch__ghost" />
          <path ref={drawRef} d={size.d} className="sch__thread" />
        </svg>

        <ol className="sch__list">
          {days.map((d, di) => (
            <li key={d.id} className="sch__dayBlock">
              <div className={`sch__day${di ? ' sch__day--knot' : ''}`} id={d.id}>
                {di ? <span className="sch__knot" data-node="knot" /> : null}
                <h2 className="sch__dayLabel">
                  <span>Day</span>
                  <strong>{String(di + 1).padStart(2, '0')}</strong>
                </h2>
                <p className="sch__dayDate">{d.date}</p>
              </div>

              <ol className="sch__slots">
                {d.slots.map((s) => {
                  const ev = byNo[s.no]
                  if (!ev) return null
                  const side = n++ % 2 ? 'right' : 'left'
                  return (
                    <li key={s.no} className={`sch__slot sch__slot--${side}`}>
                      <span className="sch__bead" data-node="bead" aria-hidden="true" />
                      <div className="sch__entry">
                        <time className="sch__time">{s.time}</time>
                        <div className="sch__info">
                          <p className="sch__cat">{ev.category}</p>
                          <h3 className="sch__name">{ev.name}</h3>
                          <p className="sch__tag">{ev.tagline}</p>
                        </div>
                        <img className="sch__thumb" src={ev.card} alt="" loading="lazy" />
                      </div>
                    </li>
                  )
                })}
              </ol>
            </li>
          ))}
        </ol>

        {/* the thread ends at the lower hand's fingertip */}
        <div className="sch__end">
          <span className="sch__endPoint" data-node="end" aria-hidden="true" />
          <img className="sch__hand sch__hand--down" src="/hand-lower.png" alt="" aria-hidden="true" />
        </div>
      </div>

      {/* ================= CLOSE ================= */}
      <section className="sch__close">
        <p className="sch__closeLine display">
          A string that <em>binds us all.</em>
        </p>
        <Link to="/events" className="lbtn lbtn--primary">
          <span className="lbtn__label">Explore all events</span>
          <span className="lbtn__orb">
            <Arrow />
          </span>
        </Link>
      </section>
    </div>
  )
}

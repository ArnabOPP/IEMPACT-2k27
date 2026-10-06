import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { events, segments } from '@/data/events'
import './Events.css'

const countOf = (id) => events.filter((e) => e.group === id).length
const live = segments.filter((s) => countOf(s.id) > 0)

// =====================================================
// MOON — a phase icon (0 new … 4 full), after the halo of
// moons in the page's artwork
// =====================================================

function Moon({ phase }) {
  return <span className="moon" style={{ '--ph': phase }} aria-hidden="true" />
}

// =====================================================
// TICKET — each event is an admission ticket. It tilts toward
// the pointer and a holographic foil follows it.
// =====================================================

function Ticket({ ev, i }) {
  const ref = useRef(null)

  const move = (e) => {
    const el = ref.current
    if (!el || e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
    el.style.setProperty('--ry', `${((x - 0.5) * 14).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${((0.5 - y) * 12).toFixed(2)}deg`)
  }

  const leave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <li className="tk" style={{ '--i': i }}>
      <article
        ref={ref}
        className="tk__body"
        onPointerMove={move}
        onPointerLeave={leave}
        aria-label={`${ev.name} — ${ev.category}`}
      >
        <div className="tk__poster">
          <img src={ev.card} alt="" loading="lazy" draggable="false" />
        </div>

        <div className="tk__stub">
          <div className="tk__meta">
            <span>No. {ev.no}</span>
            <span>Admit one</span>
          </div>
          <h3 className="tk__name">{ev.name}</h3>
          <p className="tk__cat">{ev.category}</p>
          <p className="tk__tag">{ev.tagline}</p>
          <div className="tk__foot">
            <span className="tk__barcode" aria-hidden="true" />
            <span className="tk__year">IEMPACT ’27</span>
          </div>
        </div>

        <span className="tk__foil" aria-hidden="true" />
      </article>
    </li>
  )
}

// =====================================================
// PAGE
// =====================================================

export default function Events() {
  const [seg, setSeg] = useState('all')
  const barRef = useRef(null)
  const tabRefs = useRef({})
  const [drop, setDrop] = useState(null)

  const tabs = [
    { id: 'all', name: 'All', phase: 4, count: events.length },
    ...segments.map((s) => ({ ...s, count: countOf(s.id) })),
  ]

  // liquid droplet under the active segment, like the navbar's
  const measure = useCallback(() => {
    const el = tabRefs.current[seg]
    const bar = barRef.current
    if (!el || !bar) return
    const a = el.getBoundingClientRect()
    const b = bar.getBoundingClientRect()
    setDrop({ x: a.left - b.left + bar.scrollLeft, w: a.width })
  }, [seg])

  useLayoutEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const choose = (id) => {
    setSeg(id)
    // bring the list into view under the sticky bar
    const top = document.getElementById('evp-list')?.getBoundingClientRect().top ?? 0
    if (top < 0 || top > window.innerHeight * 0.6) {
      window.scrollTo({ top: window.scrollY + top - 150, behavior: 'smooth' })
    }
  }

  const shown = seg === 'all' ? segments : segments.filter((s) => s.id === seg)

  return (
    <div className="evp" data-nav="dark">
      {/* ================= HEADER ================= */}
      <header className="evp__hero">
        <div className="evp__art" aria-hidden="true" />

        <div className="evp__intro">
          <p className="eyebrow">IEMPACT 2027 · মায়া</p>
          <h1 className="evp__title display">
            Events
          </h1>
          <p className="evp__lede">
            {events.length} events across {live.length} segments. Pick your phase.
          </p>

          <ul className="evp__counts">
            {live.map((s) => (
              <li key={s.id}>
                <Moon phase={s.phase} />
                <strong>{String(countOf(s.id)).padStart(2, '0')}</strong>
                <span>{s.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ================= SEGMENT BAR ================= */}
      <nav className="evp__barWrap" aria-label="Event segments">
        <div className="evp__bar glass" ref={barRef} role="tablist">
          <span
            className="evp__drop"
            aria-hidden="true"
            style={drop ? { '--x': `${drop.x}px`, '--w': `${drop.w}px` } : { opacity: 0 }}
          />
          {tabs.map((t) => (
            <button
              key={t.id}
              ref={(el) => (tabRefs.current[t.id] = el)}
              type="button"
              role="tab"
              aria-selected={seg === t.id}
              aria-controls="evp-list"
              className={`evp__tab${seg === t.id ? ' is-on' : ''}`}
              onClick={() => choose(t.id)}
            >
              <Moon phase={t.phase} />
              {t.name}
              <span className="evp__tabCount">{t.count || '—'}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ================= LIST ================= */}
      <div id="evp-list" className="evp__list" role="tabpanel">
        {shown.map((s) => {
          const list = events.filter((e) => e.group === s.id)
          return (
            <section key={`${seg}-${s.id}`} className="evp__seg" aria-labelledby={`seg-${s.id}`}>
              <header className="evp__segHead">
                <Moon phase={s.phase} />
                <h2 id={`seg-${s.id}`}>{s.name}</h2>
                <span className="evp__segCount">
                  {list.length ? `${String(list.length).padStart(2, '0')} events` : 'Coming soon'}
                </span>
                <p>{s.blurb}</p>
              </header>

              {list.length ? (
                <ul className="evp__grid">
                  {list.map((ev, i) => (
                    <Ticket key={ev.no} ev={ev} i={i} />
                  ))}
                </ul>
              ) : (
                <div className="evp__empty">
                  <Moon phase={0} />
                  <p>Technical events will be announced soon.</p>
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}

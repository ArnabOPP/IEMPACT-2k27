import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { announced, days } from '@/data/schedule'
import { events, segments } from '@/data/events'
import NotFound from '@/pages/NotFound'
import './EventDetail.css'

const slotOf = (no) => {
  if (!announced) return null // no official timings yet: show TBA
  for (const d of days) {
    const s = d.slots.find((x) => x.no === no)
    if (s) return { day: d.label, date: d.date, time: s.time }
  }
  return null
}

function Moon({ phase }) {
  return <span className="moon" style={{ '--ph': phase }} aria-hidden="true" />
}

// The poster tilts toward the pointer and a foil sheen follows it
function Poster({ ev }) {
  const ref = useRef(null)

  const move = (e) => {
    const el = ref.current
    if (!el || e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
    el.style.setProperty('--ry', `${((x - 0.5) * 16).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${((0.5 - y) * 14).toFixed(2)}deg`)
  }

  const leave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <div className="evd__stage" onPointerMove={move} onPointerLeave={leave}>
      <span className="evd__glow" aria-hidden="true" />
      <figure ref={ref} className="evd__poster">
        <img src={ev.card} alt={`${ev.name} poster`} draggable="false" />
        <span className="evd__foil" aria-hidden="true" />
      </figure>
      <span className="evd__stamp" aria-hidden="true">
        IEMPACT
        <b>’27</b>
      </span>
    </div>
  )
}

export default function EventDetail() {
  const { no } = useParams()
  const i = events.findIndex((e) => e.no === no)
  if (i < 0) return <NotFound />

  const ev = events[i]
  const seg = segments.find((s) => s.id === ev.group)
  const slot = slotOf(ev.no)
  const prev = events[(i - 1 + events.length) % events.length]
  const next = events[(i + 1) % events.length]
  const tba = 'TBA'

  const facts = [
    { k: 'Segment', v: seg?.name, sub: seg?.phase != null && <Moon phase={seg.phase} /> },
    { k: 'Day', v: slot ? slot.day : tba, sub: slot?.date },
    { k: 'Time', v: slot?.time ?? tba, sub: slot && 'Reporting time TBA' },
    { k: 'Venue', v: tba },
  ]

  const info = [
    {
      n: '01',
      h: 'About',
      body: (
        <>
          <p className="evd__lead">{ev.tagline}.</p>
          <p>
            {ev.name} is one of the {seg?.name} events at IEMPACT 2027 — {ev.category.toLowerCase()},
            staged under the Maya sky.
          </p>
          <p className="evd__tba">The full write-up is coming soon.</p>
        </>
      ),
    },
    {
      n: '02',
      h: 'Rules & eligibility',
      body: <p className="evd__tba">Format, team size and eligibility will be announced soon.</p>,
    },
    {
      n: '03',
      h: 'Prizes',
      body: <p className="evd__tba">Prize details will be announced soon.</p>,
    },
  ]

  return (
    <div className="evd" data-nav="dark" key={ev.no}>
      {/* ================= HERO ================= */}
      <header className="evd__hero">
        <div className="evd__sky" aria-hidden="true" />
        <span className="evd__num" aria-hidden="true">
          {ev.no}
        </span>

        <div className="evd__wrap evd__heroGrid">
          <div className="evd__copy">
            <Link to="/events" className="evd__back">
              <span aria-hidden="true">←</span> All events
            </Link>

            <p className="evd__kicker">
              <Moon phase={seg?.phase ?? 4} />
              {seg?.name}
              <i aria-hidden="true" />
              No. {ev.no}
            </p>

            <h1 className="evd__title display">{ev.name}</h1>

            <p className="evd__cat">{ev.category}</p>
            <p className="evd__tag">“{ev.tagline}”</p>

            <div className="evd__cta">
              <Link to="/contact" className="evd__btn evd__btn--solid">
                Enquire to register
                <span aria-hidden="true">→</span>
              </Link>
              <Link to="/schedule" className="evd__btn">
                View schedule
              </Link>
            </div>
          </div>

          <Poster ev={ev} />
        </div>
      </header>

      {/* ================= TICKER ================= */}
      <div className="evd__ticker" aria-hidden="true">
        <div className="evd__tickerTrack">
          {Array.from({ length: 12 }, (_, k) => (
            <span key={k}>
              {k % 2 ? ev.category : ev.name}
              <Moon phase={((k % 6) % 4) + 1} />
            </span>
          ))}
        </div>
      </div>

      <div className="evd__wrap">
        {/* ================= FACTS ================= */}
        <dl className="evd__facts">
          {facts.map((f) => (
            <div key={f.k} className="evd__fact">
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
              {f.sub && <span className="evd__sub">{f.sub}</span>}
            </div>
          ))}
        </dl>

        {/* ================= DETAILS ================= */}
        <section className="evd__body">
          {info.map((c) => (
            <article key={c.n} className="evd__card">
              <span className="evd__cardNo">{c.n}</span>
              <h2>{c.h}</h2>
              {c.body}
            </article>
          ))}
        </section>

        {/* ================= PAGER ================= */}
        <nav className="evd__pager" aria-label="More events">
          {[
            { e: prev, label: '← Previous', cls: '' },
            { e: next, label: 'Next →', cls: ' evd__pg--next' },
          ].map(({ e, label, cls }) => (
            <Link key={e.no} to={`/events/${e.no}`} className={`evd__pg${cls}`}>
              <img src={e.card} alt="" loading="lazy" draggable="false" />
              <span className="evd__pgText">
                <small>{label}</small>
                <strong>{e.name}</strong>
                <em>{e.category}</em>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

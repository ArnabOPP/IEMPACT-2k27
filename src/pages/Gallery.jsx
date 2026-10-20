import { useCallback, useEffect, useRef, useState } from 'react'
import { gallery, galleryTags } from '@/data/gallery'
import './Gallery.css'

const AUTOPLAY_MS = 4200
const REACH = 3 // slides shown each side of the centre

const pad = (n) => String(n).padStart(2, '0')

function Lightbox({ items, index, onClose, onStep }) {
  const item = items[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, onStep])

  return (
    <div className="gal__lb" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <button type="button" className="gal__lbBtn gal__lbClose" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <button
        type="button"
        className="gal__lbBtn gal__lbPrev"
        onClick={(e) => {
          e.stopPropagation()
          onStep(-1)
        }}
        aria-label="Previous photo"
      >
        ←
      </button>
      <figure className="gal__lbFig" onClick={(e) => e.stopPropagation()}>
        <img key={item.src} src={item.src} alt={item.title} draggable="false" />
        <figcaption>
          <strong>{item.title}</strong>
          {item.sub && <span>{item.sub}</span>}
          <em>
            {index + 1} / {items.length}
          </em>
        </figcaption>
      </figure>
      <button
        type="button"
        className="gal__lbBtn gal__lbNext"
        onClick={(e) => {
          e.stopPropagation()
          onStep(1)
        }}
        aria-label="Next photo"
      >
        →
      </button>
    </div>
  )
}

export default function Gallery() {
  const [tag, setTag] = useState('All')
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(null)
  const [paused, setPaused] = useState(false)
  const [drag, setDrag] = useState(0)
  const start = useRef(null)
  const moved = useRef(false)

  const shown = tag === 'All' ? gallery : gallery.filter((g) => g.tag === tag)
  const n = shown.length

  const go = useCallback((d) => setActive((i) => (i + d + n) % n), [n])

  const pick = (t) => {
    setTag(t)
    setActive(0)
  }

  // autoplay — stops while hovered, dragged, or the lightbox is open
  useEffect(() => {
    if (paused || open !== null) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, open, go])

  // arrow keys steer the carousel when the lightbox is closed
  useEffect(() => {
    if (open !== null) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, go])

  // swipe / drag
  const down = (e) => {
    start.current = e.clientX
    moved.current = false
    setPaused(true)
  }
  const move = (e) => {
    if (start.current === null) return
    const dx = e.clientX - start.current
    if (Math.abs(dx) > 6) moved.current = true
    setDrag(dx)
  }
  const up = () => {
    if (start.current === null) return
    if (drag < -50) go(1)
    else if (drag > 50) go(-1)
    start.current = null
    setDrag(0)
    setPaused(false)
  }

  const onSlide = (i, off) => {
    if (moved.current) return
    if (off === 0) setOpen(i)
    else setActive(i)
  }

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (d) =>
      setOpen((i) => {
        if (i === null) return i
        const next = (i + d + n) % n
        setActive(next)
        return next
      }),
    [n],
  )

  const cur = shown[active]

  return (
    <div className="gal" data-nav="dark">
      <header className="gal__hero">
        <p className="eyebrow">IEMPACT 2027 · মায়া</p>
        <h1 className="gal__title display">
          Gal<em>lery</em>
        </h1>
        <p className="gal__lede">Moments, artwork and posters from the festival of illusions.</p>

        <div className="gal__tags" role="tablist" aria-label="Filter gallery">
          {galleryTags.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tag === t}
              className={`gal__tag${tag === t ? ' is-on' : ''}`}
              onClick={() => pick(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* ================= CAROUSEL ================= */}
      <section
        className="gal__show"
        aria-roledescription="carousel"
        aria-label="Gallery"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => !start.current && setPaused(false)}
      >
        <span className="gal__halo" aria-hidden="true" />

        <div
          className={`gal__stage${drag ? ' is-drag' : ''}`}
          style={{ '--drag': `${drag}px` }}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onPointerLeave={up}
        >
          {shown.map((g, i) => {
            // shortest signed distance around the loop
            let off = i - active
            if (off > n / 2) off -= n
            if (off < -n / 2) off += n
            const hidden = Math.abs(off) > REACH
            return (
              <button
                key={g.src}
                type="button"
                className={`gal__slide${off === 0 ? ' is-on' : ''}`}
                style={{ '--o': off, '--a': Math.abs(off) }}
                hidden={hidden}
                tabIndex={off === 0 ? 0 : -1}
                aria-hidden={hidden || undefined}
                aria-label={off === 0 ? `Open ${g.title}` : `Show ${g.title}`}
                onClick={() => onSlide(i, off)}
              >
                <img src={g.src} alt={g.title} draggable="false" loading={Math.abs(off) <= 1 ? 'eager' : 'lazy'} />
                <span className="gal__sheen" aria-hidden="true" />
              </button>
            )
          })}
        </div>

        <button type="button" className="gal__nav gal__nav--prev" onClick={() => go(-1)} aria-label="Previous">
          ←
        </button>
        <button type="button" className="gal__nav gal__nav--next" onClick={() => go(1)} aria-label="Next">
          →
        </button>

        <div className="gal__meta" aria-live="polite">
          <h2 key={cur.src} className="gal__name">
            {cur.title}
          </h2>
          <p className="gal__sub">{cur.sub ?? cur.tag}</p>
          <div className="gal__count">
            <b>{pad(active + 1)}</b>
            <span className="gal__bar" aria-hidden="true">
              <i style={{ width: `${((active + 1) / n) * 100}%` }} />
            </span>
            <span>{pad(n)}</span>
          </div>
          <p className="gal__hint">Drag, swipe or use ← → · tap the centre photo to enlarge</p>
        </div>
      </section>

      {open !== null && <Lightbox items={shown} index={open} onClose={close} onStep={step} />}
    </div>
  )
}

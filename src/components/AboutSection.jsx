import { useEffect, useRef } from 'react'
import { events } from '@/data/events'
import './AboutSection.css'

// Frames extracted from the source clip (every 2nd frame, 600×750 WebP).
const FRAME_COUNT = 137
const frameSrc = (i) => `/about-frames/f${String(i).padStart(3, '0')}.webp`

const stats = [
  { big: <>36<sup>th</sup></>, small: 'Edition' },
  { big: '30+', small: 'Years of culture' },
  { big: events.length, small: 'Events' },
  { big: 'Thousands', small: 'Of attendees' },
]

// Each chapter is visible between --a and --b of the scroll progress
const chapter = (a, b) => ({ '--a': a, '--b': b })

export default function AboutSection() {
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const filmRef = useRef(null)
  const ambientRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    const film = filmRef.current
    const ambient = ambientRef.current
    if (!track || !stage || !film || !ambient) return
    const filmCtx = film.getContext('2d')
    const ambientCtx = ambient.getContext('2d')

    const frames = []
    let loadingStarted = false
    let current = -1
    let raf = 0

    const load = () => {
      if (loadingStarted) return
      loadingStarted = true
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image()
        img.decoding = 'async'
        img.src = frameSrc(i)
        // first frame paints as soon as it lands
        if (i === 0) img.onload = () => draw(true)
        frames[i] = img
      }
    }

    // cover-fit the frame into a canvas
    const fit = (canvas, ctx, img) => {
      const { width: cw, height: ch } = canvas
      if (!cw || !ch) return
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const w = img.naturalWidth * s
      const h = img.naturalHeight * s
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
    }

    // the sharp film, plus a tiny copy CSS blurs into the ambient glow
    const paint = (img) => {
      fit(film, filmCtx, img)
      fit(ambient, ambientCtx, img)
    }

    const draw = (force = false) => {
      raf = 0
      const { top, height } = track.getBoundingClientRect()
      const range = height - window.innerHeight
      const p = range > 0 ? Math.min(1, Math.max(0, -top / range)) : 0
      stage.style.setProperty('--p', p.toFixed(4))

      const target = Math.round(p * (FRAME_COUNT - 1))
      if (target === current && !force) return
      // nearest frame that has finished loading, searching backwards
      for (let i = target; i >= 0; i--) {
        const img = frames[i]
        if (img?.complete && img.naturalWidth) {
          paint(img)
          current = i
          return
        }
      }
    }

    const size = () => {
      // frames are 600px wide, so a DPR above 1.5 buys nothing
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      film.width = Math.round(film.clientWidth * dpr)
      film.height = Math.round(film.clientHeight * dpr)
      // the ambient layer is blurred anyway: a few dozen pixels will do
      ambient.width = 96
      ambient.height = Math.max(1, Math.round((96 * stage.clientHeight) / stage.clientWidth))
      draw(true)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => draw())
    }

    // start fetching frames a screen before the section arrives
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && load(),
      { rootMargin: '100% 0px' },
    )
    io.observe(track)

    size()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', size)
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', size)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="about" ref={trackRef} aria-labelledby="about-title" data-nav="dark">
      <div className="about__stage" ref={stageRef}>
        <canvas className="about__ambient" ref={ambientRef} aria-hidden="true" />
        <div className="about__shade" aria-hidden="true" />
        <div className="about__film glass glass--dark">
          <canvas ref={filmRef} aria-hidden="true" />
        </div>

        {/* 01 — TITLE */}
        <div className="about__chapter about__chapter--title" style={chapter(-1, 0.24)}>
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="about__title">
            IEM<span>PACT</span>
          </h2>
          <p className="about__sub">Where Kolkata celebrates culture</p>
        </div>

        {/* 02 — WHAT IT IS */}
        <div className="about__chapter" style={chapter(0.26, 0.5)}>
          <div className="about__box">
            <p className="about__no">01</p>
            <p className="about__lead">
              The flagship cultural fest of the <em>Institute of Engineering &amp; Management,
              Kolkata</em> — where music, dance, art, literature, performance and competition
              come together.
            </p>
          </div>
        </div>

        {/* 03 — WHAT IT MEANS */}
        <div className="about__chapter" style={chapter(0.52, 0.74)}>
          <div className="about__box">
            <p className="about__no">02</p>
            <p className="about__lead">
              For more than three decades, it has given students a platform to step beyond
              academics, showcase their creativity, discover new passions and be part of
              a <em>vibrant cultural community</em>.
            </p>
          </div>
        </div>

        {/* 04 — IN NUMBERS (stays to the end) */}
        <div className="about__chapter about__chapter--stats" style={chapter(0.76, 2)}>
          <p className="about__no">03</p>
          <ul className="about__stats">
            {stats.map(({ big, small }) => (
              <li key={small} className="about__stat">
                <strong>{big}</strong>
                <span>{small}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* PROGRESS RAIL */}
        <div className="about__rail" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  )
}

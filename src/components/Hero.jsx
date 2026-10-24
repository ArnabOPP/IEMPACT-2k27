import { Link } from 'react-router-dom'
import './Hero.css'

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h13M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// The scene swap is driven by scroll, not a timer: the page writes its progress
// into --p, Hero.css turns that into --s (0 = IEMPACT, 1 = Maya) and scrubs the
// circle reveal and the logos with it. `showMaya` only flips the text colours.
export default function Hero({ showMaya = false }) {
  return (
    <section
      className={`hero ${showMaya ? 'hero--maya' : 'hero--iempact'}`}
      aria-labelledby="hero-title"
      data-nav="dark"
    >
      <h1 id="hero-title" className="visually-hidden">
        IEMPACT 2027 — Maya
      </h1>

      {/* BACKGROUNDS — crossfade in step with the logo */}
      <div className="hero__bg hero__bg--maya" aria-hidden="true" />
      <div className="hero__bg hero__bg--iempact" aria-hidden="true" />
      <div className="hero__shade" aria-hidden="true" />

      {/* Poster layout: words at the top, the logo dead centre, the
          photo's subject (the two women / the thread figure) below it,
          actions at the foot */}
      <div className="hero__layout">
        <div className="hero__head">
          <p className="hero__chip">
            <span className="hero__chipDot" aria-hidden="true" />
            36th Edition
            <span className="hero__chipSep" aria-hidden="true">•</span>
            IEM Kolkata
          </p>

          <p className="hero__tagline">
            A string that <em>binds us all</em>
          </p>

          <p className="hero__date">
            <time dateTime="2027-01-16">16th</time>
            <span aria-hidden="true">&amp;</span>
            <time dateTime="2027-01-17">17th January 2027</time>
          </p>
        </div>

        <div className="hero__logoBox">
          {/* both logos sit here; their opacity is scrubbed by scroll (Hero.css) */}
          <img src="/IEMPACT%20logo.png" alt="" className="hero__logo hero__logo--iempact" />
          <img src="/maya.png" alt="" className="hero__logo hero__logo--maya" />
        </div>

        <div className="hero__dock">
          <div className="hero__actions">
            <Link to="/events" className="lbtn lbtn--primary">
              <span className="lbtn__label">Register Now</span>
              <span className="lbtn__orb">
                <Arrow />
              </span>
            </Link>

            <Link to="/events" className="lbtn lbtn--ghost hero__ghost">
              <span className="lbtn__label">Explore Events</span>
              <span className="lbtn__orb">
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

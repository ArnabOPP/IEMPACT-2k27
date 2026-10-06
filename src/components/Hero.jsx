import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const IEMPACT_MS = 5000 // how long the IEMPACT logo holds before Maya
const MAYA_MS = 4000
const INTRO_MS = 3700 // curtain hold + open (App.jsx); the first hold starts after it

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

export default function Hero() {
  const [showMaya, setShowMaya] = useState(false)
  // false until the first swap: that first IEMPACT hold waits out the curtain
  const [booted, setBooted] = useState(false)
  const introDelay = booted ? 0 : INTRO_MS

  useEffect(() => {
    const t = setTimeout(
      () => {
        setBooted(true)
        setShowMaya((m) => !m)
      },
      (showMaya ? MAYA_MS : IEMPACT_MS) + introDelay,
    )
    return () => clearTimeout(t)
  }, [showMaya, introDelay])

  const pick = (maya) => {
    setBooted(true)
    setShowMaya(maya)
  }

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
        </div>

        <div className="hero__logoBox">
          <img
            src="/IEMPACT%20logo.png"
            alt=""
            className={`hero__logo hero__logo--iempact ${
              !showMaya ? 'hero__logo--visible' : ''
            }`}
          />
          <img
            src="/maya.png"
            alt=""
            className={`hero__logo hero__logo--maya ${
              showMaya ? 'hero__logo--visible' : ''
            }`}
          />
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

          {/* LOGO SWITCHER — shows which mark is up and how long it holds */}
          <div className="hero__switch" role="group" aria-label="Show logo">
            <button
              type="button"
              className={`hero__tab ${!showMaya ? 'is-on' : ''}`}
              aria-pressed={!showMaya}
              onClick={() => pick(false)}
            >
              IEMPACT
              <span
                key={`i${showMaya}`}
                className="hero__bar"
                style={{ '--dur': `${IEMPACT_MS}ms`, '--wait': `${introDelay}ms` }}
              />
            </button>
            <button
              type="button"
              className={`hero__tab hero__tab--maya ${showMaya ? 'is-on' : ''}`}
              aria-pressed={showMaya}
              onClick={() => pick(true)}
              lang="bn"
            >
              মায়া
              <span
                key={`m${showMaya}`}
                className="hero__bar"
                style={{ '--dur': `${MAYA_MS}ms` }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

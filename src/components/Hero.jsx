import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  const [showMaya, setShowMaya] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMaya((prev) => !prev)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero">

      {/* BACKGROUND */}
      <div className="hero__bg" />

      {/* CENTRE CONTENT */}
      <div className="hero__center">

        {/* LOGO */}
        <div className="hero__logoBox">

          {/* IEMPACT */}
          <img
            src="/IEMPACT%20logo.png"
            alt="IEMPACT 2027"
            className={`hero__logo hero__logo--iempact ${
              !showMaya ? 'hero__logo--visible' : ''
            }`}
          />

          {/* MAYA */}
          <img
            src="/maya.png"
            alt="Maya"
            className={`hero__logo hero__logo--maya ${
              showMaya ? 'hero__logo--visible' : ''
            }`}
          />

        </div>


        {/* TAGLINE */}
        <p className="hero__tagline">
          A string that binds us all
        </p>


        {/* CTA BUTTONS */}
        <div className="hero__actions">

          {/* REGISTER NOW */}
          <Link
            to="/events"
            className="hero__cta hero__cta--primary"
          >
            <span className="hero__ctaText">
              Register Now
            </span>

            <span className="hero__ctaArrow">
              →
            </span>
          </Link>


          {/* EXPLORE EVENTS */}
          <Link
            to="/events"
            className="hero__cta hero__cta--secondary"
          >
            <span className="hero__ctaText">
              Explore Events
            </span>

            <span className="hero__ctaArrow">
              →
            </span>
          </Link>

        </div>

      </div>

    </section>
  )
}
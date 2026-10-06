import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <header className={`navbar ${menuOpen ? 'navbar--open' : ''}`}>

      {/* LOGO */}
      <Link
        to="/"
        className="navbar__logo"
        onClick={closeMenu}
      >
        <img
          src="/IEMPACT%20logo.png"
          alt="IEMPACT"
        />
      </Link>


      {/* DESKTOP NAVIGATION */}
      <nav
        className="navbar__links navbar__links--desktop"
        aria-label="Main navigation"
      >
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'active' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>


      {/* DESKTOP REGISTER */}
      <div className="navbar__right navbar__right--desktop">

        <Link
          to="/events"
          className="navbar__register"
        >
          <span className="navbar__registerText">
            Register Now
          </span>

          <span className="navbar__arrow">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M8 12h8M13 7l5 5-5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>

      </div>


      {/* MOBILE HAMBURGER */}
      <button
        className={`navbar__hamburger ${
          menuOpen ? 'navbar__hamburger--open' : ''
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>


      {/* MOBILE MENU */}
      <div
        className={`navbar__mobileMenu ${
          menuOpen ? 'navbar__mobileMenu--open' : ''
        }`}
      >

        <nav
          className="navbar__mobileLinks"
          aria-label="Mobile navigation"
        >
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={closeMenu}
              className={({ isActive }) =>
                `navbar__mobileLink ${
                  isActive ? 'active' : ''
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>


        {/* MOBILE REGISTER */}
        <Link
          to="/events"
          className="navbar__mobileRegister"
          onClick={closeMenu}
        >
          <span>
            Register Now
          </span>

          <span className="navbar__mobileArrow">
            →
          </span>
        </Link>

      </div>

    </header>
  )
}
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/contact', label: 'Contact' },
]

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

const activeIndexFor = (pathname) =>
  links.findIndex(({ to }) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to),
  )

// =====================================================
// NAVBAR — three liquid glass islands (brand · links · register)
// float apart at the top of the page; once you scroll they slide
// together and fuse into one capsule.
// =====================================================

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState(-1)
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(false)
  const [drop, setDrop] = useState(null)

  const headerRef = useRef(null)
  const navRef = useRef(null)
  const linkRefs = useRef([])

  const active = activeIndexFor(pathname)
  const target = hovered >= 0 ? hovered : active

  // Liquid droplet follows the hovered link, resting on the active one
  const measure = useCallback(() => {
    const el = linkRefs.current[target]
    const nav = navRef.current
    if (!el || !nav) {
      setDrop(null)
      return
    }
    setDrop({ x: el.offsetLeft, w: el.offsetWidth })
  }, [target])

  useLayoutEffect(measure, [measure])

  // The fused width is exactly the islands' combined width, so they meet
  // edge to edge; a ResizeObserver keeps it right as fonts load and the
  // islands change height when they merge.
  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const islands = [...header.querySelectorAll('.nav__brand, .nav__links, .nav__cta')]
    const sync = () => {
      const sum = islands.reduce((w, el) => w + el.offsetWidth, 0)
      if (sum) header.style.setProperty('--mw', `${sum}px`)
    }
    const ro = new ResizeObserver(sync)
    islands.forEach((el) => ro.observe(el))
    sync()
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', measure)
    // Taiganja loads with font-display: swap, so widths change once it arrives
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  // On scroll: merge the islands, update the reading-progress line, and
  // sample the section under the bar (data-nav="dark" | "light") so the
  // glass flips to keep the links in contrast.
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      headerRef.current?.style.setProperty(
        '--progress',
        max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : '0',
      )
      setScrolled(window.scrollY > 40)

      const y = 40
      let theme = 'light'
      for (const x of [window.innerWidth * 0.3, window.innerWidth * 0.5]) {
        const hit = document
          .elementsFromPoint(x, y)
          .find((el) => !el.closest('.nav, .nav__sheet') && el.closest('[data-nav]'))
        if (hit) {
          theme = hit.closest('[data-nav]').dataset.nav
          break
        }
      }
      setOnDark(theme === 'dark')
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [pathname])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        ref={headerRef}
        className={[
          'nav',
          scrolled && 'nav--merged',
          onDark && 'nav--dark',
          menuOpen && 'nav--open',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* BRAND ISLAND */}
        <Link to="/" className="nav__island nav__brand glass" onClick={closeMenu}>
          <img src="/IEMPACT%20logo.png" alt="IEMPACT home" />
        </Link>

        {/* LINKS ISLAND */}
        <nav
          ref={navRef}
          className="nav__island nav__links glass"
          aria-label="Main navigation"
          onMouseLeave={() => setHovered(-1)}
        >
          <span
            className="nav__drop"
            aria-hidden="true"
            style={
              drop
                ? { '--x': `${drop.x}px`, '--w': `${drop.w}px`, opacity: 1 }
                : { opacity: 0 }
            }
          />
          {links.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              ref={(el) => (linkRefs.current[i] = el)}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(-1)}
              className={({ isActive }) =>
                `nav__link${isActive ? ' active' : ''}${i === target ? ' is-lit' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
          <span className="nav__progress" aria-hidden="true" />
        </nav>

        {/* REGISTER ISLAND */}
        <div className="nav__island nav__cta glass">
          <Link to="/events" className="lbtn lbtn--primary nav__register">
            <span className="lbtn__label">Register</span>
            <span className="lbtn__orb">
              <Arrow />
            </span>
          </Link>
        </div>

        {/* PHONE: MENU ISLAND */}
        <button
          type="button"
          className="nav__island nav__burger glass"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-sheet"
        >
          <span />
          <span />
        </button>
      </header>

      {/* PHONE MENU — a sibling, not a child, so its own glass can blur
          the page (nested backdrop-filters only see their parent) */}
      <div
        id="nav-sheet"
        className={`nav__sheet glass${menuOpen ? ' is-open' : ''}`}
        inert={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {links.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={closeMenu}
              style={{ '--i': i }}
              className={({ isActive }) => `nav__sheetLink${isActive ? ' active' : ''}`}
            >
              <span>{label}</span>
              <span className="nav__sheetNo">0{i + 1}</span>
            </NavLink>
          ))}
        </nav>

        <Link to="/events" className="lbtn lbtn--primary nav__sheetCta" onClick={closeMenu}>
          <span className="lbtn__label">Register Now</span>
          <span className="lbtn__orb">
            <Arrow />
          </span>
        </Link>
      </div>
    </>
  )
}

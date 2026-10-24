import { Link } from 'react-router-dom'
import { events } from '@/data/events'
import './Footer.css'

const explore = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

// TODO: replace '#' with the fest's real profile links
const socials = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M14 8.5h2.2V5.2H14c-2.3 0-3.8 1.6-3.8 4v1.8H8v3.2h2.2V20h3.3v-5.8h2.4l.5-3.2h-2.9V9.6c0-.7.4-1.1 1-1.1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

// Three loose rows of clouds. `left` is each cloud's centre, `top` its top edge
// in px below the footer's top, `width` in vw; the grey ones carry the body of
// the bank, the cream ones warm it. Fainter, lower rows feather into the maroon.
const clouds = [
  // upper row — heavy, grey, closes the join with the ivory above
  { src: '/cloud-grey.png', left: '12%', top: -150, width: 46, flip: false, o: 0.95, dur: 48, delay: 0 },
  { src: '/cloud-grey.png', left: '50%', top: -140, width: 54, flip: true, o: 0.95, dur: 56, delay: -12 },
  { src: '/cloud-grey.png', left: '88%', top: -130, width: 46, flip: false, o: 0.95, dur: 52, delay: -24 },
  // middle row — overlapping, grey and cream mixed
  { src: '/cloud-cream.png', left: '0%', top: -150, width: 42, flip: false, o: 0.95, dur: 44, delay: -6 },
  { src: '/cloud-grey.png', left: '30%', top: -155, width: 44, flip: true, o: 0.9, dur: 50, delay: -18 },
  { src: '/cloud-grey.png', left: '66%', top: -120, width: 46, flip: false, o: 0.9, dur: 58, delay: -30 },
  { src: '/cloud-cream.png', left: '100%', top: -110, width: 42, flip: true, o: 0.95, dur: 46, delay: -9 },
  // lower fringe — fainter, the ragged underside over the maroon
  { src: '/cloud-cream.png', left: '16%', top: -90, width: 40, flip: false, o: 0.8, dur: 54, delay: -15 },
  { src: '/cloud-grey.png', left: '50%', top: -55, width: 40, flip: true, o: 0.6, dur: 60, delay: -33 },
  { src: '/cloud-cream.png', left: '84%', top: -50, width: 40, flip: true, o: 0.8, dur: 49, delay: -21 },
]

function Arrow({ up }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={up ? { transform: 'rotate(-90deg)' } : undefined}>
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer" data-nav="dark">
      {/* CLOUDS — a bank of cloud cut-outs over the joint with the section
          above: ivory at the top, thickening into the maroon night */}
      <div className="footer__clouds" aria-hidden="true">
        {clouds.map(({ src, left, top, width, flip, o, dur, delay }, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="footer__cloud"
            draggable="false"
            style={{
              '--l': left,
              '--t': `${top}px`,
              '--w': `${width}vw`,
              '--flip': flip ? -1 : 1,
              '--o': o,
              '--dur': `${dur}s`,
              '--delay': `${delay}s`,
            }}
          />
        ))}
      </div>

      <div className="footer__inner">
        {/* CLOSING CALL TO ACTION */}
        <section className="footer__cta" aria-label="Register">
          {/* decoration, left: a giant outlined মায়া and the red thread tied in a knot */}
          <span className="footer__deco" aria-hidden="true">
            <span className="footer__maya">মায়া</span>
            <svg className="footer__thread" viewBox="0 0 640 320" preserveAspectRatio="xMinYMid meet">
              <defs>
                <linearGradient id="footer-thread" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ff4a3a" stopOpacity="0" />
                  <stop offset="0.25" stopColor="#ff4a3a" />
                  <stop offset="1" stopColor="#ffb4a8" />
                </linearGradient>
              </defs>
              <path
                className="footer__threadLine"
                d="M-10 40 C 110 20, 170 250, 300 215 S 430 70, 520 168 S 600 250, 610 160"
                fill="none"
                stroke="url(#footer-thread)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                className="footer__threadFlow"
                d="M-10 40 C 110 20, 170 250, 300 215 S 430 70, 520 168 S 600 250, 610 160"
                fill="none"
                stroke="#fff"
                strokeWidth="2.4"
                strokeLinecap="round"
                pathLength="100"
              />
              <circle className="footer__knotHalo" cx="610" cy="160" r="22" />
              <circle className="footer__knot" cx="610" cy="160" r="8" />
            </svg>
          </span>

          <p className="eyebrow">IEMPACT 2027 · মায়া</p>
          <h2 className="footer__headline display">
            Be part of the string <em>that binds us all.</em>
          </h2>
          <div className="footer__ctaActions">
            <Link to="/events" className="lbtn lbtn--primary">
              <span className="lbtn__label">Register Now</span>
              <span className="lbtn__orb">
                <Arrow />
              </span>
            </Link>
            <Link to="/events" className="footer__textLink">
              Explore all {events.length} events <Arrow />
            </Link>
          </div>
        </section>

        {/* LINK GRID */}
        <div className="footer__grid">
          <div className="footer__brand">
            <img src="/IEMPACT%20logo.png" alt="IEMPACT" />
            <p>
              The flagship cultural fest of the Institute of Engineering &amp; Management,
              Kolkata — 36 editions of music, dance, art, words and play.
            </p>
            <ul className="footer__socials">
              {socials.map(({ label, href, icon }) => (
                <li key={label}>
                  <a href={href} aria-label={label}>
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer__col" aria-label="Explore">
            <h3>Explore</h3>
            <ul>
              {explore.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Featured events">
            <h3>Events</h3>
            <ul>
              {events.slice(0, 5).map((ev) => (
                <li key={ev.no}>
                  <Link to="/events">{ev.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h3>Find us</h3>
            <address>
              Institute of Engineering
              <br />
              &amp; Management
              <br />
              Kolkata, West Bengal
            </address>
          </div>
        </div>

        {/* WORDMARK */}
        <p className="footer__wordmark" aria-hidden="true">
          IEMPACT
        </p>

        {/* BASE BAR */}
        <div className="footer__base">
          <span>© 2027 IEMPACT · Institute of Engineering &amp; Management, Kolkata</span>
          <button
            type="button"
            className="footer__top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top <Arrow up />
          </button>
        </div>
      </div>
    </footer>
  )
}

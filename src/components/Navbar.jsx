import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const icons = {
  home: <path d="M12 3 2 12h3v8h5v-6h4v6h5v-8h3L12 3Z" />,
  events: <path d="M20 7h-2.2A3 3 0 0 0 12 5.3 3 3 0 0 0 6.2 7H4a1 1 0 0 0-1 1v3h18V8a1 1 0 0 0-1-1ZM9 7a1 1 0 1 1 1 1H9V7Zm6 1h-1a1 1 0 1 1 1-1v1ZM4 13v7a1 1 0 0 0 1 1h6v-8H4Zm9 0v8h6a1 1 0 0 0 1-1v-7h-7Z" />,
  contact: <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />,
}

function Icon({ name }) {
  return (
    <svg className="navbar__icon" viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

const links = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/events', label: 'Events', icon: 'events' },
  { to: '/contact', label: 'Contact', icon: 'contact' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Link to="/"><img className="navbar__impact" src="/IEMPACT%20logo.png" alt="IMPACT" /></Link>
        <img className="navbar__maya" src="/Maya%20logo.png" alt="Maya" />
      </div>

      <nav className="navbar__pill" aria-label="Main">
        {links.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} end={to === '/'} className="navbar__link">
            <Icon name={icon} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="navbar__end">
        <Link to="/events" className="navbar__register">
          <span className="navbar__arrow">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          Register Now
        </Link>
        <img className="navbar__iem" src="/IEM%20logo.png" alt="Institute of Engineering and Management" />
      </div>
    </header>
  )
}

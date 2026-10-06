import { Link } from 'react-router-dom'

// Shared glass placeholder for pages that are not built yet
export default function ComingSoon({ eyebrow, title, children }) {
  return (
    <section className="page" data-nav="light">
      <span className="blob page__blob" aria-hidden="true" />
      <span className="blob blob--gold blob--soft page__blob page__blob--gold" aria-hidden="true" />

      <div className="page__inner">
        <div className="soon glass">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display">{title}</h1>
          <p className="soon__text">{children}</p>
          <Link to="/events" className="lbtn lbtn--primary">
            <span className="lbtn__label">Explore Events</span>
            <span className="lbtn__orb">
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
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

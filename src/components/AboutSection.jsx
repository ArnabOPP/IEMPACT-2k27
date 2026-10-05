import './AboutSection.css'

const icons = {
  calendar: (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <rect x="4" y="7" width="32" height="30" rx="4" />
      <rect x="10" y="2" width="4" height="8" rx="2" />
      <rect x="26" y="2" width="4" height="8" rx="2" />
      <g fill="#fff">
        {[0, 1, 2, 3].map((c) => [0, 1, 2].map((r) => (
          <rect key={`${c}${r}`} x={9 + c * 6.5} y={15 + r * 6.5} width="4" height="4" rx="1" />
        )))}
      </g>
    </svg>
  ),
  infinity: (
    <svg viewBox="0 0 60 30" aria-hidden="true">
      <path
        d="M30 15C24 6 18 4 13 4 7 4 3 9 3 15s4 11 10 11c5 0 11-2 17-11s12-11 17-11c6 0 10 5 10 11s-4 11-10 11c-5 0-11-2-17-11Z"
        fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"
      />
    </svg>
  ),
  music: (
    <svg viewBox="0 0 30 40" aria-hidden="true">
      <circle cx="9" cy="32" r="6" />
      <rect x="13" y="4" width="4" height="28" />
      <path d="M17 4c3 6 9 6 10 14-3-4-6-5-10-5z" />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 60 36" aria-hidden="true">
      <circle cx="30" cy="9" r="6.5" />
      <path d="M17 33c0-8 5-14 13-14s13 6 13 14z" />
      <circle cx="11" cy="14" r="5" />
      <path d="M0 33c0-6 3-11 11-11 2 0 4 .4 5.500 1.200C14 26 13 29 13 33z" />
      <circle cx="49" cy="14" r="5" />
      <path d="M60 33c0-6-3-11-11-11-2 0-4 .4-5.500 1.200C46 26 47 29 47 33z" />
    </svg>
  ),
}

const stats = [
  { icon: 'calendar', big: <>36<sup>TH</sup></>, small: 'Edition', grow: 125 },
  { icon: 'infinity', big: '30+', small: <>Years of<br />Culture</>, grow: 138 },
  { icon: 'music', small: <>Music • Dance<br />Art • Sports</>, grow: 187, bold: true },
  { icon: 'people', big: 'Thousands', small: 'of Attendees', grow: 166, wide: true },
]

export default function AboutSection() {
  return (
    <section className="about" aria-labelledby="about-title">
      <h2 id="about-title" className="visually-hidden">About IEMPACT: where Kolkata celebrates culture</h2>

      <div className="about__text">
        <p>
          IEMPACT is the flagship cultural fest of the Institute of Engineering &amp; Management,
          Kolkata — a celebration where music, dance, art, literature, performance and competition
          come together.
        </p>
        <p>
          For more than three decades, it has given students a platform to step beyond academics,
          showcase their creativity, discover new passions and be a part of a vibrant cultural
          community.
        </p>
      </div>

      <ul className="about__stats">
        {stats.map(({ icon, big, small, grow, bold, wide }) => (
          <li key={icon} style={{ flexGrow: grow }}>
            <span className="about__icon">{icons[icon]}</span>
            {big && <strong className={wide ? 'about__big about__big--wide' : 'about__big'}>{big}</strong>}
            <span className={bold ? 'about__small about__small--bold' : 'about__small'}>{small}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

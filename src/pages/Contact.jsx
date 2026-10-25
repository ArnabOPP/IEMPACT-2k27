import { useEffect, useState } from 'react'
import './Contact.css'

const EMAIL = 'iemculturalcommunity@gmail.com'

// Order = hierarchy, top to bottom. `phone` and `linkedin` are optional.
// ⚠ PLACEHOLDER LinkedIn: paste each person's profile URL into `linkedin`.
// Until then the Connect button opens a LinkedIn people-search for their name.
const tiers = [
  {
    id: 'head',
    role: 'Faculty Head',
    people: [{ name: 'Prof. Dr. Sanghamitra Poddar', phone: '+91 7439 555 091', linkedin: '' }],
  },
  {
    id: 'culture',
    role: 'Cultural Secretary',
    people: [
      { name: 'Paramartha Ghosh', phone: '+91 77970 32617', linkedin: '' },
      { name: 'Debangkita Saha', phone: '+91 8777494652', linkedin: '' },
    ],
  },
  {
    id: 'tech',
    role: 'Technical Team',
    people: [
      { name: 'Debangshu Chatterjee', phone: '+91 6290 277 345', linkedin: '' },
      { name: 'Debangkita Saha', phone: '+91 8777494652', linkedin: '' },
      { name: 'Arnab Chatterjee', phone: '+91 6290623636', linkedin: '' },
    ],
  },
]

const telHref = (phone) => `tel:${phone.replace(/\s+/g, '')}`

const linkedinHref = ({ name, linkedin }) =>
  linkedin || `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${name} IEM Kolkata`)}`

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.85h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4V9.75Z"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z"
      />
    </svg>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL).then(() => setCopied(true)).catch(() => {})
  }

  let n = 0 // running row index, for the staggered entrance

  return (
    <section className="ct" data-nav="light">
      <div className="ct__bg" aria-hidden="true" />
      <div className="ct__veil" aria-hidden="true" />

      <div className="ct__inner">
        {/* LEFT — the invitation, and the inbox */}
        <div className="ct__intro">
          <p className="eyebrow">Contact · মায়া</p>
          <h1 className="display ct__title">
            Hold the <em>thread.</em>
          </h1>
          <p className="ct__lead">
            Questions about events or registration? Pull on the red thread — the IEMPACT team is at the other end.
          </p>

          <ul className="ct__facts">
            <li>16 &amp; 17 January 2027</li>
            <li>IEM Kolkata</li>
          </ul>

          <div className="ct__mail">
            <p className="ct__label">Write to us</p>
            <a className="ct__email display" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <div className="ct__mailActions">
              <a className="ct__btn ct__btn--solid" href={`mailto:${EMAIL}`}>
                Send email <Arrow />
              </a>
              <button type="button" className="ct__btn" onClick={copyEmail} aria-live="polite">
                {copied ? 'Copied ✓' : 'Copy address'}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — the team, set as a typographic directory */}
        <div className="ct__team">
          {tiers.map(({ id, role, people }, ti) => (
            <section key={id} className={`ct__tier ct__tier--${id}`} aria-labelledby={`ct-role-${id}`}>
              <h2 className="ct__role" id={`ct-role-${id}`}>
                <span className="ct__no">0{ti + 1}</span>
                {role}
              </h2>

              <ul className="ct__list">
                {people.map((p) => (
                  <li key={`${id}-${p.name}`} className="ct__row" style={{ '--i': n++ }}>
                    <div className="ct__who">
                      <h3 className="ct__name">{p.name}</h3>
                      {p.phone && (
                        <a className="ct__phone" href={telHref(p.phone)}>
                          {p.phone}
                        </a>
                      )}
                    </div>

                    <div className="ct__actions">
                      {p.phone && (
                        <a className="ct__icon" href={telHref(p.phone)} aria-label={`Call ${p.name}`} title="Call">
                          <PhoneIcon />
                        </a>
                      )}
                      <a
                        className="ct__in"
                        href={linkedinHref(p)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Connect with ${p.name} on LinkedIn`}
                      >
                        <LinkedInIcon />
                        <span>Connect</span>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

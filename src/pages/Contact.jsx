import { useEffect, useState } from 'react'
import './Contact.css'

const EMAIL = 'iemculturalcommunity@gmail.com'

// Order = hierarchy, top to bottom. `phone` is optional — only shown when given.
const tiers = [
  {
    id: 'head',
    role: 'Faculty Head',
    people: [{ name: 'Prof. Dr. Sanghamitra Poddar', phone: '+91 7439 555 091' }],
  },
  {
    id: 'culture',
    role: 'Cultural Secretary',
    people: [
      { name: 'Paramartha Ghosh', phone: '+91 77970 32617' },
      { name: 'Debangkita Saha', phone: '+91 8777494652' },
    ],
  },
  {
    id: 'tech',
    role: 'Technical Team',
    people: [
      { name: 'Debangshu Chatterjee', phone: '+91 6290 277 345' },
      { name: 'Arnab Chatterjee', phone: '+91 6290623636' },
      { name: 'Souherdeya Sarkar', phone: '+91 891 016 9299' },
      { name: 'Debangkita Saha', phone: '+91 8777494652' },
    ],
  },
]

const telHref = (phone) => `tel:${phone.replace(/\s+/g, '')}`

// "Prof. Dr. Sanghamitra Poddar" → "SP", "Arnab Chatterjee" → "AC"
const initialsOf = (name) => {
  const words = name.split(/\s+/).filter((w) => !/^(prof|dr)\.?$/i.test(w))
  return (words[0][0] + (words[words.length - 1][0] ?? '')).toUpperCase()
}

function Orb({ children }) {
  return (
    <span className="lbtn__orb">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {children}
      </svg>
    </span>
  )
}

const phonePath = (
  <path
    d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11 11 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z"
    fill="currentColor"
  />
)
const mailPath = (
  <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm1.5 2 6.5 5 6.5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
)
const copyPath = (
  <path d="M9 9h10v11H9zM5 15V4h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
)
const checkPath = (
  <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
)

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

  let n = 0 // running card index, for the staggered entrance

  return (
    <section className="ct" data-nav="dark">
      <div className="ct__bg" aria-hidden="true" />
      <div className="ct__shade" aria-hidden="true" />

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

          <article className="ct__mail glass glass--dark">
            <p className="ct__label">Write to us</p>
            <a className="ct__email display" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <div className="ct__mailActions">
              <a className="lbtn lbtn--primary" href={`mailto:${EMAIL}`}>
                <span className="lbtn__label">Send email</span>
                <Orb>{mailPath}</Orb>
              </a>
              <button type="button" className="lbtn glass glass--dark ct__copy" onClick={copyEmail}>
                <span className="lbtn__label" aria-live="polite">
                  {copied ? 'Copied' : 'Copy address'}
                </span>
                <Orb>{copied ? checkPath : copyPath}</Orb>
              </button>
            </div>
          </article>
        </div>

        {/* RIGHT — the team in three tiers, all knotted along one thread */}
        <div className="ct__team">
          {tiers.map(({ id, role, people }) => (
            <section key={id} className={`ct__tier ct__tier--${id}`} aria-labelledby={`ct-role-${id}`}>
              <h2 className="ct__role" id={`ct-role-${id}`}>
                <span className="ct__dot" aria-hidden="true" />
                {role}
              </h2>

              <ul className="ct__cards">
                {people.map(({ name, phone }) => (
                  <li key={name} style={{ '--i': n++ }}>
                    <article className="ct__card glass glass--dark">
                      <span className="ct__mono" aria-hidden="true">
                        {initialsOf(name)}
                      </span>
                      <div className="ct__who">
                        <h3 className="ct__name">{name}</h3>
                        {phone && (
                          <a className="ct__phone" href={telHref(phone)}>
                            {phone}
                          </a>
                        )}
                      </div>
                      {phone && id !== 'tech' && (
                        <a className="ct__call" href={telHref(phone)} aria-label={`Call ${name}`}>
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            {phonePath}
                          </svg>
                        </a>
                      )}
                    </article>
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

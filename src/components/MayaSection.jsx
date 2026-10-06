import './MayaSection.css'

// Left → right. Each strip pairs an artwork with one word of the fest,
// in Bengali and English.
const strips = [
  { src: '/strip-1.jpg', bn: 'ঐতিহ্য', en: 'Heritage', alt: 'A classical dancer with many arms, in red and gold' },
  { src: '/strip-2.jpg', bn: 'মঞ্চ', en: 'Stage', alt: 'A lone figure before a wall of watching eyes' },
  { src: '/strip-3.jpg', bn: 'কল্পনা', en: 'Imagination', alt: 'A surreal figure whose hair swirls into the walls' },
  // violet artwork, so it gets the crimson duotone to sit in the red set
  { src: '/strip-4.jpg', bn: 'ছন্দ', en: 'Rhythm', alt: 'A four-armed dancer mid-step', tint: true },
]

// Full-screen layer pinned over the hero.
// Its --p variable (0..1, set by useScrollProgress)
// slides each strip in turn, alternating top / bottom.
export default function MayaSection({ stageRef }) {
  return (
    <div className="maya" ref={stageRef}>
      <div className="maya__strips">
        {strips.map(({ src, bn, en, alt, tint }, i) => (
          <figure
            key={src}
            className="maya__strip"
            style={{
              '--i': i,
              // alternate: 1st & 3rd drop from the top, 2nd & 4th rise from the bottom
              '--dir': i % 2 === 0 ? -1 : 1,
            }}
          >
            <img src={src} alt={alt} className={tint ? 'maya__img--crimson' : undefined} />
            <figcaption className="maya__label">
              <span className="maya__no">0{i + 1}</span>
              <span className="maya__bn" lang="bn">{bn}</span>
              <span className="maya__en">{en}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

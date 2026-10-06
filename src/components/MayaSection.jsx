import './MayaSection.css'

// Left → right.
// Widths are the natural pixel widths so the seams line up.
const strips = [
  { src: '/maya1.png', width: 348, alt: 'Maya strip 1' },
  { src: '/maya2.png', width: 348, alt: 'Maya strip 2' },
  { src: '/maya3.png', width: 325, alt: 'Maya strip 3' },
  { src: '/maya4.png', width: 348, alt: 'Maya strip 4' },
]

// Full-screen layer pinned over the hero.
// Its --p variable (0..1, set by useScrollProgress)
// raises each strip from the bottom in turn.
export default function MayaSection({ stageRef }) {
  return (
    <div
      className="maya"
      ref={stageRef}
      aria-label="Maya"
    >
      <div className="maya__strips">
        {strips.map(({ src, width, alt }, i) => (
          <img
            key={src}
            src={src}
            alt={alt}
            style={{
              flexGrow: width,
              '--i': i,
            }}
          />
        ))}
      </div>
    </div>
  )
}
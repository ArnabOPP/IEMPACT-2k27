import './MayaSection.css'

// Left → right. Widths are the natural pixel widths so the seams line up
// and the Maya logo (split across strips 2 and 3) stays whole.
const strips = [
  { src: '/HOME%20(17).png', width: 348, alt: 'Guitarist' },
  { src: '/HOME%20(18).png', width: 348, alt: 'Performer in face paint' },
  { src: '/HOME%20(19).png', width: 325, alt: 'Vocalist' },
  { src: '/HOME%20(20).png', width: 348, alt: 'Drummer' },
]

// Full-screen layer pinned over the hero. Its --p variable (0..1, set by
// useScrollProgress) raises each strip from the bottom in turn.
export default function MayaSection({ stageRef }) {
  return (
    <div className="maya" ref={stageRef} aria-label="Maya">
      <div className="maya__strips">
        {strips.map(({ src, width, alt }, i) => (
          <img key={src} src={src} alt={alt} style={{ flexGrow: width, '--i': i }} />
        ))}
      </div>
    </div>
  )
}

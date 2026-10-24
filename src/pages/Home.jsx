import { useCallback, useRef, useState } from 'react'
import AboutSection from '@/components/AboutSection'
import EventsSection from '@/components/EventsSection'
import Hero from '@/components/Hero'
import MayaSection from '@/components/MayaSection'
import VideoSection from '@/components/VideoSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'

// The pinned track is one scroll-driven story:
//   0 → SWAP_END   the hero turns from IEMPACT to Maya in four steps
//                  (logo alone, circle grows, logos trade, circle fills)
//   SWAP_END → 1   the four Maya strips slide in over it (see MayaSection.css)
// Keep SWAP_END in step with the step ranges in Hero.css and --t in MayaSection.css.
const SWAP_END = 0.47
// the hero's text turns to its Maya colours halfway through the final fill
const TEXT_SWITCH = 0.33

export default function Home() {
  const trackRef = useRef(null)
  const [showMaya, setShowMaya] = useState(false)

  // text colours follow the scene once the circle is half way across the screen
  const onProgress = useCallback((p) => setShowMaya(p > TEXT_SWITCH), [])
  useScrollProgress(trackRef, trackRef, onProgress)

  // the IEMPACT / মায়া tabs scroll to the end of either scene
  const pick = useCallback((maya) => {
    const track = trackRef.current
    if (!track) return
    const range = track.offsetHeight - window.innerHeight
    const trackTop = track.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: trackTop + range * (maya ? SWAP_END : 0), behavior: 'smooth' })
  }, [])

  return (
    <>
      <div className="reveal" ref={trackRef}>
        <div className="reveal__hero">
          <Hero showMaya={showMaya} onPick={pick} />
        </div>
        <MayaSection />
      </div>
      <AboutSection />
      <VideoSection />
      <EventsSection />
    </>
  )
}

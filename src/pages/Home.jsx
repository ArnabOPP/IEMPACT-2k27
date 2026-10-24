import { useCallback, useRef, useState } from 'react'
import AboutSection from '@/components/AboutSection'
import EventsSection from '@/components/EventsSection'
import Hero from '@/components/Hero'
import MayaSection from '@/components/MayaSection'
import VideoSection from '@/components/VideoSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'

// The pinned track is one scroll-driven story:
//   0 → 0.47   the hero turns from IEMPACT to Maya in four steps
//              (logo alone, circle grows, logos trade, circle fills)
//   0.47 → 1   the four Maya strips slide in over it (see MayaSection.css)
// Keep those numbers in step with the step ranges in Hero.css and --t in MayaSection.css.

// the hero's text turns to its Maya colours halfway through the final fill
const TEXT_SWITCH = 0.33

export default function Home() {
  const trackRef = useRef(null)
  const [showMaya, setShowMaya] = useState(false)

  // text colours follow the scene once the circle is half way across the screen
  const onProgress = useCallback((p) => setShowMaya(p > TEXT_SWITCH), [])
  useScrollProgress(trackRef, trackRef, onProgress)

  return (
    <>
      <div className="reveal" ref={trackRef}>
        <div className="reveal__hero">
          <Hero showMaya={showMaya} />
        </div>
        <MayaSection />
      </div>
      <AboutSection />
      <VideoSection />
      <EventsSection />
    </>
  )
}

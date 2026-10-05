import { useRef } from 'react'
import AboutSection from '@/components/AboutSection'
import EventsSection from '@/components/EventsSection'
import Hero from '@/components/Hero'
import MayaSection from '@/components/MayaSection'
import VideoSection from '@/components/VideoSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function Home() {
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  useScrollProgress(trackRef, stageRef)

  return (
    <>
      <div className="reveal" ref={trackRef}>
        <div className="reveal__hero">
          <Hero />
        </div>
        <MayaSection stageRef={stageRef} />
      </div>
      <AboutSection />
      <VideoSection />
      <EventsSection />
    </>
  )
}

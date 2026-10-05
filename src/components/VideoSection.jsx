import { useEffect, useRef } from 'react'
import './VideoSection.css'

// Muted + playsInline are required for browsers to allow autoplay.
// Browsers may pause off-screen autoplay videos, so (re)start it whenever it is visible.
export default function VideoSection() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let visible = false

    const play = () => video.play().catch(() => {})
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) play()
    })
    const resume = () => {
      if (visible && !video.ended) play()
    }

    observer.observe(video)
    video.addEventListener('pause', resume)
    play()
    return () => {
      observer.disconnect()
      video.removeEventListener('pause', resume)
    }
  }, [])

  return (
    <section className="video-section" aria-label="IEMPACT highlights video">
      <video
        ref={videoRef}
        className="video-section__video"
        src="/IMG_3586.MP4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
      />
    </section>
  )
}

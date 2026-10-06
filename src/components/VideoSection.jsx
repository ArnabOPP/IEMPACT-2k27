import { useEffect, useRef, useState } from 'react'
import './VideoSection.css'

// Muted + playsInline are required for browsers to allow autoplay.
// Browsers may pause off-screen autoplay videos, so (re)start it whenever it is visible.
export default function VideoSection() {
  const videoRef = useRef(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let visible = false

    const play = () => video.play().catch(() => {})
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) play()
      // never keep sound playing once the section has scrolled away
      else if (!video.muted) {
        video.muted = true
        setMuted(true)
      }
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

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <section className="video-section" aria-label="IEMPACT highlights video" data-nav="dark">
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
      />

      <div className="video-section__shade" aria-hidden="true" />

      <div className="video-section__caption">
        <p className="eyebrow">Relive</p>
        <p className="video-section__title display">
          The nights that <em>stayed</em>
        </p>
      </div>

      <button
        type="button"
        className="video-section__sound glass glass--dark"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />
          {muted ? (
            <path
              d="m16 9 5 6m0-6-5 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
        <span>{muted ? 'Sound off' : 'Sound on'}</span>
      </button>
    </section>
  )
}

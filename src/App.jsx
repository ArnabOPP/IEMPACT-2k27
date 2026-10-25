import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Curtain from '@/components/Curtain'
import Layout from '@/components/Layout'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import EventDetail from '@/pages/EventDetail'
import Events from '@/pages/Events'
import Gallery from '@/pages/Gallery'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import Schedule from '@/pages/Schedule'
import { waitForPageAssets } from '@/utils/pageAssets'

// The curtain is the site's intro: it loads and opens ONCE, on the first visit.
// It never flashes open, so it holds at least this long even when every asset
// is already cached.
const FIRST_MIN_MS = 1500

// On Home the curtain stops on the hero's own artwork; elsewhere it slides away
const openStateFor = (pathname) => (pathname === '/' ? 'settled' : 'away')

export default function App() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [curtain, setCurtain] = useState('closed')
  const [progress, setProgress] = useState(0)
  const booted = useRef(false)

  // Page change: swap straight to the new page, no loader. After the intro the
  // curtain only re-poses itself (framing the Home hero, or parted away).
  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return
    setDisplayLocation(location)
    window.scrollTo(0, 0)
    if (booted.current) setCurtain(openStateFor(location.pathname))
  }, [location, displayLocation.pathname])

  // First visit only: the curtain stays shut until every asset the first page
  // needs has arrived, then opens.
  useEffect(() => {
    if (booted.current) return
    let cancelled = false
    const minHold = new Promise((resolve) => setTimeout(resolve, FIRST_MIN_MS))
    Promise.all([
      waitForPageAssets(displayLocation.pathname, setProgress, () => cancelled),
      minHold,
    ]).then(() => {
      if (cancelled) return
      booted.current = true
      setCurtain(openStateFor(displayLocation.pathname))
    })
    return () => {
      cancelled = true
    }
  }, [displayLocation])

  return (
    <>
      <Curtain state={curtain} progress={progress} />
      <Routes location={displayLocation}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:no" element={<EventDetail />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

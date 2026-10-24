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

const SPLIT_MS = 1200 // matches the CSS transition duration
// The curtain never flashes open: it holds at least this long even when every
// asset is already cached. The first visit holds longer, as a proper intro.
const FIRST_MIN_MS = 1500
const NEXT_MIN_MS = 250

// On Home the curtain stops on the hero's own artwork; elsewhere it slides away
const openStateFor = (pathname) => (pathname === '/' ? 'settled' : 'away')

export default function App() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [curtain, setCurtain] = useState('closed')
  const [progress, setProgress] = useState(0)
  const booted = useRef(false)

  // Page change: close the curtain, swap the page while it is shut
  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return
    setCurtain('closed')
    setProgress(0)
    const t = setTimeout(() => {
      setDisplayLocation(location)
      window.scrollTo(0, 0)
    }, SPLIT_MS)
    return () => clearTimeout(t)
  }, [location, displayLocation.pathname])

  // The curtain is the loader. Whenever a page has been put on screen (the
  // first visit, and after every swap above) it stays shut until every asset
  // that page needs has arrived, then opens.
  useEffect(() => {
    let cancelled = false
    const minHold = new Promise((resolve) =>
      setTimeout(resolve, booted.current ? NEXT_MIN_MS : FIRST_MIN_MS),
    )
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

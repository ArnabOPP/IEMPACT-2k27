import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Curtain from '@/components/Curtain'
import Layout from '@/components/Layout'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Events from '@/pages/Events'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'

const HOLD_MS = 2500 // intro hold before first open
const SPLIT_MS = 1200 // matches the CSS transition duration

// On Home the curtain stops on the hero's own artwork; elsewhere it slides away
const openStateFor = (pathname) => (pathname === '/' ? 'settled' : 'away')

export default function App() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [curtain, setCurtain] = useState('closed')
  const [booted, setBooted] = useState(false)
  const [firstPath] = useState(location.pathname)

  // Intro: curtain starts closed, opens after a hold (or on click)
  useEffect(() => {
    const t = setTimeout(() => {
      setCurtain(openStateFor(firstPath))
      setBooted(true)
    }, HOLD_MS)
    return () => clearTimeout(t)
  }, [firstPath])

  // Page change: close curtain, swap page while covered, open again
  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return
    setCurtain('closed')
    const t = setTimeout(() => {
      setDisplayLocation(location)
      window.scrollTo(0, 0)
      setCurtain(openStateFor(location.pathname))
      setBooted(true)
    }, SPLIT_MS)
    return () => clearTimeout(t)
  }, [location, displayLocation.pathname])

  const skipIntro = () => {
    if (!booted) {
      setCurtain(openStateFor(displayLocation.pathname))
      setBooted(true)
    }
  }

  return (
    <>
      <Curtain state={curtain} onClick={skipIntro} />
      <Routes location={displayLocation}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

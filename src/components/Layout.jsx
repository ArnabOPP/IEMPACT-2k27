import { Outlet } from 'react-router-dom'
import Footer from '@/components/Footer'
import LiquidFilter from '@/components/LiquidFilter'
import Navbar from '@/components/Navbar'

export default function Layout() {
  return (
    <>
      <LiquidFilter />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

import { useEffect } from 'react'

// Writes 0..1 scroll progress through `wrapperRef` into a --p CSS variable on `targetRef`.
// Uses a CSS variable so scrolling never triggers React re-renders.
export function useScrollProgress(wrapperRef, targetRef) {
  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const wrapper = wrapperRef.current
      const target = targetRef.current
      if (!wrapper || !target) return
      const { top, height } = wrapper.getBoundingClientRect()
      const range = height - window.innerHeight
      const progress = range > 0 ? Math.min(1, Math.max(0, -top / range)) : 0
      target.style.setProperty('--p', progress.toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [wrapperRef, targetRef])
}

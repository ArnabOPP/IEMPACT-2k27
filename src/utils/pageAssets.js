import { FRAME_COUNT, frameSrc } from '@/data/aboutFrames'

// =====================================================
// PAGE LOADER
// Resolves once everything the page on screen needs has actually arrived,
// so the curtain can stay shut until then. The page is rendered behind the
// curtain first; this then:
//   - scans it for <img> (lazy ones too: they are fetched here regardless),
//     <video> posters and every CSS background-image,
//   - adds the assets that scripts fetch on their own (a DOM scan can't see
//     those), and waits for web fonts and each <video> to be playable,
//   - repeats the scan until a pass finds nothing new, which catches
//     content that renders a moment late.
// A broken file counts as "done" and a ceiling stops one stuck request from
// holding the curtain forever.
// =====================================================

const MAX_WAIT_MS = 30000 // hard ceiling for the whole page
const VIDEO_WAIT_MS = 20000 // the video is huge: "playable", not "fully downloaded"
const RESCAN_GAP_MS = 150
const MAX_PASSES = 8

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// assets a script fetches itself (a DOM scan can't see these)
const scriptedAssets = (pathname) =>
  pathname === '/' ? Array.from({ length: FRAME_COUNT }, (_, i) => frameSrc(i)) : []

const urlsIn = (cssValue) =>
  [...cssValue.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((m) => m[1])

function collectUrls() {
  const urls = new Set()
  const add = (u) => {
    if (!u || u.startsWith('data:') || u.startsWith('blob:')) return
    urls.add(new URL(u, window.location.href).href)
  }

  document.querySelectorAll('img').forEach((img) => add(img.currentSrc || img.src))
  document.querySelectorAll('video[poster]').forEach((v) => add(v.getAttribute('poster')))
  document.body.querySelectorAll('*').forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage
    if (bg && bg !== 'none') urlsIn(bg).forEach(add)
  })
  return urls
}

function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => (img.decode ? img.decode().catch(() => {}).finally(resolve) : resolve())
    img.onerror = resolve
    img.src = url
  })
}

function loadVideo(video) {
  return new Promise((resolve) => {
    if (video.readyState >= 3) return resolve()
    const finish = () => {
      clearTimeout(timer)
      video.removeEventListener('canplay', finish)
      video.removeEventListener('error', finish)
      resolve()
    }
    const timer = setTimeout(finish, VIDEO_WAIT_MS)
    video.addEventListener('canplay', finish)
    video.addEventListener('error', finish)
  })
}

/**
 * @param {string} pathname  route being shown
 * @param {(p: number) => void} onProgress  called with 0..1, never going backwards
 * @param {() => boolean} isCancelled  true once the caller no longer cares
 */
export async function waitForPageAssets(pathname, onProgress, isCancelled) {
  const started = performance.now()
  const seen = new Set()
  let done = 0
  let best = 0

  const report = () => {
    const p = seen.size ? done / seen.size : 0
    if (p > best) {
      best = p
      onProgress?.(best)
    }
  }
  const track = (url) => {
    seen.add(url)
    return loadImage(url).then(() => {
      done += 1
      report()
    })
  }
  const timeLeft = () => Math.max(0, MAX_WAIT_MS - (performance.now() - started))

  for (let pass = 0; pass < MAX_PASSES && !isCancelled() && timeLeft() > 0; pass++) {
    await Promise.race([document.fonts?.ready ?? Promise.resolve(), sleep(timeLeft())])

    const wanted = new Set([...collectUrls(), ...scriptedAssets(pathname).map((u) => new URL(u, window.location.href).href)])
    const fresh = [...wanted].filter((u) => !seen.has(u))
    const videos = [...document.querySelectorAll('video')]

    if (pass > 0 && fresh.length === 0) break // a full pass found nothing new: done

    await Promise.race([
      Promise.all([...fresh.map(track), ...videos.map(loadVideo)]),
      sleep(timeLeft()),
    ])
    await sleep(RESCAN_GAP_MS) // let late-rendering content appear before the next scan
  }

  if (isCancelled()) return

  // Everything is in the cache now. Lazy images below the fold would still wait
  // for the viewer to scroll near them; tell them to take their (cached) file
  // right away so nothing pops in once the curtain is open.
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    img.loading = 'eager'
  })
  onProgress?.(1)
}

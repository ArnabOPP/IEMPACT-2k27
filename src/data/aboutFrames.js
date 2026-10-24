// Frames extracted from the About clip (every 2nd frame, 600×750 WebP).
// Shared by the About section, which scrubs through them, and the page
// loader, which preloads them before the curtain opens.
export const FRAME_COUNT = 137
export const frameSrc = (i) => `/about-frames/f${String(i).padStart(3, '0')}.webp`

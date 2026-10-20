// Gallery items. ⚠ PLACEHOLDER — these are the fest's artwork and event posters.
// Swap in real photos from the fest: drop files in /public and add
// { src: '/your-photo.jpg', title: 'Caption', tag: 'Day 1' } entries.
// `tag` becomes a filter chip on the Gallery page.
import { events } from '@/data/events'

const artwork = [
  { src: '/strip-1.jpg', title: 'Heritage', tag: 'Artwork' },
  { src: '/strip-2.jpg', title: 'Stage', tag: 'Artwork' },
  { src: '/strip-3.jpg', title: 'Imagination', tag: 'Artwork' },
  { src: '/strip-4.jpg', title: 'Rhythm', tag: 'Artwork' },
  { src: '/maya-thread.jpg', title: 'The thread', tag: 'Artwork' },
  { src: '/events-crimson-halo.jpg', title: 'Halo of moons', tag: 'Artwork' },
]

const posters = events.map((e) => ({
  src: e.card,
  title: e.name,
  sub: e.category,
  tag: 'Posters',
}))

export const gallery = [...artwork, ...posters]

export const galleryTags = ['All', ...new Set(gallery.map((g) => g.tag))]

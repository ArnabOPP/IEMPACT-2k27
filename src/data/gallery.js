// The gallery reads every image in /src/gallery automatically — no code to edit.
//
//   src/gallery/Day 1/opening.jpg        -> filter chip "Day 1", caption "Opening"
//   src/gallery/Day 2/05-battle-of-bands.jpg
//   src/gallery/cover.jpg                -> images at the top level go under "Moments"
//
// Each sub-folder becomes a filter chip. A leading number ("05-") only sets the
// order; dashes and underscores in the filename become spaces in the caption.
// Supported: jpg, jpeg, png, webp, avif, gif.
const files = import.meta.glob('/src/gallery/**/*.{jpg,jpeg,png,webp,avif,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

const clean = (name) =>
  name
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[\s._-]+/, '')
    .replace(/[-_]+/g, ' ')
    .trim()

export const gallery = Object.entries(files)
  .map(([path, src]) => {
    const parts = path.replace('/src/gallery/', '').split('/')
    const file = parts.pop()
    return {
      path,
      src,
      title: clean(file) || file,
      tag: parts.length ? parts[0].replace(/[-_]+/g, ' ') : 'Moments',
    }
  })
  .sort((a, b) => collator.compare(a.path, b.path))

export const galleryTags = ['All', ...new Set(gallery.map((g) => g.tag))]

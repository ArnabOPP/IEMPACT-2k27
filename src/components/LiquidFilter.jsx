// SVG filter referenced by `backdrop-filter: url(#liquid-glass)`.
// Low-frequency turbulence displaces whatever sits behind a .glass pane,
// so the scene bends like it is seen through a drop of water.
// Only Chromium applies SVG filters to backdrops, so main.jsx adds
// html.liquid there; every other browser keeps the plain frosted blur.
export default function LiquidFilter() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      style={{ position: 'absolute' }}
    >
      <filter
        id="liquid-glass"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.008 0.012"
          numOctaves="2"
          seed="27"
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="2" result="soft" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="soft"
          scale="38"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>

      {/* Turns the red Maya mark white for the red-thread hero.
          Alpha keeps only red ink (R − G), so the light halo left in the
          PNG from its old white background drops out instead of glowing. */}
      {/* Crimson duotone: brightness mapped from maroon-black shadows
          through sindoor red to pale pink highlights. Pulls off-palette
          art (e.g. the violet "Rhythm" strip) into the site's reds. */}
      <filter id="crimson-duotone" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0.30 0.59 0.11 0 0
                  0.30 0.59 0.11 0 0
                  0.30 0.59 0.11 0 0
                  0    0    0    1 0"
        />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.08 0.55 0.86 1" />
          <feFuncG type="table" tableValues="0.01 0.05 0.25 0.9" />
          <feFuncB type="table" tableValues="0.01 0.05 0.2 0.84" />
        </feComponentTransfer>
      </filter>

      <filter id="maya-white" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1
                  0 0 0 0 1
                  0 0 0 0 1
                  1 -1 0 1 -1"
        />
      </filter>
    </svg>
  )
}

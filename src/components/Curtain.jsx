import './Curtain.css'

// Two halves (up/down artwork) that double as the site's loader.
// state: 'closed'  – covering the screen, loading the page behind it
//        'settled' – opened onto the hero artwork (Home), then hidden
//        'away'    – slid fully off screen
// progress: 0..1, how much of the page's assets have arrived
export default function Curtain({ state, progress = 0 }) {
  const percent = Math.round(progress * 100)

  return (
    <div className={`intro intro--${state}`} role="presentation">
      {/* UPPER CURTAIN */}
      <div className="intro__half intro__half--up">
        <img src="/curtain.png" alt="" />
      </div>

      {/* LOWER CURTAIN */}
      <div className="intro__half intro__half--down">
        <img src="/curtaindown.png" alt="" />
      </div>

      {/* LOADING — fades away as the curtain opens */}
      <div className="intro__loader" role="status" aria-live="polite">
        <span className="intro__loaderLabel">
          Loading <b>{percent}%</b>
        </span>
        <span className="intro__loaderBar" aria-hidden="true">
          <i style={{ transform: `scaleX(${progress})` }} />
        </span>
      </div>
    </div>
  )
}

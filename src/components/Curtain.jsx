import './Curtain.css'

// Two halves (up/down artwork).
// state: 'closed'  – covering the screen
//        'settled' – opened onto the hero artwork (Home), then hidden
//        'away'    – slid fully off screen

export default function Curtain({ state, onClick }) {
  return (
    <div
      className={`intro intro--${state}`}
      onClick={onClick}
      role="presentation"
    >
      {/* UPPER CURTAIN */}
      <div className="intro__half intro__half--up">
        <img
          src="/curtain.png"
          alt=""
        />
      </div>

      {/* LOWER CURTAIN */}
      <div className="intro__half intro__half--down">
        <img
          src="/curtaindown.png"
          alt=""
        />
      </div>

    </div>
  )
}
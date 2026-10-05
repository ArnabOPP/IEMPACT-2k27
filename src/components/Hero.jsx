import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__art hero__art--up" />

      <div className="hero__band">
        <div className="hero__logo">
          <p className="hero__presents">IEM Kolkata<br />Presents</p>
          <img src="/IEMPACT%20logo.png" alt="IMPACT 2027" />
          <p className="hero__year">2027</p>
        </div>
      </div>

      <div className="hero__art hero__art--down" />

      <h2 className="hero__tagline">
        The 36<sup>th</sup> Annual Cultural Fest
      </h2>
    </section>
  )
}

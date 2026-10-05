import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="container">
      <h1>404</h1>
      <Link to="/">Back home</Link>
    </section>
  )
}

import Navbar from '../shared/Navbar'
import './home.css'

export default function Home() {
  const forestImg =
    'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg?auto=compress&cs=tinysrgb&w=1600'

  return (
    <div className="appShell">
      <Navbar />
      <main className="homeMain">
        <div className="homeHero">
          <h1 className="homeTitle">charlie is not a dickhead</h1>
          <p className="homeSubtitle">
            A modern real estate marketplace — we’ll build it step by step.
          </p>
        </div>

        <div className="homeImageWrap" aria-label="Homepage feature image">
          <img className="homeImage" src={forestImg} alt="Forest landscape" />
        </div>
      </main>
    </div>
  )
}

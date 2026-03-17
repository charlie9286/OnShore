import Navbar from '../shared/Navbar'
import './home.css'
import ashgabatImg from '../assets/ashgabat.jpeg'

export default function Home() {
  return (
    <div className="appShell">
      <Navbar />
      <main className="homeMain">
        <div className="homeHero">
          <h1 className="homeTitle">Find your next home</h1>
          <p className="homeSubtitle">
            A modern real estate marketplace — we’ll build it step by step.
          </p>
        </div>

        <div className="homeImageWrap" aria-label="Homepage feature image">
          <img className="homeImage" src={ashgabatImg} alt="" />
        </div>
      </main>
    </div>
  )
}


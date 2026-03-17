import { Link } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { useAuth } from '../context/AuthContext'
import './dashboard.css'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="appShell">
      <Navbar />
      <main className="dashMain">
        <div className="dashWrap">
          <h1 className="dashTitle">Dashboard</h1>
          <p className="dashSubtitle">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}.
          </p>

          <div className="dashActions">
            <Link className="primaryBtn dashBtn" to="/listings/new">
              Create listing
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}


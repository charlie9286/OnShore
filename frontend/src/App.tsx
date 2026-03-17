import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { CreateListing } from './pages/CreateListing'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { PropertyDetails } from './pages/PropertyDetails'
import { SearchResults } from './pages/SearchResults'

export default function App() {
  return (
    <div className="min-h-full bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/property/:propertyId" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sell/create" element={<CreateListing />} />

          <Route path="/buy" element={<Navigate to="/search?type=buy" replace />} />
          <Route path="/rent" element={<Navigate to="/search?type=rent" replace />} />
          <Route path="/sell" element={<Navigate to="/sell/create" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

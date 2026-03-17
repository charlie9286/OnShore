import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-full">
        <main className="mx-auto w-full max-w-5xl px-4 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

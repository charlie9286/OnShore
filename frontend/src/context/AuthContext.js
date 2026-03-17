import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getFirstNameFromFullName } from '../shared/auth'

const AuthContext = createContext(null)

const STORAGE_KEY = 'shore.user'
const API_BASE_RAW = process.env.REACT_APP_API_BASE || 'http://localhost:5050'
const API_BASE = API_BASE_RAW.replace(/\/+$/, '')

function buildApiUrl(path) {
  // Local dev backend serves routes at /auth/*.
  // Vercel backend serves routes under /api/* (because it’s deployed from backend/api).
  const needsApiPrefix = !API_BASE.includes('localhost') && !API_BASE.endsWith('/api')
  const base = needsApiPrefix ? `${API_BASE}/api` : API_BASE
  return `${base}${path}`
}

async function postJson(path, body) {
  let res
  try {
    res = await fetch(buildApiUrl(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    throw new Error(
      'Network error: failed to reach the server. Check the API URL and CORS settings.',
    )
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error || data?.message || 'Request failed')
  return data
}

function toUserShape(user) {
  if (!user) return null
  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.fullName ||
    user?.user_metadata?.name ||
    ''
  const firstName = getFirstNameFromFullName(fullName)
  return {
    id: user.id,
    email: user.email,
    fullName,
    firstName,
  }
}

function loadStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return {
      id: parsed.id || null,
      email: parsed.email || '',
      fullName: parsed.fullName || '',
      firstName: parsed.firstName || '',
    }
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadStoredUser())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const data = await postJson('/auth/login', { email, password })
      const shaped = toUserShape(data?.user)
      setUser(shaped)
      return shaped
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password) => {
    setLoading(true)
    try {
      const data = await postJson('/auth/signup', {
        fullName: name,
        email,
        password,
      })
      const shaped = toUserShape(data?.user)
      setUser(shaped)
      return shaped
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}


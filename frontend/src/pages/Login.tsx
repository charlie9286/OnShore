import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
        <h1 className="text-2xl font-bold text-white">Login</h1>
        <p className="mt-2 text-sm text-slate-300/80">
          Sign in with your Supabase account.
        </p>

        <form
          className="mt-6 space-y-3"
          onSubmit={async (e) => {
            e.preventDefault()
            setError(null)
            setLoading(true)
            try {
              const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
              })
              if (error) throw error
              navigate('/')
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Login failed')
            } finally {
              setLoading(false)
            }
          }}
        >
          <input
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-indigo-400/40"
            placeholder="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-indigo-400/40"
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="rounded-xl bg-red-500/10 p-3 text-xs text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-300/80">
          <Link className="text-white hover:underline" to="/register">
            Create account
          </Link>
          <Link className="text-white hover:underline" to="/">
            Back home
          </Link>
        </div>
      </div>
    </div>
  )
}


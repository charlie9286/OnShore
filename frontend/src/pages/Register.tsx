import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
        <h1 className="text-2xl font-bold text-white">Create account</h1>
        <p className="mt-2 text-sm text-slate-300/80">
          Create an account with Supabase Auth.
        </p>

        <form
          className="mt-6 space-y-3"
          onSubmit={async (e) => {
            e.preventDefault()
            setError(null)
            setSuccess(null)
            setLoading(true)
            try {
              const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                  data: name.trim() ? { name: name.trim() } : undefined,
                },
              })
              if (error) throw error

              if (data.session) {
                navigate('/')
                return
              }

              setSuccess(
                'Account created. Check your email to confirm your account, then log in.',
              )
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Sign up failed')
            } finally {
              setLoading(false)
            }
          }}
        >
          <input
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-indigo-400/40"
            placeholder="Name (optional)"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            placeholder="Password (min 6 chars)"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          {error && (
            <div className="rounded-xl bg-red-500/10 p-3 text-xs text-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-xl bg-emerald-500/10 p-3 text-xs text-emerald-200">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-300/80">
          <Link className="text-white hover:underline" to="/login">
            Already have an account?
          </Link>
          <Link className="text-white hover:underline" to="/">
            Back home
          </Link>
        </div>
      </div>
    </div>
  )
}


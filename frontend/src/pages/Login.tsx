import { Link } from 'react-router-dom'

export function Login() {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
        <h1 className="text-2xl font-bold text-white">Login</h1>
        <p className="mt-2 text-sm text-slate-300/80">
          Auth routes are scaffolded on the backend. Wiring will come next.
        </p>

        <form className="mt-6 space-y-3">
          <input
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-indigo-400/40"
            placeholder="Email"
            type="email"
            autoComplete="email"
          />
          <input
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-indigo-400/40"
            placeholder="Password"
            type="password"
            autoComplete="current-password"
          />
          <button
            type="button"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-300/80">
          <Link className="text-white hover:underline" to="/">
            Back home
          </Link>
        </div>
      </div>
    </div>
  )
}


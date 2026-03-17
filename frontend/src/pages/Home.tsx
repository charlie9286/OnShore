import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export function Home() {
  const { session, loading, signOut } = useAuth()

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/30">
        <div className="text-xs text-slate-300/80">OnShore Marketplace</div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Real estate marketplace
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300/80 sm:text-base">
          Supabase Auth is configured for login and account creation.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {!loading && !session && (
            <>
              <Link
                to="/login"
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Create account
              </Link>
            </>
          )}

          {!loading && session && (
            <>
              <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200/90">
                Signed in as{' '}
                <span className="font-semibold text-white">
                  {session.user.email}
                </span>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  )
}


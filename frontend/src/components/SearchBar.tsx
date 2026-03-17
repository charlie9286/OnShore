import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

export function SearchBar() {
  const navigate = useNavigate()
  const query = useQuery()
  const [q, setQ] = useState(() => query.get('q') ?? '')

  return (
    <form
      className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/20 sm:flex-row sm:items-center"
      onSubmit={(e) => {
        e.preventDefault()
        const next = new URLSearchParams(query)
        if (q.trim()) next.set('q', q.trim())
        else next.delete('q')
        navigate({ pathname: '/search', search: next.toString() })
      }}
    >
      <div className="flex-1">
        <label className="sr-only" htmlFor="q">
          Search
        </label>
        <input
          id="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="City, neighborhood, ZIP, or address…"
          className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none ring-0 focus:border-indigo-400/40 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:brightness-110"
      >
        Search
      </button>
    </form>
  )
}


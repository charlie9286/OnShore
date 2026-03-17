import { Link } from 'react-router-dom'

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-300/80">
            Saved listings and messages will appear here.
          </p>
        </div>
        <Link
          to="/sell/create"
          className="inline-flex items-center justify-center rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
        >
          Create listing
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm font-semibold text-white">Saved</div>
          <p className="mt-2 text-sm text-slate-300/80">
            Backed by the `SavedProperty` model.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm font-semibold text-white">Messages</div>
          <p className="mt-2 text-sm text-slate-300/80">
            Backed by the `Message` model.
          </p>
        </div>
      </div>
    </div>
  )
}


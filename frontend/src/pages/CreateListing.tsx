import { Link } from 'react-router-dom'

export function CreateListing() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Create listing</h1>
          <p className="text-sm text-slate-300/80">
            This will POST to the property routes once implemented.
          </p>
        </div>
        <Link
          to="/dashboard"
          className="rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
        >
          Dashboard
        </Link>
      </div>

      <form className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/30">
        <input
          className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-indigo-400/40"
          placeholder="Title"
        />
        <input
          className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-indigo-400/40"
          placeholder="Address / City"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-indigo-400/40"
            placeholder="Price"
          />
          <select className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/40">
            <option value="SALE">For sale</option>
            <option value="RENT">For rent</option>
          </select>
        </div>
        <button
          type="button"
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Publish (placeholder)
        </button>
      </form>
    </div>
  )
}


import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiClient } from '../api/client'

type HealthResponse = { ok: boolean; service?: string }

export function PropertyDetails() {
  const { propertyId } = useParams()
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [healthError, setHealthError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    apiClient
      .get<HealthResponse>('/api/health')
      .then((res) => {
        if (!cancelled) setHealth(res.data)
      })
      .catch((e) => {
        if (!cancelled) setHealthError(e?.message ?? 'Failed to reach API')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Property</h1>
          <p className="text-sm text-slate-300/80">ID: {propertyId}</p>
        </div>
        <Link
          to="/search"
          className="rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
        >
          Back to results
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900" />
          <div className="mt-4 space-y-2">
            <div className="text-xl font-semibold text-white">
              Placeholder listing title
            </div>
            <div className="text-sm text-slate-300/80">
              Listing details will be wired to the backend soon.
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold text-white">Contact</div>
            <p className="mt-2 text-sm text-slate-300/80">
              Messaging will be backed by the `Message` model.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Send message
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold text-white">API status</div>
            <div className="mt-2 text-sm text-slate-300/80">
              {health ? (
                <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-3 text-xs text-slate-200">
                  {JSON.stringify(health, null, 2)}
                </pre>
              ) : healthError ? (
                <div className="rounded-xl bg-red-500/10 p-3 text-xs text-red-200">
                  {healthError}
                </div>
              ) : (
                'Checking /api/health…'
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}


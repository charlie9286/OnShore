import { Link } from 'react-router-dom'

export type PropertyCardData = {
  id: string
  title: string
  location: string
  priceLabel: string
  beds?: number
  baths?: number
  imageUrl?: string
}

export function PropertyCard({ property }: { property: PropertyCardData }) {
  return (
    <Link
      to={`/property/${property.id}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:border-white/20"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-xs text-slate-300/70">
            No image
          </div>
        )}
        <div className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {property.priceLabel}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-white">
              {property.title}
            </div>
            <div className="truncate text-xs text-slate-300/80">
              {property.location}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-300/80">
          <span className="rounded-full bg-white/5 px-2 py-1">
            {property.beds ?? 0} bd
          </span>
          <span className="rounded-full bg-white/5 px-2 py-1">
            {property.baths ?? 0} ba
          </span>
        </div>
      </div>
    </Link>
  )
}


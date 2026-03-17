import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PropertyCard, type PropertyCardData } from '../components/PropertyCard'
import { SearchBar } from '../components/SearchBar'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

export function SearchResults() {
  const query = useQuery()
  const q = query.get('q') ?? ''
  const type = (query.get('type') ?? 'buy').toLowerCase()

  const results: PropertyCardData[] = [
    {
      id: 'sr1',
      title: 'Mid-century Gem',
      location: 'San Diego, CA',
      priceLabel: type === 'rent' ? '$3,200/mo' : '$1,120,000',
      beds: 3,
      baths: 2,
    },
    {
      id: 'sr2',
      title: 'Bright Studio Near Transit',
      location: 'Chicago, IL',
      priceLabel: type === 'rent' ? '$1,850/mo' : '$340,000',
      beds: 1,
      baths: 1,
    },
    {
      id: 'sr3',
      title: 'Quiet Suburban Retreat',
      location: 'Raleigh, NC',
      priceLabel: type === 'rent' ? '$2,450/mo' : '$525,000',
      beds: 4,
      baths: 3,
    },
  ]

  const title =
    type === 'rent' ? 'Rent' : type === 'buy' ? 'Buy' : 'Search results'

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-sm text-slate-300/80">
            {q ? (
              <>
                Showing results for <span className="text-white">{q}</span>
              </>
            ) : (
              'Try searching by city, ZIP, or address.'
            )}
          </p>
        </div>
        <div className="w-full max-w-xl">
          <SearchBar />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
        <div className="text-sm text-slate-200/90">
          {results.length} listings
        </div>
        <Link
          to="/sell/create"
          className="rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
        >
          Create listing
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </div>
  )
}


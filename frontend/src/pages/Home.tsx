import { PropertyCard, type PropertyCardData } from '../components/PropertyCard'
import { SearchBar } from '../components/SearchBar'

const featured: PropertyCardData[] = [
  {
    id: 'p1',
    title: 'Modern Coastal Villa',
    location: 'Santa Monica, CA',
    priceLabel: '$2,450,000',
    beds: 4,
    baths: 3,
  },
  {
    id: 'p2',
    title: 'Downtown Skyline Condo',
    location: 'Austin, TX',
    priceLabel: '$685,000',
    beds: 2,
    baths: 2,
  },
  {
    id: 'p3',
    title: 'Sunlit Craftsman Home',
    location: 'Portland, OR',
    priceLabel: '$910,000',
    beds: 3,
    baths: 2,
  },
  {
    id: 'p4',
    title: 'Luxury High-Rise Rental',
    location: 'New York, NY',
    priceLabel: '$5,950/mo',
    beds: 1,
    baths: 1,
  },
]

export function Home() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/10 to-slate-950 p-8 shadow-xl shadow-black/30">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200/80">
            Find your next place
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            A stylish real estate marketplace for buyers, renters, and sellers.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-200/80 sm:text-base">
            Search listings, save favorites, and message agents—built for speed
            on Vercel + Render.
          </p>

          <div className="mt-6 max-w-3xl">
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Featured</h2>
            <p className="text-sm text-slate-300/80">
              A few curated listings to get started.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>
    </div>
  )
}


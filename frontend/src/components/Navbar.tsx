import { NavLink } from 'react-router-dom'

const linkBase =
  'rounded-full px-3 py-2 text-sm font-medium text-slate-200/90 transition hover:bg-white/10 hover:text-white'

const linkActive = 'bg-white/10 text-white'

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ''}`}
      end={to === '/'}
    >
      {label}
    </NavLink>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-black">
            OS
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">OnShore</div>
            <div className="text-xs text-slate-300/80">Marketplace</div>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          <NavItem to="/" label="Home" />
          <NavItem to="/buy" label="Buy" />
          <NavItem to="/rent" label="Rent" />
          <NavItem to="/sell" label="Sell" />
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/login" label="Login" />
        </nav>

        <div className="md:hidden">
          <NavLink to="/search" className={linkBase}>
            Search
          </NavLink>
        </div>
      </div>
    </header>
  )
}


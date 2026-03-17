import './navbar.css'
import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const NAV_ITEMS = [
  {
    label: 'Buy',
    href: '/buy',
    children: [
      { label: 'Property for sale', href: '/buy/property-for-sale' },
      { label: 'New homes for sale', href: '/buy/new-homes-for-sale' },
    ],
  },
  {
    label: 'Rent',
    href: '/rent',
    children: [
      { label: 'Property to rent', href: '/rent/property-to-rent' },
      { label: 'Student property to rent', href: '/rent/student-property-to-rent' },
    ],
  },
  {
    label: 'House prices',
    href: '/house-prices',
    children: [{ label: 'Sold house prices', href: '/house-prices/sold-house-prices' }],
  },
]

function ChevronDownIcon(props) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z"
      />
    </svg>
  )
}

function SearchIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10 4a6 6 0 1 1 3.7 10.7l4.3 4.3a1 1 0 0 1-1.4 1.4l-4.3-4.3A6 6 0 0 1 10 4Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      />
    </svg>
  )
}

function RotatingSearchHint() {
  const suggestions = useMemo(() => ['a postcode', 'a bus stop', 'an area'], [])
  const [suggestionIdx, setSuggestionIdx] = useState(0)
  const [phase, setPhase] = useState('typing') // typing | pausing | deleting
  const [chars, setChars] = useState(0)

  useEffect(() => {
    const current = suggestions[suggestionIdx] || ''
    const typingDelayMs = 60
    const deletingDelayMs = 35
    const pauseMs = 900

    const id = window.setTimeout(() => {
      if (phase === 'typing') {
        const next = Math.min(current.length, chars + 1)
        setChars(next)
        if (next >= current.length) setPhase('pausing')
        return
      }

      if (phase === 'pausing') {
        setPhase('deleting')
        return
      }

      const next = Math.max(0, chars - 1)
      setChars(next)
      if (next <= 0) {
        setSuggestionIdx((i) => (i + 1) % suggestions.length)
        setPhase('typing')
      }
    }, phase === 'typing' ? typingDelayMs : phase === 'deleting' ? deletingDelayMs : pauseMs)

    return () => window.clearTimeout(id)
  }, [chars, phase, suggestionIdx, suggestions])

  const typed = (suggestions[suggestionIdx] || '').slice(0, chars)

  return (
    <span className="pbHint" aria-hidden="true">
      <span className="pbHintPrefix">Search for </span>
      <span className="pbHintTyped">{typed}</span>
      <span className="pbHintCaret" />
    </span>
  )
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const [searchValue, setSearchValue] = useState('')
  const [openMenu, setOpenMenu] = useState('')

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpenMenu('')
    }
    function onPointerDown(e) {
      if (!e.target?.closest?.('.pbMenu')) setOpenMenu('')
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  return (
    <header className="pbHeader">
      <div className="pbHeaderInner">
        <a className="pbLogo" href="/" aria-label="Home">
          <span className="pbLogoMark" aria-hidden="true" />
          <span className="pbLogoText">SHORE</span>
        </a>

        <nav className="pbNav" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0
            if (!hasChildren) {
              return (
                <a key={item.label} className="pbNavLink" href={item.href}>
                  <span>{item.label}</span>
                </a>
              )
            }

            const isOpen = openMenu === item.label
            return (
              <div
                key={item.label}
                className="pbMenu"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu('')}
              >
                <button
                  className="pbNavLink pbNavButton"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  onClick={() => setOpenMenu((s) => (s === item.label ? '' : item.label))}
                >
                  <span>{item.label}</span>
                  <ChevronDownIcon className="pbNavChevron" />
                </button>

                {isOpen && (
                  <div className="pbMenuPanel" role="menu" aria-label={`${item.label} menu`}>
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        className="pbMenuItem"
                        href={child.href}
                        role="menuitem"
                        onClick={() => setOpenMenu('')}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="pbActions">
          <label className="pbSearch" aria-label="Find a property">
            <SearchIcon className="pbSearchIcon" />
            {!searchValue && <RotatingSearchHint />}
            <input
              className="pbSearchInput"
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </label>

          {user?.firstName ? (
            <div className="pbWelcome" aria-label="Welcome message">
              <span className="pbWelcomeText">Welcome {user.firstName}</span>
              <button
                className="pbLogout"
                type="button"
                onClick={logout}
              >
                Log out
              </button>
            </div>
          ) : (
            <a className="pbLogin" href="/login">
              Log in
            </a>
          )}

          <a className="pbCta" href="/book-valuation">
            Book free house valuation
          </a>
        </div>
      </div>
    </header>
  )
}


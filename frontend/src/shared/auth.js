const STORAGE_KEY = 'shore.auth'

export function getFirstNameFromFullName(fullName) {
  const name = (fullName || '').trim()
  if (!name) return ''
  const first = name.split(/\s+/)[0] || ''
  if (!first) return ''
  return first[0].toUpperCase() + first.slice(1)
}

export function setAuthFromUser(user) {
  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.fullName ||
    user?.user_metadata?.name ||
    ''
  const firstName = getFirstNameFromFullName(fullName)
  const payload = { firstName, fullName }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  return payload
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEY)
}

export function getAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { firstName: '', fullName: '' }
    const parsed = JSON.parse(raw)
    return {
      firstName: typeof parsed.firstName === 'string' ? parsed.firstName : '',
      fullName: typeof parsed.fullName === 'string' ? parsed.fullName : '',
    }
  } catch {
    return { firstName: '', fullName: '' }
  }
}


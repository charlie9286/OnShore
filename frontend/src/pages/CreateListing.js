import { useEffect, useMemo, useState } from 'react'
import Navbar from '../shared/Navbar'
import { useAuth } from '../context/AuthContext'
import './createListing.css'

const DRAFT_KEY = 'shore.listingDraft.v1'

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

function saveDraft(draft) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
}

function formatGBP(value) {
  const num = Number(value)
  if (!Number.isFinite(num)) return ''
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(num)
}

export default function CreateListing() {
  const { user } = useAuth()
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [photos, setPhotos] = useState([])

  const [form, setForm] = useState(() => {
    const draft = loadDraft()
    return {
      title: draft?.title || '',
      listingType: draft?.listingType || 'sale',
      propertyType: draft?.propertyType || 'flat',
      bedrooms: draft?.bedrooms ?? 2,
      bathrooms: draft?.bathrooms ?? 1,
      price: draft?.price ?? '',
      postcode: draft?.postcode || '',
      area: draft?.area || '',
      addressLine1: draft?.addressLine1 || '',
      description: draft?.description || '',
    }
  })

  const pricePreview = useMemo(() => formatGBP(form.price), [form.price])

  useEffect(() => {
    setStatus({ type: 'idle', message: '' })
  }, [form.title, form.postcode, form.price, form.description])

  return (
    <div className="appShell">
      <Navbar />
      <main className="createMain">
        <div className="createWrap">
          <h1 className="createTitle">Create listing</h1>
          <p className="createSubtitle">
            {user?.firstName
              ? `Let’s create your listing, ${user.firstName}.`
              : `Let’s create your listing.`}{' '}
            We’ll connect this to the backend next.
          </p>

          <form
            className="createGrid"
            onSubmit={(e) => {
              e.preventDefault()
              setStatus({ type: 'loading', message: '' })

              const titleOk = form.title.trim().length >= 8
              const postcodeOk = form.postcode.trim().length >= 3
              const priceOk =
                form.listingType === 'rent'
                  ? Number(form.price) >= 100
                  : Number(form.price) >= 1000

              if (!titleOk) {
                setStatus({ type: 'error', message: 'Title should be at least 8 characters.' })
                return
              }
              if (!postcodeOk) {
                setStatus({ type: 'error', message: 'Please enter a valid postcode.' })
                return
              }
              if (!priceOk) {
                setStatus({
                  type: 'error',
                  message:
                    form.listingType === 'rent'
                      ? 'Rent should be at least £100.'
                      : 'Price should be at least £1,000.',
                })
                return
              }

              const draft = {
                ...form,
                updatedAt: new Date().toISOString(),
                photoCount: photos.length,
              }
              saveDraft(draft)
              setStatus({ type: 'success', message: 'Draft saved locally.' })
            }}
          >
            <section className="createCard">
              <header className="cardHeader">
                <h2 className="cardTitle">Basics</h2>
                <p className="cardHint">The essentials buyers/renters see first.</p>
              </header>

              <div className="row2">
                <label className="field">
                  <span className="fieldLabel">Listing type</span>
                  <select
                    className="fieldInput"
                    value={form.listingType}
                    onChange={(e) => setForm((s) => ({ ...s, listingType: e.target.value }))}
                  >
                    <option value="sale">For sale</option>
                    <option value="rent">To rent</option>
                  </select>
                </label>

                <label className="field">
                  <span className="fieldLabel">Property type</span>
                  <select
                    className="fieldInput"
                    value={form.propertyType}
                    onChange={(e) => setForm((s) => ({ ...s, propertyType: e.target.value }))}
                  >
                    <option value="flat">Flat</option>
                    <option value="house">House</option>
                    <option value="bungalow">Bungalow</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <label className="field">
                <span className="fieldLabel">Listing title</span>
                <input
                  className="fieldInput"
                  type="text"
                  placeholder="e.g. Modern 2-bed flat near Shoreditch High Street"
                  value={form.title}
                  onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                  required
                />
                <span className="fieldHelp">{Math.min(80, form.title.trim().length)}/80</span>
              </label>

              <div className="row3">
                <label className="field">
                  <span className="fieldLabel">Bedrooms</span>
                  <input
                    className="fieldInput"
                    type="number"
                    min="0"
                    max="20"
                    value={form.bedrooms}
                    onChange={(e) => setForm((s) => ({ ...s, bedrooms: Number(e.target.value) }))}
                  />
                </label>
                <label className="field">
                  <span className="fieldLabel">Bathrooms</span>
                  <input
                    className="fieldInput"
                    type="number"
                    min="0"
                    max="20"
                    value={form.bathrooms}
                    onChange={(e) => setForm((s) => ({ ...s, bathrooms: Number(e.target.value) }))}
                  />
                </label>
                <label className="field">
                  <span className="fieldLabel">
                    {form.listingType === 'rent' ? 'Rent (pcm)' : 'Price'}
                  </span>
                  <input
                    className="fieldInput"
                    type="number"
                    min="0"
                    step="1"
                    placeholder={form.listingType === 'rent' ? 'e.g. 2200' : 'e.g. 450000'}
                    value={form.price}
                    onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
                    required
                  />
                  <span className="fieldHelp">{pricePreview ? `Preview: ${pricePreview}` : ' '}</span>
                </label>
              </div>
            </section>

            <section className="createCard">
              <header className="cardHeader">
                <h2 className="cardTitle">Location</h2>
                <p className="cardHint">We’ll use this later for map + search.</p>
              </header>

              <div className="row2">
                <label className="field">
                  <span className="fieldLabel">Postcode</span>
                  <input
                    className="fieldInput"
                    type="text"
                    placeholder="e.g. E1 6AN"
                    value={form.postcode}
                    onChange={(e) => setForm((s) => ({ ...s, postcode: e.target.value }))}
                    required
                  />
                </label>

                <label className="field">
                  <span className="fieldLabel">Area (optional)</span>
                  <input
                    className="fieldInput"
                    type="text"
                    placeholder="e.g. Shoreditch"
                    value={form.area}
                    onChange={(e) => setForm((s) => ({ ...s, area: e.target.value }))}
                  />
                </label>
              </div>

              <label className="field">
                <span className="fieldLabel">Address line 1 (optional)</span>
                <input
                  className="fieldInput"
                  type="text"
                  placeholder="e.g. Flat 12, Shore House"
                  value={form.addressLine1}
                  onChange={(e) => setForm((s) => ({ ...s, addressLine1: e.target.value }))}
                />
              </label>
            </section>

            <section className="createCard">
              <header className="cardHeader">
                <h2 className="cardTitle">Description</h2>
                <p className="cardHint">Keep it short and clear.</p>
              </header>

              <label className="field">
                <span className="fieldLabel">Description</span>
                <textarea
                  className="fieldInput fieldTextarea"
                  rows={6}
                  placeholder="Highlight the best features, transport links, and what makes it special."
                  value={form.description}
                  onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                />
              </label>
            </section>

            <section className="createCard">
              <header className="cardHeader">
                <h2 className="cardTitle">Photos</h2>
                <p className="cardHint">Upload a few to start (stored locally for now).</p>
              </header>

              <label className="photoDrop">
                <input
                  className="photoInput"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    const next = files.slice(0, 12).map((f) => ({
                      name: f.name,
                      url: URL.createObjectURL(f),
                    }))
                    setPhotos(next)
                  }}
                />
                <span className="photoDropTitle">Choose photos</span>
                <span className="photoDropHint">Up to 12 images</span>
              </label>

              {photos.length > 0 && (
                <div className="photoGrid" aria-label="Photo previews">
                  {photos.map((p) => (
                    <div key={p.url} className="photoThumb">
                      <img className="photoImg" src={p.url} alt="" />
                      <span className="photoName">{p.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <aside className="createSidebar">
              <div className="sideCard">
                <h3 className="sideTitle">Next</h3>
                <p className="sideText">
                  We’ll connect this to the backend so “Save draft” stores your listing in Supabase
                  and you can publish it.
                </p>

                <button className="primaryBtn" type="submit">
                  {status.type === 'loading' ? 'Saving…' : 'Save draft'}
                </button>

                {status.type !== 'idle' && (
                  <p className={`formNotice ${status.type}`}>{status.message}</p>
                )}

                <button
                  className="secondaryBtn"
                  type="button"
                  onClick={() => {
                    localStorage.removeItem(DRAFT_KEY)
                    setPhotos([])
                    setForm({
                      title: '',
                      listingType: 'sale',
                      propertyType: 'flat',
                      bedrooms: 2,
                      bathrooms: 1,
                      price: '',
                      postcode: '',
                      area: '',
                      addressLine1: '',
                      description: '',
                    })
                    setStatus({ type: 'success', message: 'Draft cleared.' })
                  }}
                >
                  Clear draft
                </button>
              </div>
            </aside>
          </form>
        </div>
      </main>
    </div>
  )
}


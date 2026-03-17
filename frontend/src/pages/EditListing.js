import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import { useAuth } from '../context/AuthContext'
import './editListing.css'

function formatGBP(value) {
  const num = Number(value)
  if (!Number.isFinite(num)) return ''
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(num)
}

function loadLocalDraft() {
  try {
    const raw = localStorage.getItem('shore.listingDraft.v1')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

export default function EditListing() {
  const { id } = useParams()
  const { user } = useAuth()
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const [form, setForm] = useState(() => {
    const draft = loadLocalDraft()
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
      <main className="editMain">
        <div className="editWrap">
          <div className="editTop">
            <div>
              <h1 className="editTitle">Edit listing</h1>
              <p className="editSubtitle">
                {user?.firstName ? `Hi ${user.firstName} — ` : ''}
                editing listing <span className="mono">{id}</span>.
              </p>
            </div>
            <Link className="secondaryBtn editBack" to="/dashboard">
              Back to dashboard
            </Link>
          </div>

          <form
            className="editGrid"
            onSubmit={(e) => {
              e.preventDefault()
              setStatus({ type: 'success', message: 'Saved (local only for now).' })
              localStorage.setItem(
                'shore.listingDraft.v1',
                JSON.stringify({ ...form, updatedAt: new Date().toISOString() }),
              )
            }}
          >
            <section className="editCard">
              <header className="cardHeader">
                <h2 className="cardTitle">Basics</h2>
                <p className="cardHint">Update the core details.</p>
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
                  value={form.title}
                  onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                  required
                />
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
                    value={form.price}
                    onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
                    required
                  />
                  <span className="fieldHelp">{pricePreview ? `Preview: ${pricePreview}` : ' '}</span>
                </label>
              </div>
            </section>

            <section className="editCard">
              <header className="cardHeader">
                <h2 className="cardTitle">Location</h2>
                <p className="cardHint">This will power search + maps.</p>
              </header>

              <div className="row2">
                <label className="field">
                  <span className="fieldLabel">Postcode</span>
                  <input
                    className="fieldInput"
                    type="text"
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
                  value={form.addressLine1}
                  onChange={(e) => setForm((s) => ({ ...s, addressLine1: e.target.value }))}
                />
              </label>
            </section>

            <section className="editCard">
              <header className="cardHeader">
                <h2 className="cardTitle">Description</h2>
                <p className="cardHint">Keep it concise.</p>
              </header>

              <label className="field">
                <span className="fieldLabel">Description</span>
                <textarea
                  className="fieldInput fieldTextarea"
                  rows={6}
                  value={form.description}
                  onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                />
              </label>
            </section>

            <aside className="editSidebar">
              <div className="sideCard">
                <h3 className="sideTitle">Save</h3>
                <p className="sideText">
                  Next we’ll load/save real listings by ID from Supabase.
                </p>

                <button className="primaryBtn" type="submit">
                  Save changes
                </button>

                {status.type !== 'idle' && (
                  <p className={`formNotice ${status.type}`}>{status.message}</p>
                )}
              </div>
            </aside>
          </form>
        </div>
      </main>
    </div>
  )
}


import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../shared/Navbar'
import './login.css'
import { useAuth } from '../context/AuthContext'

function Modal({ title, open, onClose, children }) {
  const titleId = useId()
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const el = dialogRef.current
    if (!el) return
    const previouslyFocused = document.activeElement
    el.focus()
    return () => {
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modalOverlay" role="presentation" onMouseDown={onClose}>
      <div
        className="modalDialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modalHeader">
          <h2 className="modalTitle" id={titleId}>
            {title}
          </h2>
          <button className="modalClose" type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const { login, register, loading } = useAuth()
  const [createOpen, setCreateOpen] = useState(false)
  const [loginStatus, setLoginStatus] = useState({ type: 'idle', message: '' })
  const [createStatus, setCreateStatus] = useState({ type: 'idle', message: '' })
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [createForm, setCreateForm] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  return (
    <div className="appShell">
      <Navbar />
      <main className="loginMain">
        <div className="loginWrap">
          <div className="loginCard">
            <h1 className="loginTitle">Log in</h1>
            <p className="loginSubtitle">Welcome back to Shore.</p>

            <form
              className="loginForm"
              onSubmit={async (e) => {
                e.preventDefault()
                setLoginStatus({ type: 'loading', message: '' })
                try {
                  await login(loginForm.email, loginForm.password)
                  setLoginStatus({ type: 'success', message: 'Logged in.' })
                  navigate('/', { replace: true })
                } catch (err) {
                  setLoginStatus({
                    type: 'error',
                    message: err?.message || 'Login failed.',
                  })
                }
              }}
            >
              <label className="field">
                <span className="fieldLabel">Email</span>
                <input
                  className="fieldInput"
                  type="email"
                  autoComplete="email"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm((s) => ({ ...s, email: e.target.value }))
                  }
                  required
                />
              </label>

              <label className="field">
                <span className="fieldLabel">Password</span>
                <input
                  className="fieldInput"
                  type="password"
                  autoComplete="current-password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm((s) => ({ ...s, password: e.target.value }))
                  }
                  required
                />
              </label>

              <button className="primaryBtn" type="submit">
                {loginStatus.type === 'loading' || loading ? 'Logging in…' : 'Log in'}
              </button>

              {loginStatus.type !== 'idle' && (
                <p className={`formNotice ${loginStatus.type}`}>
                  {loginStatus.message}
                </p>
              )}

              <div className="loginDivider" role="separator" aria-label="or" />

              <button
                className="secondaryBtn"
                type="button"
                onClick={() => {
                  setCreateStatus({ type: 'idle', message: '' })
                  setCreateOpen(true)
                }}
              >
                Create account
              </button>
            </form>
          </div>
        </div>
      </main>

      <Modal
        title="Create your Shore account"
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      >
        <form
          className="createForm"
          onSubmit={async (e) => {
            e.preventDefault()
            setCreateStatus({ type: 'loading', message: '' })
            try {
              await register(createForm.fullName, createForm.email, createForm.password)
              setCreateStatus({
                type: 'success',
                message:
                  'Account created. If email confirmation is enabled, check your inbox.',
              })
              setTimeout(() => setCreateOpen(false), 600)
            } catch (err) {
              setCreateStatus({
                type: 'error',
                message: err?.message || 'Signup failed.',
              })
            }
          }}
        >
          <label className="field">
            <span className="fieldLabel">Full name</span>
            <input
              className="fieldInput"
              type="text"
              autoComplete="name"
              value={createForm.fullName}
              onChange={(e) =>
                setCreateForm((s) => ({ ...s, fullName: e.target.value }))
              }
            />
          </label>

          <label className="field">
            <span className="fieldLabel">Email</span>
            <input
              className="fieldInput"
              type="email"
              autoComplete="email"
              value={createForm.email}
              onChange={(e) =>
                setCreateForm((s) => ({ ...s, email: e.target.value }))
              }
              required
            />
          </label>

          <label className="field">
            <span className="fieldLabel">Password</span>
            <input
              className="fieldInput"
              type="password"
              autoComplete="new-password"
              value={createForm.password}
              onChange={(e) =>
                setCreateForm((s) => ({ ...s, password: e.target.value }))
              }
              required
            />
          </label>

          <button className="primaryBtn" type="submit">
            {createStatus.type === 'loading' || loading ? 'Creating…' : 'Create account'}
          </button>

          {createStatus.type !== 'idle' && (
            <p className={`formNotice ${createStatus.type}`}>
              {createStatus.message}
            </p>
          )}
        </form>
      </Modal>
    </div>
  )
}


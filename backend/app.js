import cors from 'cors'
import express from 'express'
import { createClient } from '@supabase/supabase-js'

const {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  // Comma-separated list of allowed origins, or "*" to allow all.
  FRONTEND_ORIGIN = 'http://localhost:3000',
} = process.env

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = String(FRONTEND_ORIGIN)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)

      if (allowed.includes('*')) return callback(null, true)
      if (!origin) return callback(null, true)
      if (allowed.includes(origin)) return callback(null, true)
      return callback(new Error(`CORS blocked for origin: ${origin}`))
    },
    credentials: true,
  }),
)

function getSupabaseOrRespond(res) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    res.status(500).json({
      error:
        'Server misconfigured: missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.',
    })
    return null
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

app.get('/health', (_req, res) => res.json({ ok: true }))

app.post('/auth/signup', async (req, res) => {
  const supabase = getSupabaseOrRespond(res)
  if (!supabase) return

  const { email, password, fullName } = req.body ?? {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: fullName ? { data: { full_name: fullName } } : undefined,
  })

  if (error) return res.status(400).json({ error: error.message })

  return res.json({
    user: data.user ?? null,
    session: data.session ?? null,
  })
})

app.post('/auth/login', async (req, res) => {
  const supabase = getSupabaseOrRespond(res)
  if (!supabase) return

  const { email, password } = req.body ?? {}
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return res.status(401).json({ error: error.message })

  return res.json({
    user: data.user ?? null,
    session: data.session ?? null,
  })
})

export default app


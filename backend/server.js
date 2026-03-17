import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { createClient } from '@supabase/supabase-js'

const {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  FRONTEND_ORIGIN = 'http://localhost:3000',
  PORT = 5050,
} = process.env

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in backend env.')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  }),
)

app.get('/health', (_req, res) => res.json({ ok: true }))

app.post('/auth/signup', async (req, res) => {
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

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Shore backend listening on http://localhost:${PORT}`)
})


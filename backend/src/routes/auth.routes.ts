import { Router } from 'express'

export const authRouter = Router()

authRouter.post('/login', (_req, res) => {
  res.status(501).json({ ok: false, message: 'Not implemented' })
})

authRouter.post('/register', (_req, res) => {
  res.status(501).json({ ok: false, message: 'Not implemented' })
})


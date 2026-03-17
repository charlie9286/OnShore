import { Router } from 'express'

export const userRouter = Router()

userRouter.get('/me', (_req, res) => {
  res.status(501).json({ ok: false, message: 'Not implemented' })
})


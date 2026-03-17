import cors from 'cors'
import express from 'express'
import { authRouter } from './routes/auth.routes.js'
import { propertyRouter } from './routes/property.routes.js'
import { userRouter } from './routes/user.routes.js'

export function createApp() {
  const app = express()

  app.use(express.json())

  const clientOrigin = process.env.CLIENT_ORIGIN
  app.use(
    cors({
      origin: clientOrigin ? [clientOrigin] : true,
      credentials: true,
    }),
  )

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'backend' })
  })

  app.use('/api/auth', authRouter)
  app.use('/api/properties', propertyRouter)
  app.use('/api/users', userRouter)

  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      const message = err instanceof Error ? err.message : 'Unknown error'
      res.status(500).json({ ok: false, message })
    },
  )

  return app
}


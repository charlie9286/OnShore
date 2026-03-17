import dotenv from 'dotenv'
import { createApp } from './app.js'

dotenv.config()

const app = createApp()

const port = Number(process.env.PORT ?? 5000)
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`)
})


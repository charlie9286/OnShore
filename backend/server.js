import 'dotenv/config'
import app from './app.js'

const { PORT = 5050 } = process.env

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Shore backend listening on http://localhost:${PORT}`)
})


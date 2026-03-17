import axios from 'axios'

const PROD_API_FALLBACK = 'https://onshore-6lq6.onrender.com'
const DEV_API_FALLBACK = 'http://localhost:5000'

const baseURL =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD ? PROD_API_FALLBACK : DEV_API_FALLBACK)

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})


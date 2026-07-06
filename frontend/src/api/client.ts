import axios from 'axios'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Normalize error shape so callers/hooks can rely on `message`
    const message =
      error?.response?.data?.message ?? error?.message ?? 'Something went wrong. Please try again.'
    return Promise.reject(new Error(message))
  },
)

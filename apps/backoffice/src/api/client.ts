import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const TOKEN_KEY = 'bloom-backoffice-token'

/**
 * Configured Axios HTTP client instance.
 * Automatically injects authorization token and intercepts errors.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Inject Bearer token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response Interceptor: Normalize errors & handle 401s
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status

    if (status === 401) {
      // Clear token on 401 unauthorized
      localStorage.removeItem(TOKEN_KEY)
      // Future token refresh or redirect logic placeholder
    }

    // Extract standardized error message
    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      'An unexpected error occurred.'

    return Promise.reject(new Error(message))
  }
)

export default apiClient

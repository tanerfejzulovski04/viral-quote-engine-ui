import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '../store/auth'

// Define API response types
export interface ApiSuccessResponse<T = any> {
  data: T
}

export interface ApiErrorResponse {
  error: {
    message: string
  }
}

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to attach auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { token } = useAuthStore.getState()
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to unwrap data and normalize errors
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiSuccessResponse>) => {
    // Unwrap the data from the success envelope
    return response.data.data
  },
  (error) => {
    // Normalize error structure
    let normalizedError = {
      error: {
        message: 'An unexpected error occurred'
      }
    }

    if (error.response) {
      // Server responded with error status
      if (error.response.data?.error?.message) {
        normalizedError.error.message = error.response.data.error.message
      } else if (error.response.data?.message) {
        normalizedError.error.message = error.response.data.message
      } else if (error.message) {
        normalizedError.error.message = error.message
      }
    } else if (error.request) {
      // Network error
      normalizedError.error.message = 'Network error. Please check your connection.'
    } else {
      // Other error
      normalizedError.error.message = error.message || 'An unexpected error occurred'
    }

    return Promise.reject(normalizedError)
  }
)

export default apiClient
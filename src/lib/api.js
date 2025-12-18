import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:2115'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      return Promise.reject(error.response.data)
    } else if (error.request) {
      // No response from server
      return Promise.reject({
        response_code: '503',
        response_message: 'Service unavailable. Please check your connection.',
        error: 'No response from server',
      })
    } else {
      // Request setup error
      return Promise.reject({
        response_code: '500',
        response_message: 'An unexpected error occurred',
        error: error.message,
      })
    }
  }
)

export const inquiryAPI = {
  // Inquiry balance by account number
  inquiryBalance: async (accountNumber) => {
    try {
      const response = await apiClient.post('/api/v1/inquiry', {
        account: accountNumber,
      })
      return response.data
    } catch (error) {
      throw error
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/api/v1/health')
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default apiClient

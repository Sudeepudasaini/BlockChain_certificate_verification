import axios from 'axios'

const base = import.meta.env.VITE_API_BASE || '/api'

const api = axios.create({
  baseURL: base,
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('certchain_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const skip = error.config && error.config.skipAuthRedirect
    if (error.response?.status === 401 && !skip) {
      localStorage.removeItem('certchain_token')
      localStorage.removeItem('certchain_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

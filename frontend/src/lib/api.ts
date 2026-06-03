import axios from 'axios'

const api = axios.create({
  // `||` (et non `??`) pour que VITE_API_URL vide ('') retombe aussi sur '/api'
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Automatically attach stored token
const token = localStorage.getItem('af_token')
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// On 401 clear token (expired)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('af_token')
      window.location.href = '/connexion'
    }
    return Promise.reject(err)
  }
)

export default api

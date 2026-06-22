import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import './admin.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
        role: 'admin'
      })
      const { user: loggedUser, token } = response.data
      login(loggedUser, token)
      toast.success('Login successful!')
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page min-h-screen flex items-center justify-center" style={{ background: '#0b1220' }}>
      <div className="admin-card w-full max-w-md p-8 rounded-xl shadow-lg" style={{ background: '#0f1b2b', border: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="flex flex-col items-center mb-6 admin-header">
          <div className="admin-avatar w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 5v6c0 5 3.8 9.7 9 11 5.2-1.3 9-6 9-11V5l-9-3z" stroke="#7c5cff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.5 11c0-1.3807 1.1193-2.5 2.5-2.5s2.5 1.1193 2.5 2.5" stroke="#7c5cff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-white text-2xl font-semibold mt-4">CertChain Admin</h1>
          <p className="text-white text-sm mt-1">System Administration Panel</p>
        </div>

        <div className="mb-6 p-4 rounded-md admin-warning" style={{ background: '#102232', border: '1px solid #59491f' }}>
          <div className="flex items-start gap-3">
            <div className="text-yellow-300 mt-0.5">⚠️</div>
            <div className="text-sm text-yellow-200">Authorized personnel only. All access is logged and monitored.</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-md bg-[#0b1622] text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="enter admin email"
            required
          />

          <label className="block text-sm text-gray-300 mb-2">Password</label>
          <div className="relative mb-6">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-[#0b1622] text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="●●●●●●●●"
                required
              />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10 10 0 0 1 6.06 6.06"/><path d="M1 1l22 22"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="admin-btn w-full py-3 rounded-md flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(90deg,#6c5cff,#5b3bff)', color: 'white' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            {loading ? 'Signing in...' : 'Admin Sign In'}
          </button>
        </form>

        <div className="text-center text-xs text-gray-400 mt-6">CertChain v1.0 — Secure Academic Verification</div>
      </div>
    </div>
  )
}

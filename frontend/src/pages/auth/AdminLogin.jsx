import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../../components/ThemeToggle'

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
      toast.success('Admin login successful!')
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error('Invalid admin credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Shield Icon */}
      <div className="w-20 h-20 bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#818cf8"
          strokeWidth="2"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>

      <p className="text-white text-2xl font-bold text-center">CertChain Admin</p>
      <p className="text-gray-400 text-sm text-center mb-8">System Administration Panel</p>

      {/* Card */}
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl">
        {/* Warning Banner */}
        <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-3 mb-6 flex gap-2">
          <span className="text-lg">⚠️</span>
          <p className="text-amber-400 text-xs">
            Authorized personnel only. All access is logged and monitored.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2.5 bg-gray-700 border border-gray-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@certchain.edu"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-3 py-2.5 bg-gray-700 border border-gray-600 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3"
          >
            {loading ? 'Authenticating...' : 'Admin Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          CertChain v1.0 — Secure Academic Verification
        </p>
      </div>
    </div>
  )
}

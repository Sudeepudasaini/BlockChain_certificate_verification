import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

export default function UniversityLogin() {
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
        role: 'university'
      })
      const { user: loggedUser, token } = response.data
      login(loggedUser, token)
      toast.success('Login successful!')
      navigate('/university/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12"
        style={{ background: 'linear-gradient(135deg, #1E3A5F, #4338CA)' }}
      >
        {/* Building Icon */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="6" y="20" width="36" height="24" rx="2" stroke="white" strokeWidth="2" />
          <rect x="18" y="8" width="12" height="12" rx="1" stroke="white" strokeWidth="2" />
          <rect x="10" y="26" width="6" height="8" rx="1" stroke="white" strokeWidth="1.5" />
          <rect x="32" y="26" width="6" height="8" rx="1" stroke="white" strokeWidth="1.5" />
          <rect x="21" y="30" width="6" height="14" stroke="white" strokeWidth="1.5" />
        </svg>

        <h1 className="text-white text-3xl font-bold mt-6">University Portal</h1>
        <p className="text-white/70 text-sm mt-2">
          Issue and manage student certificates on the blockchain
        </p>

        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>🏛️</span>
            <span>Issue Blockchain Certificates</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>📊</span>
            <span>Manage Student Records</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>🔗</span>
            <span>Immutable Certificate Hashes</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>📈</span>
            <span>Dashboard Analytics</span>
          </div>
        </div>

        <p className="text-white/50 text-xs mt-8">
          Don't have an account? Contact your system administrator.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 bg-white dark:bg-gray-800 relative">
        

        <Link
          to="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 inline-block"
        >
          ← Back to Home
        </Link>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">University Login</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
          Authorized institutions only
        </p>

        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 mb-6 flex gap-2 items-start">
          <span className="text-lg">ℹ️</span>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            University accounts are managed by system administrators. Contact admin if you need access.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
                required
              />
          </div>

          {/* Password */}
          <div>
            <label className="form-label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
            {loading ? 'Signing in...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <Link
          to="/login"
          className="block text-center text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mt-4"
        >
          Need help? Contact Admin
        </Link>
      </div>
    </div>
  )
}

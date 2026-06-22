import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

export default function VerifierLogin() {
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
        role: 'verifier'
      })
      const { user: loggedUser, token } = response.data
      login(loggedUser, token)
      toast.success('Login successful!')
      navigate('/verifier/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 bg-gradient-to-br from-emerald-800 to-teal-900">
        {/* Magnifier Icon */}
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="20" cy="20" r="12" stroke="white" strokeWidth="2" />
          <line x1="29" y1="29" x2="42" y2="42" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        <h1 className="text-white text-3xl font-bold mt-6">Verifier Portal</h1>
        <p className="text-white/70 text-sm mt-2">
          Authenticate and verify academic credentials instantly
        </p>

        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>🔍</span>
            <span>Upload & Verify Certificates</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>⛓️</span>
            <span>Blockchain Hash Verification</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>📋</span>
            <span>Verification History</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>✅</span>
            <span>Instant Authentic Results</span>
          </div>
        </div>

        <p className="text-white/50 text-xs mt-8">
          Verifier accounts are assigned by administrators.
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 bg-white dark:bg-gray-800 relative">
        

        <Link
          to="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8 inline-block"
        >
          ← Back to Home
        </Link>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verifier Login</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
          Credential verification specialists
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 text-sm"
          >
            {loading ? 'Signing in...' : 'Sign In to Verifier Portal'}
          </button>
        </form>
      </div>
    </div>
  )
}

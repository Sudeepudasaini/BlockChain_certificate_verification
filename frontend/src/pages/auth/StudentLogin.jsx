import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

export default function StudentLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
        role: 'student'
      })
      const { user: loggedUser, token } = response.data
      login(loggedUser, token)
      toast.success('Login successful!')
      navigate('/student/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-700 to-blue-900 flex-col justify-center p-12">
        <div className="text-white text-2xl font-bold">CertChain</div>
        <h1 className="text-3xl font-bold text-white mt-8">Student Portal</h1>
        <p className="text-white/70 mt-3 text-sm">
          Access your academic certificates and career guidance
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>🎓</span>
            <span>View & Download Certificates</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>🔗</span>
            <span>Blockchain Verified Credentials</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span>🧭</span>
            <span>AI Career Counseling</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 bg-white dark:bg-gray-800 relative">
        

        <Link
          to="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 mb-8 inline-flex items-center gap-1"
        >
          ← Back to Home
        </Link>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Login</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
          Sign in to your student account
        </p>

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

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                className="rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <Link
              to="/student/forgot-password"
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Sign Up / Divider */}
        <div className="mt-6 space-y-3 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Don't have an account?</p>
          <Link to="/student/register" className="btn-outline w-full py-3 block">
            Create Student Account
          </Link>

          {/* Removed the 'or' divider and university/verifier login link per request */}
        </div>
      </div>
    </div>
  )
}

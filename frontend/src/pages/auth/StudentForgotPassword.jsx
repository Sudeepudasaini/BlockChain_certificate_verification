import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function StudentForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axios.post('/api/auth/forgot-password', { email })
    } catch (err) {
      // Intentionally silent — don't reveal if email exists
    } finally {
      setSubmitted(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 relative">
      

      <div className="card p-8 text-center max-w-md w-full">
        {submitted ? (
          <div className="py-4">
            {/* Green Check SVG */}
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white mt-3">
              Check your email!
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              If an account exists, reset instructions have been sent.
            </p>
          </div>
        ) : (
          <>
            {/* Lock Icon */}
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
              Forgot Password?
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6">
              Enter your email and we'll send reset instructions
            </p>

            <div className="space-y-4">
              <div>
                <label className="form-label text-left block">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase().trim())}
                    required
                  />
              </div>

              <button
                type="button"
                disabled={loading}
                className="btn-primary w-full"
                onClick={handleSubmit}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </>
        )}

        <Link
          to="/student/login"
          className="block text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mt-6"
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  )
}

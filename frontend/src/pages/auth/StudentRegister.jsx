import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function StudentRegister() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Password strength calculation
  const passwordScore = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password)
  ].filter(Boolean).length

  const strengthMap = {
    0: { label: '', w: '0%', color: '' },
    1: { label: 'Weak', w: '25%', color: 'bg-red-500' },
    2: { label: 'Fair', w: '50%', color: 'bg-orange-500' },
    3: { label: 'Good', w: '75%', color: 'bg-blue-500' },
    4: { label: 'Strong', w: '100%', color: 'bg-green-500' }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Fill all required fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Invalid email')
      return
    }

    if (password.length < 8) {
      toast.error('Password must be 8+ characters')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!terms) {
      toast.error('Please accept the terms')
      return
    }

    // Phone validation: if provided, must be exactly 10 digits
    if (phone && !/^\d{10}$/.test(phone)) {
      toast.error('Phone number must be exactly 10 digits')
      return
    }

    setLoading(true)
    try {
      await axios.post('/api/auth/register', {
        name,
        email,
        password,
        phone,
        role: 'student'
      })
      toast.success('Account created! Please log in.')
      navigate('/student/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-700 to-blue-900 flex-col justify-center p-12">
        <div className="text-white text-2xl font-bold">CertChain</div>
        <h1 className="text-3xl font-bold text-white mt-8">Join CertChain</h1>
        <p className="text-white/70 mt-3 text-sm">
          Register to manage your academic credentials securely on the blockchain
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <span>Secure blockchain certificate storage</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <span>One-click certificate sharing</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <span>AI-powered career counseling</span>
          </div>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <svg className="w-5 h-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <span>Verified by your institution</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 bg-white dark:bg-gray-800 relative overflow-y-auto">
        

        <Link
          to="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1"
        >
          ← Back to Home
        </Link>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">Create Account</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
          Join thousands of students on CertChain
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-6">
          {/* Full Name */}
          <div className="col-span-2">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="col-span-2">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Student ID removed from student registration */}

          {/* Phone */}
          <div className="col-span-1">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-input"
              inputMode="numeric"
              maxLength={10}
              pattern="\d{10}"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            />
          </div>

          {/* Password */}
          <div className="col-span-1">
            <label className="form-label">Password *</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setShowPass(!showPass)}
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
            {/* Password Strength */}
            <div className="mt-2">
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${strengthMap[passwordScore].color}`}
                  style={{ width: strengthMap[passwordScore].w }}
                ></div>
              </div>
              {password && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {strengthMap[passwordScore].label}
                </p>
              )}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="col-span-1">
            <label className="form-label">Confirm Password *</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                className="form-input pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setShowConfirm(!showConfirm)}
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

          {/* Terms */}
          <div className="col-span-2">
            <label className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 btn-primary py-3"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/student/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

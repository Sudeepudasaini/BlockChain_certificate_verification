import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState('student')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await api.post('/auth/login', {
        ...formData,
        role: selectedRole,
      })

      const { user, token } = response.data
      login(user, token)
      toast.success('Logged in successfully!')

      const routeMap = {
        admin: '/admin/dashboard',
        university: '/university/dashboard',
        student: '/student/dashboard',
        verifier: '/verifier/dashboard',
      }

      navigate(routeMap[selectedRole] || '/')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const roles = [
    { value: 'university', label: 'University', emoji: '🏢' },
    { value: 'student', label: 'Student', emoji: '🎓' },
    { value: 'verifier', label: 'Verifier', emoji: '✓' },
    { value: 'admin', label: 'Admin', emoji: '👨‍💼' },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 flex h-screen">
        {/* Left Panel */}
        <div className="hidden md:flex md:w-1/2 gradient-bg text-white p-12 flex-col justify-center">
          <h2 className="text-4xl font-bold mb-8">Welcome to CertChain</h2>
          <p className="text-lg mb-12 opacity-90">
            Secure, verifiable, and tamper-proof academic certificate system powered by blockchain technology.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="text-3xl">🔐</span>
              <div>
                <h4 className="font-bold mb-1">Cryptographic Security</h4>
                <p className="opacity-80 text-sm">SHA-256 hashing ensures complete data integrity</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">⛓️</span>
              <div>
                <h4 className="font-bold mb-1">Blockchain Verified</h4>
                <p className="opacity-80 text-sm">All certificates stored on Ethereum</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">⚡</span>
              <div>
                <h4 className="font-bold mb-1">Instant Verification</h4>
                <p className="opacity-80 text-sm">Verify certificates in less than 2 seconds</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-3xl font-bold text-blue-dark mb-8">Welcome Back</h1>

            {/* Role Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">Select Your Role</label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => setSelectedRole(role.value)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      selectedRole === role.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{role.emoji}</span>
                    <span className="text-sm font-medium">{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In Securely'}
              </button>
            </form>

            {/* Links */}
            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <a href="#" className="text-primary-600 font-semibold hover:underline">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

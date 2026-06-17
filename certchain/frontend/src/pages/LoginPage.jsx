import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      const routeMap = {
        admin: '/admin/dashboard',
        university: '/university/dashboard',
        student: '/student/dashboard',
        verifier: '/verifier/dashboard',
      }
      navigate(routeMap[user.role] || '/')
    }
  }, [isAuthenticated, user, navigate])

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
      const response = await api.post('/auth/login', formData)
      const { user: loggedUser, token } = response.data
      login(loggedUser, token)
      toast.success('Logged in successfully!')

      const routeMap = {
        admin: '/admin/dashboard',
        university: '/university/dashboard',
        student: '/student/dashboard',
        verifier: '/verifier/dashboard',
      }

      navigate(routeMap[loggedUser.role] || '/')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 flex h-screen">
        <div className="hidden md:flex md:w-1/2 gradient-bg text-white p-12 flex-col justify-center">
          <h2 className="text-4xl font-bold mb-8">Secure Academic Credentials</h2>
          <p className="text-lg mb-12 opacity-90">
            Sign in to manage certificates, issue academic credentials, and verify authenticity on the blockchain.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <span className="text-3xl">🔐</span>
              <div>
                <h4 className="font-bold mb-1">Secure Login</h4>
                <p className="opacity-80 text-sm">JWT authentication with role-based access.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">⛓️</span>
              <div>
                <h4 className="font-bold mb-1">Blockchain Backed</h4>
                <p className="opacity-80 text-sm">All certificates are hashed and stored immutably.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">⚡</span>
              <div>
                <h4 className="font-bold mb-1">Fast Verification</h4>
                <p className="opacity-80 text-sm">Verify certificates instantly from any device.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-3xl font-bold text-blue-dark mb-8">Sign in to CertChain</h1>
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
                {loading ? 'Signing in...' : 'Sign in securely'}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Don’t have an account?{' '}
              <Link to="/register" className="text-primary-600 font-semibold hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage

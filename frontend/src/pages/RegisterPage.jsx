import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    universityName: '',
    studentId: '',
    website: '',
    address: '',
    description: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        universityName: formData.universityName,
        studentId: formData.studentId,
        website: formData.website,
        address: formData.address,
        description: formData.description,
      })

      const { user, token } = response.data
      login(user, token)
      toast.success('Registration successful')

      const routeMap = {
        admin: '/admin/dashboard',
        university: '/university/dashboard',
        student: '/student/dashboard',
        verifier: '/verifier/dashboard',
      }

      navigate(routeMap[user.role] || '/')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="app-container">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div className="card-base gradient-bg text-white p-8 lg:p-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Create your CertChain account</h2>
              <p className="text-sm sm:text-base opacity-95 leading-relaxed">
                Register as an Admin, University, Student, or Verifier. Your details are securely hashed and stored with role-based access.
              </p>
            </div>

            <div className="card-base p-6 lg:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Register</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-base"
                    placeholder="John Doe"
                    required
                  />
                </div>
              
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-base"
                    placeholder="example@email.com"
                    required
                  />
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
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
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Confirm password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-base"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="input-base"
                    required
                  >
                    <option value="student">Student</option>
                    <option value="university">University</option>
                    <option value="verifier">Verifier</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {formData.role === 'university' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">University name</label>
                    <input
                      name="universityName"
                      value={formData.universityName}
                      onChange={handleChange}
                      className="input-base"
                      placeholder="Tribhuvan University"
                      required
                    />
                  </div>
                )}

                {formData.role === 'student' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Student ID</label>
                    <input
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className="input-base"
                      placeholder="STU-2024-001"
                    />
                  </div>
                )}

                {formData.role === 'university' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
                      <input
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="input-base"
                        placeholder="https://university.example"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                      <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input-base"
                        placeholder="Kathmandu, Nepal"
                      />
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="btn-primary w-full disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </form>

              <p className="text-center text-slate-600 mt-6">
                Already registered?{' '}
                <Link to="/login" className="text-primary-600 font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage

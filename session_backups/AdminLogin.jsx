import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

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
    <div className="min-h-screen admin-page-bg flex flex-col items-center justify-start pt-16 pb-12 px-6">
      <style>{`
        /* Inputs and labels */
        .admin-input::placeholder { color: #9FB0BF !important; opacity: 1 !important; }
        .admin-input { color: #E6EEF6 !important; }
        .admin-label { color: #B7C7D6 !important; font-weight: 600; }

        /* Page and card tweaks for visual parity with the screenshot */
        .admin-page-bg { background: #0b1220; }
        .admin-card {
          background: linear-gradient(180deg, #0f1724 0%, #0f1724 100%);
          border: 1px solid rgba(255,255,255,0.04);
          box-shadow: 0 12px 30px rgba(2,6,23,0.28);
          border-radius: 16px;
        }

        /* Warning box */
        .admin-warning { background: rgba(217,119,6,0.06); border: 1px solid #d97706; border-radius: 10px; }

        /* Button styles to match the purple gradient and clearer text */
        .admin-submit {
          background: linear-gradient(90deg,#5b21b6 0%,#7c3aed 100%);
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(92,33,182,0.15);
        }

        /* Small text footer */
        .admin-footer { color: #9FB0BF; opacity: 0.9; }
      `}</style>

      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-[#0f1724] rounded-full flex items-center justify-center mb-5" style={{boxShadow:'0 6px 20px rgba(139,92,246,0.06)'}}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold" style={{color: '#FFFFFF', letterSpacing: '-0.2px'}}>CertChain Admin</h2>
        <p className="text-sm mt-1" style={{color: '#9FB0BF'}}>System Administration Panel</p>
      </div>

      <div className="w-full max-w-md rounded-2xl p-10" style={{background: '#0f1724', border: '1px solid rgba(255,255,255,0.04)', boxShadow: '0 12px 30px rgba(2,6,23,0.28)'}}>
        <div className="w-full max-w-md p-10 admin-card" style={{borderRadius: '16px'}}>
          <div className="rounded-lg p-3 mb-6 flex items-start gap-3 admin-warning">
            <div className="text-2xl" style={{lineHeight:1}}>⚠️</div>
            <div>
              <p className="text-sm font-semibold" style={{color: '#FFB84D'}}>Authorized personnel only.</p>
              <p className="text-xs mt-1" style={{color: '#FFD99A'}}>All access is logged and monitored.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{color:'#B7C7D6'}}>Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:'#93A6B5'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8.5v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M19 7l-7 5-7-5" />
                  </svg>
                </span>
                <input
                  type="email"
                  className="admin-input w-full pl-11 pr-3 rounded-xl focus:outline-none text-sm"
                  style={{background:'#0b1220', border: '1px solid rgba(255,255,255,0.05)', paddingLeft: '2.75rem', height: '44px'}}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@certchain.edu"
                />
              </div>
            </div>

            <div>
              <label className="admin-label block text-sm mb-2">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:'#93A6B5'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="admin-input w-full pl-11 pr-11 rounded-xl focus:outline-none text-sm"
                  style={{background:'#0b1220', border: '1px solid rgba(255,255,255,0.05)', paddingLeft: '2.75rem', height: '44px'}}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 font-semibold rounded-2xl py-3 px-4 admin-submit"
              style={{borderRadius: '12px'}}
            >
              {loading ? (
                'Authenticating...'
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-90">
                    <path d="M12 11c.828 0 1.5.672 1.5 1.5S12.828 14 12 14s-1.5-.672-1.5-1.5S11.172 11 12 11z" />
                    <path d="M17 8V7a5 5 0 0 0-10 0v1" />
                  </svg>
                  <span>Admin Sign In</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-6">CertChain v1.0 — Secure Academic Verification</p>
        </div>
      </div>
    </div>
  )
}

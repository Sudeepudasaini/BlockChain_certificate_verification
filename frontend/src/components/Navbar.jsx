import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)

  useEffect(() => {
    if (!showLoginDropdown) return
    const close = () => setShowLoginDropdown(false)
    document.addEventListener('click', close, true)
    return () => document.removeEventListener('click', close, true)
  }, [showLoginDropdown])

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-100 shadow-sm z-50">
      <div className="app-container">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⛓️</span>
            </div>
            <span className="font-bold text-xl text-primary-700">CertChain</span>
          </Link>

          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/" className="px-3 py-2 text-gray-700 hover:text-primary-600 transition-all text-sm">Home</Link>
              <Link to="/verify" className="px-3 py-2 text-gray-700 hover:text-primary-600 transition-all text-sm">Verify</Link>
              <a href="#features" className="px-3 py-2 text-gray-700 hover:text-primary-600 transition-all text-sm">About</a>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center mr-2">
              <ThemeToggle />
            </div>
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center gap-3">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-semibold rounded-full">
                    {user?.role}
                  </span>
                  <button
                    onClick={logout}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-all text-sm font-medium"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="relative" onClick={e=>e.stopPropagation()}>
                <button className="btn-primary" onClick={()=>setShowLoginDropdown(p=>!p)}>
                  Login ▾
                </button>
                {showLoginDropdown && (
                  <div className="absolute right-0 top-12 w-52 card shadow-xl rounded-xl p-2 z-50">
                    {[
                      { label:'🎓 Student Login',    to:'/student/login'    },
                      { label:'🏛️ University Login', to:'/university/login' },
                      { label:'🔍 Verifier Login',   to:'/verifier/login'   },
                      { label:'⚙️ Admin Login',      to:'/admin/login'      },
                    ].map(item=>(
                      <Link key={item.to} to={item.to}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 transition-colors"
                        onClick={()=>setShowLoginDropdown(false)}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-sm font-medium">{user?.name}</div>
                <div className="px-4 py-2 text-xs font-semibold text-primary-600 bg-primary-50 rounded">{user?.role}</div>
                <button
                  onClick={logout}
                  className="w-full mt-3 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 text-gray-700 hover:text-primary-600">Log In</Link>
                <Link to="/login" className="block px-4 py-2 text-primary-600 font-medium">Get Started</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

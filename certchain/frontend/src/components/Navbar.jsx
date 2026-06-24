import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const showOnlyHome = ['/verify', '/verify/result'].includes(location.pathname)
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return window.localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme')
    document.body.classList.add(`${theme}-theme`)
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <nav className="navbar fixed top-0 w-full border-b z-50">
      <div className="app-container">
        <div className="flex justify-between items-center py-3 gap-3">
          <Link to="/" className="flex items-center gap-2 navbar-logo">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⛓️</span>
            </div>
            <span className="font-bold text-xl">CertChain</span>
          </Link>

          {!isAuthenticated && (
            <div className="hidden md:flex items-center gap-3">
              {showOnlyHome ? (
                <Link to="/" className="navbar-link">Home</Link>
              ) : (
                <>
                  <Link to="/" className="navbar-link">Home</Link>
                  <Link to="/verify" className="navbar-link">Verify</Link>
                  <a href="#features" className="navbar-link">About</a>
                </>
              )}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle light and dark theme"
              aria-pressed={theme === 'dark'}
              title="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-3">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="px-3 py-1 badge-pill">{user?.role}</span>
                <button
                  onClick={logout}
                  className="btn-secondary"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="hidden sm:inline btn-secondary">Log In</Link>
                <Link to="/login" className="hidden sm:inline btn-primary">Get Started</Link>
              </>
            )}

            <button
              className="md:hidden theme-toggle-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t mobile-menu">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-sm font-medium">{user?.name}</div>
                <div className="px-4 py-2 badge-pill-inline">{user?.role}</div>
                <button
                  onClick={logout}
                  className="w-full mt-3 px-4 py-2 btn-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 navbar-link">Log In</Link>
                <Link to="/login" className="block px-4 py-2 btn-primary">Get Started</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

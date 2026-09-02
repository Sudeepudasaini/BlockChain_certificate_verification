import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const location = useLocation()
  const showOnlyHome = ['/verify', '/verify/result'].includes(location.pathname)

  useEffect(() => {
    if (!showLoginDropdown) return
    const close = () => setShowLoginDropdown(false)
    document.addEventListener('click', close, true)
    return () => document.removeEventListener('click', close, true)
  }, [showLoginDropdown])

  return (
    <nav className="lp-nav" role="navigation">
      <a href="#" className="lp-nav-brand">
        <div className="logo-box">
          <i className="ti ti-certificate" aria-hidden="true">⛓️</i>
        </div>
        <span>CertChain</span>
      </a>

      <button
        type="button"
        className="lp-nav-toggle"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`lp-nav-links ${menuOpen ? 'open' : ''}`}>
        {showOnlyHome ? (
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        ) : (
          <>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <Link to="/verify" onClick={() => setMenuOpen(false)}>Verify</Link>
          </>
        )}
      </div>

      <div className="lp-nav-right">
        
        <div className="login-dropdown-wrap" onClick={e=>e.stopPropagation()}>
          <button className={`login-dropdown-btn ${showLoginDropdown ? 'open' : ''}`} id="loginBtn" onClick={()=>setShowLoginDropdown(p=>!p)} aria-expanded={showLoginDropdown}>
            <i className="ti ti-login" aria-hidden="true"></i>
            Login
            <i className="ti ti-chevron-down chevron" aria-hidden="true"></i>
          </button>
          <div className={`login-dropdown-menu ${showLoginDropdown ? 'open' : ''}`} id="loginDropdown" role="menu">
            <Link to="/student/login" className="login-dropdown-item" role="menuitem" onClick={()=>setShowLoginDropdown(false)}>
              <div className="icon-circle" style={{background:'#EEF2FF'}}>
                <i className="ti ti-school" style={{color:'#4F46E5'}} aria-hidden="true">🎓</i>
              </div>
              <div>
                <div className="ldi-label">Student</div>
                <div className="ldi-desc">View your certificates</div>
              </div>
            </Link>
            <Link to="/university/login" className="login-dropdown-item" role="menuitem" onClick={()=>setShowLoginDropdown(false)}>
              <div className="icon-circle" style={{background:'#EFF6FF'}}>
                <i className="ti ti-building" style={{color:'#2563EB'}} aria-hidden="true">🏛️</i>
              </div>
              <div>
                <div className="ldi-label">University</div>
                <div className="ldi-desc">Issue certificates</div>
              </div>
            </Link>
            <Link to="/verifier/login" className="login-dropdown-item" role="menuitem" onClick={()=>setShowLoginDropdown(false)}>
              <div className="icon-circle" style={{background:'#ECFDF5'}}>
                <i className="ti ti-search" style={{color:'#059669'}} aria-hidden="true">🔍</i>
              </div>
              <div>
                <div className="ldi-label">Verifier</div>
                <div className="ldi-desc">Verify credentials</div>
              </div>
            </Link>
          </div>
        </div>

        <Link to="/student/register" className="btn-nav-primary" onClick={() => setMenuOpen(false)}>Get started</Link>
      </div>
    </nav>
  )
}

export default Navbar

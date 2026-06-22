import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Navbar from '../components/Navbar'
import './landing.css'

const LandingPage = () => {
  const { theme } = useTheme()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    function onDocClick(e) {
      const wrap = document.querySelector('.login-dropdown-wrap')
      if (wrap && !wrap.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    function onKey(e) {
      if (e.key === 'Escape' && dropdownOpen) setDropdownOpen(false)
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [dropdownOpen])

  return (
    <div className="lp-wrap">
      <Navbar />

      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-badge">
              <i className="ti ti-lock" aria-hidden="true"></i>
              Blockchain-powered · SHA-256 secured
            </div>
            <h1>Tamper-proof academic certificate <em>verification</em></h1>
            <p>Instantly verify academic credentials with Ethereum blockchain. Eliminate certificate fraud with cryptographic hashing and immutable on-chain records.</p>
            <div className="hero-btns">
              <Link to="/verify" className="btn-hero-primary">
                <i className="ti ti-certificate" aria-hidden="true"></i>
                Verify a certificate
              </Link>
              <Link to="/login" className="btn-hero-outline">
                <i className="ti ti-upload" aria-hidden="true"></i>
                Issue certificate
              </Link>
            </div>
          </div>

          <div>
            <div className="cert-preview-card">
              <div className="cert-card-header">
                <div className="ch-row">
                  <div>
                    <div className="ch-name">Student name</div>
                    <div className="ch-val">John Doe</div>
                  </div>
                  <div className="cert-verified-badge">
                    <i className="ti ti-check" style={{fontSize:11}} aria-hidden="true"></i>
                    Verified
                  </div>
                </div>
                <div className="cert-info-grid">
                  <div className="cert-info-item">
                    <div className="ci-label">Degree</div>
                    <div className="ci-val">Bachelor of Science</div>
                  </div>
                  <div className="cert-info-item">
                    <div className="ci-label">University</div>
                    <div className="ci-val">Tribhuvan University</div>
                  </div>
                  <div className="cert-info-item">
                    <div className="ci-label">Graduation</div>
                    <div className="ci-val">2024</div>
                  </div>
                  <div className="cert-info-item">
                    <div className="ci-label">Cert ID</div>
                    <div className="ci-val">TU-2024-8821</div>
                  </div>
                </div>
              </div>
              <div className="cert-card-body">
                <div className="cert-hash-box">
                  <div className="chb-label">SHA-256 hash</div>
                  <div className="chb-val">a1b2c3d4e5f6789abc12def345678901abc234def5678901abc2345678901abc</div>
                </div>
                <div className="cert-blockchain-badge">
                  <i className="ti ti-topology-star-3" aria-hidden="true"></i>
                  Stored on Ethereum blockchain
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label="Platform statistics">
        <div className="stats-inner">
          <div className="stat-item">
            <div className="st-num">12,840</div>
            <div className="st-label">Certificates issued</div>
          </div>
          <div className="stat-item">
            <div className="st-num">98.7%</div>
            <div className="st-label">Verification accuracy</div>
          </div>
          <div className="stat-item">
            <div className="st-num">&lt; 2s</div>
            <div className="st-label">Avg. verify time</div>
          </div>
          <div className="stat-item">
            <div className="st-num">0</div>
            <div className="st-label">Fraudulent records</div>
          </div>
        </div>
      </section>

      <section className="how-section" id="how" aria-labelledby="how-title">
        <h2 className="section-title" id="how-title">How it works</h2>
        <div className="steps-row">
          <div className="step-item">
            <div className="step-num-circle c1">1</div>
            <div className="step-title">Upload certificate</div>
            <div className="step-desc">University uploads the student's academic certificate</div>
          </div>
          <div className="step-item">
            <div className="step-num-circle c2">2</div>
            <div className="step-title">Generate hash</div>
            <div className="step-desc">System creates a unique SHA-256 cryptographic fingerprint</div>
          </div>
          <div className="step-item">
            <div className="step-num-circle c3">3</div>
            <div className="step-title">Store on blockchain</div>
            <div className="step-desc">Hash is permanently written to the Ethereum ledger</div>
          </div>
          <div className="step-item">
            <div className="step-num-circle c4">4</div>
            <div className="step-title">Instant result</div>
            <div className="step-desc">Any verifier can confirm authenticity in milliseconds</div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features" aria-labelledby="features-title">
        <h2 className="section-title" id="features-title">Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-circle" style={{background:'#EEF2FF'}}>
              <i className="ti ti-lock" style={{color:'#4F46E5'}} aria-hidden="true"></i>
            </div>
            <h3>Cryptographic security</h3>
            <p>SHA-256 hashing ensures any tampering is immediately detectable</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-circle" style={{background:'#F5F3FF'}}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="6" cy="12" r="2" fill="#7C3AED" />
                <circle cx="12" cy="6" r="2" fill="#7C3AED" />
                <circle cx="18" cy="12" r="2" fill="#7C3AED" />
                <path d="M7.6 11l3.4-3v0" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.4 11l-3.4-3v0" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8v4" stroke="#7C3AED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Blockchain immutability</h3>
            <p>Records stored permanently on Ethereum — no one can alter or delete them</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-circle" style={{background:'#ECFDF5'}}>
              <i className="ti ti-bolt" style={{color:'#059669'}} aria-hidden="true"></i>
            </div>
            <h3>Instant verification</h3>
            <p>Verify any certificate in under 2 seconds with a single upload</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-circle" style={{background:'#EFF6FF'}}>
              <i className="ti ti-users" style={{color:'#2563EB'}} aria-hidden="true"></i>
            </div>
            <h3>Role-based access</h3>
            <p>Separate dashboards for admins, universities, students, and verifiers</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-circle" style={{background:'#FFF7ED'}}>
              <i className="ti ti-qrcode" style={{color:'#EA580C'}} aria-hidden="true"></i>
            </div>
            <h3>QR code sharing</h3>
            <p>Each certificate gets a scannable QR code for portable verification</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-circle" style={{background:'#FDF4FF'}}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 3c-2.2 0-4 1.8-4 4v1H7a3 3 0 00-3 3v1a3 3 0 003 3h1v1c0 2.2 1.8 4 4 4s4-1.8 4-4v-1h1a3 3 0 003-3v-1a3 3 0 00-3-3h-1V7c0-2.2-1.8-4-4-4z" fill="#A21CAF" opacity="0.95" />
                <path d="M9.5 11.5c.5-.3 1.2-.5 2.5-.5s2 .2 2.5.5" stroke="#7C3AED" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>AI career guidance</h3>
            <p>Personalized career counseling powered by your academic credentials</p>
          </div>
        </div>
      </section>

      <section className="cta-section" aria-label="Call to action">
        <h2>Ready to eliminate certificate fraud?</h2>
        <p id="cta-subtext">Start issuing and verifying tamper-proof certificates today</p>
        <div className="cta-btns">
          <Link to="/verify" className="btn-cta-white">
            <i className="ti ti-search" aria-hidden="true"></i>
            Verify now
          </Link>
          <Link to="/student/register" className="btn-cta-outline">
            <i className="ti ti-user-plus" aria-hidden="true"></i>
            Get started free
          </Link>
        </div>
      </section>

      <footer className="lp-footer">
        <p>© 2025 CertChain — Sudeep Kumar Pudasaini</p>
        <div className="footer-links">
          <Link to="/verify">Verify</Link>
          <a href="#features">Features</a>
          <a href="#">Privacy</a>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

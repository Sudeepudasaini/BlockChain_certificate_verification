import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-primary-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-6 px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold">
              🔐 Blockchain-Powered · SHA-256 Secured
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-blue-dark mb-6 leading-tight">
              Tamper-Proof Academic Certificate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Verification</span>
            </h1>

            <p className="text-lg text-gray-700 mb-8">
              Instantly verify academic credentials with Ethereum blockchain technology. Eliminate certificate fraud with cryptographic hashing and immutable records.
            </p>

            <div className="flex gap-4">
              <Link
                to="/verify"
                className="px-8 py-3.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-semibold shadow-lg"
              >
                Verify a Certificate
              </Link>
              <Link
                to="/login"
                className="px-8 py-3.5 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-all font-semibold"
              >
                Issue Certificate
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="card-base p-8 bg-white border-2 border-primary-100">
              <div className="bg-gradient-to-br from-blue-dark to-primary-600 rounded-lg p-6 text-white mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm opacity-80">Student Name</p>
                    <p className="text-xl font-bold">John Doe</p>
                  </div>
                  <span className="px-3 py-1 bg-green-400 text-green-900 text-xs font-bold rounded-full">✓ VERIFIED</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm opacity-80">Degree</p>
                    <p className="font-semibold">Bachelor of Science</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">University</p>
                    <p className="font-semibold">Tribhuvan University</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Graduation Year</p>
                    <p className="font-semibold">2024</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-600 mb-2">SHA-256 Hash</p>
                <p className="font-mono text-xs text-gray-800 break-all">a1b2c3d4e5f6...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-blue-dark text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-bold">12,840</p>
            <p className="text-sm md:text-base text-gray-300 mt-2">Certificates Issued</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold">98.7%</p>
            <p className="text-sm md:text-base text-gray-300 mt-2">Verification Accuracy</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold">&lt;2s</p>
            <p className="text-sm md:text-base text-gray-300 mt-2">Avg Verify Time</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold">0</p>
            <p className="text-sm md:text-base text-gray-300 mt-2">Fraudulent Records</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-dark text-center mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Upload Certificate', desc: 'University uploads academic certificate' },
              { num: '2', title: 'Generate Hash', desc: 'System creates SHA-256 hash' },
              { num: '3', title: 'Store on Blockchain', desc: 'Hash stored on Ethereum' },
              { num: '4', title: 'Instant Result', desc: 'Verify in milliseconds' },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-blue-dark mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-dark text-center mb-16">Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🔐', title: 'Cryptographic Security', desc: 'SHA-256 hashing ensures data integrity' },
              { icon: '⛓️', title: 'Blockchain Immutability', desc: 'Records stored permanently on Ethereum' },
              { icon: '⚡', title: 'Instant Verification', desc: 'Verify certificates in under 2 seconds' },
            ].map((feature, i) => (
              <div key={i} className="card-base p-8 text-center hover:shadow-lg">
                <p className="text-4xl mb-4">{feature.icon}</p>
                <h3 className="text-xl font-bold text-blue-dark mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-dark to-primary-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to eliminate certificate fraud?</h2>
        <p className="text-lg mb-8 opacity-90">Start issuing and verifying tamper-proof certificates today</p>
        <div className="flex gap-4 justify-center">
          <Link to="/verify" className="px-8 py-3 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transition-all">
            Verify Now
          </Link>
          <Link to="/login" className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

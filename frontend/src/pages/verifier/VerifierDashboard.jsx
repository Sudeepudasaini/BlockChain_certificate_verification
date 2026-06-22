import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'

const VerifierDashboard = () => {
  const [activeTab, setActiveTab] = useState('verify')
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [certId, setCertId] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState(() => {
    const stored = localStorage.getItem('verifyHistory')
    return stored ? JSON.parse(stored) : []
  })

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleVerifyUpload = async () => {
    if (!file) {
      toast.error('Please select a certificate file')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('certificate', file)

      const response = await api.post('/certificates/verify-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setResult(response.data)

      const newHistory = [
        { id: certId || file.name, timestamp: new Date().toISOString(), valid: response.data.valid },
        ...history,
      ].slice(0, 10)
      setHistory(newHistory)
      localStorage.setItem('verifyHistory', JSON.stringify(newHistory))
    } catch (error) {
      toast.error(error.response?.data?.error || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyById = async () => {
    if (!certId.trim()) {
      toast.error('Please enter a certificate ID')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/certificates/verify-id', { certId })
      setResult(response.data)

      const newHistory = [
        { id: certId, timestamp: new Date().toISOString(), valid: response.data.valid },
        ...history,
      ].slice(0, 10)
      setHistory(newHistory)
      localStorage.setItem('verifyHistory', JSON.stringify(newHistory))
    } catch (error) {
      toast.error(error.response?.data?.error || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('verifyHistory')
    toast.success('History cleared')
  }

  if (loading) {
    return (
      <div className="flex">
        <Sidebar role="verifier" />
          <div className="flex-1 main-content flex items-center justify-center min-h-screen">
          <LoadingSpinner text="Verifying certificate..." />
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar role="verifier" />

      <div className="flex-1 main-content">
        <div className="p-8">
            <h1 className="text-4xl font-bold text-blue-dark mb-8">Certificate Verification</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Verification Form */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('verify')}
                  className={`px-6 py-3 font-semibold border-b-2 transition-all ${
                    activeTab === 'verify'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  Upload File
                </button>
                <button
                  onClick={() => setActiveTab('id')}
                  className={`px-6 py-3 font-semibold border-b-2 transition-all ${
                    activeTab === 'id'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-600'
                  }`}
                >
                  Certificate ID
                </button>
              </div>

              {/* Upload Tab */}
              {activeTab === 'verify' && (
                <div className="card-base p-8 mb-6">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                      dragActive
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 bg-gray-50'
                    }`}
                  >
                    <span className="text-5xl mb-4 block">📁</span>
                    <p className="text-lg font-semibold text-gray-900 mb-2">Drop certificate here</p>
                    <label className="inline-block">
                      <span className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-primary-700 transition-all">
                        Browse Files
                      </span>
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files?.[0])}
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                      />
                    </label>
                  </div>

                  {file && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-700 font-semibold">✓ {file.name}</p>
                    </div>
                  )}

                  <button
                    onClick={handleVerifyUpload}
                    disabled={!file}
                    className="w-full mt-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50"
                  >
                    Verify Now
                  </button>
                </div>
              )}

              {/* ID Tab */}
              {activeTab === 'id' && (
                <div className="card-base p-8 mb-6">
                  <input
                    type="text"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    className="input-base mb-6"
                    placeholder="CERT-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  />

                  <button
                    onClick={handleVerifyById}
                    className="w-full py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-all"
                  >
                    Verify Now
                  </button>
                </div>
              )}

              {/* Result */}
              {result && (
                <div
                  className={`card-base p-8 ${
                    result.valid ? 'border-2 border-green-200 bg-green-50' : 'border-2 border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{result.valid ? '✓' : '✕'}</span>
                    <div>
                      <h3
                        className={`text-2xl font-bold mb-2 ${
                          result.valid ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {result.valid ? 'Certificate Valid' : 'Certificate Invalid'}
                      </h3>
                      {result.certificate && (
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>
                            <strong>Student:</strong> {result.certificate.studentName}
                          </p>
                          <p>
                            <strong>University:</strong> {result.certificate.universityName}
                          </p>
                          <p>
                            <strong>Degree:</strong> {result.certificate.degree}
                          </p>
                        </div>
                      )}
                      {result.blockchainVerified && (
                        <p className="text-sm text-green-700 mt-3 font-semibold">
                          ⛓️ Verified on Blockchain
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* History */}
            <div className="lg:col-span-1">
              <div className="card-base p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-blue-dark">Verification History</h3>
                  {history.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-xs text-red-600 hover:text-red-700 font-semibold"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <p className="text-gray-500 text-sm">No verifications yet</p>
                ) : (
                  <div className="space-y-3">
                    {history.map((item, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg ${
                          item.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className={item.valid ? 'text-green-600' : 'text-red-600'}>
                            {item.valid ? '✓' : '✕'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-900 truncate">{item.id}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(item.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifierDashboard

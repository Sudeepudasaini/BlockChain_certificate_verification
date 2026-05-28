import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import api from '../api/axios'
import LoadingSpinner from '../components/LoadingSpinner'

const VerifyPage = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('upload')
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [certId, setCertId] = useState('')
  const [dragActive, setDragActive] = useState(false)

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

  const handleFileSelect = (e) => {
    setFile(e.target.files?.[0])
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

      navigate('/verify/result', { state: { result: response.data } })
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
      navigate('/verify/result', { state: { result: response.data } })
    } catch (error) {
      toast.error(error.response?.data?.error || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <LoadingSpinner text="Verifying certificate..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-dark mb-4">Verify a Certificate</h1>
            <p className="text-lg text-gray-600">Verify the authenticity of an academic certificate using blockchain</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-3 font-semibold border-b-2 transition-all ${
                activeTab === 'upload'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Upload File
            </button>
            <button
              onClick={() => setActiveTab('id')}
              className={`px-6 py-3 font-semibold border-b-2 transition-all ${
                activeTab === 'id'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Enter Certificate ID
            </button>
          </div>

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="card-base p-8">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                  dragActive
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 bg-gray-50 hover:border-primary-600'
                }`}
              >
                <span className="text-5xl mb-4 block">📁</span>
                <p className="text-lg font-semibold text-gray-900 mb-2">Drop your certificate here</p>
                <p className="text-gray-600 mb-4">or</p>
                <label className="inline-block">
                  <span className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-primary-700 transition-all">
                    Browse Files
                  </span>
                  <input
                    type="file"
                    onChange={handleFileSelect}
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
                className="w-full mt-6 py-3 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify Now
              </button>
            </div>
          )}

          {/* ID Tab */}
          {activeTab === 'id' && (
            <div className="card-base p-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Certificate ID</label>
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
        </div>
      </div>
    </div>
  )
}

export default VerifyPage

import React, { useState } from 'react'
import api from '../api/axios'
import { toast } from 'react-toastify'

const CertificateCard = ({ certificate, showActions = true }) => {
  const [showQR, setShowQR] = useState(false)

  const handleDownload = async () => {
    try {
      const response = await api.get(`/certificates/${certificate.certId}/download`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${certificate.certId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      toast.error('Download failed')
    }
  }

  return (
    <div className="card-base hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏛️</span>
            <div>
              <p className="text-sm text-gray-600 font-medium">{certificate.universityName}</p>
              <p className="text-xs text-gray-400">{new Date(certificate.issueDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        {certificate.blockchainStored && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
            ✓ Verified
          </span>
        )}
      </div>

      {/* Student Name */}
      <h3 className="text-2xl font-bold text-primary-800 mb-3">{certificate.studentName}</h3>

      {/* Degree Info */}
      <div className="grid grid-cols-2 gap-4 mb-4 py-3 border-y border-gray-100">
        <div>
          <p className="text-xs text-gray-600">Degree</p>
          <p className="font-semibold text-gray-900">{certificate.degree}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Graduation Year</p>
          <p className="font-semibold text-gray-900">{certificate.graduationYear}</p>
        </div>
      </div>

      {/* Hash Preview */}
      <div className="mb-4">
        <p className="text-xs text-gray-600 mb-2">SHA-256 Hash</p>
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
          <p className="font-mono text-xs text-gray-800 truncate break-words">{certificate.sha256Hash}</p>
        </div>
      </div>

      {/* Revoked Badge */}
      {certificate.isRevoked && (
        <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm font-semibold text-red-700">🚫 This certificate has been revoked</p>
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex gap-3">
          <button onClick={handleDownload} className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-all font-medium text-sm">
            📥 Download
          </button>
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex-1 px-4 py-2 bg-white text-gray-900 rounded-md border border-gray-100 hover:bg-gray-50 transition-all font-medium text-sm"
            aria-pressed={showQR}
            aria-label="Toggle QR Code"
          >
            📱 QR Code
          </button>
        </div>
      )}

      {/* QR Code Modal */}
      {showQR && certificate.qrCode && (
        <div className="modal-backdrop">
          <div className="modal-panel">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Certificate QR Code</h3>
              <button
                onClick={() => setShowQR(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close QR modal"
              >
                ✕
              </button>
            </div>
            <img src={certificate.qrCode} alt="QR Code" className="w-56 h-56 mx-auto" />
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificateCard

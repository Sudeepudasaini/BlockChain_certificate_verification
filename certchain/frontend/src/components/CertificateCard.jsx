import React, { useState } from 'react'
import QRCode from 'qrcode.react'

const CertificateCard = ({ certificate, showActions = true }) => {
  const [showQR, setShowQR] = useState(false)

  return (
    <div className="card-base p-6 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏛️</span>
            <div>
              <p className="text-sm text-gray-600">{certificate.universityName}</p>
              <p className="text-xs text-gray-500">{new Date(certificate.issueDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        {certificate.blockchainStored && (
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            ✓ Verified
          </span>
        )}
      </div>

      {/* Student Name */}
      <h3 className="text-2xl font-bold text-blue-dark mb-3">{certificate.studentName}</h3>

      {/* Degree Info */}
      <div className="grid grid-cols-2 gap-4 mb-4 py-3 border-y border-gray-200">
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
        <div className="bg-primary-50 p-3 rounded-lg">
          <p className="font-mono text-xs text-primary-700 truncate">{certificate.sha256Hash}</p>
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
          <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-medium text-sm">
            📥 Download
          </button>
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-all font-medium text-sm"
          >
            📱 QR Code
          </button>
        </div>
      )}

      {/* QR Code Modal */}
      {showQR && certificate.qrCode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Certificate QR Code</h3>
              <button
                onClick={() => setShowQR(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <img src={certificate.qrCode} alt="QR Code" className="w-64 h-64" />
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificateCard

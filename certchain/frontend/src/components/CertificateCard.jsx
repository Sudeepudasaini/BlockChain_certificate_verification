import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { toast } from 'react-toastify'

const CertificateCard = ({ certificate, showActions = true }) => {
  const [showQR, setShowQR] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [previewLoading, setPreviewLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && showPreview) {
        closePreviewModal()
      }
    }

    if (showPreview) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [showPreview])

  const handleDownload = async () => {
    try {
      const response = await api.get(`/certificates/${certificate.certId}/download`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${certificate.certId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error)
      toast.error('Download failed')
    }
  }

  const handlePreview = async () => {
    if (previewUrl) {
      setShowPreview(true)
      return
    }

    setPreviewLoading(true)
    try {
      const response = await api.get(`/certificates/${certificate.certId}/download`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
      setPreviewUrl(url)
      setShowPreview(true)
    } catch (error) {
      console.error(error)
      toast.error('Preview failed')
    } finally {
      setPreviewLoading(false)
    }
  }

  const closePreviewModal = () => {
    setShowPreview(false)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }

  const downloadFromPreview = () => {
    if (!previewUrl) return
    const link = document.createElement('a')
    link.href = previewUrl
    link.setAttribute('download', `${certificate.certId}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <div className="card-base hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🏛️</span>
            <div>
              <p className="text-sm text-secondary font-medium">{certificate.universityName}</p>
              <p className="text-xs text-secondary/70">{new Date(certificate.issueDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        {certificate.blockchainStored && (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
            ✓ Verified
          </span>
        )}
      </div>

      <h3 className="text-2xl font-bold text-primary mb-3">{certificate.studentName}</h3>

      <div className="grid grid-cols-2 gap-4 mb-4 py-3 border-y border-gray-200">
        <div>
          <p className="text-xs text-secondary">Degree</p>
          <p className="font-semibold text-primary">{certificate.degree}</p>
        </div>
        <div>
          <p className="text-xs text-secondary">Graduation Year</p>
          <p className="font-semibold text-primary">{certificate.graduationYear}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-secondary mb-2">SHA-256 Hash</p>
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <p className="font-mono text-xs text-primary truncate break-words">{certificate.sha256Hash}</p>
        </div>
      </div>

      {certificate.isRevoked && (
        <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm font-semibold text-red-700">🚫 This certificate has been revoked</p>
        </div>
      )}

      {showActions && (
        <div className="grid gap-3 sm:grid-cols-3">
          <button
            onClick={handleDownload}
            className="flex-1 px-4 py-2 btn-primary text-sm"
          >
            📥 Download
          </button>
          <button
            onClick={handlePreview}
            className="flex-1 px-4 py-2 btn-secondary text-sm"
            disabled={previewLoading}
          >
            {previewLoading ? 'Loading preview...' : '👁️ Preview'}
          </button>
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex-1 px-4 py-2 btn-secondary text-sm"
            aria-pressed={showQR}
            aria-label="Toggle QR Code"
          >
            📱 QR Code
          </button>
        </div>
      )}

      {showPreview && (
        <div className="modal-backdrop" onClick={closePreviewModal}>
          <div className="modal-panel preview-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Certificate Preview</h3>
              <button
                onClick={closePreviewModal}
                className="text-secondary hover:text-primary"
                aria-label="Close preview modal"
              >
                ✕
              </button>
            </div>
            <div className="modal-body mb-4">
              {previewUrl ? (
                <iframe id="pdfPreviewFrame" title="Certificate Preview" src={previewUrl} style={{ width: '100%', height: '70vh', border: 'none' }} />
              ) : (
                <p className="text-secondary">Preparing preview...</p>
              )}
            </div>
            <div className="modal-footer flex flex-wrap gap-3 justify-end">
              <button onClick={downloadFromPreview} className="btn-primary px-5 py-2">
                Download PDF
              </button>
              <button onClick={closePreviewModal} className="btn-secondary px-5 py-2">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showQR && certificate.qrCode && (
        <div className="modal-backdrop" onClick={() => setShowQR(false)}>
          <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Certificate QR Code</h3>
              <button
                onClick={() => setShowQR(false)}
                className="text-secondary hover:text-primary"
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

import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'

const StudentDownloads = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const response = await api.get('/certificates/my')
      setCertificates(response.data.certificates || [])
    } catch (error) {
      toast.error('Failed to load certificates')
    } finally {
      setLoading(false)
    }
  }

  const downloadCertificate = async (certId) => {
    try {
      const response = await api.get(`/certificates/${certId}/download`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${certId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      toast.error('Download failed')
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="flex">
      <Sidebar role="student" />
      <div className="ml-60 flex-1 p-8">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-blue-dark">Downloads</h1>
          {certificates.length === 0 ? (
            <div className="card-base p-8 text-center text-gray-600">
              No certificates available yet. Your issued certificates will appear here.
            </div>
          ) : (
            <div className="grid gap-6">
              {certificates.map((cert) => (
                <div key={cert._id} className="card-base p-6 flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500">{cert.universityName}</p>
                      <h2 className="text-xl font-semibold text-blue-dark">{cert.studentName}</h2>
                    </div>
                    <button onClick={() => downloadCertificate(cert.certId)} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">
                      Download Certificate
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <span>Issue Date: {new Date(cert.issueDate).toLocaleDateString()}</span>
                    <span>Status: {cert.blockchainStored ? 'Blockchain Verified' : 'Pending'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentDownloads

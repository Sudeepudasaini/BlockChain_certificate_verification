import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'

const AdminCertificates = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const response = await api.get('/admin/certificates')
      setCertificates(response.data.certificates || [])
    } catch (error) {
      toast.error('Unable to load certificates')
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

  const [deletingId, setDeletingId] = useState(null)

  const deleteCertificate = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this certificate? This action cannot be undone.')
    if (!confirm) return
    try {
      setDeletingId(id)
      await api.delete(`/certificates/${id}`)
      setCertificates((prev) => prev.filter((c) => c._id !== id))
      toast.success('Certificate deleted')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar role="admin" />
          <div className="flex-1 overflow-y-auto overflow-x-hidden main-content p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-dark">Certificates</h1>
          </div>

          <div className="card-base p-4 sm:p-6 overflow-x-auto">
            <div className="min-w-[720px]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-3 text-sm text-gray-600">Certificate ID</th>
                  <th className="p-3 text-sm text-gray-600">Student</th>
                  <th className="p-3 text-sm text-gray-600">Email</th>
                  <th className="p-3 text-sm text-gray-600">University</th>
                  <th className="p-3 text-sm text-gray-600">Status</th>
                  <th className="p-3 text-sm text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-mono text-sm">{cert.certId}</td>
                    <td className="p-3">{cert.studentName}</td>
                    <td className="p-3">{cert.studentEmail}</td>
                    <td className="p-3">{cert.universityName}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cert.isRevoked ? 'bg-red-100 text-red-700' : cert.blockchainStored ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {cert.isRevoked ? 'Revoked' : cert.blockchainStored ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button onClick={() => downloadCertificate(cert.certId)} className="w-full sm:w-auto px-3 py-2 bg-primary-600 text-white rounded-md text-xs">
                          Download
                        </button>
                        <button
                          onClick={() => deleteCertificate(cert._id)}
                          className="w-full sm:w-auto px-3 py-2 bg-red-600 text-white rounded-md text-xs"
                          disabled={deletingId === cert._id}
                        >
                          {deletingId === cert._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCertificates

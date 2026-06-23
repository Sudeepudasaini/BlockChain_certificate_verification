import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'

const UniversityCertificates = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingCert, setEditingCert] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [editLoading, setEditLoading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const response = await api.get('/certificates')
      setCertificates(response.data.certificates || [])
    } catch (error) {
      toast.error('Unable to load certificates')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <>
    <div className="flex">
      <Sidebar role="university" />
      <div className="flex-1 main-content p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-blue-dark">University Certificates</h1>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {certificates.length === 0 ? (
              <div className="card-base p-8 text-center text-gray-600">
                No certificates issued yet. Use Issue Certificate to begin.
              </div>
            ) : (
              <div className="card-base p-6 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="p-3 text-sm text-gray-600">Student</th>
                      <th className="p-3 text-sm text-gray-600">Email</th>
                      <th className="p-3 text-sm text-gray-600">Degree</th>
                      <th className="p-3 text-sm text-gray-600">Issued</th>
                      <th className="p-3 text-sm text-gray-600">Status</th>
                      <th className="p-3 text-sm text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((cert) => (
                      <tr key={cert._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-3">{cert.studentName}</td>
                        <td className="p-3">{cert.studentEmail}</td>
                        <td className="p-3">{cert.degree}</td>
                        <td className="p-3 text-sm text-gray-500">{new Date(cert.issueDate).toLocaleDateString()}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cert.blockchainStored ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {cert.blockchainStored ? 'Stored' : 'Pending'}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingCert(cert)
                                setEditForm({
                                  studentName: cert.studentName || '',
                                  studentId: cert.studentId || '',
                                  studentEmail: cert.studentEmail || '',
                                  degree: cert.degree || '',
                                  major: cert.major || '',
                                  graduationYear: cert.graduationYear || '',
                                  metadata: cert.metadata || {},
                                  isRevoked: !!cert.isRevoked,
                                })
                              }}
                              className="px-3 py-2 bg-blue-600 text-white rounded-md text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={async () => {
                                const confirm = window.confirm('Are you sure you want to delete this certificate?')
                                if (!confirm) return
                                try {
                                  setDeletingId(cert._id)
                                  await api.delete(`/certificates/${cert._id}`)
                                  setCertificates((prev) => prev.filter((c) => c._id !== cert._id))
                                  toast.success('Certificate deleted')
                                } catch (err) {
                                  toast.error(err.response?.data?.error || 'Delete failed')
                                } finally {
                                  setDeletingId(null)
                                }
                              }}
                              className="px-3 py-2 bg-red-600 text-white rounded-md text-xs"
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
            )}
          </div>
        </div>
      </div>
    </div>
      {editingCert && (
        <div className="modal-backdrop">
          <div className="modal-panel max-w-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Edit Certificate</h3>
              <button onClick={() => setEditingCert(null)} className="text-gray-500">✕</button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                setEditLoading(true)
                try {
                  const payload = {
                    studentName: editForm.studentName,
                    studentId: editForm.studentId,
                    studentEmail: editForm.studentEmail,
                    degree: editForm.degree,
                    major: editForm.major,
                    graduationYear: editForm.graduationYear,
                    metadata: editForm.metadata,
                    isRevoked: !!editForm.isRevoked,
                  }
                  const res = await api.put(`/certificates/${editingCert._id}`, payload)
                  const updated = res.data.certificate
                  setCertificates((prev) => prev.map((c) => (c._id === updated._id ? updated : c)))
                  toast.success('Certificate updated')
                  setEditingCert(null)
                } catch (err) {
                  toast.error(err.response?.data?.error || 'Update failed')
                } finally {
                  setEditLoading(false)
                }
              }}
            >
              <div className="grid grid-cols-1 gap-3">
                <label className="text-sm">Student Name</label>
                <input className="form-input" value={editForm.studentName} onChange={(e) => setEditForm((s) => ({ ...s, studentName: e.target.value }))} />

                <label className="text-sm">Student ID</label>
                <input className="form-input" value={editForm.studentId} onChange={(e) => setEditForm((s) => ({ ...s, studentId: e.target.value }))} />

                <label className="text-sm">Student Email</label>
                <input className="form-input" value={editForm.studentEmail} onChange={(e) => setEditForm((s) => ({ ...s, studentEmail: e.target.value }))} />

                <label className="text-sm">Degree</label>
                <input className="form-input" value={editForm.degree} onChange={(e) => setEditForm((s) => ({ ...s, degree: e.target.value }))} />

                <label className="text-sm">Major</label>
                <input className="form-input" value={editForm.major} onChange={(e) => setEditForm((s) => ({ ...s, major: e.target.value }))} />

                <label className="text-sm">Graduation Year</label>
                <input className="form-input" value={editForm.graduationYear} onChange={(e) => setEditForm((s) => ({ ...s, graduationYear: e.target.value }))} />

                <div className="flex items-center gap-3 mt-2">
                  <button type="submit" disabled={editLoading} className="px-4 py-2 bg-primary-600 text-white rounded">
                    {editLoading ? 'Saving...' : 'Save changes'}
                  </button>
                  <button type="button" onClick={() => setEditingCert(null)} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default UniversityCertificates

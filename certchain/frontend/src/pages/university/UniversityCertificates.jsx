import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'

const UniversityCertificates = () => {
  const navigate = useNavigate()
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const response = await api.get('/certificates')
      const serverCertificates = response.data.certificates || []
      setCertificates(serverCertificates)
    } catch (error) {
      toast.error('Unable to load certificates')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (certificate) => {
    navigate('/university/issue', { state: { editCertificate: certificate } })
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="flex">
      <Sidebar role="university" />
      <div className="ml-60 flex-1 p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-primary">University Certificates</h1>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {certificates.length === 0 ? (
              <div className="card-base p-8 text-center text-secondary">
                No certificates issued yet. Use Issue Certificate to begin.
              </div>
            ) : (
              <div className="card-base p-6 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="p-3 text-sm">Student</th>
                      <th className="p-3 text-sm">Email</th>
                      <th className="p-3 text-sm">Degree</th>
                      <th className="p-3 text-sm">Issued</th>
                      <th className="p-3 text-sm">Status</th>
                      <th className="p-3 text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certificates.map((cert) => (
                      <tr
                        key={cert._id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3 text-primary">{cert.studentName}</td>
                        <td className="p-3 text-primary">{cert.studentEmail}</td>
                        <td className="p-3 text-primary">{cert.degree}</td>
                        <td className="p-3 text-sm text-secondary">{new Date(cert.issueDate).toLocaleDateString()}</td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cert.blockchainStored ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {cert.blockchainStored ? 'Stored' : 'Pending'}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleEdit(cert)}
                            className="btn-secondary px-3 py-2 text-xs"
                          >
                            ✏️ Edit
                          </button>
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
  )
}

export default UniversityCertificates

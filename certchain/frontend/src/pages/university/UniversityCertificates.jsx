import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'

const UniversityCertificates = () => {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

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
    <div className="flex">
      <Sidebar role="university" />
      <div className="ml-60 flex-1 p-8">
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

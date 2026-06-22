import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useAuth } from '../../context/AuthContext'

const UniversityDashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
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
      toast.error('Failed to fetch certificates')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  const totalIssued = certificates.length
  const thisMonth = certificates.filter(
    (c) => new Date(c.createdAt).getMonth() === new Date().getMonth()
  ).length
  const blockchainStored = certificates.filter((c) => c.blockchainStored).length

  return (
    <div className="flex">
      <Sidebar role="university" />

      <div className="flex-1 main-content">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-blue-dark">University Dashboard</h1>
              <p className="text-gray-600 mt-2">{user?.universityName || 'University'}</p>
            </div>
            <button
              onClick={() => navigate('/university/issue')}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-all"
            >
              + Issue Certificate
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card-base p-6">
              <p className="text-gray-600 text-sm font-semibold mb-2">TOTAL ISSUED</p>
              <p className="text-3xl font-bold text-blue-dark">{totalIssued}</p>
            </div>
            <div className="card-base p-6">
              <p className="text-gray-600 text-sm font-semibold mb-2">THIS MONTH</p>
              <p className="text-3xl font-bold text-blue-dark">{thisMonth}</p>
            </div>
            <div className="card-base p-6">
              <p className="text-gray-600 text-sm font-semibold mb-2">BLOCKCHAIN STORED</p>
              <p className="text-3xl font-bold text-blue-dark">{blockchainStored}</p>
            </div>
            <div className="card-base p-6">
              <p className="text-gray-600 text-sm font-semibold mb-2">PENDING</p>
              <p className="text-3xl font-bold text-blue-dark">0</p>
            </div>
          </div>

          {/* Certificates Table */}
          <div className="card-base p-6">
            <h2 className="text-xl font-bold text-blue-dark mb-6">Recent Certificates</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Student</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Degree</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.slice(0, 10).map((cert) => (
                    <tr key={cert._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{cert.studentName}</td>
                      <td className="px-4 py-3">{cert.degree}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            cert.blockchainStored
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {cert.blockchainStored ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(cert.createdAt).toLocaleDateString()}
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

export default UniversityDashboard

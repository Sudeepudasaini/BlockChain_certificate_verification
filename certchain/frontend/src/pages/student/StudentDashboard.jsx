import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'
import CertificateCard from '../../components/CertificateCard'

const StudentDashboard = () => {
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
      toast.error('Failed to fetch certificates')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  const blockchainVerified = certificates.filter((c) => c.blockchainStored).length

  return (
    <div className="flex">
      <Sidebar role="student" />

      <div className="ml-60 flex-1">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-blue-dark mb-8">My Certificates</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-base p-6">
              <p className="text-gray-600 text-sm font-semibold mb-2">TOTAL CERTIFICATES</p>
              <p className="text-3xl font-bold text-blue-dark">{certificates.length}</p>
            </div>
            <div className="card-base p-6">
              <p className="text-gray-600 text-sm font-semibold mb-2">VERIFIED ON BLOCKCHAIN</p>
              <p className="text-3xl font-bold text-green-600">{blockchainVerified}</p>
            </div>
            <div className="card-base p-6">
              <p className="text-gray-600 text-sm font-semibold mb-2">STATUS</p>
              <p className="text-3xl font-bold text-blue-dark">✓ Valid</p>
            </div>
          </div>

          {/* Certificates */}
          {certificates.length === 0 ? (
            <div className="card-base p-12 text-center">
              <p className="text-2xl text-gray-600">📄 No certificates found</p>
              <p className="text-gray-500 mt-2">Check back later for your academic certificates</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <CertificateCard key={cert._id} certificate={cert} showActions={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard

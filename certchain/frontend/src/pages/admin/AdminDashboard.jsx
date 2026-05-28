import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [certificates, setCertificates] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [statsRes, certsRes, usersRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/certificates'),
        api.get('/admin/users'),
      ])

      setStats(statsRes.data)
      setCertificates(certsRes.data.certificates?.slice(0, 10) || [])
      setUsers(usersRes.data.users || [])
    } catch (error) {
      toast.error('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="flex">
      <Sidebar role="admin" />

      <div className="ml-60 flex-1">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-blue-dark">System Dashboard</h1>
            <div className="flex gap-4">
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                🟢 Blockchain Connected
              </span>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card-base p-6">
              <p className="text-gray-600 text-sm font-semibold mb-2">TOTAL CERTIFICATES</p>
              <p className="text-3xl font-bold text-blue-dark">{stats?.totalCertificates || 0}</p>
            </div>
            <div className="card-base p-6">
              <p className="text-gray-600 text-sm font-semibold mb-2">TOTAL USERS</p>
              <p className="text-3xl font-bold text-blue-dark">{stats?.totalUsers || 0}</p>
            </div>
            <div className="card-base p-6">
              <p className="text-gray-600 text-sm font-semibold mb-2">ISSUED TODAY</p>
              <p className="text-3xl font-bold text-blue-dark">{stats?.certificatesToday || 0}</p>
            </div>
            <div className="card-base p-6">
              <p className="text-gray-600 text-sm font-semibold mb-2">BLOCKCHAIN STORED</p>
              <p className="text-3xl font-bold text-blue-dark">{stats?.blockchainStored || 0}</p>
            </div>
          </div>

          {/* Certificates Table */}
          <div className="card-base p-6 mb-8">
            <h2 className="text-xl font-bold text-blue-dark mb-6">Recent Certificates</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Student</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">University</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {certificates.map((cert) => (
                    <tr key={cert._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">{cert.studentName}</td>
                      <td className="px-4 py-3">{cert.universityName}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            cert.isRevoked
                              ? 'bg-red-100 text-red-700'
                              : cert.blockchainStored
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {cert.isRevoked ? 'Revoked' : cert.blockchainStored ? 'Verified' : 'Pending'}
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

          {/* Users Table */}
          <div className="card-base p-6">
            <h2 className="text-xl font-bold text-blue-dark mb-6">Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 10).map((user) => (
                    <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            user.isActive
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
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

export default AdminDashboard

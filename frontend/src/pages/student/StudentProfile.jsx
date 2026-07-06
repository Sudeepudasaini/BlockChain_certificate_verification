import React, { useEffect, useState } from 'react'
import api from '../../api/axios'
import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../context/AuthContext'

const StudentProfile = () => {
  const { user } = useAuth()
  const [studentId, setStudentId] = useState(user?.studentId || '')

  useEffect(() => {
    const loadStudentId = async () => {
      if (user?.studentId) {
        setStudentId(user.studentId)
        return
      }

      try {
        const response = await api.get('/certificates/my')
        const certificates = response?.data?.certificates || []
        const certificateStudentId = certificates.find((certificate) => certificate?.studentId)?.studentId
        setStudentId(certificateStudentId || '')
      } catch (error) {
        console.error('Failed to load student ID', error)
      }
    }

    if (user?.role === 'student') {
      loadStudentId()
    }
  }, [user])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar role="student" />
      <div className="flex-1 overflow-y-auto overflow-x-hidden main-content p-8">
        <div className="card-base p-8 max-w-3xl">
          <h1 className="text-4xl font-bold text-blue-dark mb-4">Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-semibold text-blue-dark">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold text-blue-dark">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-semibold text-blue-dark">{user?.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Student ID</p>
              <p className="text-lg font-semibold text-blue-dark">{studentId || 'Not set'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile

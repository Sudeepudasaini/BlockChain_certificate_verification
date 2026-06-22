import React from 'react'
import Sidebar from '../../components/Sidebar'
import { useAuth } from '../../context/AuthContext'

const VerifierProfile = () => {
  const { user } = useAuth()
  return (
    <div className="flex">
      <Sidebar role="verifier" />
      <div className="flex-1 main-content p-8">
        <div className="card-base p-8 max-w-3xl">
          <h1 className="text-4xl font-bold text-blue-dark mb-4">Verifier Profile</h1>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifierProfile

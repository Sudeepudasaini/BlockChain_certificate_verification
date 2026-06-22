import React from 'react'
import Sidebar from '../../components/Sidebar'

const AdminSettings = () => {
  return (
    <div className="flex">
      <Sidebar role="admin" />
        <div className="flex-1 main-content p-8">
        <div className="card-base p-8">
          <h1 className="text-4xl font-bold text-blue-dark mb-4">Admin Settings</h1>
          <p className="text-gray-600">
            Manage global application settings, access key configuration, and review administrative tools.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings

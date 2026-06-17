import React from 'react'
import Sidebar from '../../components/Sidebar'

const UniversitySettings = () => {
  return (
    <div className="flex">
      <Sidebar role="university" />
      <div className="ml-60 flex-1 p-8">
        <div className="card-base p-8">
          <h1 className="text-4xl font-bold text-blue-dark mb-4">University Settings</h1>
          <p className="text-gray-600">
            Manage your university profile details, notification preferences, and certificate settings.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UniversitySettings

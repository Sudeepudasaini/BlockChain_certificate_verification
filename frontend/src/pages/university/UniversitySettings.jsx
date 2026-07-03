import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'

const UniversitySettings = () => {
  const [loading, setLoading] = useState(true)
  const [savingProfile, setSavingProfile] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)

  // Profile state
  const [profile, setProfile] = useState({
    name: '',
    universityCode: '',
    email: '',
    phone: '',
    address: '',
    isActive: true,
  })

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    address: '',
  })

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await api.get('/university/profile')
      if (response?.data?.success && response?.data?.university) {
        const universityData = response.data.university
        setProfile(universityData)
        setEditForm({
          name: universityData.name,
          phone: universityData.phone || '',
          address: universityData.address || '',
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = async () => {
    try {
      setSavingProfile(true)
      const response = await api.put('/university/profile', {
        name: editForm.name,
        phone: editForm.phone,
        address: editForm.address,
      })

      if (response?.data?.success) {
        toast.success(response.data.message || 'Profile updated successfully')
        setProfile(response.data.university)
        setEditForm({
          name: response.data.university.name,
          phone: response.data.university.phone || '',
          address: response.data.university.address || '',
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setSavingProfile(false)
    }
  }

  const handlePasswordChange = (field, value) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleChangePassword = async () => {
    // Client-side validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error('All password fields are required')
      return
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long')
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New password and confirm password do not match')
      return
    }

    try {
      setChangingPassword(true)
      const response = await api.put('/university/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })

      if (response?.data?.success) {
        toast.success(response.data.message || 'Password changed successfully')
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password')
    } finally {
      setChangingPassword(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex">
      <Sidebar role="university" />

      <div className="flex-1 main-content p-8">
        <h1 className="text-4xl font-bold text-blue-dark mb-8">University Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Card */}
          <div className="card-base p-8">
            <h2 className="text-2xl font-bold text-blue-dark mb-6">University Profile</h2>

            {/* University Code (Read-only) */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">University Code</label>
              <input
                type="text"
                value={profile.universityCode || ''}
                disabled
                className="w-full px-4 py-3 bg-gray-100 text-gray-600 border border-gray-200 rounded-lg cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Contact admin to change this</p>
            </div>

            {/* Email (Read-only) */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profile.email || ''}
                disabled
                className="w-full px-4 py-3 bg-gray-100 text-gray-600 border border-gray-200 rounded-lg cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Contact admin to change this</p>
            </div>

            {/* Name (Editable) */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="input-base"
                placeholder="University name"
              />
            </div>

            {/* Phone (Editable) */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                value={editForm.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
                className="input-base"
                placeholder="10-digit phone number"
              />
            </div>

            {/* Address (Editable) */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
              <textarea
                value={editForm.address}
                onChange={(e) => handleProfileChange('address', e.target.value)}
                className="input-base"
                placeholder="University address"
                rows="4"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveProfile}
              disabled={savingProfile}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-all disabled:opacity-50"
            >
              {savingProfile ? 'Saving...' : 'Save Profile'}
            </button>
          </div>

          {/* Change Password Card */}
          <div className="card-base p-8">
            <h2 className="text-2xl font-bold text-blue-dark mb-6">Change Password</h2>

            {/* Current Password */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                className="input-base"
                placeholder="Enter current password"
              />
            </div>

            {/* New Password */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                className="input-base"
                placeholder="Enter new password (min 8 characters)"
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                className="input-base"
                placeholder="Confirm new password"
              />
            </div>

            {/* Change Password Button */}
            <button
              onClick={handleChangePassword}
              disabled={changingPassword}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-all disabled:opacity-50"
            >
              {changingPassword ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UniversitySettings

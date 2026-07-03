import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'

const AdminSettings = () => {
  const [loading, setLoading] = useState(true)
  const [savingProfile, setSavingProfile] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)

  const [profile, setProfile] = useState({
    name: '',
    email: '',
  })

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/profile')
      if (response?.data?.admin) {
        const adminData = response.data.admin
        setProfile(adminData)
        setEditForm({
          name: adminData.name || '',
          email: adminData.email || '',
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const handleProfileChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveProfile = async () => {
    if (!editForm.name.trim()) {
      toast.error('Name is required')
      return
    }

    try {
      setSavingProfile(true)
      const response = await api.put('/admin/profile', {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
      })

      if (response?.data?.admin) {
        toast.success(response.data.message || 'Profile updated successfully')
        setProfile(response.data.admin)
        setEditForm({
          name: response.data.admin.name || '',
          email: response.data.admin.email || '',
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update profile')
    } finally {
      setSavingProfile(false)
    }
  }

  const handlePasswordChange = (field, value) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleChangePassword = async () => {
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
      const response = await api.put('/admin/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })

      if (response?.data?.admin) {
        toast.success(response.data.message || 'Password updated successfully')
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to change password')
    } finally {
      setChangingPassword(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 main-content p-8">
        <h1 className="text-4xl font-bold text-blue-dark mb-8">Admin Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-base p-8">
            <h2 className="text-2xl font-bold text-blue-dark mb-6">Admin Profile</h2>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="input-base"
                placeholder="Your full name"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="input-base"
                placeholder="your@email.com"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={savingProfile}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-all disabled:opacity-50"
            >
              {savingProfile ? 'Saving...' : 'Save Profile'}
            </button>
          </div>

          <div className="card-base p-8">
            <h2 className="text-2xl font-bold text-blue-dark mb-6">Change Password</h2>

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

            <button
              onClick={handleChangePassword}
              disabled={changingPassword}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-all disabled:opacity-50"
            >
              {changingPassword ? 'Updating...' : 'Change Password'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings

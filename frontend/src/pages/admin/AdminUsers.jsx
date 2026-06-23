import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' })
  const [modalLoading, setModalLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users')
      setUsers(response.data.users || [])
    } catch (error) {
      toast.error('Unable to load users')
    } finally {
      setLoading(false)
    }
  }

  const toggleStatus = async (id) => {
    try {
      const response = await api.patch(`/admin/users/${id}/status`)
      setUsers((prev) => prev.map((user) => (user._id === id ? response.data.user : user)))
      toast.success('Status updated')
    } catch (error) {
      toast.error('Failed to update user status')
    }
  }

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return
    try {
      await api.delete(`/admin/users/${id}`)
      setUsers((prev) => prev.filter((user) => user._id !== id))
      toast.success('User removed')
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 main-content p-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-blue-dark">Manage Users</h1>
          </div>
          <div className="card-base p-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-3 text-sm text-gray-600">Name</th>
                  <th className="p-3 text-sm text-gray-600">Email</th>
                  <th className="p-3 text-sm text-gray-600">Role</th>
                  <th className="p-3 text-sm text-gray-600">Status</th>
                  <th className="p-3 text-sm text-gray-600">Joined</th>
                  <th className="p-3 text-sm text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 capitalize">{user.role}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="p-3 space-x-2">
                      <button onClick={() => toggleStatus(user._id)} className="px-3 py-2 bg-primary-600 text-white rounded-md text-xs">
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button onClick={() => deleteUser(user._id)} className="px-3 py-2 bg-red-100 text-red-700 rounded-md text-xs">
                        Delete
                      </button>
                      <button title="Reset Password" className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-md text-xs" onClick={(e) => { e.stopPropagation(); setSelectedUser(user); setPasswordForm({ newPassword: '', confirmPassword: '' }); setShowPasswordModal(true); }}>
                        Reset Password
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* PASSWORD MODAL */}
        {showPasswordModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-sm w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Reset Password</h3>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowPasswordModal(false)}>✕</button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-500">Resetting password for: <span className="font-medium text-gray-900">{selectedUser.name}</span></p>
                <div>
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-input" value={passwordForm.newPassword} onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))} />
                </div>
                <div>
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-input" value={passwordForm.confirmPassword} onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))} />
                </div>
              </div>
              <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
                <button className="btn-ghost" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                <button className="btn-primary" disabled={modalLoading} onClick={async () => {
                  if (passwordForm.newPassword !== passwordForm.confirmPassword) return toast.error('Passwords do not match')
                  if (passwordForm.newPassword.length < 8) return toast.error('Password must be 8+ characters')
                  try {
                    setModalLoading(true)
                    await api.patch(`/admin/users/${selectedUser._id}/reset-password`, { newPassword: passwordForm.newPassword })
                    toast.success('Password reset successfully')
                    setShowPasswordModal(false)
                    setPasswordForm({ newPassword: '', confirmPassword: '' })
                  } catch (err) {
                    toast.error('Failed to reset password')
                  } finally {
                    setModalLoading(false)
                  }
                }}>{modalLoading ? 'Resetting...' : 'Reset Password'}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUsers

import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/LoadingSpinner'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

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
      <div className="ml-60 flex-1 p-8">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers

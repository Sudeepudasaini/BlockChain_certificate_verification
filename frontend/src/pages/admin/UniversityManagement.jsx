import React, { useState, useEffect, useMemo } from 'react'
import api from '../../api/axios'
import { toast } from 'react-toastify'
import Sidebar from '../../components/Sidebar'

export default function UniversityManagement() {
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [stats, setStats] = useState({ total: 0, active: 0, disabled: 0 })
  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [selectedUniversity, setSelectedUniversity] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)
  // Forms
  const defaultCreate = { name: '', universityCode: '', email: '', password: '', phone: '', address: '', status: 'active' }
  const [createForm, setCreateForm] = useState(defaultCreate)
  const [editForm, setEditForm] = useState({ name: '', universityCode: '', phone: '', address: '', status: 'active' })
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' })

  useEffect(() => {
    try {
      const cached = localStorage.getItem('admin_universities')
      if (cached) {
        const list = JSON.parse(cached)
        setUniversities(list)
        setStats({ total: list.length, active: list.filter(u => u.isActive).length, disabled: list.filter(u => !u.isActive).length })
      }
    } catch (e) {}
    fetchUniversities()
  }, [])

  async function fetchUniversities() {
    try {
      setLoading(true)
      const res = await api.get('/admin/universities')
      const list = res.data.universities || []
      setUniversities(list)
      setStats({ total: list.length, active: list.filter(u => u.isActive).length, disabled: list.filter(u => !u.isActive).length })
      try { localStorage.setItem('admin_universities', JSON.stringify(list)) } catch (e) {}
    } catch (err) {
      toast.error('Failed to load universities')
    } finally {
      setLoading(false)
    }
  }

  const filteredUniversities = useMemo(() =>
    universities
      .filter(u => !searchQuery || [u.name, u.email, u.universityCode].some(f => f?.toLowerCase().includes(searchQuery.toLowerCase())))
      .filter(u => statusFilter === 'all' || (statusFilter === 'active' ? u.isActive : !u.isActive))
  , [universities, searchQuery, statusFilter])

  async function handleCreate() {
    try {
      // Validate phone if provided
      if (createForm.phone && !/^\d{10}$/.test(createForm.phone)) {
        toast.error('Phone number must be exactly 10 digits')
        return
      }
      setModalLoading(true)
      const res = await api.post('/admin/universities', createForm)
      const newUniversity = res.data?.university
      if (newUniversity) {
        setUniversities(prev => {
          const next = [newUniversity, ...prev]
          try { localStorage.setItem('admin_universities', JSON.stringify(next)) } catch (e) {}
          return next
        })
        setStats(s => ({ total: s.total + 1, active: s.active + (newUniversity.isActive ? 1 : 0), disabled: s.disabled + (newUniversity.isActive ? 0 : 1) }))
      }
      // optimistic update done — do not trigger background re-fetch that sets loading
      toast.success('University created successfully')
      setShowCreateModal(false)
      setCreateForm(defaultCreate)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create university')
    } finally {
      setModalLoading(false)
    }
  }

  async function handleEdit() {
    if (!selectedUniversity) return
    try {
      // Validate phone if provided
      if (editForm.phone && !/^\d{10}$/.test(editForm.phone)) {
        toast.error('Phone number must be exactly 10 digits')
        return
      }
      setModalLoading(true)
      const res = await api.patch(`/admin/universities/${selectedUniversity._id}`, editForm)
      const updated = res.data?.university
      if (updated) {
        setUniversities(prev => {
          const next = prev.map(u => u._id === updated._id ? updated : u)
          try { localStorage.setItem('admin_universities', JSON.stringify(next)) } catch (e) {}
          return next
        })
      }
      toast.success('University updated successfully')
      setShowEditModal(false)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update')
    } finally {
      setModalLoading(false)
    }
  }

  async function handleToggleStatus(id, currentIsActive) {
    try {
      const res = await api.patch(`/admin/universities/${id}/status`)
      const updated = res.data?.university
      if (updated) setUniversities(prev => {
        const next = prev.map(u => u._id === updated._id ? updated : u)
        try { localStorage.setItem('admin_universities', JSON.stringify(next)) } catch (e) {}
        return next
      })
      toast.success(`University ${currentIsActive ? 'disabled' : 'activated'} successfully`)
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  async function handleResetPassword() {
    if (!selectedUniversity) return
    if (passwordForm.newPassword !== passwordForm.confirmPassword) return toast.error('Passwords do not match')
    if (passwordForm.newPassword.length < 8) return toast.error('Password must be 8+ characters')
    try {
      setModalLoading(true)
      await api.patch(`/admin/universities/${selectedUniversity._id}/reset-password`, { newPassword: passwordForm.newPassword })
      toast.success('Password reset successfully')
      setShowPasswordModal(false)
      setPasswordForm({ newPassword: '', confirmPassword: '' })
    } catch (err) {
      toast.error('Failed to reset password')
    } finally {
      setModalLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar role="admin" />
      <div className="flex-1 p-6 space-y-6">

        {/* TOPBAR */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">University Management</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage all registered universities</p>
          </div>
          <button className="btn-primary" onClick={() => setShowCreateModal(true)}>+ Add University</button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          {
            [
              { label: 'Total Universities', value: stats.total, bg: 'bg-blue-100 dark:bg-blue-900/30', icon: '🏛️' },
              { label: 'Active', value: stats.active, bg: 'bg-green-100 dark:bg-green-900/30', icon: '✅' },
              { label: 'Disabled', value: stats.disabled, bg: 'bg-red-100 dark:bg-red-900/30', icon: '⛔' }
            ].map(s => (
              <div key={s.label} className="card p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${s.bg}`}>{s.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
                </div>
              </div>
            ))
          }
        </div>

        {/* FILTER BAR */}
        <div className="card p-4 flex gap-4 items-center">
          <input className="form-input flex-1" placeholder="Search by name, email, or code..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <select className="form-input w-40" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">Showing {filteredUniversities.length}</span>
        </div>

        {/* TABLE */}
        <div className="card overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12 text-gray-500">Loading...</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  {['University', 'Code', 'Email', 'Phone', 'Status', 'Created', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUniversities.length === 0 ? (
                  <tr><td colSpan={7} className="text-center p-12 text-gray-500 dark:text-gray-400">No universities found</td></tr>
                ) : filteredUniversities.map(u => (
                  <tr key={u._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-sm">{u.name?.charAt(0)?.toUpperCase()}</div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">{u.name}</p>
                          <p className="text-xs text-gray-500">{u.universityCode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{u.universityCode || '—'}</span></td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm">{u.email}</td>
                    <td className="px-4 py-3 text-gray-500 text-sm">{u.phone || '—'}</td>
                    <td className="px-4 py-3">
                      {u.isActive
                        ? <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">● Active</span>
                        : <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs rounded-full font-medium">● Disabled</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button title="Edit" className="p-1.5 rounded text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                          onClick={() => { setSelectedUniversity(u); setEditForm({ name: u.name, universityCode: u.universityCode || '', phone: u.phone || '', address: u.address || '', status: u.isActive ? 'active' : 'disabled' }); setShowEditModal(true) }}>
                          ✏️
                        </button>
                        <button title={u.isActive ? 'Disable' : 'Activate'} className={`p-1.5 rounded ${u.isActive ? 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20' : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'}`}
                          onClick={() => handleToggleStatus(u._id, u.isActive)}>
                          {u.isActive ? '⏸' : '▶️'}
                        </button>
                        <button title="Reset Password" className="p-1.5 rounded text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={(e) => { e.stopPropagation(); setSelectedUniversity(u); setPasswordForm({ newPassword: '', confirmPassword: '' }); setShowPasswordModal(true) }}>
                          🔑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* CREATE MODAL */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Add New University</h3>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => { setShowCreateModal(false); setCreateForm(defaultCreate) }}>✕</button>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                {[
                  { label: 'University Name*', col: 2, key: 'name', type: 'text' },
                  { label: 'University Code*', col: 1, key: 'universityCode', type: 'text', placeholder: 'e.g. TU, KU' },
                  { label: 'Email Address*', col: 2, key: 'email', type: 'email' },
                  { label: 'Password*', col: 1, key: 'password', type: 'password' },
                  { label: 'Phone', col: 1, key: 'phone', type: 'tel' },
                  { label: 'Address', col: 2, key: 'address', type: 'text' },
                ].map(f => (
                  <div key={f.key} className={f.col === 2 ? 'col-span-2' : ''}>
                    <label className="form-label">{f.label}</label>
                    <input
                      type={f.type}
                      className="form-input"
                      inputMode={f.key === 'phone' ? 'numeric' : undefined}
                      maxLength={f.key === 'phone' ? 10 : undefined}
                      pattern={f.key === 'phone' ? "\\d{10}" : undefined}
                      placeholder={f.placeholder || ''}
                      value={createForm[f.key]}
                      onChange={e => setCreateForm(p => ({ ...p, [f.key]: f.key === 'phone' ? e.target.value.replace(/\D/g, '').slice(0, 10) : (f.key === 'email' ? e.target.value.toLowerCase().trim() : e.target.value) }))}
                    />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="form-label">Status</label>
                  <select className="form-input" value={createForm.status} onChange={e => setCreateForm(p => ({ ...p, status: e.target.value }))}>
                    <option value="active">Active</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-700">
                <button className="btn-ghost" onClick={() => { setShowCreateModal(false); setCreateForm(defaultCreate) }}>Cancel</button>
                <button className="btn-primary" disabled={modalLoading} onClick={handleCreate}>{modalLoading ? 'Creating...' : 'Create University'}</button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT MODAL */}
        {showEditModal && selectedUniversity && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-xl w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Edit University</h3>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowEditModal(false)}>✕</button>
              </div>
              <div className="p-6 space-y-4">
                <div className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">{selectedUniversity.email} (email cannot be changed)</div>
                <div className="grid grid-cols-2 gap-4">
                  {[{ label: 'University Name', key: 'name', col: 2 }, { label: 'University Code', key: 'universityCode', col: 1 }, { label: 'Phone', key: 'phone', col: 1 }, { label: 'Address', key: 'address', col: 2 }].map(f => (
                    <div key={f.key} className={f.col === 2 ? 'col-span-2' : ''}>
                      <label className="form-label">{f.label}</label>
                      <input type="text" className="form-input" value={editForm[f.key]} onChange={e => setEditForm(p => ({ ...p, [f.key]: e.target.value }))} />
                    </div>
                  ))}
                  <div className="col-span-2">
                    <label className="form-label">Status</label>
                    <select className="form-input" value={editForm.status} onChange={e => setEditForm(p => ({ ...p, status: e.target.value }))}>
                      <option value="active">Active</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-700">
                <button className="btn-ghost" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="btn-primary" disabled={modalLoading} onClick={handleEdit}>{modalLoading ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </div>
          </div>
        )}

        {/* PASSWORD MODAL */}
        {showPasswordModal && selectedUniversity && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-sm w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Reset Password</h3>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowPasswordModal(false)}>✕</button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Resetting password for: <span className="font-medium text-gray-900 dark:text-white">{selectedUniversity.name}</span></p>
                <div>
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-input" value={passwordForm.newPassword} onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))} />
                </div>
                <div>
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-input" value={passwordForm.confirmPassword} onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))} />
                </div>
              </div>
              <div className="flex justify-end gap-3 p-6 border-t border-gray-100 dark:border-gray-700">
                <button className="btn-ghost" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                <button className="btn-primary" disabled={modalLoading} onClick={handleResetPassword}>{modalLoading ? 'Resetting...' : 'Reset Password'}</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

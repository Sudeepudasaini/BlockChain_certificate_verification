import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Sidebar = ({ role }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const getNavItems = () => {
    const routes = {
      admin: [
        { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
        { label: 'Users', path: '/admin/users', icon: '👥' },
        { label: 'Certificates', path: '/admin/certificates', icon: '📜' },
        { label: 'Settings', path: '/admin/settings', icon: '⚙️' },
      ],
      university: [
        { label: 'Dashboard', path: '/university/dashboard', icon: '🏢' },
        { label: 'Issue Certificate', path: '/university/issue', icon: '📝' },
        { label: 'Certificates', path: '/university/certificates', icon: '📜' },
        { label: 'Settings', path: '/university/settings', icon: '⚙️' },
      ],
      student: [
        { label: 'My Certificates', path: '/student/dashboard', icon: '🎓' },
        { label: 'Downloads', path: '/student/downloads', icon: '📥' },
        { label: 'Profile', path: '/student/profile', icon: '👤' },
      ],
      verifier: [
        { label: 'Verify', path: '/verifier/dashboard', icon: '✓' },
        { label: 'History', path: '/verifier/history', icon: '📋' },
        { label: 'Profile', path: '/verifier/profile', icon: '👤' },
      ],
    }
    return routes[role] || []
  }

  const navItems = getNavItems()

  return (
    <div className="sidebar-panel w-64 min-h-screen p-6 fixed left-0 top-16 overflow-auto">
      <div className="mb-8">
        <h2 className="text-lg font-bold leading-tight">
          {role === 'admin' && '👨‍💼 Admin Portal'}
          {role === 'university' && '🏢 University Portal'}
          {role === 'student' && '🎓 Student Portal'}
          {role === 'verifier' && '✓ Verifier Portal'}
        </h2>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
                isActive ? 'sidebar-link-active' : 'sidebar-link'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="w-full mt-8 btn-secondary"
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  )
}

export default Sidebar

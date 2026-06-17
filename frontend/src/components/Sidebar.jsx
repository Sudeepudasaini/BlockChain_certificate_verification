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
        { label: 'University Management', path: '/admin/universities', icon: 'building' },
        { label: 'Verifier Management', path: '/admin/verifiers', icon: 'search' },
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
        { label: 'Career Counseling', path: '/student/career-counseling', icon: 'compass' },
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

  const renderIcon = (icon) => {
    switch (icon) {
      case 'building':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="9" width="14" height="10" rx="1" />
            <rect x="7" y="3" width="6" height="6" rx="0.5" />
            <rect x="5" y="12" width="3" height="7" rx="0.3" />
            <rect x="12" y="12" width="3" height="7" rx="0.3" />
          </svg>
        )
      case 'compass':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="10" cy="10" r="7" />
            <polygon points="10,5 11.5,9 10,10 8.5,9" strokeLinejoin="round" />
            <polygon points="10,15 8.5,11 10,10 11.5,11" strokeLinejoin="round" />
          </svg>
        )
      case 'search':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8.5" cy="8.5" r="5" />
            <line x1="12.5" y1="12.5" x2="17" y2="17" strokeLinecap="round" />
          </svg>
        )
      default:
        return <span className="text-lg">{icon}</span>
    }
  }

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-800 via-blue-800 to-blue-900 text-white h-screen min-h-screen p-6 sticky top-0 overflow-y-auto shadow-xl flex-shrink-0" role="complementary" aria-label="Sidebar">
      <div className="mb-8">
        <h2 className="text-base font-semibold leading-tight text-white/95 flex items-center gap-2">
          <span className="text-2xl">{role === 'admin' ? '👨‍💼' : role === 'university' ? '🏢' : role === 'student' ? '🎓' : '✓'}</span>
          <span className="truncate">{role === 'admin' ? 'Admin Portal' : role === 'university' ? 'University Portal' : role === 'student' ? 'Student Portal' : 'Verifier Portal'}</span>
        </h2>
      </div>

      <nav className="space-y-2" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-150 ease-in-out text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                isActive
                  ? 'bg-white/10 text-white shadow-md ring-1 ring-white/10 border-l-4 border-primary-400'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-current text-lg">
              {renderIcon(item.icon)}
            </span>
            <span className="font-medium truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-8">
        <button
          onClick={logout}
          className="w-full mt-2 px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-150 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

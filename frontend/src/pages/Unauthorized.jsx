import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Unauthorized() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-6 text-center">401 — Unauthorized</h1>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg text-center">You don't have permission to access this page.</p>

      <div className="card p-6 max-w-md mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
        This area requires different credentials. Make sure you're logged in with the correct account type.
        {user && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
            Currently logged in as: <span className="font-medium capitalize">{user.role}</span>
          </p>
        )}
      </div>

      <div className="flex gap-3 mt-6 flex-wrap justify-center">
        <button className="btn-ghost" onClick={()=>navigate(-1)}>← Go Back</button>
        <button className="btn-primary" onClick={()=>navigate('/')}>Go to Home</button>
        <button className="btn-outline" onClick={()=>navigate('/login')}>Login as Different Role</button>
      </div>
    </div>
  )
}

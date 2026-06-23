import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true) // true until we verify session

  // Restore and verify session on app startup
  useEffect(() => {
    const init = async () => {
      const storedToken = localStorage.getItem('certchain_token')
      if (!storedToken) {
        setLoading(false)
        return
      }

      // Optimistically set token for request interceptor to pick up
      setToken(storedToken)

      try {
        // skipAuthRedirect prevents axios interceptor from redirecting while we restore
        const res = await api.get('/auth/me', { skipAuthRedirect: true })
        const userFromServer = res.data?.user
        if (userFromServer) {
          setUser(userFromServer)
          localStorage.setItem('certchain_user', JSON.stringify(userFromServer))
        } else {
          // invalid session
          setUser(null)
          setToken(null)
          localStorage.removeItem('certchain_user')
          localStorage.removeItem('certchain_token')
        }
      } catch (err) {
        // token invalid or network error - clear session
        setUser(null)
        setToken(null)
        localStorage.removeItem('certchain_user')
        localStorage.removeItem('certchain_token')
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [])

  const login = (userData, tokenData) => {
    setUser(userData)
    setToken(tokenData)
    localStorage.setItem('certchain_user', JSON.stringify(userData))
    localStorage.setItem('certchain_token', tokenData)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('certchain_user')
    localStorage.removeItem('certchain_token')
    // notify backend if needed in future
    window.location.href = '/'
  }

  const isAuthenticated = !!token && !!user

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

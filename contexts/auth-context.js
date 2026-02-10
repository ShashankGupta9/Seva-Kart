"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null) // 'user' or 'provider'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("sevakart_user")
    const savedUserType = localStorage.getItem("sevakart_user_type")

    if (savedUser && savedUserType) {
      setUser(JSON.parse(savedUser))
      setUserType(savedUserType)
    }
    setLoading(false)
  }, [])

  const login = (userData, type) => {
    setUser(userData)
    setUserType(type)
    localStorage.setItem("sevakart_user", JSON.stringify(userData))
    localStorage.setItem("sevakart_user_type", type)
  }

  const logout = () => {
    setUser(null)
    setUserType(null)
    localStorage.removeItem("sevakart_user")
    localStorage.removeItem("sevakart_user_type")
  }

  const signup = (userData, type) => {
    // In a real app, this would make an API call
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    login(newUser, type)
    return newUser
  }

  const value = {
    user,
    userType,
    loading,
    login,
    logout,
    signup,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

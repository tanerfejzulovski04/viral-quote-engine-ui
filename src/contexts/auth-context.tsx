import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (name: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_error) {
        localStorage.removeItem('user')
      }
    }
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (email: string, _password: string) => {
    // Mock login - in real app, this would call an API
    try {
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('John Doe')}&background=0084ff&color=fff`
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      throw new Error('Invalid credentials')
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const register = async (name: string, email: string, _password: string) => {
    // Mock registration - in real app, this would call an API
    try {
      const mockUser: User = {
        id: '1',
        name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0084ff&color=fff`
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      throw new Error('Registration failed')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
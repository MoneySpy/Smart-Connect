import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'user'
  avatar?: string
  department?: string
  position?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: RegisterData) => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  name: string
  role?: 'user'
}

// Mock user data for testing
const mockUsers = [
  {
    id: '1',
    email: 'admin@emspro.com',
    password: 'password123',
    name: 'ผู้ดูแลระบบ',
    role: 'admin' as const,
    department: 'ไอที',
    position: 'ผู้ดูแลระบบ'
  },
  {
    id: '2',
    email: 'manager@emspro.com',
    password: 'password123',
    name: 'ผู้จัดการ',
    role: 'manager' as const,
    department: 'การตลาด',
    position: 'ผู้จัดการ'
  },
  {
    id: '3',
    email: 'user@emspro.com',
    password: 'password123',
    name: 'พนักงาน',
    role: 'user' as const,
    department: 'ขาย',
    position: 'พนักงาน'
  }
]

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    // Check for existing token and validate
    const token = localStorage.getItem('authToken')
    const savedUser = localStorage.getItem('user')
    
    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        console.error('Failed to parse saved user:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Find user in mock data
      const mockUser = mockUsers.find(u => u.email === email && u.password === password)
      
      if (mockUser) {
        const { password: _, ...userData } = mockUser
        const token = `mock-token-${Date.now()}`
        
        localStorage.setItem('authToken', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
      } else {
        throw new Error('Invalid email or password')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email === userData.email)
      if (existingUser) {
        throw new Error('Email already exists')
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: 'user',
        department: 'ทั่วไป',
        position: 'พนักงาน'
      }
      
      const token = `mock-token-${Date.now()}`
      
      localStorage.setItem('authToken', token)
      localStorage.setItem('user', JSON.stringify(newUser))
      setUser(newUser)
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 
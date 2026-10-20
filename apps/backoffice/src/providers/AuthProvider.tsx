import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { TOKEN_KEY } from '../api/client'
import type { UserRole } from '../config/navigation'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (token: string, user: AuthUser) => void
  logout: () => void
  switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/** API returns roles[] (ADMIN/MODERATOR/MENTOR); the UI shows one role, Admin taking precedence. */
export function primaryRole(roles: string[] = []): UserRole {
  if (roles.includes('ADMIN')) return 'admin'
  if (roles.includes('MENTOR')) return 'mentor'
  return 'moderator'
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setIsLoading(false)
      return
    }

    // Validate token and fetch me
    fetch(`${API_URL}/backoffice/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized')
        return res.json()
      })
      .then((data) => {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          role: primaryRole(data.roles),
        })
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
        setUser(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const login = (token: string, newUser: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, token)
    setUser(newUser)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  const switchRole = (newRole: UserRole) => {
    if (user) {
      setUser({ ...user, role: newRole })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

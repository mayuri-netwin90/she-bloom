import { type ReactNode } from 'react'
import { Center, Loader } from '@mantine/core'
import { useAuth } from '../../providers/AuthProvider'
import type { UserRole } from '../../config/navigation'
import { Forbidden403 } from '../../pages/Error/Forbidden403'

export interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: UserRole[]
  fallback?: ReactNode
}

/**
 * ProtectedRoute Component.
 * - If user is not authenticated, triggers login fallback.
 * - If user's role is not included in allowedRoles, renders 403 Forbidden.
 */
export function ProtectedRoute({
  children,
  allowedRoles,
  fallback,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" color="brand-pink" />
      </Center>
    )
  }

  if (!isAuthenticated || !user) {
    return fallback ?? null
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Forbidden403 />
  }

  return <>{children}</>
}

import { useState } from 'react'
import { Text } from '@mantine/core'
import { AppLayout } from './layouts/AppLayout'
import { QueryProvider } from './providers/QueryProvider'
import { AuthProvider, primaryRole, useAuth } from './providers/AuthProvider'
import { ProtectedRoute } from './components/Guards/ProtectedRoute'
import { ActionModal } from './components/ActionModal'
import { LoginForm } from './pages/Auth/Login'
import { TwoFactorForm } from './pages/Auth/TwoFactor'
import { EnableTwoFactorForm } from './pages/Auth/EnableTwoFactor'
import { SetPasswordForm } from './pages/Auth/SetPassword'
import { RecoverPassword } from './pages/Auth/RecoverPassword'
import { AdminDashboard } from './pages/Dashboard'
import { AppUsersList, AppUserDetail } from './pages/AppUsers'
import './App.css'

function ConnectedLoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
      const response = await fetch(`${API_URL}/backoffice/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message ?? 'Unable to sign you in.')

      login(data.accessToken, {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: primaryRole(data.user.roles),
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign you in.')
    } finally {
      setLoading(false)
    }
  }

  // Allow previewing different screens via URL query: ?screen=dashboard, ?screen=users, ?screen=user-detail, etc.
  const params = new URLSearchParams(window.location.search)
  const screen = params.get('screen')

  if (screen === 'user-detail' || screen === 'user_detail' || screen === 'app-user-detail') {
    return (
      <AppLayout
        currentRole="admin"
        activePath="/users/app"
        user={{
          name: 'Giulia Ferri',
          email: 'giulia.ferri@shebloom.it',
          role: 'admin',
        }}
        onLogout={() => { window.location.search = '' }}
      >
        <AppUserDetail
          onBack={() => {
            const url = new URL(window.location.href)
            url.searchParams.set('screen', 'users')
            window.location.href = url.toString()
          }}
        />
      </AppLayout>
    )
  }

  if (screen === 'users' || screen === 'app-users' || screen === 'app_users') {
    return (
      <AppLayout
        currentRole="admin"
        activePath="/users/app"
        user={{
          name: 'Giulia Ferri',
          email: 'giulia.ferri@shebloom.it',
          role: 'admin',
        }}
        onLogout={() => { window.location.search = '' }}
      >
        <AppUsersList
          onSelectUser={() => {
            const url = new URL(window.location.href)
            url.searchParams.set('screen', 'user-detail')
            window.location.href = url.toString()
          }}
        />
      </AppLayout>
    )
  }

  if (screen === 'dashboard' || screen === 'admin' || screen === 'admin-dashboard') {
    return (
      <AppLayout
        currentRole="admin"
        activePath="/dashboard"
        user={{
          name: 'Giulia Ferri',
          email: 'giulia.ferri@shebloom.it',
          role: 'admin',
        }}
        onLogout={() => { window.location.search = '' }}
      >
        <AdminDashboard />
      </AppLayout>
    )
  }

  if (screen === '2fa' || screen === 'two-factor') {
    return <TwoFactorForm onCodeChange={() => {}} onUseRecoveryCode={() => alert('Recovery code clicked')} />
  }

  if (screen === 'enable-2fa') {
    return <EnableTwoFactorForm />
  }

  if (screen === 'set-password') {
    return <SetPasswordForm />
  }

  if (screen === 'recover' || screen === 'recover-password') {
    return <RecoverPassword onBackToLogin={() => { window.location.search = '' }} />
  }

  if (screen === 'recovery-sent' || screen === 'check-email') {
    return (
      <RecoverPassword
        initialSubmitted={true}
        onBackToLogin={() => { window.location.search = '' }}
      />
    )
  }

  if (screen === 'error' || screen === 'wrong-credentials') {
    return (
      <LoginForm
        email="giulia.ferri@shebloom.it"
        password="••••••"
        rememberMe={false}
        showError={true}
        errorMessage="Invalid email or password."
        onForgotPasswordClick={() => {
          const url = new URL(window.location.href)
          url.searchParams.set('screen', 'recover')
          window.history.pushState({}, '', url)
          window.location.reload()
        }}
      />
    )
  }

  if (screen === 'session-expired') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-canvas)' }}>
        <ActionModal
          opened={true}
          onClose={() => { window.location.search = '' }}
          onConfirm={() => { window.location.search = '' }}
          title="Session expired"
          confirmLabel="Log in again"
          cancelLabel="Cancel"
          isDestructive={false}
        >
          <Text size="sm">
            For security, your session was closed after 30 minutes of inactivity. Log in again to continue.
          </Text>
        </ActionModal>
      </div>
    )
  }

  return (
    <LoginForm
      email={email}
      password={password}
      rememberMe={rememberMe}
      isLoading={loading}
      showError={!!error}
      errorMessage={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onRememberMeChange={setRememberMe}
      onSubmit={handleSubmit}
      onForgotPasswordClick={() => {
        const url = new URL(window.location.href)
        url.searchParams.set('screen', 'recover')
        window.history.pushState({}, '', url)
        window.location.reload()
      }}
    />
  )
}

function MainAppShell() {
  const { user, logout, switchRole } = useAuth()
  const [currentPath, setCurrentPath] = useState('/dashboard')

  return (
    <ProtectedRoute fallback={<ConnectedLoginForm />}>
      {user && (
        <AppLayout
          currentRole={user.role}
          onRoleChange={switchRole}
          onLogout={logout}
          activePath={currentPath.startsWith('/users/app') ? '/users/app' : currentPath}
          onNavigate={(path) => setCurrentPath(path)}
          user={user}
        >
          {currentPath === '/users/app/detail' ? (
            <AppUserDetail onBack={() => setCurrentPath('/users/app')} />
          ) : currentPath === '/users/app' ? (
            <AppUsersList onSelectUser={() => setCurrentPath('/users/app/detail')} />
          ) : (
            <AdminDashboard />
          )}
        </AppLayout>
      )}
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <MainAppShell />
      </AuthProvider>
    </QueryProvider>
  )
}

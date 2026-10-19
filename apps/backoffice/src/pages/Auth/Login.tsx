import { Anchor, Button, Checkbox, Group, PasswordInput, Stack, Text, TextInput } from '@mantine/core'
import { AuthLayout } from './components/AuthLayout'
import { AuthHeader } from './components/AuthHeader'

export interface LoginFormProps {
  email?: string
  password?: string
  rememberMe?: boolean
  showError?: boolean
  errorMessage?: string
  isLoading?: boolean
  onEmailChange?: (val: string) => void
  onPasswordChange?: (val: string) => void
  onRememberMeChange?: (val: boolean) => void
  onSubmit?: (e: React.FormEvent) => void
  onForgotPasswordClick?: () => void
}

/**
 * Presentational Login Form Component.
 * Figma: Figma_3_Access.pdf - Frame 1
 */
export function LoginForm({
  email = '',
  password = '',
  rememberMe = true,
  showError = false,
  errorMessage = 'Incorrect email or password. Attempts left: 2',
  isLoading = false,
  onEmailChange,
  onPasswordChange,
  onRememberMeChange,
  onSubmit,
  onForgotPasswordClick,
}: LoginFormProps) {
  return (
    <AuthLayout>
      <AuthHeader
        title="Log in to the backoffice"
        subtitle="Enter the credentials you received by email."
      />

      <form onSubmit={onSubmit ?? ((e) => e.preventDefault())}>
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="giulia.ferri@shebloom.it"
            type="email"
            value={email}
            onChange={(e) => onEmailChange?.(e.currentTarget.value)}
            required
            autoComplete="email"
            size="md"
          />

          <div>
            <PasswordInput
              label="Password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => onPasswordChange?.(e.currentTarget.value)}
              required
              autoComplete="current-password"
              size="md"
              error={showError ? errorMessage : undefined}
            />
          </div>

          <Group justify="space-between" align="center" mt={4}>
            <Checkbox
              label="Remember me"
              checked={rememberMe}
              onChange={(e) => onRememberMeChange?.(e.currentTarget.checked)}
            />
            <Anchor
              href="/?screen=recover"
              size="sm"
              style={{ color: 'var(--text-link)', fontWeight: 500, textDecoration: 'none' }}
              onClick={(e) => {
                if (onForgotPasswordClick) {
                  e.preventDefault()
                  onForgotPasswordClick()
                }
              }}
            >
              Forgot password?
            </Anchor>
          </Group>

          <Button
            type="submit"
            size="md"
            fullWidth
            mt="md"
            loading={isLoading}
          >
            Log in
          </Button>

          <Text size="xs" ta="center" mt="sm" style={{ lineHeight: 1.5, color: 'var(--text-muted)' }}>
            Received an invitation? Use the link in the email to set your password.
          </Text>
        </Stack>
      </form>
    </AuthLayout>
  )
}

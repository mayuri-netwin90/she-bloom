import { Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { AuthLayout } from './components/AuthLayout'
import { AuthHeader } from './components/AuthHeader'
import { PasswordRequirementList } from './components/PasswordRequirementList'

export interface SetPasswordFormProps {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  isLoading?: boolean
  error?: string
  onPasswordChange?: (val: string) => void
  onConfirmPasswordChange?: (val: string) => void
  onSubmit?: (e: React.FormEvent) => void
}

/**
 * Presentational Set Password / Invitation Accept Form.
 * Figma: Figma_3_Access.pdf - Frame 4
 */
export function SetPasswordForm({
  name = 'Elisa',
  email = 'elisa.maestri@shebloom.it',
  password = '',
  confirmPassword = '',
  isLoading = false,
  error,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: SetPasswordFormProps) {
  // Compute checklist states for demonstration
  const hasMinLength = password.length >= 10
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password)

  return (
    <AuthLayout>
      <AuthHeader
        icon="key"
        title={`Welcome, ${name}`}
        subtitle="You've been invited to the She Bloom backoffice as a Mentor. Set your password to get started."
      />

      <form onSubmit={onSubmit ?? ((e) => e.preventDefault())}>
        <Stack gap="md">
          <TextInput
            label="Email"
            value={email}
            disabled
            size="md"
          />

          <PasswordInput
            label="New password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => onPasswordChange?.(e.currentTarget.value)}
            required
            size="md"
          />

          <PasswordInput
            label="Confirm password"
            placeholder="Repeat the password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange?.(e.currentTarget.value)}
            required
            size="md"
            error={error}
          />

          <PasswordRequirementList
            hasMinLength={hasMinLength}
            hasUppercase={hasUppercase}
            hasNumber={hasNumber}
            hasSpecialChar={hasSpecialChar}
          />

          <Button
            type="submit"
            size="md"
            fullWidth
            mt="xs"
            loading={isLoading}
          >
            Set password
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  )
}


import { useState } from 'react'
import { Anchor, Button, Center, Stack, TextInput } from '@mantine/core'
import { AuthLayout } from './components/AuthLayout'
import { AuthHeader } from './components/AuthHeader'

export interface RecoverPasswordProps {
  initialEmail?: string
  initialSubmitted?: boolean
  isLoading?: boolean
  onBackToLogin?: () => void
  onSendRecoveryLink?: (email: string) => void
}

/**
 * Presentational Password Recovery Flow (Request Link & Check Email Confirmation).
 * Figma: Figma_3_Access.pdf - Frame 5 & 6
 */
export function RecoverPassword({
  initialEmail = '',
  initialSubmitted = false,
  isLoading = false,
  onBackToLogin,
  onSendRecoveryLink,
}: RecoverPasswordProps) {
  const [email, setEmail] = useState(initialEmail)
  const [isSubmitted, setIsSubmitted] = useState(initialSubmitted)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSendRecoveryLink?.(email)
    setIsSubmitted(true)
  }

  return (
    <AuthLayout>
      {!isSubmitted ? (
        // Step 1: Request Password Reset
        <>
          <AuthHeader
            icon="mail"
            title="Recover your password"
            subtitle="We'll send you a link, valid for 30 minutes, to set a new one."
          />

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="giulia.ferri@shebloom.it"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
                size="md"
              />

              <Button
                type="submit"
                size="md"
                fullWidth
                mt="xs"
                loading={isLoading}
              >
                Send link
              </Button>

              <Center mt="xs">
                <Anchor
                  href="/"
                  size="sm"
                  style={{ color: 'var(--text-link)', fontWeight: 500, textDecoration: 'none' }}
                  onClick={(e) => {
                    if (onBackToLogin) {
                      e.preventDefault()
                      onBackToLogin()
                    }
                  }}
                >
                  ← Back to login
                </Anchor>
              </Center>
            </Stack>
          </form>
        </>
      ) : (
        // Step 2: Check Your Email Confirmation (Recovery sent)
        <>
          <AuthHeader
            icon="successCircle"
            title="Check your email"
            subtitle="If the address is registered, you'll receive a link to reset your password. The second factor can only be reset by an administrator."
          />

          <Stack gap="md">
            <Button
              component="a"
              href="/"
              variant="outline"
              color="brand-pink"
              size="md"
              fullWidth
              onClick={(e) => {
                if (onBackToLogin) {
                  e.preventDefault()
                  onBackToLogin()
                }
              }}
            >
              Back to login
            </Button>
          </Stack>
        </>
      )}
    </AuthLayout>
  )
}


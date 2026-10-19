import { useState } from 'react'
import { ActionIcon, Button, Group, Stack, Text, TextInput, Tooltip } from '@mantine/core'
import { AppIcon } from '../../components/AppIcon'
import { RoleBadge } from '../../components/RoleBadge'
import { AuthLayout } from './components/AuthLayout'
import { AuthHeader } from './components/AuthHeader'

export interface EnableTwoFactorFormProps {
  roleName?: string
  secretKey?: string
  code?: string
  isLoading?: boolean
  error?: string
  onCodeChange?: (val: string) => void
  onSubmit?: (e: React.FormEvent) => void
}

/**
 * Presentational Enable Two-Factor Authentication Form.
 * Figma: Figma_3_Access.pdf - Frame 3
 */
export function EnableTwoFactorForm({
  roleName = 'ADMIN',
  secretKey = 'JBSWY3DPEHPK3PXP',
  code = '',
  isLoading = false,
  error,
  onCodeChange,
  onSubmit,
}: EnableTwoFactorFormProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stepBadge = (num: number) => (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--bg-sidebar)',
        color: 'var(--text-on-sidebar)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {num}
    </div>
  )

  return (
    <AuthLayout>
      <AuthHeader
        icon="shieldCheck"
        title="Enable two-factor authentication"
        subtitle="It's on by default for your role. An administrator can turn it off in the user settings."
      />

      <Group gap="xs" align="center" mb="lg">
        <Text size="xs" c="var(--text-secondary)">
          Role:
        </Text>
        <RoleBadge role={roleName} />
      </Group>

      <form onSubmit={onSubmit ?? ((e) => e.preventDefault())}>
        <Stack gap="lg">
          {/* Step 1: Apps */}
          <Group gap="xs" align="center" wrap="nowrap">
            {stepBadge(1)}
            <Text size="xs" fw={600} style={{ color: 'var(--text-primary)' }}>
              Get Google/Microsoft Authenticator or 1Password.
            </Text>
          </Group>

          {/* Step 2: Scan QR or manual key */}
          <Stack gap="xs">
            <Group gap="xs" align="center" wrap="nowrap">
              {stepBadge(2)}
              <Text size="xs" fw={600} style={{ color: 'var(--text-primary)' }}>
                Scan the QR code with the app.
              </Text>
            </Group>

            <Group gap="md" align="center" mt={4} wrap="nowrap">
              {/* QR Mock Illustration container */}
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-default)',
                  backgroundColor: 'var(--bg-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AppIcon name="qrCode" size={54} stroke={1.5} color="var(--text-heading)" />
              </div>

              {/* Or enter key */}
              <Stack gap={4}>
                <Text size="11px" c="var(--text-secondary)">
                  Or enter the key
                </Text>
                <Group gap={6} align="center" wrap="nowrap">
                  <Text
                    size="xs"
                    fw={700}
                    style={{
                      fontFamily: 'monospace',
                      letterSpacing: '0.08em',
                      color: 'var(--text-heading)',
                    }}
                  >
                    {secretKey}
                  </Text>
                  <Tooltip label={copied ? 'Copied!' : 'Copy key'} withArrow position="top">
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      size="sm"
                      onClick={handleCopy}
                      aria-label="Copy secret key"
                    >
                      <AppIcon name={copied ? 'check' : 'copy'} size={14} stroke={1.5} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Stack>
            </Group>
          </Stack>

          {/* Step 3: Enter code */}
          <Stack gap={6}>
            <Group gap="xs" align="center" wrap="nowrap">
              {stepBadge(3)}
              <Text size="xs" fw={600} style={{ color: 'var(--text-primary)' }}>
                Enter the 6-digit code to confirm.
              </Text>
            </Group>

            <TextInput
              label="Code"
              placeholder="000000"
              maxLength={6}
              value={code}
              onChange={(e) => onCodeChange?.(e.currentTarget.value)}
              error={error}
              size="md"
            />
          </Stack>

          <Button
            type="submit"
            size="md"
            fullWidth
            mt="xs"
            loading={isLoading}
          >
            Enable and continue
          </Button>
        </Stack>
      </form>
    </AuthLayout>
  )
}


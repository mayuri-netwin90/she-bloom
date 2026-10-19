import { Group, Stack, Text } from '@mantine/core'
import { AppIcon } from '../../../components/AppIcon'

export interface PasswordRequirementListProps {
  hasMinLength?: boolean // At least 10 characters
  hasUppercase?: boolean // One uppercase letter
  hasNumber?: boolean // One number
  hasSpecialChar?: boolean // One special character
}

/**
 * Reusable visual checklist for password complexity requirements.
 */
export function PasswordRequirementList({
  hasMinLength = false,
  hasUppercase = false,
  hasNumber = false,
  hasSpecialChar = false,
}: PasswordRequirementListProps) {
  const requirements = [
    { label: 'At least 10 characters', met: hasMinLength },
    { label: 'One uppercase letter', met: hasUppercase },
    { label: 'One number', met: hasNumber },
    { label: 'One special character', met: hasSpecialChar },
  ]

  return (
    <div
      style={{
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-subtle)',
        padding: '12px 16px',
        margin: '4px 0',
      }}
    >
      <Stack gap={6}>
        {requirements.map((req, index) => (
          <Group key={index} gap="xs" align="center" wrap="nowrap">
            <AppIcon
              name={req.met ? 'check' : 'close'}
              size={14}
              stroke={2}
              color={req.met ? 'var(--status-success-fg)' : 'var(--text-muted)'}
            />
            <Text
              size="xs"
              style={{
                color: req.met ? 'var(--status-success-fg)' : 'var(--text-secondary)',
                fontWeight: req.met ? 500 : 400,
                fontFamily: 'var(--font-family-body)',
              }}
            >
              {req.label}
            </Text>
          </Group>
        ))}
      </Stack>
    </div>
  )
}

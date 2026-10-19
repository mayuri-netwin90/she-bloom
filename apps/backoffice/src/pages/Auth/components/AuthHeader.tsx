import { Stack, Text, Title } from '@mantine/core'
import { AppIcon, type AppIconName } from '../../../components/AppIcon'

export interface AuthHeaderProps {
  title: string
  subtitle: string
  icon?: AppIconName
}

/**
 * Reusable AuthHeader component for authentication views.
 * Formats title in Playfair Display serif font and subtitle in dimmed body text.
 */
export function AuthHeader({ title, subtitle, icon }: AuthHeaderProps) {
  return (
    <Stack gap="xs" mb={{ base: 'md', sm: 'xl' }}>
      {icon && (
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-brand-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '4px',
          }}
        >
          <AppIcon name={icon} size={22} stroke={1.5} color="var(--brand-primary)" />
        </div>
      )}
      <Title
        order={1}
        size="h2"
        style={{
          fontFamily: 'var(--font-family-heading)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: 'var(--text-heading)',
        }}
      >
        {title}
      </Title>
      <Text size="sm" style={{ lineHeight: 1.5, color: 'var(--text-secondary)' }}>
        {subtitle}
      </Text>
    </Stack>
  )
}

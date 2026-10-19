import { type ReactNode } from 'react'
import { Loader, Stack, Text, Title, Button } from '@mantine/core'
import { AppIcon, type AppIconName } from '../AppIcon'

export interface StatePlaceholderProps {
  type: 'loading' | 'empty' | 'error'
  title?: string
  message?: string
  action?: ReactNode
  actionLabel?: string
  onAction?: () => void
  icon?: AppIconName
}

/**
 * StatePlaceholder (EmptyState / Loading / Error) Component:
 * Aligned with Figma § Feedback e overlay - EmptyState:
 * - Circular icon badge container (soft violet/pink background)
 * - Heading title (Playfair / typography heading token)
 * - Dimmed descriptive message
 * - Primary CTA button (e.g. "+ Create first" / "+ Crea il primo")
 */
export function StatePlaceholder({
  type,
  title,
  message,
  action,
  actionLabel,
  onAction,
  icon,
}: StatePlaceholderProps) {
  if (type === 'loading') {
    return (
      <Stack align="center" justify="center" py="2xl" ta="center" gap="sm">
        <Loader color="var(--brand-primary)" size="lg" />
        {title && (
          <Title
            order={4}
            fw={600}
            mt="xs"
            style={{
              fontFamily: 'var(--font-family-heading)',
              color: 'var(--text-heading)',
            }}
          >
            {title}
          </Title>
        )}
        {message && (
          <Text
            size="sm"
            style={{
              fontFamily: 'var(--font-family-body)',
              color: 'var(--text-secondary)',
            }}
          >
            {message}
          </Text>
        )}
      </Stack>
    )
  }

  if (type === 'empty') {
    return (
      <Stack align="center" justify="center" py="2xl" ta="center" gap="xs">
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-violet-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--spacing-xs)',
          }}
        >
          <AppIcon
            name={icon ?? 'layers'}
            size={28}
            stroke={1.5}
            color="var(--brand-secondary)"
          />
        </div>
        <Title
          order={4}
          fw={600}
          style={{
            fontFamily: 'var(--font-family-heading)',
            color: 'var(--text-heading)',
          }}
        >
          {title ?? 'No items found'}
        </Title>
        {message && (
          <Text
            size="sm"
            maw={420}
            style={{
              fontFamily: 'var(--font-family-body)',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}
          >
            {message}
          </Text>
        )}
        {(action || actionLabel) && (
          <div style={{ marginTop: 'var(--spacing-sm)' }}>
            {action ?? (
              <Button
                variant="filled"
                leftSection={<AppIcon name="plus" size={16} stroke={2} />}
                onClick={onAction}
              >
                {actionLabel ?? 'Create first'}
              </Button>
            )}
          </div>
        )}
      </Stack>
    )
  }

  // Error state
  return (
    <Stack align="center" justify="center" py="2xl" ta="center" gap="xs">
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--bg-danger-soft)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--spacing-xs)',
        }}
      >
        <AppIcon
          name={icon ?? 'warning'}
          size={28}
          stroke={1.5}
          color="var(--color-danger)"
        />
      </div>
      <Title
        order={4}
        fw={600}
        style={{
          fontFamily: 'var(--font-family-heading)',
          color: 'var(--color-danger)',
        }}
      >
        {title ?? 'Something went wrong'}
      </Title>
      {message && (
        <Text
          size="sm"
          maw={420}
          style={{
            fontFamily: 'var(--font-family-body)',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          {message}
        </Text>
      )}
      {(action || actionLabel) && (
        <div style={{ marginTop: 'var(--spacing-sm)' }}>
          {action ?? (
            <Button variant="outline" color="red" onClick={onAction}>
              {actionLabel ?? 'Try again'}
            </Button>
          )}
        </div>
      )}
    </Stack>
  )
}


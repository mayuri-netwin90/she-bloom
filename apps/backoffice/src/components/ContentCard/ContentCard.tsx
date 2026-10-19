import React, { type ReactNode } from 'react'
import { Card, Group, Text, UnstyledButton } from '@mantine/core'

export interface ContentCardProps {
  title: string
  actionLabel?: string
  onAction?: () => void
  children?: ReactNode
}

/**
 * Figma Content Card:
 * - Header: Bold section title ('Titolo sezione') + Pink interactive action ('Vedi tutto')
 * - Content: Rounded inner subtle container
 */
export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  actionLabel = 'View all',
  onAction,
  children,
}) => {
  return (
    <Card
      withBorder
      p="lg"
      radius="md"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-default)',
        boxShadow: 'var(--shadow-small)',
      }}
    >
      <Group justify="space-between" align="center" mb="md">
        <Text
          fw={700}
          size="md"
          style={{
            fontFamily: 'var(--font-family-body)',
            color: 'var(--text-heading)',
            fontSize: '1rem',
          }}
        >
          {title}
        </Text>
        {actionLabel && (
          <UnstyledButton
            onClick={onAction}
            style={{
              fontFamily: 'var(--font-family-body)',
              color: 'var(--brand-primary)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {actionLabel}
          </UnstyledButton>
        )}
      </Group>

      <div
        style={{
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          minHeight: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-family-body)',
          fontSize: '0.875rem',
        }}
      >
        {children ?? 'Content'}
      </div>
    </Card>
  )
}

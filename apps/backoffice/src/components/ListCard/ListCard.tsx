import React from 'react'
import { Card, Group, Text } from '@mantine/core'
import { AppAvatar } from '../AppAvatar'
import { StatusBadge } from '../StatusBadge'
import { AppIcon } from '../AppIcon'

export interface ListCardProps {
  name: string
  subtitle: string
  status?: string
  initials?: string
  avatarSrc?: string
  onClick?: () => void
}

/**
 * Figma ListCard Component:
 * - Avatar: Pink circle with bold dark initials
 * - Info: Name (bold dark) + Subtitle (email / tag)
 * - Status: StatusBadge pill
 * - Chevron: Right navigation arrow
 */
export const ListCard: React.FC<ListCardProps> = ({
  name,
  subtitle,
  status = 'active',
  initials,
  avatarSrc,
  onClick,
}) => {
  const displayInits = initials ?? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <Card
      withBorder
      p="sm"
      radius="md"
      onClick={onClick}
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-default)',
        boxShadow: 'var(--shadow-small)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 150ms ease, box-shadow 150ms ease',
      }}
    >
      <Group justify="space-between" align="center" wrap="nowrap">
        <Group gap="sm" wrap="nowrap" style={{ minWidth: 0 }}>
          <AppAvatar initials={displayInits} src={avatarSrc} size={36} />
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <Text
              fw={600}
              size="sm"
              truncate
              style={{
                fontFamily: 'var(--font-family-body)',
                color: 'var(--text-heading)',
              }}
            >
              {name}
            </Text>
            <Text
              size="xs"
              truncate
              style={{
                fontFamily: 'var(--font-family-body)',
                color: 'var(--text-secondary)',
              }}
            >
              {subtitle}
            </Text>
            {status && (
              <div style={{ marginTop: '4px' }}>
                <StatusBadge status={status} size="xs" />
              </div>
            )}
          </div>
        </Group>

        <div style={{ color: 'var(--text-muted)' }}>
          <AppIcon name="chevronRight" size={16} stroke={1.5} />
        </div>
      </Group>
    </Card>
  )
}

import React from 'react'
import { Badge, type BadgeProps } from '@mantine/core'

export type RoleType = 'admin' | 'moderatore' | 'mentor' | (string & {})

const roleStyleMap: Record<string, { bg: string; fg: string }> = {
  admin: {
    bg: 'var(--bg-sidebar)',
    fg: 'var(--text-on-sidebar)',
  },
  moderatore: {
    bg: 'var(--status-info-bg)',
    fg: 'var(--status-info-fg)',
  },
  mentor: {
    bg: 'var(--status-violet-bg)',
    fg: 'var(--status-violet-fg)',
  },
}

export interface RoleBadgeProps extends Omit<BadgeProps, 'color' | 'variant'> {
  role: RoleType
}

/**
 * Figma RoleBadge: ADMIN (dark violet), MODERATORE (light blue), MENTOR (light violet)
 */
export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, children, style, ...props }) => {
  const normalized = role.toLowerCase()
  const themeColors = roleStyleMap[normalized] ?? roleStyleMap.admin

  return (
    <Badge
      size="md"
      radius="xl"
      variant="filled"
      style={{
        backgroundColor: themeColors.bg,
        color: themeColors.fg,
        fontFamily: 'var(--font-family-body)',
        fontWeight: 700,
        fontSize: '0.6875rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        paddingLeft: '10px',
        paddingRight: '10px',
        ...style,
      }}
      {...props}
    >
      {children ?? role.toUpperCase()}
    </Badge>
  )
}

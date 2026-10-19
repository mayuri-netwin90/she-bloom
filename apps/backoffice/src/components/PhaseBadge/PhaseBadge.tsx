import React from 'react'
import { Badge, type BadgeProps } from '@mantine/core'

export type PhaseType = 'fase 1' | 'fase 2' | (string & {})

const phaseStyleMap: Record<string, { bg: string; fg: string }> = {
  'fase 1': {
    bg: 'var(--status-success-bg)',
    fg: 'var(--status-success-fg)',
  },
  'fase 2': {
    bg: 'var(--status-info-bg)',
    fg: 'var(--status-info-fg)',
  },
}

export interface PhaseBadgeProps extends Omit<BadgeProps, 'color' | 'variant'> {
  phase: PhaseType
}

/**
 * Figma PhaseBadge: FASE 1 (green soft), FASE 2 (blue soft)
 */
export const PhaseBadge: React.FC<PhaseBadgeProps> = ({ phase, children, style, ...props }) => {
  const normalized = phase.toLowerCase()
  const themeColors = phaseStyleMap[normalized] ?? phaseStyleMap['fase 1']

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
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        paddingLeft: '10px',
        paddingRight: '10px',
        ...style,
      }}
      {...props}
    >
      {children ?? phase.toUpperCase()}
    </Badge>
  )
}

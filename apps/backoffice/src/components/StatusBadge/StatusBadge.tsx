import React from 'react'
import { Badge, type BadgeProps } from '@mantine/core'

export type StandardStatus =
  | 'green'
  | 'yellow'
  | 'red'
  | 'blue'
  | 'gray'
  | 'violet'
  | 'pink'
  | 'active'
  | 'success'
  | 'pending'
  | 'warning'
  | 'danger'
  | 'blocked'
  | 'inactive'
  | 'info'
  | 'neutral'

export interface StatusBadgeProps extends Omit<BadgeProps, 'color' | 'variant'> {
  status: StandardStatus | (string & {})
  customColor?: string
  withDot?: boolean
}

/**
 * Maps semantic status names to exact Figma status bg & fg CSS custom properties, plus indicator dot colors.
 */
const statusStyleMap: Record<
  string,
  { bg: string; color: string; dot: string }
> = {
  // Figma Named Colors
  green: {
    bg: 'var(--status-success-bg)',
    color: 'var(--status-success-fg)',
    dot: 'var(--status-success-fg)',
  },
  yellow: {
    bg: 'var(--status-warning-bg)',
    color: 'var(--status-warning-fg)',
    dot: 'var(--status-warning-fg)',
  },
  red: {
    bg: 'var(--status-danger-bg)',
    color: 'var(--status-danger-fg)',
    dot: 'var(--status-danger-fg)',
  },
  blue: {
    bg: 'var(--status-info-bg)',
    color: 'var(--status-info-fg)',
    dot: 'var(--status-info-fg)',
  },
  gray: {
    bg: 'var(--status-neutral-bg)',
    color: 'var(--status-neutral-fg)',
    dot: 'var(--status-neutral-fg)',
  },
  violet: {
    bg: 'var(--status-violet-bg)',
    color: 'var(--status-violet-fg)',
    dot: 'var(--status-violet-fg)',
  },
  pink: {
    bg: 'var(--bg-brand-soft)',
    color: 'var(--brand-primary)',
    dot: 'var(--brand-primary)',
  },

  // Semantic Status Aliases
  active: {
    bg: 'var(--status-success-bg)',
    color: 'var(--status-success-fg)',
    dot: 'var(--status-success-fg)',
  },
  success: {
    bg: 'var(--status-success-bg)',
    color: 'var(--status-success-fg)',
    dot: 'var(--status-success-fg)',
  },
  warning: {
    bg: 'var(--status-warning-bg)',
    color: 'var(--status-warning-fg)',
    dot: 'var(--status-warning-fg)',
  },
  pending: {
    bg: 'var(--status-warning-bg)',
    color: 'var(--status-warning-fg)',
    dot: 'var(--status-warning-fg)',
  },
  danger: {
    bg: 'var(--status-danger-bg)',
    color: 'var(--status-danger-fg)',
    dot: 'var(--status-danger-fg)',
  },
  blocked: {
    bg: 'var(--status-danger-bg)',
    color: 'var(--status-danger-fg)',
    dot: 'var(--status-danger-fg)',
  },
  info: {
    bg: 'var(--status-info-bg)',
    color: 'var(--status-info-fg)',
    dot: 'var(--status-info-fg)',
  },
  neutral: {
    bg: 'var(--status-neutral-bg)',
    color: 'var(--status-neutral-fg)',
    dot: 'var(--status-neutral-fg)',
  },
  inactive: {
    bg: 'var(--status-neutral-bg)',
    color: 'var(--status-neutral-fg)',
    dot: 'var(--status-neutral-fg)',
  },
}

/**
 * StatusBadge Component (Single Unified Source of Truth).
 * - Exact Figma colors (green, yellow, red, blue, gray, violet, pink)
 * - Leading circular indicator dot matching Figma specification
 * - Pill radius (full/xl)
 * - Outfit font, uppercase/capitalize styling
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  customColor,
  withDot = true,
  size = 'md',
  radius = 'xl',
  style,
  children,
  ...rest
}) => {
  const normalized = status.toLowerCase()
  const styles = statusStyleMap[normalized] ?? {
    bg: 'var(--status-neutral-bg)',
    color: 'var(--status-neutral-fg)',
    dot: 'var(--status-neutral-fg)',
  }

  const displayLabel = status.toUpperCase()

  return (
    <Badge
      size={size}
      radius={radius}
      variant="filled"
      style={{
        backgroundColor: customColor ?? styles.bg,
        color: styles.color,
        fontFamily: 'var(--font-family-body)',
        fontWeight: 600,
        fontSize: '0.75rem',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        border: 'none',
        paddingLeft: withDot ? '8px' : '12px',
        paddingRight: '12px',
        ...style,
      }}
      leftSection={
        withDot ? (
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: styles.dot,
              display: 'inline-block',
              marginRight: '4px',
            }}
          />
        ) : undefined
      }
      {...rest}
    >
      {children ?? displayLabel}
    </Badge>
  )
}

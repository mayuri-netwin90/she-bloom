import React from 'react'

export interface CounterBadgeProps {
  count: number | string
  color?: 'pink' | 'red' | 'gray'
}

/**
 * Figma Counter: Circular badge with white bold number (pink, red, neutral gray)
 */
export const CounterBadge: React.FC<CounterBadgeProps> = ({ count, color = 'pink' }) => {
  const colorMap = {
    pink: { bg: 'var(--brand-primary)', fg: 'var(--text-on-brand)' },
    red: { bg: 'var(--status-danger-fg)', fg: 'var(--text-on-brand)' },
    gray: { bg: 'var(--bg-muted)', fg: 'var(--text-secondary)' },
  }

  const current = colorMap[color]

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: current.bg,
        color: current.fg,
        fontFamily: 'var(--font-family-body)',
        fontSize: '0.6875rem',
        fontWeight: 700,
      }}
    >
      {count}
    </span>
  )
}

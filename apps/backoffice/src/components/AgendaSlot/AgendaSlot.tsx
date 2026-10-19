import React from 'react'
import { Text } from '@mantine/core'

export type AgendaSlotColor = 'green' | 'pink' | 'gray' | 'violet'

export interface AgendaSlotProps {
  time: string
  clientName: string
  color?: AgendaSlotColor
  onClick?: () => void
}

const slotColorMap: Record<AgendaSlotColor, { bg: string; border: string; timeColor: string }> = {
  green: {
    bg: 'var(--status-success-bg)',
    border: 'var(--status-success-fg)',
    timeColor: 'var(--status-success-fg)',
  },
  pink: {
    bg: 'var(--bg-brand-soft)',
    border: 'var(--brand-primary)',
    timeColor: 'var(--brand-primary)',
  },
  gray: {
    bg: 'var(--bg-muted)',
    border: 'var(--border-strong)',
    timeColor: 'var(--text-primary)',
  },
  violet: {
    bg: 'var(--status-violet-bg)',
    border: 'var(--status-violet-fg)',
    timeColor: 'var(--status-violet-fg)',
  },
}

/**
 * Figma AgendaSlot Component:
 * - Rounded slot card with prominent left accent border (3px solid)
 * - Top: Time label in bold theme color (e.g. '10:00 - 10:45')
 * - Bottom: Participant/User name (e.g. 'Sara Rossi')
 */
export const AgendaSlot: React.FC<AgendaSlotProps> = ({
  time,
  clientName,
  color = 'green',
  onClick,
}) => {
  const styles = slotColorMap[color]

  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8px 12px',
        backgroundColor: styles.bg,
        borderLeft: `3px solid ${styles.border}`,
        borderRadius: 'var(--radius-md)',
        minWidth: '130px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'opacity 150ms ease, transform 150ms ease',
      }}
    >
      <Text
        style={{
          fontFamily: 'var(--font-family-body)',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: styles.timeColor,
          lineHeight: 1.2,
          marginBottom: '2px',
        }}
      >
        {time}
      </Text>
      <Text
        style={{
          fontFamily: 'var(--font-family-body)',
          fontSize: '0.6875rem',
          fontWeight: 500,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
        }}
      >
        {clientName}
      </Text>
    </div>
  )
}

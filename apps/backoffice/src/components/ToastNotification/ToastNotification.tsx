import React from 'react'
import { Text } from '@mantine/core'
import { AppIcon } from '../AppIcon'

export interface ToastNotificationProps {
  message: string
  color?: 'violet' | 'dark'
  onClose?: () => void
}

/**
 * Figma Toast Notification Component:
 * - Floating dark pill banner
 * - Left: Checkmark or Warning icon
 * - Center: Text message (e.g. 'Modifiche salvate' / 'Changes saved')
 * - Right: Close 'x' button
 */
export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  color = 'dark',
  onClose,
}) => {
  const isViolet = color === 'violet'

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 14px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: isViolet ? 'var(--bg-sidebar-hover)' : 'var(--bg-sidebar)',
        color: 'var(--text-on-sidebar)',
        boxShadow: 'var(--shadow-large)',
      }}
    >
      <AppIcon name={isViolet ? 'warning' : 'check'} size={16} stroke={1.5} color="var(--text-on-sidebar)" />
      <Text
        size="xs"
        fw={600}
        style={{
          fontFamily: 'var(--font-family-body)',
          color: 'var(--text-on-sidebar)',
        }}
      >
        {message}
      </Text>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            color: 'var(--text-on-sidebar-muted)',
            marginLeft: '4px',
          }}
        >
          <AppIcon name="close" size={14} stroke={1.5} />
        </button>
      )}
    </div>
  )
}

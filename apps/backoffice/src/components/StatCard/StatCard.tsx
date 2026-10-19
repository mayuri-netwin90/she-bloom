import React from 'react'
import { Card, Group, Text } from '@mantine/core'
import { AppIcon, type AppIconName } from '../AppIcon'

export interface StatCardProps {
  title: string
  value: string | number
  delta?: number
  deltaPeriod?: string
  trend?: 'up' | 'down' | 'neutral'
  iconName?: AppIconName
  trendText?: string
}

/**
 * Figma StatCard Component:
 * - Top: Icon pill (pink soft bg with pink icon) + Uppercase title ('ACTIVE USERS', 'CLUB SUBSCRIBERS', 'MONTHLY REVENUE', 'BOOKINGS TODAY')
 * - Center: Large KPI Value in 24px bold ('12,480', '1,936', '€18,420', '34')
 * - Bottom: Delta percentage with trend arrow or status text:
 *    - Green: ▲ +8.4% vs September (success)
 *    - Red: ▼ -2.1% vs September (danger / critical)
 *    - Neutral gray: 4 in progress · 2 cancelled
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  delta,
  deltaPeriod = 'vs September',
  trend = 'up',
  iconName = 'users',
  trendText,
}) => {
  const isPositive = trend === 'up' || (typeof delta === 'number' && delta > 0)
  const isNegative = trend === 'down' || (typeof delta === 'number' && delta < 0)

  const trendColor = isPositive
    ? 'var(--status-success-fg)'
    : isNegative
    ? 'var(--status-danger-fg)'
    : 'var(--text-secondary)'

  return (
    <Card
      withBorder
      p="md"
      radius="md"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-default)',
        boxShadow: 'var(--shadow-small)',
      }}
    >
      {/* Top Header: Pink pill icon + Section title */}
      <Group gap="xs" align="center" mb="sm">
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-brand-soft)',
            color: 'var(--brand-primary)',
          }}
        >
          <AppIcon name={iconName} size={16} stroke={1.5} />
        </div>
        <Text
          size="xs"
          tt="uppercase"
          fw={700}
          style={{
            fontFamily: 'var(--font-family-body)',
            color: 'var(--text-secondary)',
            letterSpacing: '0.08em',
            fontSize: '0.6875rem',
          }}
        >
          {title}
        </Text>
      </Group>

      {/* Main Metric Value */}
      <Text
        style={{
          fontFamily: 'var(--font-family-body)',
          fontSize: '1.5rem',
          lineHeight: '1.5rem',
          fontWeight: 700,
          color: 'var(--text-heading)',
          marginBottom: '8px',
        }}
      >
        {value}
      </Text>

      {/* Bottom Trend Delta / Text */}
      {trendText ? (
        <Text
          size="xs"
          style={{
            fontFamily: 'var(--font-family-body)',
            color: 'var(--text-secondary)',
            fontSize: '0.75rem',
          }}
        >
          {trendText}
        </Text>
      ) : delta !== undefined ? (
        <Group gap={4} align="center">
          <span style={{ color: trendColor, fontSize: '10px', display: 'inline-flex' }}>
            {isPositive ? '▲' : isNegative ? '▼' : '▲'}
          </span>
          <Text
            size="xs"
            fw={700}
            style={{
              fontFamily: 'var(--font-family-body)',
              color: trendColor,
              fontSize: '0.75rem',
            }}
          >
            {isPositive && delta > 0 ? `+${delta}%` : `${delta}%`}
          </Text>
          <Text
            size="xs"
            style={{
              fontFamily: 'var(--font-family-body)',
              color: 'var(--text-secondary)',
              fontSize: '0.75rem',
            }}
          >
            {deltaPeriod}
          </Text>
        </Group>
      ) : null}
    </Card>
  )
}

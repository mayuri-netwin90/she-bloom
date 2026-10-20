import { type ReactNode } from 'react'
import { Anchor, Box, Breadcrumbs, Group, Stack, Text, Title } from '@mantine/core'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface PageHeaderProps {
  title: string
  subtitle?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  action?: ReactNode
  mb?: string | number
  style?: React.CSSProperties
}

/**
 * PageHeader Component
 * Provides standard title with headings.fontFamily (Erstoria / Playfair Display), optional subtitle, breadcrumbs, and right-aligned actions.
 */
export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  action,
  mb = 'xl',
  style,
}: PageHeaderProps) {
  return (
    <Stack gap="xs" mb={mb} style={style}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs separator="/" separatorMargin="xs">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1
            if (item.href && !isLast) {
              return (
                <Anchor
                  key={`${item.label}-${index}`}
                  href={item.href}
                  size="sm"
                  c="var(--text-secondary)"
                  underline="hover"
                  style={{ fontFamily: 'var(--font-family-body)', fontSize: '0.8125rem' }}
                >
                  {item.label}
                </Anchor>
              )
            }
            return (
              <Anchor
                key={`${item.label}-${index}`}
                size="sm"
                c={isLast ? 'var(--text-heading)' : 'var(--text-secondary)'}
                underline="never"
                style={{
                  cursor: 'default',
                  fontFamily: 'var(--font-family-body)',
                  fontSize: '0.8125rem',
                  fontWeight: isLast ? 600 : 400,
                }}
              >
                {item.label}
              </Anchor>
            )
          })}
        </Breadcrumbs>
      )}

      <Group justify="space-between" align="flex-start" wrap="wrap" gap="md">
        <div>
          <Title
            order={1}
            size="h2"
            style={{
              fontFamily: 'var(--font-family-heading)',
              color: 'var(--text-heading)',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </Title>
          {subtitle && (
            <Text
              size="sm"
              mt="xs"
              style={{
                fontFamily: 'var(--font-family-body)',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </Text>
          )}
        </div>
        {action && (
          <Box
            w={{ base: '100%', sm: 'auto' }}
            className="page-header-action-container"
          >
            {action}
          </Box>
        )}
      </Group>
    </Stack>
  )
}

import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core'
import { PageHeader } from '../../components/PageHeader'
import { StatCard } from '../../components/StatCard'
import { AppAvatar } from '../../components/AppAvatar'
import { StatusBadge } from '../../components/StatusBadge'
import { CounterBadge } from '../../components/CounterBadge'
import { AppIcon, type AppIconName } from '../../components/AppIcon'

// --- Interfaces for Dashboard Data ---
export interface DashboardKPI {
  title: string
  value: string
  trend: 'up' | 'down' | 'neutral'
  delta?: number
  deltaPeriod?: string
  iconName?: AppIconName
  trendText?: string
}

export interface BookingRow {
  id: string
  time: string
  user: {
    name: string
    email: string
  }
  mentor: string
  service: string
  status: 'active' | 'warning' | 'pending' | 'success' | 'danger'
  statusLabel?: string
}

export interface SubscriptionMonth {
  month: string
  count: number
  isCurrent?: boolean
}

export interface ToHandleItem {
  id: string
  title: string
  count: number
  icon: AppIconName
  badgeColor: 'danger' | 'brand' | 'neutral'
}

export interface ScheduledContentItem {
  id: string
  dateLabel: string
  badgeLabel: string
  badgeColor: 'warning' | 'neutral'
  title: string
}

export interface AdminDashboardProps {
  onExportReport?: () => void
  onNewContent?: () => void
  onExportCSV?: () => void
  onViewAllBookings?: () => void
  onViewAnalytics?: () => void
  onViewCalendar?: () => void
  onDismissAlert?: () => void
  onItemClick?: (type: string, id: string) => void
}

/**
 * Admin Dashboard Page
 * Matches Figma node `109:28898` (SheBloom - Backoffice / Admin · Dashboard):
 * - PageHeader: "Good morning, Giulia" / "Here's what's happening on She Bloom today · Monday 12 October 2026"
 *   - Actions: [ Export report ] (subtle/outline) & [ + New content ] (filled brand pink)
 * - Critical Alert Banner: "2 sessions within 24 hours without a call link"
 * - 4 KPI StatsCards:
 *   1. ACTIVE USERS (12,480, ▲ +8.4% vs September, icon: users)
 *   2. CLUB SUBSCRIBERS (1,936, ▲ +12.1% vs September, icon: favorite)
 *   3. MONTHLY REVENUE (€18,420, ▲ +5.3% vs September, icon: euro)
 *   4. BOOKINGS TODAY (34, "4 in progress · 2 cancelled", icon: calendar)
 * - Main 2-Column Section (Desktop 8 col left / 4 col right; Tablet/Mobile stacked):
 *   - Left:
 *     - Today's Bookings Table with header "Today's bookings", "View all", "Export CSV", and 5 columns
 *     - New Bloom Club Subscribers Bar Chart (last 6 months: May 180, Jun 220, Jul 192, Aug 260, Sep 304, Oct 336)
 *   - Right:
 *     - "To handle" card with 5 notification rows
 *     - "Scheduled content" card with 3 scheduled posts
 */
export function AdminDashboard({
  onExportReport = () => alert('Exporting report...'),
  onNewContent = () => alert('Create new content...'),
  onExportCSV = () => alert('Exporting bookings CSV...'),
  onViewAllBookings = () => { },
  onViewAnalytics = () => { },
  onViewCalendar = () => { },
  onDismissAlert,
  onItemClick = () => { },
}: AdminDashboardProps) {
  // KPI Metrics from Figma
  const kpiData: DashboardKPI[] = [
    {
      title: 'ACTIVE USERS',
      value: '12,480',
      trend: 'up',
      delta: 8.4,
      deltaPeriod: 'vs September',
      iconName: 'users',
    },
    {
      title: 'CLUB SUBSCRIBERS',
      value: '1,936',
      trend: 'up',
      delta: 12.1,
      deltaPeriod: 'vs September',
      iconName: 'favorite',
    },
    {
      title: 'MONTHLY REVENUE',
      value: '€18,420',
      trend: 'up',
      delta: 5.3,
      deltaPeriod: 'vs September',
      iconName: 'euro',
    },
    {
      title: 'BOOKINGS TODAY',
      value: '34',
      trend: 'neutral',
      trendText: '4 in progress · 2 cancelled',
      iconName: 'calendar',
    },
  ]

  // Bookings sample data from Figma Table
  const bookings: BookingRow[] = [
    {
      id: '1',
      time: '09:00',
      user: { name: 'Sara Rossi', email: 'sara.rossi@email.it' },
      mentor: 'Dr E. Mestri',
      service: 'Session',
      status: 'success',
      statusLabel: 'Completed',
    },
    {
      id: '2',
      time: '10:30',
      user: { name: 'Giulia Bianchi', email: 'giulia.b@email.it' },
      mentor: 'Chiara Bisceglie',
      service: 'Program 2/4',
      status: 'warning',
      statusLabel: 'In Progress',
    },
    {
      id: '3',
      time: '11:45',
      user: { name: 'Marta Verdi', email: 'marta.verdi@email.it' },
      mentor: 'Dr E. Mestri',
      service: 'Session',
      status: 'info',
      statusLabel: 'Upcoming',
    },
    {
      id: '4',
      time: '15:00',
      user: { name: 'Anna Russo', email: 'anna.russo@email.it' },
      mentor: 'Francesca Leone',
      service: 'Session',
      status: 'danger',
      statusLabel: 'Cancelled',
    },
    {
      id: '5',
      time: '16:30',
      user: { name: 'Laura Galli', email: 'laura.galli@email.it' },
      mentor: 'Chiara Bisceglie',
      service: 'Program 1/3',
      status: 'info',
      statusLabel: 'Upcoming',
    },
  ]

  // Subscribers Chart months
  const chartData: SubscriptionMonth[] = [
    { month: 'May', count: 180 },
    { month: 'Jun', count: 220 },
    { month: 'Jul', count: 192 },
    { month: 'Aug', count: 260 },
    { month: 'Sep', count: 304 },
    { month: 'Oct', count: 336, isCurrent: true },
  ]
  const maxSubscribers = Math.max(...chartData.map((d) => d.count))

  // "To handle" items from Figma
  const toHandleItems: ToHandleItem[] = [
    {
      id: 'reports',
      title: 'Reports to moderate',
      count: 12,
      icon: 'flag',
      badgeColor: 'danger',
    },
    {
      id: 'qa',
      title: 'Q&A awaiting assignment',
      count: 5,
      icon: 'message',
      badgeColor: 'brand',
    },
    {
      id: 'notes',
      title: 'Missing session notes',
      count: 3,
      icon: 'edit',
      badgeColor: 'brand',
    },
    {
      id: 'links',
      title: 'Missing call links (<24h)',
      count: 2,
      icon: 'link',
      badgeColor: 'danger',
    },
    {
      id: 'mentors',
      title: 'Mentors to verify',
      count: 1,
      icon: 'userCheck',
      badgeColor: 'neutral',
    },
  ]

  // "Scheduled content" items from Figma
  const scheduledContent: ScheduledContentItem[] = [
    {
      id: '1',
      dateLabel: 'TOMORROW',
      badgeLabel: 'Scheduled',
      badgeColor: 'warning',
      title: 'Audio of the day · "Breathe with me"',
    },
    {
      id: '2',
      dateLabel: '14 OCT',
      badgeLabel: 'Scheduled',
      badgeColor: 'warning',
      title: 'Article · Boundaries in relationships',
    },
    {
      id: '3',
      dateLabel: '15 OCT',
      badgeLabel: 'Draft',
      badgeColor: 'neutral',
      title: 'Quote of the day',
    },
  ]

  return (
    <Box p={{ base: 'md', md: 'xl' }} style={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}>
      {/* 1. Page Header with Actions (Export report & + New content) */}
      <PageHeader
        title="Good morning, Giulia"
        subtitle={
          <>
            <Box component="span" display={{ base: 'none', md: 'inline' }}>
              Here's what's happening on She Bloom today ·{' '}
            </Box>
            Monday 12 October 2026
          </>
        }
        breadcrumbs={[{ label: 'Dashboard' }]}
        action={
          <Group
            gap="sm"
            wrap="wrap"
            style={{ width: '100%' }}
            styles={{
              root: {
                justifyContent: 'flex-start',
                '@media (min-width: 48em)': {
                  width: 'auto',
                  justifyContent: 'flex-end',
                },
              },
            }}
          >
            <Box
              display={{ base: 'none', sm: 'block' }}
            >
              <Button
                variant="default"
                size="sm"
                leftSection={<AppIcon name="download" size={14} />}
                onClick={onExportReport}
                style={{
                  fontFamily: 'var(--font-family-body)',
                  borderColor: 'var(--border-default)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-heading)',
                  fontWeight: 600,
                }}
              >
                Export report
              </Button>
            </Box>
            <Button
              color="pink"
              size="sm"
              leftSection={
                <AppIcon
                  name="plus"
                  size={16}
                  stroke={2}
                  color="var(--text-heading)"
                />
              }
              onClick={onNewContent}
              style={{
                fontFamily: 'var(--font-family-body)',
                backgroundColor: 'var(--brand-primary)',
                color: '#FFFFFF',
                fontWeight: 600,
                flex: 1,
              }}
              styles={{
                root: {
                  '@media (min-width: 36em)': {
                    flex: 'initial',
                  },
                },
              }}
            >
              New content
            </Button>
          </Group>
        }
      />

      {/* 2. Critical Warning / Alert Banner */}
      <Card
        withBorder
        radius="md"
        p="md"
        mb="lg"
        style={{
          backgroundColor: 'var(--status-danger-bg)',
          borderColor: 'transparent',
        }}
      >
        <Group align="flex-start" gap="sm" wrap="nowrap">
          <div style={{ color: 'var(--status-danger-fg)', marginTop: 2 }}>
            <AppIcon name="prohibited" size={20} stroke={2} />
          </div>
          <Box style={{ flex: 1 }}>
            <Text
              size="sm"
              fw={700}
              style={{
                color: 'var(--status-danger-fg)',
                fontFamily: 'var(--font-family-body)',
              }}
            >
              2 sessions within 24 hours without a call link
            </Text>
            <Text
              size="xs"
              mt={2}
              style={{
                color: 'var(--text-heading)',
                fontFamily: 'var(--font-family-body)',
                lineHeight: 1.5,
              }}
            >
              Dr Elisa Mestri · Elena Marino, 14/10 17:00 — Dr Paolo Riva · Chiara Gallo, 14/10 18:30. The
              Mentor has already been notified.
            </Text>
          </Box>
          {onDismissAlert && (
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              onClick={onDismissAlert}
              aria-label="Dismiss alert"
            >
              <AppIcon name="close" size={14} />
            </ActionIcon>
          )}
        </Group>
      </Card>

      {/* 3. KPI Stat Cards (4 columns on Desktop, 2x2 on Tablet, stacked on Mobile) */}
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="md" mb="xl">
        {kpiData.map((kpi) => (
          <StatCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            delta={kpi.delta}
            deltaPeriod={kpi.deltaPeriod}
            trend={kpi.trend}
            iconName={kpi.iconName}
            trendText={kpi.trendText}
          />
        ))}
      </SimpleGrid>

      {/* 4. Main 2-Column Section */}
      <Grid>
        {/* Left Column (Desktop 8 col) */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap="lg">
            {/* Table: Today's Bookings */}
            <Card
              withBorder
              radius="md"
              p={{ base: 'md', sm: 'xl' }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
                boxShadow: 'var(--shadow-small)',
              }}
            >
              {/* Table Card Header */}
              <Group justify="space-between" align="center" mb="xs">
                <Title
                  order={2}
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--text-heading)',
                  }}
                >
                  Today's bookings
                </Title>
                <UnstyledButton
                  onClick={onViewAllBookings}
                  style={{
                    color: 'var(--brand-primary)',
                    fontFamily: 'var(--font-family-body)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  View all
                </UnstyledButton>
              </Group>

              {/* Action row: Export CSV */}
              <Group justify="flex-end" mb="md">
                <Button
                  variant="subtle"
                  color="gray"
                  size="xs"
                  leftSection={<AppIcon name="download" size={14} />}
                  onClick={onExportCSV}
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                  }}
                >
                  Export CSV
                </Button>
              </Group>

              {/* Desktop / Responsive Bookings Table */}
              <Box style={{ overflowX: 'auto' }}>
                <Table
                  verticalSpacing="sm"
                  horizontalSpacing="md"
                  style={{
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                  }}
                >
                  <Table.Thead style={{ backgroundColor: 'var(--bg-canvas)' }}>
                    <Table.Tr>
                      <Table.Th style={{ width: 70, color: 'var(--text-secondary)' }}>Time</Table.Th>
                      <Table.Th style={{ minWidth: 160, color: 'var(--text-secondary)' }}>User</Table.Th>
                      <Table.Th style={{ minWidth: 130, color: 'var(--text-secondary)' }}>Mentor</Table.Th>
                      <Table.Th style={{ minWidth: 110, color: 'var(--text-secondary)' }}>Service</Table.Th>
                      <Table.Th style={{ minWidth: 140, color: 'var(--text-secondary)' }}>Status</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {bookings.map((booking) => {
                      const initials = booking.user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()

                      return (
                        <Table.Tr
                          key={booking.id}
                          style={{
                            borderBottom: '1px solid var(--border-default)',
                            transition: 'background-color 150ms ease',
                          }}
                        >
                          {/* Time */}
                          <Table.Td>
                            <Text size="sm" fw={600} style={{ color: 'var(--text-heading)' }}>
                              {booking.time}
                            </Text>
                          </Table.Td>

                          {/* User with avatar */}
                          <Table.Td>
                            <Group gap="sm" wrap="nowrap">
                              <AppAvatar initials={initials} size={32} />
                              <div style={{ minWidth: 0 }}>
                                <Text
                                  size="sm"
                                  fw={600}
                                  truncate
                                  style={{ color: 'var(--text-heading)' }}
                                >
                                  {booking.user.name}
                                </Text>
                                <Text
                                  size="xs"
                                  truncate
                                  style={{ color: 'var(--text-secondary)' }}
                                >
                                  {booking.user.email}
                                </Text>
                              </div>
                            </Group>
                          </Table.Td>

                          {/* Mentor */}
                          <Table.Td>
                            <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                              {booking.mentor}
                            </Text>
                          </Table.Td>

                          {/* Service */}
                          <Table.Td>
                            <Text size="sm" style={{ color: 'var(--text-secondary)' }}>
                              {booking.service}
                            </Text>
                          </Table.Td>

                          {/* Status Badge */}
                          <Table.Td>
                            <StatusBadge
                              status={booking.status}
                              size="sm"
                            >
                              {booking.statusLabel ?? booking.status}
                            </StatusBadge>
                          </Table.Td>
                        </Table.Tr>
                      )
                    })}
                  </Table.Tbody>
                </Table>
              </Box>
            </Card>

            {/* Subscribers Bar Chart Card */}
            <Card
              withBorder
              radius="md"
              p={{ base: 'md', sm: 'xl' }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
                boxShadow: 'var(--shadow-small)',
              }}
            >
              <Group justify="space-between" align="center" mb="lg">
                <Title
                  order={2}
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--text-heading)',
                  }}
                >
                  New Bloom Club subscribers · last 6 months
                </Title>
                <UnstyledButton
                  onClick={onViewAnalytics}
                  style={{
                    color: 'var(--brand-primary)',
                    fontFamily: 'var(--font-family-body)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  Analytics
                </UnstyledButton>
              </Group>

              {/* Bar Chart Visualization */}
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  height: 190,
                  gap: 16,
                  paddingTop: 16,
                }}
              >
                {chartData.map((bar) => {
                  const barHeightPct = Math.round((bar.count / maxSubscribers) * 100)
                  return (
                    <Box
                      key={bar.month}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flex: 1,
                        height: '100%',
                        justifyContent: 'flex-end',
                      }}
                    >
                      {/* Metric value above bar */}
                      <Text
                        size="xs"
                        fw={600}
                        mb={6}
                        style={{
                          color: 'var(--text-secondary)',
                          fontFamily: 'var(--font-family-body)',
                        }}
                      >
                        {bar.count}
                      </Text>

                      {/* Bar Pillar */}
                      <Box
                        style={{
                          width: '100%',
                          maxWidth: 72,
                          height: `${barHeightPct}%`,
                          minHeight: 12,
                          backgroundColor: bar.isCurrent
                            ? 'var(--brand-primary)'
                            : 'var(--brand-secondary)',
                          borderRadius: '8px 8px 0 0',
                          transition: 'height 300ms ease, background-color 200ms ease',
                        }}
                      />

                      {/* Month label */}
                      <Text
                        size="xs"
                        mt={8}
                        style={{
                          color: 'var(--text-secondary)',
                          fontFamily: 'var(--font-family-body)',
                        }}
                      >
                        {bar.month}
                      </Text>
                    </Box>
                  )
                })}
              </Box>
            </Card>
          </Stack>
        </Grid.Col>

        {/* Right Column (Desktop 4 col) */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="lg">
            {/* "To handle" card */}
            <Card
              withBorder
              radius="md"
              p={{ base: 'md', sm: 'xl' }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
                boxShadow: 'var(--shadow-small)',
              }}
            >
              <Title
                order={2}
                mb="md"
                style={{
                  fontFamily: 'var(--font-family-body)',
                  fontSize: '1rem',
                  lineHeight: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--text-heading)',
                }}
              >
                To handle
              </Title>

              <Stack gap={0}>
                {toHandleItems.map((item, idx) => {
                  const isLast = idx === toHandleItems.length - 1
                  return (
                    <UnstyledButton
                      key={item.id}
                      onClick={() => onItemClick('to-handle', item.id)}
                      style={{
                        padding: '12px 0',
                        borderBottom: isLast ? 'none' : '1px solid var(--border-default)',
                        width: '100%',
                        transition: 'opacity 150ms ease',
                      }}
                    >
                      <Group justify="space-between" align="center" wrap="nowrap">
                        <Group gap="sm" wrap="nowrap">
                          {/* Soft purple/pink icon wrapper matching Figma */}
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 32,
                              height: 32,
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'var(--bg-violet-soft)',
                              color: 'var(--status-violet-fg)',
                              flexShrink: 0,
                            }}
                          >
                            <AppIcon name={item.icon} size={16} stroke={1.5} />
                          </div>
                          <Text
                            size="sm"
                            style={{
                              color: 'var(--text-heading)',
                              fontFamily: 'var(--font-family-body)',
                            }}
                          >
                            {item.title}
                          </Text>
                        </Group>

                        {/* Counter pill */}
                        <CounterBadge
                          count={item.count}
                          color={
                            item.badgeColor === 'danger'
                              ? 'red'
                              : item.badgeColor === 'brand'
                                ? 'pink'
                                : 'gray'
                          }
                        />
                      </Group>
                    </UnstyledButton>
                  )
                })}
              </Stack>
            </Card>

            {/* "Scheduled content" card */}
            <Card
              withBorder
              radius="md"
              p={{ base: 'md', sm: 'xl' }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
                boxShadow: 'var(--shadow-small)',
              }}
            >
              <Group justify="space-between" align="center" mb="md">
                <Title
                  order={2}
                  style={{
                    fontFamily: 'var(--font-family-body)',
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                    fontWeight: 600,
                    color: 'var(--text-heading)',
                  }}
                >
                  Scheduled content
                </Title>
                <UnstyledButton
                  onClick={onViewCalendar}
                  style={{
                    color: 'var(--brand-primary)',
                    fontFamily: 'var(--font-family-body)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  Calendar
                </UnstyledButton>
              </Group>

              <Stack gap="xs">
                {scheduledContent.map((item) => (
                  <Card
                    key={item.id}
                    withBorder
                    p="sm"
                    radius="md"
                    onClick={() => onItemClick('scheduled-content', item.id)}
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-default)',
                      cursor: 'pointer',
                      transition: 'border-color 150ms ease',
                    }}
                  >
                    <Group justify="space-between" align="center" mb={4}>
                      <Text
                        size="xs"
                        fw={700}
                        style={{
                          color: 'var(--text-secondary)',
                          fontFamily: 'var(--font-family-body)',
                          letterSpacing: '0.08em',
                        }}
                      >
                        {item.dateLabel}
                      </Text>
                      <Badge
                        size="xs"
                        radius="xl"
                        variant="filled"
                        style={{
                          backgroundColor:
                            item.badgeColor === 'warning'
                              ? 'var(--status-warning-bg)'
                              : 'var(--status-neutral-bg)',
                          color:
                            item.badgeColor === 'warning'
                              ? 'var(--status-warning-fg)'
                              : 'var(--status-neutral-fg)',
                          fontFamily: 'var(--font-family-body)',
                          fontWeight: 600,
                          fontSize: '0.6875rem',
                          textTransform: 'capitalize',
                        }}
                      >
                        {item.badgeLabel}
                      </Badge>
                    </Group>
                    <Text
                      size="sm"
                      fw={500}
                      truncate
                      style={{
                        color: 'var(--text-heading)',
                        fontFamily: 'var(--font-family-body)',
                      }}
                    >
                      {item.title}
                    </Text>
                  </Card>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  )
}

import { useState } from 'react'
import {
  Box,
  Button,
  Card,
  Grid,
  Group,
  Paper,
  Stack,
  Table,
  Tabs,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { PageHeader } from '../../components/PageHeader'
import { AppAvatar } from '../../components/AppAvatar'
import { AppIcon } from '../../components/AppIcon'
import { StatusBadge } from '../../components/StatusBadge'
import { ActionModal } from '../../components/ActionModal'
import {
  mockSaraRossiDetail,
  type AppUserDetailData,
} from './mockData'

export interface AppUserDetailProps {
  user?: AppUserDetailData
  onBack?: () => void
  onExportData?: () => void
  onExportCSV?: () => void
}

export function AppUserDetail({
  user = mockSaraRossiDetail,
  onBack,
  onExportData = () => alert('Exporting GDPR user data...'),
  onExportCSV = () => alert('Exporting user bookings CSV...'),
}: AppUserDetailProps) {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: calc(${theme.breakpoints.sm} - 0.1px))`)

  // Active tab state
  const [activeTab, setActiveTab] = useState<string | null>('bookings')

  // Modals for Sensitive Area actions
  const [blockModalOpen, setBlockModalOpen] = useState(false)
  const [anonymizeModalOpen, setAnonymizeModalOpen] = useState(false)

  // Status state (allows testing block/unblock in UI)
  const [currentStatus, setCurrentStatus] = useState(user.status)

  const handleBlockConfirm = () => {
    setCurrentStatus(currentStatus === 'blocked' ? 'active' : 'blocked')
    setBlockModalOpen(false)
  }

  const handleAnonymizeConfirm = () => {
    setCurrentStatus('anonymized')
    setAnonymizeModalOpen(false)
  }

  return (
    <Box>
      {/* 1. Page Header with Breadcrumbs & GDPR Export Action */}
      <PageHeader
        breadcrumbs={[
          { label: 'Management', href: '#' },
          {
            label: 'App users',
            href: '#',
            onClick: onBack
              ? (e: React.MouseEvent) => {
                  e.preventDefault()
                  onBack()
                }
              : undefined,
          },
          { label: user.name },
        ]}
        title={user.name}
        subtitle={
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            User since {user.registeredOn} · last login {user.lastLogin}
          </span>
        }
        mb="md"
        action={
          <Button
            variant="outline"
            color="brand-pink"
            fullWidth={isMobile}
            w={{ base: '100%', sm: 'auto' }}
            leftSection={<AppIcon name="download" size={16} stroke={1.5} color="var(--brand-primary)" />}
            onClick={onExportData}
            styles={{
              root: {
                width: isMobile ? '100%' : 'auto',
                borderColor: 'var(--brand-primary)',
                color: 'var(--brand-primary)',
                backgroundColor: 'var(--bg-surface)',
                fontWeight: 600,
                fontSize: '0.875rem',
                height: 38,
                padding: '0 16px',
                borderRadius: 'var(--radius-md)',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: 'var(--bg-brand-soft)',
                },
              },
            }}
          >
            {isMobile ? 'Export data' : 'Export data (GDPR)'}
          </Button>
        }
      />

      {/* 2. Privacy by design banner (Desktop & Tablet) */}
      {!isMobile && (
        <Card
          withBorder={false}
          mb="lg"
          radius="md"
          p="md"
          style={{
            backgroundColor: 'var(--status-info-bg)',
            borderLeft: '4px solid var(--status-info-fg)',
          }}
        >
          <Group align="flex-start" gap="sm" wrap="nowrap">
            <AppIcon name="info" size={20} stroke={2} color="var(--status-info-fg)" style={{ marginTop: 2, flexShrink: 0 }} />
            <Box>
              <Text fw={600} size="sm" c="var(--text-heading)">
                Privacy by design
              </Text>
              <Text size="sm" c="var(--text-primary)" mt={2}>
                The content of the Journal, Alba conversations and check-ins is not visible from the backoffice.
              </Text>
            </Box>
          </Group>
        </Card>
      )}

      {/* 3. Main Two-Column Layout */}
      <Grid align="stretch">
        {/* LEFT COLUMN: Profile summary, Details Key-Value, Consents */}
        <Grid.Col span={{ base: 12, md: 4.5, lg: 4 }}>
          <Paper
            withBorder
            radius="md"
            p="lg"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-default)',
            }}
          >
            {/* User Avatar + Name + Email + Badges */}
            <Group gap="md" align="center" mb="lg">
              <AppAvatar
                initials="SR"
                size={72}
                bgColor="var(--brand-secondary)"
                textColor="var(--bg-sidebar)"
              />
              <Box style={{ flex: 1, minWidth: 0 }}>
                <Text
                  fw={700}
                  size="1.25rem"
                  c="var(--text-heading)"
                  style={{ lineHeight: 1.25, letterSpacing: '-0.01em' }}
                >
                  {user.name}
                </Text>
                <Text size="sm" c="var(--text-secondary)" truncate mt={3} mb="xs">
                  {user.email}
                </Text>
                <Group gap={6} wrap="wrap">
                  {user.subscription === 'club' ? (
                    <StatusBadge status="violet" withDot={true}>BLOOM CLUB</StatusBadge>
                  ) : (
                    <StatusBadge status="neutral" withDot={true}>FREE</StatusBadge>
                  )}
                  <StatusBadge status={currentStatus} withDot={true} />
                </Group>
              </Box>
            </Group>

            {/* Key-Value Details */}
            <Stack gap={0} mb="xl">
              <Group wrap="nowrap" py={12} style={{ borderBottom: '1px solid var(--border-default)' }}>
                <Text size="sm" c="var(--text-secondary)" style={{ width: '44%', flexShrink: 0 }}>
                  Registered on
                </Text>
                <Text size="sm" fw={600} c="var(--text-heading)">
                  {user.registeredOn}
                </Text>
              </Group>

              <Group wrap="nowrap" py={12} style={{ borderBottom: '1px solid var(--border-default)' }}>
                <Text size="sm" c="var(--text-secondary)" style={{ width: '44%', flexShrink: 0 }}>
                  Sign-in method
                </Text>
                <Text size="sm" fw={600} c="var(--text-heading)">
                  {user.signInMethod}
                </Text>
              </Group>

              <Group wrap="nowrap" py={12} style={{ borderBottom: '1px solid var(--border-default)' }}>
                <Text size="sm" c="var(--text-secondary)" style={{ width: '44%', flexShrink: 0 }}>
                  Language
                </Text>
                <Text size="sm" fw={600} c="var(--text-heading)">
                  {user.language}
                </Text>
              </Group>

              <Group wrap="nowrap" py={12} style={{ borderBottom: '1px solid var(--border-default)' }}>
                <Text size="sm" c="var(--text-secondary)" style={{ width: '44%', flexShrink: 0 }}>
                  City
                </Text>
                <Text size="sm" fw={600} c="var(--text-heading)">
                  {user.city}
                </Text>
              </Group>

              <Group wrap="nowrap" py={12} style={{ borderBottom: '1px solid var(--border-default)' }}>
                <Text size="sm" c="var(--text-secondary)" style={{ width: '44%', flexShrink: 0 }}>
                  Date of birth
                </Text>
                <Text size="sm" fw={600} c="var(--text-heading)">
                  {user.dateOfBirth}
                </Text>
              </Group>

              <Group wrap="nowrap" py={12} style={{ borderBottom: '1px solid var(--border-default)' }}>
                <Text size="sm" c="var(--text-secondary)" style={{ width: '44%', flexShrink: 0 }}>
                  Subscription
                </Text>
                <Text size="sm" fw={600} c="var(--text-heading)">
                  {user.subscriptionPlan}
                </Text>
              </Group>

              <Group wrap="nowrap" py={12} style={{ borderBottom: '1px solid var(--border-default)' }}>
                <Text size="sm" c="var(--text-secondary)" style={{ width: '44%', flexShrink: 0 }}>
                  Store
                </Text>
                <Text size="sm" fw={600} c="var(--text-heading)">
                  {user.store}
                </Text>
              </Group>
            </Stack>

            {/* CONSENTS Section */}
            <Box mt="xs">
              <Text
                size="xs"
                fw={700}
                c="var(--text-secondary)"
                style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                mb="md"
              >
                Consents
              </Text>
              <Stack gap="sm">
                <Group justify="space-between" align="center">
                  <Group gap={8}>
                    <AppIcon name="successCircle" size={16} stroke={1.8} color="var(--status-success-fg)" />
                    <Text size="sm" c="var(--text-primary)">Privacy & T&C</Text>
                  </Group>
                  <Text size="xs" c="var(--text-secondary)">
                    {user.consents.privacyTnc.version} · {user.consents.privacyTnc.date}
                  </Text>
                </Group>

                <Group justify="space-between" align="center">
                  <Group gap={8}>
                    <AppIcon name="successCircle" size={16} stroke={1.8} color="var(--status-success-fg)" />
                    <Text size="sm" c="var(--text-primary)">Health data</Text>
                  </Group>
                  <Text size="xs" c="var(--text-secondary)">
                    {user.consents.healthData.granted ? 'Granted' : 'Revoked'}
                  </Text>
                </Group>

                <Group justify="space-between" align="center">
                  <Group gap={8}>
                    <AppIcon name="successCircle" size={16} stroke={1.8} color="var(--status-success-fg)" />
                    <Text size="sm" c="var(--text-primary)">SOS mode</Text>
                  </Group>
                  <Text size="xs" c="var(--text-secondary)">
                    {user.consents.sosMode.granted ? 'Granted' : 'Revoked'}
                  </Text>
                </Group>
              </Stack>
            </Box>
          </Paper>
        </Grid.Col>

        {/* RIGHT COLUMN: Activity Tabs & Sensitive Area */}
        <Grid.Col span={{ base: 12, md: 7.5, lg: 8 }}>
          <Stack gap="lg">
            {/* Tabs & Table Container */}
            <Paper
              withBorder
              radius="md"
              p="lg"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
              }}
            >
              <Tabs
                value={activeTab}
                onChange={setActiveTab}
                color="var(--brand-primary)"
                variant="default"
                styles={{
                  list: {
                    borderColor: 'var(--border-default)',
                    marginBottom: 0,
                  },
                  tab: {
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    padding: '8px 16px 14px',
                    borderRadius: 0,
                    backgroundColor: 'transparent',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderTop: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                  },
                }}
              >
                <Tabs.List>
                  <Tabs.Tab
                    value="bookings"
                    style={{
                      color: activeTab === 'bookings' ? 'var(--brand-violet)' : 'var(--text-secondary)',
                      borderBottom: activeTab === 'bookings' ? '2px solid var(--brand-primary)' : '2px solid transparent',
                    }}
                  >
                    <Group gap={6} align="center" wrap="nowrap">
                      <span style={{ color: activeTab === 'bookings' ? 'var(--brand-violet)' : 'var(--text-secondary)' }}>
                        Bookings
                      </span>
                      <Box
                        style={{
                          backgroundColor: 'var(--status-neutral-bg)',
                          color: 'var(--text-secondary)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          lineHeight: 1,
                          padding: '3px 7px',
                          borderRadius: '12px',
                        }}
                      >
                        {user.bookings.length}
                      </Box>
                    </Group>
                  </Tabs.Tab>

                  <Tabs.Tab
                    value="payments"
                    style={{
                      color: activeTab === 'payments' ? 'var(--brand-violet)' : 'var(--text-secondary)',
                      borderBottom: activeTab === 'payments' ? '2px solid var(--brand-primary)' : '2px solid transparent',
                    }}
                  >
                    Payments
                  </Tabs.Tab>

                  {!isMobile && (
                    <Tabs.Tab
                      value="reports"
                      style={{
                        color: activeTab === 'reports' ? 'var(--brand-violet)' : 'var(--text-secondary)',
                        borderBottom: activeTab === 'reports' ? '2px solid var(--brand-primary)' : '2px solid transparent',
                      }}
                    >
                      Reports
                    </Tabs.Tab>
                  )}

                  <Tabs.Tab
                    value="log"
                    style={{
                      color: activeTab === 'log' ? 'var(--brand-violet)' : 'var(--text-secondary)',
                      borderBottom: activeTab === 'log' ? '2px solid var(--brand-primary)' : '2px solid transparent',
                    }}
                  >
                    {isMobile ? 'Log' : 'Access log'}
                  </Tabs.Tab>
                </Tabs.List>

                {/* Tab 1: Bookings */}
                <Tabs.Panel value="bookings" pt="md">
                  {/* Action Bar: Export CSV on right */}
                  {!isMobile && (
                    <Group justify="flex-end" mb="md">
                      <Button
                        variant="subtle"
                        size="xs"
                        onClick={onExportCSV}
                        leftSection={<AppIcon name="download" size={16} stroke={2.2} color="var(--text-primary)" />}
                        styles={{
                          root: {
                            color: 'var(--text-primary)',
                            fontWeight: 600,
                            fontSize: '0.8125rem',
                            border: 'none',
                            backgroundColor: 'transparent',
                            height: 'auto',
                            padding: '4px 6px',
                            '&:hover': {
                              backgroundColor: 'transparent',
                              opacity: 0.8,
                            },
                          },
                        }}
                      >
                        Export CSV
                      </Button>
                    </Group>
                  )}

                  {isMobile ? (
                    /* Mobile Card View */
                    <Stack gap="sm">
                      {user.bookings.map((booking) => (
                        <Card
                          key={booking.id}
                          withBorder
                          radius="md"
                          p="md"
                          style={{
                            backgroundColor: 'var(--bg-surface)',
                            borderColor: 'var(--border-default)',
                          }}
                        >
                          <Group justify="space-between" align="center" wrap="nowrap">
                            <Box style={{ flex: 1 }}>
                              <Text fw={600} size="sm" c="var(--text-heading)">
                                {booking.service}
                              </Text>
                              <Text size="xs" c="var(--text-secondary)" mt={2} mb="xs">
                                {booking.date} · {booking.mentor}
                              </Text>
                              <StatusBadge status={booking.status} withDot={true} />
                            </Box>
                            <AppIcon name="chevronRight" size={18} stroke={1.5} color="var(--text-muted)" />
                          </Group>
                        </Card>
                      ))}
                    </Stack>
                  ) : (
                    /* Desktop / Tablet Table View matching exact Figma spacing */
                    <Table.ScrollContainer minWidth={500}>
                      <Table
                        verticalSpacing={13}
                        horizontalSpacing="md"
                        style={{ tableLayout: 'fixed', width: '100%' }}
                      >
                        <Table.Thead>
                          <Table.Tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                            <Table.Th style={{ width: '25%', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8125rem' }}>
                              <Group gap={4} wrap="nowrap" align="center">
                                <span>Date</span>
                                <AppIcon name="chevronDown" size={13} stroke={1.8} color="var(--text-muted)" />
                              </Group>
                            </Table.Th>
                            <Table.Th style={{ width: '33%', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8125rem' }}>
                              <Group gap={4} wrap="nowrap" align="center">
                                <span>Service</span>
                                <AppIcon name="chevronDown" size={13} stroke={1.8} color="var(--text-muted)" />
                              </Group>
                            </Table.Th>
                            <Table.Th style={{ width: '22%', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8125rem' }}>
                              <Group gap={4} wrap="nowrap" align="center">
                                <span>Mentor</span>
                                <AppIcon name="chevronDown" size={13} stroke={1.8} color="var(--text-muted)" />
                              </Group>
                            </Table.Th>
                            <Table.Th style={{ width: '20%', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.8125rem' }}>
                              <Group gap={4} wrap="nowrap" align="center">
                                <span>Status</span>
                                <AppIcon name="chevronDown" size={13} stroke={1.8} color="var(--text-muted)" />
                              </Group>
                            </Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {user.bookings.map((booking) => (
                            <Table.Tr
                              key={booking.id}
                              style={{ borderBottom: '1px solid var(--border-default)' }}
                            >
                              <Table.Td style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                                {booking.date}
                              </Table.Td>
                              <Table.Td
                                style={{
                                  fontSize: '0.8125rem',
                                  fontWeight: 400,
                                  color: 'var(--text-primary)',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {booking.service}
                              </Table.Td>
                              <Table.Td style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                                {booking.mentor}
                              </Table.Td>
                              <Table.Td>
                                <StatusBadge status={booking.status} withDot={true} />
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </Table.ScrollContainer>
                  )}
                </Tabs.Panel>

                {/* Tab 2: Payments */}
                <Tabs.Panel value="payments" pt="md">
                  <Text size="sm" c="var(--text-secondary)" ta="center" py="xl">
                    No pending payment records found.
                  </Text>
                </Tabs.Panel>

                {/* Tab 3: Reports */}
                <Tabs.Panel value="reports" pt="md">
                  <Text size="sm" c="var(--text-secondary)" ta="center" py="xl">
                    No moderation or incident reports associated with this user.
                  </Text>
                </Tabs.Panel>

                {/* Tab 4: Access Log */}
                <Tabs.Panel value="log" pt="md">
                  <Text size="sm" c="var(--text-secondary)" ta="center" py="xl">
                    Last session from iOS App · IP 151.48.21.90 (Milan, IT) · 08:42
                  </Text>
                </Tabs.Panel>
              </Tabs>
            </Paper>

            {/* Sensitive Area / Danger Zone */}
            {isMobile ? (
              /* Mobile Danger Buttons */
              <Stack gap="xs">
                <Button
                  variant="outline"
                  fullWidth
                  leftSection={<AppIcon name="prohibited" size={16} stroke={1.8} color="var(--brand-primary)" />}
                  onClick={() => setBlockModalOpen(true)}
                  styles={{
                    root: {
                      borderColor: 'var(--brand-primary)',
                      color: 'var(--brand-primary)',
                      backgroundColor: 'var(--bg-surface)',
                      fontWeight: 600,
                      height: 40,
                    },
                  }}
                >
                  {currentStatus === 'blocked' ? 'Unblock user' : 'Block user'}
                </Button>

                <Button
                  color="red"
                  fullWidth
                  leftSection={<AppIcon name="delete" size={16} stroke={1.8} color="#FFFFFF" />}
                  onClick={() => setAnonymizeModalOpen(true)}
                  styles={{
                    root: {
                      backgroundColor: 'var(--status-danger-fg)',
                      fontWeight: 600,
                      height: 40,
                    },
                  }}
                >
                  Anonymise account
                </Button>
              </Stack>
            ) : (
              /* Desktop / Tablet Sensitive Area Card */
              <Paper
                withBorder
                radius="md"
                p="lg"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                }}
              >
                <Text fw={700} size="sm" c="var(--text-heading)" mb="md">
                  Sensitive area
                </Text>

                <Stack gap="md">
                  {/* Block user row */}
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Box style={{ flex: 1 }}>
                      <Text fw={600} size="sm" c="var(--text-heading)">
                        {currentStatus === 'blocked' ? 'Unblock user' : 'Block user'}
                      </Text>
                      <Text size="xs" c="var(--text-secondary)" mt={2}>
                        The user won't be able to access the app until unblocked. Reason required.
                      </Text>
                    </Box>
                    <Button
                      variant="outline"
                      leftSection={<AppIcon name="prohibited" size={15} stroke={1.8} color="var(--brand-primary)" />}
                      onClick={() => setBlockModalOpen(true)}
                      styles={{
                        root: {
                          borderColor: 'var(--brand-primary)',
                          color: 'var(--brand-primary)',
                          backgroundColor: 'var(--bg-surface)',
                          fontWeight: 600,
                          fontSize: '0.8125rem',
                          height: 36,
                          padding: '0 16px',
                          borderRadius: 'var(--radius-md)',
                          '&:hover': {
                            backgroundColor: 'var(--bg-brand-soft)',
                          },
                        },
                      }}
                    >
                      {currentStatus === 'blocked' ? 'Unblock' : 'Block'}
                    </Button>
                  </Group>

                  {/* Anonymise account row */}
                  <Group justify="space-between" align="center" wrap="nowrap" pt="xs" style={{ borderTop: '1px solid var(--border-default)' }}>
                    <Box style={{ flex: 1 }}>
                      <Text fw={600} size="sm" c="var(--text-heading)">
                        Anonymise account
                      </Text>
                      <Text size="xs" c="var(--text-secondary)" mt={2}>
                        Irreversible: personal data is replaced; only mandatory accounting data is kept.
                      </Text>
                    </Box>
                    <Button
                      color="red"
                      leftSection={<AppIcon name="delete" size={15} stroke={1.8} color="#FFFFFF" />}
                      onClick={() => setAnonymizeModalOpen(true)}
                      styles={{
                        root: {
                          backgroundColor: 'var(--status-danger-fg)',
                          color: '#FFFFFF',
                          fontWeight: 600,
                          fontSize: '0.8125rem',
                          height: 36,
                          padding: '0 16px',
                          borderRadius: 'var(--radius-md)',
                          '&:hover': {
                            backgroundColor: 'var(--brand-primary-hover)',
                          },
                        },
                      }}
                    >
                      Anonymise
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            )}
          </Stack>
        </Grid.Col>
      </Grid>

      {/* 4. Confirmation Modals */}
      {/* Block User Modal */}
      <ActionModal
        opened={blockModalOpen}
        onClose={() => setBlockModalOpen(false)}
        onConfirm={handleBlockConfirm}
        size={460}
        title={currentStatus === 'blocked' ? `Unblock ${user.name}?` : `Block ${user.name}?`}
        confirmLabel={currentStatus === 'blocked' ? 'Unblock user' : 'Block user'}
        isDestructive={currentStatus !== 'blocked'}
      >
        <Text size="sm" c="var(--text-secondary)" style={{ lineHeight: 1.5 }}>
          {currentStatus === 'blocked'
            ? 'The user will immediately regain access to the She Bloom mobile app.'
            : "The user won't be able to access the app until unblocked. Enter the reason: it will be recorded in the audit log and emailed to the user."}
        </Text>
      </ActionModal>

      {/* Anonymise User Modal */}
      <ActionModal
        opened={anonymizeModalOpen}
        onClose={() => setAnonymizeModalOpen(false)}
        onConfirm={handleAnonymizeConfirm}
        size={460}
        title="Anonymise the account?"
        confirmLabel="Anonymise permanently"
        isDestructive={true}
      >
        <Text size="sm" c="var(--text-secondary)" style={{ lineHeight: 1.5 }}>
          This cannot be undone. Name, email, profile data, content and journal will be deleted or replaced. Only accounting data required by law is kept.
        </Text>
      </ActionModal>
    </Box>
  )
}

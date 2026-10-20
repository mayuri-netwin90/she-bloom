import { useState, useMemo } from 'react'
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Group,
  Pagination,
  Paper,
  Stack,
  Table,
  Text,
  TextInput,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { PageHeader } from '../../components/PageHeader'
import { AppAvatar } from '../../components/AppAvatar'
import { AppIcon } from '../../components/AppIcon'
import { StatusBadge } from '../../components/StatusBadge'
import { DrawerWrapper } from '../../components/DrawerWrapper'
import { ActionModal } from '../../components/ActionModal'
import { mockAppUsers, type AppUserItem } from './mockData'

export interface AppUsersListProps {
  onExportCSV?: () => void
}

type FilterTab = 'all' | 'club' | 'free' | 'blocked'
type SortDirection = 'asc' | 'desc'

export function AppUsersList({
  onExportCSV = () => alert('Exporting App users CSV...'),
}: AppUsersListProps) {
  const theme = useMantineTheme()
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm}) and (max-width: calc(${theme.breakpoints.md} - 0.1px))`
  )
  const isMobile = useMediaQuery(`(max-width: calc(${theme.breakpoints.sm} - 0.1px))`)

  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [currentPage, setCurrentPage] = useState(1)

  // Drawer / Modal states for User Details and Actions
  const [selectedUser, setSelectedUser] = useState<AppUserItem | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [blockModalOpen, setBlockModalOpen] = useState(false)
  const [userToBlock, setUserToBlock] = useState<AppUserItem | null>(null)

  // Filtered & sorted users
  const filteredUsers = useMemo(() => {
    return mockAppUsers.filter((user) => {
      // Search filter
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)

      // Tab filter
      let matchesTab = true
      if (activeTab === 'club') matchesTab = user.subscription === 'club'
      if (activeTab === 'free') matchesTab = user.subscription === 'free'
      if (activeTab === 'blocked') matchesTab = user.status === 'blocked'

      return matchesSearch && matchesTab
    }).sort((a, b) => {
      const compare = a.name.localeCompare(b.name)
      return sortDirection === 'asc' ? compare : -compare
    })
  }, [searchQuery, activeTab, sortDirection])

  // Selection handlers
  const allIds = filteredUsers.map((u) => u.id)
  const isAllSelected =
    filteredUsers.length > 0 && allIds.every((id) => selectedUserIds.includes(id))
  const isIndeterminate =
    !isAllSelected && allIds.some((id) => selectedUserIds.includes(id))

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUserIds((prev) => prev.filter((id) => !allIds.includes(id)))
    } else {
      setSelectedUserIds(Array.from(new Set([...selectedUserIds, ...allIds])))
    }
  }

  const handleToggleRow = (id: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleRowClick = (user: AppUserItem) => {
    setSelectedUser(user)
    setDrawerOpen(true)
  }

  const handleActionClick = (e: React.MouseEvent, user: AppUserItem, action: 'edit' | 'block' | 'more') => {
    e.stopPropagation()
    if (action === 'edit') {
      setSelectedUser(user)
      setDrawerOpen(true)
    } else if (action === 'block') {
      setUserToBlock(user)
      setBlockModalOpen(true)
    } else {
      setSelectedUser(user)
      setDrawerOpen(true)
    }
  }

  const filterTabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'club', label: isMobile ? 'Club' : isTablet ? 'Club' : 'Bloom Club' },
    { id: 'free', label: 'Free' },
    { id: 'blocked', label: 'Blocked' },
  ]

  return (
    <Box>
      {/* 1. Header / Breadcrumbs */}
      <PageHeader
        breadcrumbs={[
          { label: 'Management', href: '#' },
          { label: 'App users' },
        ]}
        title="App users"
        subtitle={
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            12,480 registered users · 1,936 Bloom Club subscribers
          </span>
        }
        mb="sm"
        action={
          <Button
            variant="outline"
            color="brand-pink"
            leftSection={<AppIcon name="download" size={16} stroke={1.5} color="var(--brand-primary)" />}
            onClick={onExportCSV}
            styles={{
              root: {
                borderColor: 'var(--brand-secondary)',
                color: 'var(--brand-primary)',
                backgroundColor: 'var(--bg-surface)',
                fontWeight: 600,
                fontSize: '0.875rem',
                height: 38,
                padding: '0 16px',
                borderRadius: 'var(--radius-md)',
                '&:hover': {
                  backgroundColor: 'var(--bg-brand-soft)',
                },
              },
            }}
          >
            Export CSV
          </Button>
        }
      />

      {/* 2. Search & Filter Bar */}
      <Box mb="md">
        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
          {/* Left: Search input & Filter pills */}
          <Group gap="sm" wrap="wrap" style={{ flex: 1 }}>
            <TextInput
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              leftSection={<AppIcon name="search" size={16} stroke={1.5} color="var(--text-secondary)" />}
              styles={{
                root: {
                  width: isMobile ? '100%' : 'clamp(240px, 28vw, 360px)',
                },
                input: {
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  borderRadius: 'var(--radius-md)',
                  height: 38,
                  fontSize: '0.875rem',
                },
              }}
            />

            {/* Figma Filter Pills Container */}
            <Box
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-muted)',
                padding: '3px',
                borderRadius: '9999px',
                gap: '4px',
                height: 38,
                width: isMobile ? '100%' : 'auto',
                overflowX: 'auto',
                boxSizing: 'border-box',
              }}
            >
              {filterTabs.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <UnstyledButton
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      padding: '0 16px',
                      height: 32,
                      borderRadius: '9999px',
                      backgroundColor: isActive ? 'var(--bg-sidebar)' : 'transparent',
                      color: isActive ? 'var(--text-on-sidebar)' : 'var(--text-secondary)',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-family-body)',
                      fontWeight: isActive ? 600 : 500,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      transition: 'all 150ms ease',
                      flex: isMobile ? 1 : undefined,
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isActive && (
                      <AppIcon name="check" size={12} stroke={2.5} color="var(--text-on-sidebar)" />
                    )}
                    <span>{tab.label}</span>
                  </UnstyledButton>
                )
              })}
            </Box>
          </Group>

          {/* Right: More filters button (Desktop only) */}
          {!isMobile && !isTablet && (
            <Button
              variant="outline"
              color="brand-pink"
              leftSection={<AppIcon name="filter" size={16} stroke={1.5} color="var(--brand-primary)" />}
              styles={{
                root: {
                  borderColor: 'var(--brand-secondary)',
                  color: 'var(--brand-primary)',
                  backgroundColor: 'var(--bg-surface)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  height: 38,
                  padding: '0 16px',
                  borderRadius: 'var(--radius-md)',
                  '&:hover': {
                    backgroundColor: 'var(--bg-brand-soft)',
                  },
                },
              }}
            >
              More filters
            </Button>
          )}
        </Group>
      </Box>

      {/* 3. Main Data View (Desktop Table / Tablet Table / Mobile Cards) */}
      {isMobile ? (
        /* Mobile Card View matching Mobile Frame */
        <Stack gap="xs">
          {filteredUsers.map((user) => {
            const initials = user.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()

            return (
              <Card
                key={user.id}
                withBorder
                p="sm"
                radius="md"
                onClick={() => handleRowClick(user)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  transition: 'background-color 150ms ease, box-shadow 150ms ease',
                }}
              >
                <Group justify="space-between" align="center" wrap="nowrap">
                  <Group gap="sm" align="center" wrap="nowrap">
                    <AppAvatar initials={initials} size={36} />
                    <div>
                      <Text
                        size="sm"
                        fw={600}
                        style={{ color: 'var(--text-heading)', lineHeight: 1.2 }}
                      >
                        {user.name}
                      </Text>
                      <Text size="xs" c="var(--text-secondary)">
                        {user.email} · {user.subscription === 'club' ? 'Club' : 'Free'}
                      </Text>
                      <Box mt={4}>
                        <StatusBadge status={user.status} size="xs" />
                      </Box>
                    </div>
                  </Group>

                  <AppIcon name="chevronRight" size={18} stroke={1.5} color="var(--text-muted)" />
                </Group>
              </Card>
            )
          })}
        </Stack>
      ) : (
        /* Desktop & Tablet Table View */
        <Paper
          withBorder
          radius="md"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-default)',
            overflow: 'hidden',
          }}
        >
          <Box style={{ overflowX: 'auto' }}>
            <Table
              verticalSpacing="md"
              horizontalSpacing="md"
              highlightOnHover
              styles={{
                table: {
                  width: '100%',
                },
                th: {
                  backgroundColor: 'var(--bg-surface)',
                  borderBottom: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-family-body)',
                  paddingTop: 14,
                  paddingBottom: 14,
                },
                td: {
                  borderBottom: '1px solid var(--border-default)',
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  paddingTop: 12,
                  paddingBottom: 12,
                },
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  {/* Select Checkbox Column */}
                  <Table.Th style={{ width: 44, paddingLeft: 16 }}>
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={isIndeterminate}
                      onChange={handleToggleSelectAll}
                      color="pink"
                      aria-label="Select all users"
                    />
                  </Table.Th>

                  {/* User Column with sort chevron */}
                  <Table.Th>
                    <UnstyledButton
                      onClick={() => setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        color: 'var(--text-secondary)',
                        fontWeight: 600,
                        fontSize: '0.8125rem',
                      }}
                    >
                      <span>User</span>
                      <AppIcon
                        name={sortDirection === 'asc' ? 'chevronDown' : 'chevronUp'}
                        size={14}
                        stroke={2}
                      />
                    </UnstyledButton>
                  </Table.Th>

                  {/* Subscription Column */}
                  <Table.Th>
                    <Group gap={4} wrap="nowrap">
                      <span>Subscription</span>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} color="var(--text-muted)" />
                    </Group>
                  </Table.Th>

                  {/* Registered On (Desktop only) */}
                  <Table.Th visibleFrom="md">
                    <Group gap={4} wrap="nowrap">
                      <span>Registered on</span>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} color="var(--text-muted)" />
                    </Group>
                  </Table.Th>

                  {/* Sessions (Desktop only) */}
                  <Table.Th visibleFrom="md">
                    <Group gap={4} wrap="nowrap">
                      <span>Sessions</span>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} color="var(--text-muted)" />
                    </Group>
                  </Table.Th>

                  {/* Status */}
                  <Table.Th>
                    <Group gap={4} wrap="nowrap">
                      <span>Status</span>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} color="var(--text-muted)" />
                    </Group>
                  </Table.Th>

                  {/* Inline Actions Column */}
                  <Table.Th style={{ textAlign: 'right', paddingRight: 20 }}>
                    <span style={{ visibility: 'hidden' }}>Actions</span>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {filteredUsers.map((user) => {
                  const isChecked = selectedUserIds.includes(user.id)
                  const initials = user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()

                  return (
                    <Table.Tr
                      key={user.id}
                      onClick={() => handleRowClick(user)}
                      style={{
                        cursor: 'pointer',
                        transition: 'background-color 120ms ease',
                      }}
                    >
                      {/* Checkbox */}
                      <Table.Td
                        style={{ width: 44, paddingLeft: 16 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={isChecked}
                          onChange={() => handleToggleRow(user.id)}
                          color="pink"
                          aria-label={`Select ${user.name}`}
                        />
                      </Table.Td>

                      {/* User Avatar + Name + Email */}
                      <Table.Td>
                        <Group gap="sm" wrap="nowrap">
                          <AppAvatar initials={initials} size={36} />
                          <div>
                            <Text
                              size="sm"
                              fw={600}
                              style={{
                                color: 'var(--text-heading)',
                                lineHeight: 1.3,
                              }}
                            >
                              {user.name}
                            </Text>
                            <Text
                              size="xs"
                              c="var(--text-secondary)"
                              style={{ lineHeight: 1.2 }}
                            >
                              {user.email}
                            </Text>
                          </div>
                        </Group>
                      </Table.Td>

                      {/* Subscription */}
                      <Table.Td>
                        <StatusBadge
                          status={user.subscription === 'club' ? 'violet' : 'neutral'}
                          withDot={false}
                          size="sm"
                        >
                          {user.subscription === 'club' ? '✦ CLUB' : 'FREE'}
                        </StatusBadge>
                      </Table.Td>

                      {/* Registered on (Desktop only) */}
                      <Table.Td visibleFrom="md">
                        <Text size="sm" c="var(--text-primary)">
                          {user.registeredOn}
                        </Text>
                      </Table.Td>

                      {/* Sessions (Desktop only) */}
                      <Table.Td visibleFrom="md">
                        <Text size="sm" c="var(--text-primary)">
                          {user.sessions}
                        </Text>
                      </Table.Td>

                      {/* Status */}
                      <Table.Td>
                        <StatusBadge status={user.status} size="sm" />
                      </Table.Td>

                      {/* Inline Actions (Eye, Edit, More) */}
                      <Table.Td style={{ textAlign: 'right', paddingRight: 16 }}>
                        <Group gap={6} justify="flex-end" wrap="nowrap">
                          {/* View details action */}
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            size="sm"
                            aria-label="View user details"
                            onClick={(e) => handleActionClick(e, user, 'edit')}
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <AppIcon name="view" size={16} stroke={1.5} />
                          </ActionIcon>

                          {/* Edit user action */}
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            size="sm"
                            aria-label="Edit user"
                            onClick={(e) => handleActionClick(e, user, 'edit')}
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <AppIcon name="edit" size={16} stroke={1.5} />
                          </ActionIcon>

                          {/* More options action */}
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            size="sm"
                            aria-label="More user options"
                            onClick={(e) => handleActionClick(e, user, 'more')}
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            <AppIcon name="more" size={16} stroke={1.5} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  )
                })}
              </Table.Tbody>
            </Table>
          </Box>
        </Paper>
      )}

      {/* 4. Bottom Pagination Bar */}
      <Box mt="md" py="xs">
        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
          <Text size="sm" c="var(--text-secondary)">
            1–{filteredUsers.length} of 248 results
          </Text>

          <Pagination
            total={25}
            value={currentPage}
            onChange={setCurrentPage}
            size="sm"
            color="sidebar-violet"
            styles={{
              control: {
                '&[data-active]': {
                  backgroundColor: 'var(--bg-sidebar)',
                  color: 'var(--text-on-sidebar)',
                  borderColor: 'var(--bg-sidebar)',
                },
              },
            }}
          />
        </Group>
      </Box>

      {/* 5. Requirements tag at footer */}
      <Box mt="xl" pt="md">
        <Text
          size="11px"
          fw={600}
          style={{
            color: 'var(--brand-primary)',
            letterSpacing: '0.04em',
            fontFamily: 'var(--font-family-body)',
          }}
        >
          Requirements: RF-BO-USR-01
        </Text>
      </Box>

      {/* 6. User Details Drawer */}
      <DrawerWrapper
        opened={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedUser ? selectedUser.name : 'User Details'}
        confirmLabel="Save changes"
        cancelLabel="Close"
        onConfirm={() => {
          alert('User updated successfully')
          setDrawerOpen(false)
        }}
      >
        {selectedUser && (
          <Stack gap="md">
            <Group gap="md" align="center">
              <AppAvatar
                initials={selectedUser.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
                size={56}
              />
              <div>
                <Text fw={700} size="lg" style={{ color: 'var(--text-heading)' }}>
                  {selectedUser.name}
                </Text>
                <Text size="sm" c="var(--text-secondary)">
                  {selectedUser.email}
                </Text>
                <Group gap="xs" mt={6}>
                  <StatusBadge
                    status={selectedUser.subscription === 'club' ? 'violet' : 'neutral'}
                    withDot={false}
                    size="sm"
                  >
                    {selectedUser.subscription === 'club' ? '✦ CLUB' : 'FREE'}
                  </StatusBadge>
                  <StatusBadge status={selectedUser.status} size="sm" />
                </Group>
              </div>
            </Group>

            <Paper withBorder p="md" radius="md" style={{ backgroundColor: 'var(--bg-subtle)' }}>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="xs" c="var(--text-secondary)" fw={600}>
                    REGISTERED ON
                  </Text>
                  <Text size="xs" fw={600} c="var(--text-primary)">
                    {selectedUser.registeredOn}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" c="var(--text-secondary)" fw={600}>
                    COMPLETED SESSIONS
                  </Text>
                  <Text size="xs" fw={600} c="var(--text-primary)">
                    {selectedUser.sessions}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text size="xs" c="var(--text-secondary)" fw={600}>
                    USER ID
                  </Text>
                  <Text size="xs" c="var(--text-muted)" style={{ fontFamily: 'monospace' }}>
                    {selectedUser.id}
                  </Text>
                </Group>
              </Stack>
            </Paper>

            <TextInput
              label="Full Name"
              defaultValue={selectedUser.name}
              radius="md"
            />

            <TextInput
              label="Email"
              defaultValue={selectedUser.email}
              disabled
              description="Email cannot be changed directly."
              radius="md"
            />

            <Group justify="space-between" mt="md">
              <Button
                variant="outline"
                color="red"
                size="sm"
                onClick={() => {
                  setDrawerOpen(false)
                  setUserToBlock(selectedUser)
                  setBlockModalOpen(true)
                }}
              >
                {selectedUser.status === 'blocked' ? 'Unblock user' : 'Block user'}
              </Button>
            </Group>
          </Stack>
        )}
      </DrawerWrapper>

      {/* 7. Block / Suspend Action Modal */}
      <ActionModal
        opened={blockModalOpen}
        onClose={() => setBlockModalOpen(false)}
        onConfirm={() => {
          alert(`Status toggled for ${userToBlock?.name}`)
          setBlockModalOpen(false)
        }}
        title="Confirm action"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        isDestructive={userToBlock?.status !== 'blocked'}
      >
        <Text size="sm">
          Are you sure you want to change the status of <strong>{userToBlock?.name}</strong>?
        </Text>
      </ActionModal>
    </Box>
  )
}

import { useState, useMemo } from 'react'
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  Group,
  Paper,
  Stack,
  Switch,
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
import { RoleBadge } from '../../components/RoleBadge'
import { StatusBadge } from '../../components/StatusBadge'
import { DrawerWrapper } from '../../components/DrawerWrapper'
import { ActionModal } from '../../components/ActionModal'
import { mockBackofficeUsers, type BackofficeUserItem } from './mockData'

type RoleFilter = 'all' | 'admin' | 'moderator' | 'mentor'

export interface BackofficeUsersProps {
  onExportCSV?: () => void
}

export function BackofficeUsers({
  onExportCSV = () => alert('Exporting Backoffice users CSV...'),
}: BackofficeUsersProps) {
  const theme = useMantineTheme()
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm}) and (max-width: calc(${theme.breakpoints.md} - 0.1px))`
  )
  const isMobile = useMediaQuery(`(max-width: calc(${theme.breakpoints.sm} - 0.1px))`)

  // Data state
  const [users, setUsers] = useState<BackofficeUserItem[]>(mockBackofficeUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeRoleFilter, setActiveRoleFilter] = useState<RoleFilter>('all')

  // Invite Drawer state
  const [inviteDrawerOpen, setInviteDrawerOpen] = useState(false)
  const [inviteName, setInviteName] = useState('Francesca Leone')
  const [inviteEmail, setInviteEmail] = useState('francesca.leone@shebloom.it')
  const [inviteAdmin, setInviteAdmin] = useState(true)
  const [inviteModerator, setInviteModerator] = useState(false)
  const [inviteMentor, setInviteMentor] = useState(false)
  const [inviteTwoFactor, setInviteTwoFactor] = useState(true)

  // Edit / Detail Drawer state
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<BackofficeUserItem | null>(null)
  const [editTwoFactor, setEditTwoFactor] = useState(false)

  // Confirmation Modals
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false)
  const [reset2faModalOpen, setReset2faModalOpen] = useState(false)

  // Filtered users list
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search filter
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)

      // Role filter
      let matchesRole = true
      if (activeRoleFilter === 'admin') matchesRole = user.roles.includes('admin')
      if (activeRoleFilter === 'moderator') matchesRole = user.roles.includes('moderator')
      if (activeRoleFilter === 'mentor') matchesRole = user.roles.includes('mentor')

      return matchesSearch && matchesRole
    })
  }, [users, searchQuery, activeRoleFilter])

  // Open Edit Drawer
  const handleOpenUserDetail = (user: BackofficeUserItem) => {
    setSelectedUser(user)
    setEditTwoFactor(user.twoFactorStatus === 'active')
    setDetailDrawerOpen(true)
  }

  // Handle Role selection mutual exclusivity in Invite Drawer
  const handleInviteRoleChange = (role: 'admin' | 'moderator' | 'mentor', checked: boolean) => {
    if (role === 'mentor') {
      if (checked) {
        setInviteMentor(true)
        setInviteAdmin(false)
        setInviteModerator(false)
      } else {
        setInviteMentor(false)
      }
    } else {
      if (checked) {
        setInviteMentor(false)
        if (role === 'admin') setInviteAdmin(true)
        if (role === 'moderator') setInviteModerator(true)
      } else {
        if (role === 'admin') setInviteAdmin(false)
        if (role === 'moderator') setInviteModerator(false)
      }
    }
  }

  // Submit Invite User
  const handleSendInvitation = () => {
    if (!inviteName.trim() || !inviteEmail.trim()) {
      alert('Please fill out all fields.')
      return
    }

    const assignedRoles: ('admin' | 'moderator' | 'mentor')[] = []
    if (inviteAdmin) assignedRoles.push('admin')
    if (inviteModerator) assignedRoles.push('moderator')
    if (inviteMentor) assignedRoles.push('mentor')

    if (assignedRoles.length === 0) {
      alert('Please select at least one role.')
      return
    }

    const newUser: BackofficeUserItem = {
      id: `bo-${Date.now()}`,
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      avatarInitials: inviteName
        .split(' ')
        .map((p) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
      roles: assignedRoles,
      twoFactorStatus: inviteTwoFactor ? 'active' : 'disabled',
      status: 'invitation_sent',
      lastLogin: '—',
      createdOn: 'Today',
      createdBy: 'Giulia Ferri',
    }

    setUsers((prev) => [newUser, ...prev])
    setInviteDrawerOpen(false)
    setInviteName('')
    setInviteEmail('')
    setInviteAdmin(true)
    setInviteModerator(false)
    setInviteMentor(false)
  }

  // Save changes to selected user
  const handleSaveUserChanges = () => {
    if (!selectedUser) return

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === selectedUser.id) {
          return {
            ...u,
            twoFactorStatus: editTwoFactor ? 'active' : 'disabled',
          }
        }
        return u
      })
    )
    setDetailDrawerOpen(false)
  }

  // Deactivate User
  const handleConfirmDeactivate = () => {
    if (!selectedUser) return
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id ? { ...u, status: 'suspended' } : u
      )
    )
    setDeactivateModalOpen(false)
    setDetailDrawerOpen(false)
  }

  // Reset 2FA
  const handleConfirmReset2FA = () => {
    if (!selectedUser) return
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? {
              ...u,
              twoFactorStatus: 'disabled',
              twoFactorDetails: '2FA reset by Admin. The user will be required to configure 2FA on next sign in.',
            }
          : u
      )
    )
    setEditTwoFactor(false)
    setReset2faModalOpen(false)
  }

  return (
    <Box
      style={{
        width: '100%',
        padding: isMobile ? 'var(--spacing-md)' : 'var(--spacing-lg) var(--spacing-xl)',
      }}
    >
      {/* 1. Page Header */}
      <PageHeader
        title="Backoffice users"
        subtitle="Backoffice access and roles. Admin and Moderator can be combined; the Mentor role is exclusive."
        breadcrumbs={[
          { label: 'System', href: '#' },
          { label: 'Backoffice users', href: '#' },
        ]}
        action={
          <Group gap="sm">
            <Button
              variant="outline"
              leftSection={<AppIcon name="download" size={16} stroke={1.5} color="var(--brand-primary)" />}
              onClick={onExportCSV}
              styles={{
                root: {
                  borderColor: 'var(--brand-primary)',
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
            <Button
              leftSection={<AppIcon name="plus" size={16} stroke={2} color="var(--text-heading)" />}
              onClick={() => setInviteDrawerOpen(true)}
              styles={{
                root: {
                  backgroundColor: 'var(--brand-primary)',
                  color: 'var(--text-on-brand)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  height: 38,
                  padding: '0 16px',
                  borderRadius: 'var(--radius-md)',
                  '&:hover': {
                    backgroundColor: 'var(--brand-primary-hover)',
                  },
                },
              }}
            >
              Invite user
            </Button>
          </Group>
        }
      />

      {/* 2. Search & Role Filter Bar (Side-by-side on left matching Figma) */}
      <Box mb="md">
        <Group justify="flex-start" align="center" gap="md" wrap="wrap">
          <TextInput
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            leftSection={<AppIcon name="search" size={16} stroke={1.5} color="var(--text-secondary)" />}
            style={{ width: isMobile ? '100%' : 320 }}
            styles={{
              input: {
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)',
                borderRadius: '8px',
                height: 38,
                fontSize: '0.875rem',
              },
            }}
          />

          <Group gap="xs" wrap="wrap">
            {(
              [
                { key: 'all', label: 'All' },
                { key: 'admin', label: 'Admin' },
                { key: 'moderator', label: 'Moderator' },
                { key: 'mentor', label: 'Mentor' },
              ] as const
            ).map((tab) => {
              const isActive = activeRoleFilter === tab.key
              return (
                <UnstyledButton
                  key={tab.key}
                  onClick={() => setActiveRoleFilter(tab.key)}
                  style={{
                    padding: '0 18px',
                    height: 36,
                    borderRadius: '9999px',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-family-body)',
                    backgroundColor: isActive
                      ? 'var(--bg-sidebar)'
                      : 'var(--bg-surface)',
                    color: isActive
                      ? 'var(--text-on-sidebar)'
                      : 'var(--text-primary)',
                    border: `1px solid ${isActive ? 'var(--bg-sidebar)' : 'var(--border-default)'}`,
                    boxShadow: isActive ? 'none' : 'var(--shadow-small)',
                    transition: 'all 0.15s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  {isActive && tab.key === 'all' && (
                    <AppIcon name="check" size={13} stroke={2.2} />
                  )}
                  {tab.label}
                </UnstyledButton>
              )
            })}
          </Group>
        </Group>
      </Box>

      {/* 3. Main Data Table */}
      <Paper
        withBorder
        radius="md"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-default)',
          overflow: 'hidden',
        }}
      >
        {isMobile || isTablet ? (
          /* Mobile / Tablet Cards */
          <Stack gap="xs" p="sm">
            {filteredUsers.length === 0 ? (
              <Box p="xl" ta="center">
                <Text c="dimmed">No backoffice users match your search criteria.</Text>
              </Box>
            ) : (
              filteredUsers.map((user) => (
                <Card
                  key={user.id}
                  withBorder
                  p="sm"
                  radius="md"
                  onClick={() => handleOpenUserDetail(user)}
                  style={{
                    backgroundColor: 'var(--bg-canvas)',
                    borderColor: 'var(--border-default)',
                    cursor: 'pointer',
                  }}
                >
                  <Group justify="space-between" align="flex-start" mb="xs">
                    <Group gap="sm">
                      <AppAvatar initials={user.avatarInitials} size="md" />
                      <Box>
                        <Text fw={600} size="sm" c="var(--text-heading)">
                          {user.name}
                        </Text>
                        <Text size="xs" c="dimmed">
                          {user.email}
                        </Text>
                      </Box>
                    </Group>
                    <StatusBadge
                      status={
                        user.status === 'active'
                          ? 'active'
                          : user.status === 'invitation_sent'
                            ? 'warning'
                            : 'danger'
                      }
                    >
                      {user.status === 'invitation_sent'
                        ? 'INVITATION SENT'
                        : user.status.toUpperCase()}
                    </StatusBadge>
                  </Group>

                  <Group gap="xs" mb="xs">
                    {user.roles.map((r) => (
                      <RoleBadge
                        key={r}
                        role={r === 'moderator' ? 'moderatore' : r}
                      />
                    ))}
                  </Group>

                  <Group justify="space-between" pt="xs" style={{ borderTop: '1px solid var(--border-default)' }}>
                    <Text size="xs" c="dimmed">
                      Last login: {user.lastLogin}
                    </Text>
                    <Text size="xs" fw={600} c="var(--brand-primary)">
                      Edit &rarr;
                    </Text>
                  </Group>
                </Card>
              ))
            )}
          </Stack>
        ) : (
          /* Desktop Table */
          <Box style={{ overflowX: 'auto' }}>
            <Table
              verticalSpacing="md"
              horizontalSpacing="lg"
              highlightOnHover
              styles={{
                table: { width: '100%' },
                th: {
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-family-body)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  backgroundColor: 'var(--bg-subtle)',
                  borderBottom: '1px solid var(--border-default)',
                  whiteSpace: 'nowrap',
                  paddingTop: '14px',
                  paddingBottom: '14px',
                },
                td: {
                  borderBottom: '1px solid var(--border-subtle)',
                  fontFamily: 'var(--font-family-body)',
                  fontSize: '0.875rem',
                },
                tr: {
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  '&:hover': {
                    backgroundColor: 'var(--bg-canvas)',
                  },
                },
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th style={{ minWidth: 220 }}>
                    <Group gap={4}>
                      <Text inherit fw={600}>User</Text>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} />
                    </Group>
                  </Table.Th>
                  <Table.Th style={{ minWidth: 180 }}>
                    <Group gap={4}>
                      <Text inherit fw={600}>Roles</Text>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} />
                    </Group>
                  </Table.Th>
                  <Table.Th style={{ minWidth: 130 }}>
                    <Group gap={4}>
                      <Text inherit fw={600}>2FA</Text>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} />
                    </Group>
                  </Table.Th>
                  <Table.Th style={{ minWidth: 170 }}>
                    <Group gap={4}>
                      <Text inherit fw={600}>Status</Text>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} />
                    </Group>
                  </Table.Th>
                  <Table.Th style={{ minWidth: 140 }}>
                    <Group gap={4}>
                      <Text inherit fw={600}>Last login</Text>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} />
                    </Group>
                  </Table.Th>
                  <Table.Th style={{ width: 100 }} ta="right" />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredUsers.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={6} ta="center" py="xl">
                      <Text c="dimmed">No backoffice users found.</Text>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  filteredUsers.map((user) => (
                    <Table.Tr
                      key={user.id}
                      onClick={() => handleOpenUserDetail(user)}
                    >
                      {/* User Avatar + Name + Email */}
                      <Table.Td>
                        <Group gap="sm" wrap="nowrap">
                          <AppAvatar initials={user.avatarInitials} size="md" />
                          <Box>
                            <Text fw={600} size="sm" c="var(--text-heading)">
                              {user.name}
                            </Text>
                            <Text size="xs" c="var(--text-secondary)">
                              {user.email}
                            </Text>
                          </Box>
                        </Group>
                      </Table.Td>

                      {/* Roles Badges */}
                      <Table.Td>
                        <Group gap="xs" wrap="wrap">
                          {user.roles.map((r) => (
                            <RoleBadge
                              key={r}
                              role={r === 'moderator' ? 'moderatore' : r}
                            >
                              {r.toUpperCase()}
                            </RoleBadge>
                          ))}
                        </Group>
                      </Table.Td>

                      {/* 2FA Badge */}
                      <Table.Td>
                        {user.twoFactorStatus === 'active' && (
                          <StatusBadge status="active">Active</StatusBadge>
                        )}
                        {user.twoFactorStatus === 'disabled' && (
                          <StatusBadge status="warning">Disabled</StatusBadge>
                        )}
                        {user.twoFactorStatus === 'optional' && (
                          <StatusBadge status="gray">Optional</StatusBadge>
                        )}
                      </Table.Td>

                      {/* Status Badge */}
                      <Table.Td>
                        {user.status === 'active' && (
                          <StatusBadge status="active">Active</StatusBadge>
                        )}
                        {user.status === 'invitation_sent' && (
                          <StatusBadge status="yellow">Invitation sent</StatusBadge>
                        )}
                        {user.status === 'suspended' && (
                          <StatusBadge status="danger">Suspended</StatusBadge>
                        )}
                      </Table.Td>

                      {/* Last login */}
                      <Table.Td>
                        <Text size="sm" c="var(--text-primary)">
                          {user.lastLogin}
                        </Text>
                      </Table.Td>

                      {/* Row actions */}
                      <Table.Td ta="right" onClick={(e) => e.stopPropagation()}>
                        <Group gap={4} justify="flex-end" wrap="nowrap">
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            size="sm"
                            aria-label="View user details"
                            onClick={() => handleOpenUserDetail(user)}
                          >
                            <AppIcon name="view" size={16} stroke={1.5} />
                          </ActionIcon>
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            size="sm"
                            aria-label="Edit user"
                            onClick={() => handleOpenUserDetail(user)}
                          >
                            <AppIcon name="edit" size={16} stroke={1.5} />
                          </ActionIcon>
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            size="sm"
                            aria-label="More options"
                            onClick={() => handleOpenUserDetail(user)}
                          >
                            <AppIcon name="more" size={16} stroke={1.5} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))
                )}
              </Table.Tbody>
            </Table>
          </Box>
        )}
      </Paper>

      {/* =========================================================================
          4. "Invite user" Side Drawer (Page 12)
          ========================================================================= */}
      <DrawerWrapper
        opened={inviteDrawerOpen}
        onClose={() => setInviteDrawerOpen(false)}
        title="Invite user"
        size={460}
        cancelLabel="Cancel"
        confirmLabel="Send invitation"
        onConfirm={handleSendInvitation}
      >
        <Stack gap="lg">
          {/* Full Name */}
          <Box>
            <Text fw={600} size="sm" mb={6} c="var(--text-heading)">
              Full name
            </Text>
            <TextInput
              placeholder="e.g. Francesca Leone"
              value={inviteName}
              onChange={(e) => setInviteName(e.currentTarget.value)}
              styles={{
                input: {
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-default)',
                  borderRadius: '8px',
                },
              }}
            />
          </Box>

          {/* Email */}
          <Box>
            <Text fw={600} size="sm" mb={6} c="var(--text-heading)">
              Email
            </Text>
            <TextInput
              placeholder="e.g. francesca.leone@shebloom.it"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.currentTarget.value)}
              styles={{
                input: {
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-default)',
                  borderRadius: '8px',
                },
              }}
            />
          </Box>

          {/* Roles Selection */}
          <Box>
            <Text
              fw={700}
              size="xs"
              mb={8}
              c="var(--text-muted)"
              style={{ letterSpacing: '0.05em' }}
            >
              ROLES
            </Text>

            <Stack gap="sm">
              <Checkbox
                label={
                  <Text size="sm" fw={500} c="var(--text-heading)">
                    Admin <Text span c="dimmed">— full platform management</Text>
                  </Text>
                }
                checked={inviteAdmin}
                onChange={(e) => handleInviteRoleChange('admin', e.currentTarget.checked)}
                color="pink"
              />

              <Checkbox
                label={
                  <Text size="sm" fw={500} c="var(--text-heading)">
                    Moderator <Text span c="dimmed">— Community and Q&A</Text>
                  </Text>
                }
                checked={inviteModerator}
                onChange={(e) => handleInviteRoleChange('moderator', e.currentTarget.checked)}
                color="pink"
              />

              <Checkbox
                label={
                  <Text size="sm" fw={500} c="var(--text-heading)">
                    Mentor <Text span c="dimmed">— professional's private area</Text>
                  </Text>
                }
                checked={inviteMentor}
                onChange={(e) => handleInviteRoleChange('mentor', e.currentTarget.checked)}
                color="pink"
              />
            </Stack>
          </Box>

          {/* Exclusivity Notice Box */}
          <Box
            p="md"
            style={{
              backgroundColor: 'var(--status-warning-bg)',
              borderRadius: '8px',
              border: '1px solid var(--border-default)',
            }}
          >
            <Group align="flex-start" gap="xs">
              <AppIcon name="warning" size={18} stroke={1.5} />
              <Box style={{ flex: 1 }}>
                <Text size="xs" fw={700} c="var(--status-warning-fg)">
                  The Mentor role is exclusive
                </Text>
                <Text size="xs" c="var(--status-warning-fg)" mt={2}>
                  A Mentor can't be an Admin or Moderator. To invite a Mentor, deselect the other roles.
                </Text>
              </Box>
            </Group>
          </Box>

          {/* Two-Factor Authentication Toggle */}
          <Box pt="sm" style={{ borderTop: '1px solid var(--border-default)' }}>
            <Group justify="space-between" align="center">
              <Box>
                <Text fw={600} size="sm" c="var(--text-heading)">
                  Two-factor authentication
                </Text>
                <Text size="xs" c="dimmed">
                  Enabled by default for Admin and Moderator.
                </Text>
              </Box>
              <Switch
                checked={inviteTwoFactor}
                onChange={(e) => setInviteTwoFactor(e.currentTarget.checked)}
                color="pink"
              />
            </Group>
          </Box>

          {/* Audit notice */}
          <Text size="xs" c="dimmed" mt="xs">
            The user will receive an email invitation to set their password. The action is recorded in the audit log.
          </Text>
        </Stack>
      </DrawerWrapper>

      {/* =========================================================================
          5. "Edit User & Permissions" Side Drawer (Page 13)
          ========================================================================= */}
      {selectedUser && (
        <DrawerWrapper
          opened={detailDrawerOpen}
          onClose={() => setDetailDrawerOpen(false)}
          title={selectedUser.name}
          size={460}
          cancelLabel="Cancel"
          confirmLabel="Save changes"
          onConfirm={handleSaveUserChanges}
        >
          <Stack gap="lg">
            {/* Header / Avatar info */}
            <Group gap="md">
              <AppAvatar initials={selectedUser.avatarInitials} size="lg" />
              <Box>
                <Text size="sm" c="var(--text-secondary)">
                  {selectedUser.email}
                </Text>
                <Group gap="xs" mt={4}>
                  {selectedUser.roles.map((r) => (
                    <RoleBadge key={r} role={r === 'moderator' ? 'moderatore' : r}>
                      {r.toUpperCase()}
                    </RoleBadge>
                  ))}
                </Group>
              </Box>
            </Group>

            {/* Metadata Table / Summary */}
            <Box>
              <Group
                justify="space-between"
                py="sm"
                style={{ borderBottom: '1px solid var(--border-default)' }}
              >
                <Text size="sm" c="var(--text-secondary)">
                  Status
                </Text>
                <Text size="sm" fw={600} c="var(--text-heading)">
                  {selectedUser.status === 'active' ? 'Active' : 'Suspended'}
                </Text>
              </Group>
              <Group
                justify="space-between"
                py="sm"
                style={{ borderBottom: '1px solid var(--border-default)' }}
              >
                <Text size="sm" c="var(--text-secondary)">
                  Created on
                </Text>
                <Text size="sm" fw={600} c="var(--text-heading)">
                  {selectedUser.createdOn ?? '02/09/2026'}{' '}
                  <Text span fw={400} c="var(--text-secondary)">
                    by
                  </Text>{' '}
                  {selectedUser.createdBy ?? 'Giulia Ferri'}
                </Text>
              </Group>
              <Group
                justify="space-between"
                py="sm"
                style={{ borderBottom: '1px solid var(--border-default)' }}
              >
                <Text size="sm" c="var(--text-secondary)">
                  Last login
                </Text>
                <Text size="sm" fw={600} c="var(--text-heading)">
                  {selectedUser.lastLogin}
                </Text>
              </Group>
            </Box>

            {/* Security Section */}
            <Box pt="xs">
              <Text
                fw={700}
                size="xs"
                mb="md"
                c="var(--text-secondary)"
                style={{ letterSpacing: '0.05em' }}
              >
                SECURITY
              </Text>

              <Group justify="space-between" align="center" mb="md">
                <Box style={{ maxWidth: '82%' }}>
                  <Text fw={700} size="sm" c="var(--text-heading)" mb={4}>
                    Two-factor authentication
                  </Text>
                  <Text size="xs" c="var(--text-secondary)" lh={1.4}>
                    {selectedUser.twoFactorDetails ??
                      (editTwoFactor
                        ? 'Active and verified via authenticator app.'
                        : 'Disabled: the user signs in with password only.')}
                  </Text>
                </Box>
                <Switch
                  checked={editTwoFactor}
                  onChange={(e) => setEditTwoFactor(e.currentTarget.checked)}
                  color="pink"
                  size="md"
                />
              </Group>

              {/* 2FA Disabled Warning if Moderator/Admin */}
              {!editTwoFactor && (
                <Box
                  p="md"
                  mt="md"
                  style={{
                    backgroundColor: 'var(--status-warning-bg)',
                    borderRadius: '8px',
                    border: '1px solid transparent',
                  }}
                >
                  <Group align="flex-start" gap="xs" wrap="nowrap">
                    <AppIcon name="warning" size={20} stroke={1.5} />
                    <Box style={{ flex: 1 }}>
                      <Text size="xs" fw={700} c="var(--status-warning-fg)">
                        2FA disabled for a Moderator
                      </Text>
                      <Text size="xs" c="var(--status-warning-fg)" mt={4} lh={1.4}>
                        The role policy requires 2FA. Re-enable it as soon as possible.
                      </Text>
                    </Box>
                  </Group>
                </Box>
              )}
            </Box>

            {/* Quick Actions Buttons */}
            <Group grow pt="sm" gap="md">
              <Button
                variant="outline"
                color="pink"
                leftSection={<AppIcon name="reload" size={16} stroke={1.5} />}
                onClick={() => setReset2faModalOpen(true)}
                styles={{
                  root: {
                    borderColor: 'var(--brand-primary)',
                    color: 'var(--brand-primary)',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    height: '40px',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'var(--bg-subtle)',
                    },
                  },
                }}
              >
                Reset second factor
              </Button>
              <Button
                variant="outline"
                leftSection={<AppIcon name="prohibited" size={16} stroke={1.5} />}
                onClick={() => setDeactivateModalOpen(true)}
                styles={{
                  root: {
                    borderColor: 'var(--brand-primary)',
                    color: 'var(--brand-primary)',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    height: '40px',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'var(--bg-subtle)',
                    },
                  },
                }}
              >
                Deactivate user
              </Button>
            </Group>
          </Stack>
        </DrawerWrapper>
      )}

      {/* Confirmation Modal: Deactivate User */}
      <ActionModal
        opened={deactivateModalOpen}
        onClose={() => setDeactivateModalOpen(false)}
        onConfirm={handleConfirmDeactivate}
        title="Deactivate Backoffice User"
        confirmLabel="Deactivate"
        cancelLabel="Cancel"
        isDestructive
      >
        <Text size="sm" c="var(--text-secondary)">
          Are you sure you want to deactivate {selectedUser?.name}? They will immediately lose access to the Backoffice platform until reactivated by an Admin.
        </Text>
      </ActionModal>

      {/* Confirmation Modal: Reset 2FA */}
      <ActionModal
        opened={reset2faModalOpen}
        onClose={() => setReset2faModalOpen(false)}
        onConfirm={handleConfirmReset2FA}
        title="Reset Two-Factor Authentication"
        confirmLabel="Reset 2FA"
        cancelLabel="Cancel"
      >
        <Text size="sm" c="var(--text-secondary)">
          This will reset 2FA configuration for {selectedUser?.name}. The user will be required to scan a new QR code upon their next login.
        </Text>
      </ActionModal>
    </Box>
  )
}

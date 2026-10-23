import { useState, useMemo } from 'react'
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Group,
  Menu,
  Pagination,
  Paper,
  Select,
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
import { StatusBadge } from '../../components/StatusBadge'
import { DrawerWrapper } from '../../components/DrawerWrapper'
import { ActionModal } from '../../components/ActionModal'
import { mockMentors, type MentorItem } from './mockData'

export interface MentorListProps {
  onExportCSV?: () => void
  onSelectMentor?: (mentor: MentorItem) => void
}

type FilterTab = 'all' | 'verified' | 'to_verify' | 'suspended'

export function MentorList({
  onExportCSV = () => alert('Exporting Mentors CSV...'),
  onSelectMentor,
}: MentorListProps) {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: calc(${theme.breakpoints.sm} - 0.1px))`)

  // Mentors list state
  const [mentors, setMentors] = useState<MentorItem[]>(mockMentors)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Add Mentor Drawer state
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [addName, setAddName] = useState('')
  const [addQualification, setAddQualification] = useState('')
  const [addEmail, setAddEmail] = useState('')
  const [addArea, setAddArea] = useState<string | null>('Relationships & Emotions')
  const [addVerified, setAddVerified] = useState(false)
  const [addProfileAllowed, setAddProfileAllowed] = useState(true)
  const [addOfferingAllowed, setAddOfferingAllowed] = useState(false)

  // Status Modal confirmation
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [selectedMentorForStatus, setSelectedMentorForStatus] = useState<MentorItem | null>(null)
  const [pendingStatus, setPendingStatus] = useState<'active' | 'suspended' | 'deactivated'>('active')

  // Filter tabs definition matching Figma
  const filterTabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'verified', label: 'Verified' },
    { id: 'to_verify', label: 'To verify' },
    { id: 'suspended', label: 'Suspended' },
  ]

  // Filtered mentors
  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      // Search filter
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.qualification.toLowerCase().includes(q) ||
        m.area.toLowerCase().includes(q)

      // Tab filter
      let matchesTab = true
      if (activeTab === 'verified') matchesTab = m.verification === 'verified'
      if (activeTab === 'to_verify') matchesTab = m.status === 'to_verify'
      if (activeTab === 'suspended') matchesTab = m.status === 'suspended'

      return matchesSearch && matchesTab
    })
  }, [mentors, searchQuery, activeTab])

  // Handle Add Mentor submit
  const handleAddMentorSubmit = () => {
    if (!addName.trim() || !addEmail.trim()) {
      alert('Please fill out name and email.')
      return
    }

    const initials = addName
      .split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

    const newMentor: MentorItem = {
      id: `men-${Date.now()}`,
      name: addName.trim(),
      qualification: addQualification.trim() || 'Professional Mentor',
      avatarInitials: initials || 'ME',
      area: addArea || 'Relationships & Emotions',
      verification: addVerified ? 'verified' : 'not_verified',
      status: addVerified ? 'active' : 'to_verify',
      rating: undefined,
      sessionCount: 0,
      reportedNoShows: 0,
      profileEditingAllowed: addProfileAllowed,
      offeringEditingAllowed: addOfferingAllowed,
    }

    setMentors((prev) => [newMentor, ...prev])
    setAddDrawerOpen(false)
    setAddName('')
    setAddQualification('')
    setAddEmail('')
  }

  // Handle Status change
  const handleApplyStatusChange = () => {
    if (!selectedMentorForStatus) return
    setMentors((prev) =>
      prev.map((m) =>
        m.id === selectedMentorForStatus.id ? { ...m, status: pendingStatus } : m
      )
    )
    setStatusModalOpen(false)
  }

  return (
    <Box
      style={{
        width: '100%',
        padding: isMobile ? 'var(--spacing-md)' : 'var(--spacing-lg) var(--spacing-xl)',
        backgroundColor: 'var(--bg-canvas)',
        minHeight: '100vh',
      }}
    >
      {/* 1. Header with Breadcrumbs, Title, Subtitle, and Action */}
      <PageHeader
        breadcrumbs={[
          { label: 'Management', href: '#' },
          { label: 'Mentor', href: '#' },
        ]}
        title="Mentor"
        subtitle={
          isMobile
            ? `${filteredMentors.length} professionals`
            : 'Platform professionals: public profile, verification, permissions and session report.'
        }
        action={
          isMobile ? (
            <Button
              leftSection={<AppIcon name="plus" size={16} stroke={2} color="var(--text-heading)" />}
              onClick={() => setAddDrawerOpen(true)}
              styles={{
                root: {
                  backgroundColor: 'var(--brand-primary)',
                  color: 'var(--text-on-brand)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  borderRadius: 'var(--radius-md)',
                  width: '100%',
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  '&:hover': {
                    backgroundColor: 'var(--brand-primary-hover)',
                  },
                },
              }}
            >
              Add
            </Button>
          ) : (
            <Group gap="sm" wrap="nowrap">
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
                    borderRadius: 'var(--radius-md)',
                    height: 38,
                    padding: '0 16px',
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
                onClick={() => setAddDrawerOpen(true)}
                styles={{
                  root: {
                    backgroundColor: 'var(--brand-primary)',
                    color: 'var(--text-on-brand)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderRadius: 'var(--radius-md)',
                    height: 38,
                    padding: '0 16px',
                    '&:hover': {
                      backgroundColor: 'var(--brand-primary-hover)',
                    },
                  },
                }}
              >
                Add Mentor
              </Button>
            </Group>
          )
        }
      />

      {/* 2. Search & Filter Bar */}
      <Box mb="md" mt={isMobile ? 'xs' : 'sm'}>
        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
          {/* Search input & Filter pills */}
          <Group gap="sm" wrap="wrap" style={{ flex: 1 }}>
            <TextInput
              placeholder="Search Mentors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              leftSection={<AppIcon name="search" size={16} stroke={1.5} color="var(--text-secondary)" />}
              styles={{
                root: {
                  width: isMobile ? '100%' : 'clamp(240px, 26vw, 340px)',
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

            {/* Figma Filter Pills (All, Verified, To verify, Suspended) */}
            {!isMobile && (
              <Group gap="xs" wrap="nowrap" style={{ overflowX: 'auto' }}>
                {filterTabs.map((tab) => {
                  const isActive = activeTab === tab.id
                  return (
                    <UnstyledButton
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        padding: '0 16px',
                        height: 36,
                        borderRadius: '9999px',
                        backgroundColor: isActive ? 'var(--bg-sidebar)' : 'var(--bg-surface)',
                        border: isActive
                          ? '1px solid var(--bg-sidebar)'
                          : '1px solid var(--border-default)',
                        color: isActive ? 'var(--text-on-sidebar)' : 'var(--text-primary)',
                        fontSize: '0.8125rem',
                        fontFamily: 'var(--font-family-body)',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'all 150ms ease',
                        whiteSpace: 'nowrap',
                        boxShadow: isActive ? 'none' : 'var(--shadow-small)',
                        outline: 'none',
                        WebkitTapHighlightColor: 'transparent',
                      }}
                    >
                      {isActive && (
                        <AppIcon
                          name="check"
                          size={13}
                          stroke={2.2}
                          color="var(--text-on-sidebar)"
                        />
                      )}
                      {tab.label}
                    </UnstyledButton>
                  )
                })}
              </Group>
            )}
          </Group>
        </Group>
      </Box>

      {/* 3. Main Content: Responsive Cards (Mobile) or Clean Table (Desktop/Tablet) */}
      {isMobile ? (
        /* Mobile Card View (matching Page 15 mobile layout) */
        <Stack gap="md" p={0}>
          {filteredMentors.length === 0 ? (
            <Box p="xl" ta="center">
              <Text c="dimmed">No mentors found matching your search.</Text>
            </Box>
          ) : (
            filteredMentors.map((mentor) => (
              <Card
                key={mentor.id}
                withBorder
                p="md"
                radius="lg"
                onClick={() => onSelectMentor?.(mentor)}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-small)',
                }}
              >
                <Group justify="space-between" align="center" wrap="nowrap">
                  <Group gap="md" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
                    <AppAvatar initials={mentor.avatarInitials} size="lg" />
                    <Box style={{ flex: 1, minWidth: 0 }}>
                      <Text fw={700} size="sm" c="var(--text-heading)">
                        {mentor.name}
                      </Text>
                      <Text
                        size="xs"
                        c="var(--text-secondary)"
                        mt={2}
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {mentor.qualification} · {mentor.area}
                      </Text>
                      <Box mt={8}>
                        <StatusBadge
                          status={
                            mentor.status === 'active'
                              ? 'active'
                              : mentor.status === 'to_verify'
                                ? 'warning'
                                : 'danger'
                          }
                          withDot
                        >
                          {mentor.status === 'to_verify' ? 'TO VERIFY' : mentor.status.toUpperCase()}
                        </StatusBadge>
                      </Box>
                    </Box>
                  </Group>
                  <AppIcon name="chevronRight" size={18} stroke={1.5} color="var(--text-secondary)" />
                </Group>
              </Card>
            ))
          )}
        </Stack>
      ) : (
        <Paper
          withBorder
          radius="md"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-default)',
            overflow: 'hidden',
          }}
        >
          {/* Desktop / Tablet Table View (matching Page 14) */}
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
                  <Table.Th style={{ minWidth: 260 }}>
                    <Group gap={4}>
                      <Text inherit fw={600}>Mentor</Text>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} />
                    </Group>
                  </Table.Th>
                  <Table.Th style={{ minWidth: 200 }}>
                    <Group gap={4}>
                      <Text inherit fw={600}>Area</Text>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} />
                    </Group>
                  </Table.Th>
                  <Table.Th style={{ minWidth: 150 }}>
                    <Group gap={4}>
                      <Text inherit fw={600}>Verification</Text>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} />
                    </Group>
                  </Table.Th>
                  <Table.Th style={{ minWidth: 140 }}>
                    <Group gap={4}>
                      <Text inherit fw={600}>Status</Text>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} />
                    </Group>
                  </Table.Th>
                  <Table.Th style={{ minWidth: 160 }}>
                    <Group gap={4}>
                      <Text inherit fw={600}>Activity</Text>
                      <AppIcon name="chevronDown" size={14} stroke={1.5} />
                    </Group>
                  </Table.Th>
                  <Table.Th style={{ width: 110, textAlign: 'right' }}></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredMentors.length === 0 ? (
                  <Table.Tr>
                    <Table.Td colSpan={6} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                      <Text c="dimmed" size="sm">
                        No mentors found matching your filters.
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ) : (
                  filteredMentors.map((mentor) => (
                    <Table.Tr
                      key={mentor.id}
                      onClick={() => onSelectMentor?.(mentor)}
                    >
                      {/* 1. Mentor (Avatar, Name, Qualification) */}
                      <Table.Td>
                        <Group gap="sm" wrap="nowrap">
                          <AppAvatar initials={mentor.avatarInitials} size="md" />
                          <Box>
                            <Text fw={600} size="sm" c="var(--text-heading)">
                              {mentor.name}
                            </Text>
                            <Text size="xs" c="var(--text-secondary)">
                              {mentor.qualification}
                            </Text>
                          </Box>
                        </Group>
                      </Table.Td>

                      {/* 2. Area */}
                      <Table.Td>
                        <Text size="sm" c="var(--text-heading)">
                          {mentor.area}
                        </Text>
                      </Table.Td>

                      {/* 3. Verification Badge */}
                      <Table.Td>
                        <StatusBadge
                          status={mentor.verification === 'verified' ? 'violet' : 'gray'}
                          withDot
                        >
                          {mentor.verification === 'verified' ? 'VERIFIED' : 'NOT VERIFIED'}
                        </StatusBadge>
                      </Table.Td>

                      {/* 4. Status Badge */}
                      <Table.Td>
                        <StatusBadge
                          status={
                            mentor.status === 'active'
                              ? 'active'
                              : mentor.status === 'to_verify'
                                ? 'warning'
                                : 'danger'
                          }
                          withDot
                        >
                          {mentor.status === 'to_verify' ? 'TO VERIFY' : mentor.status.toUpperCase()}
                        </StatusBadge>
                      </Table.Td>

                      {/* 5. Activity (Rating · Sessions) */}
                      <Table.Td>
                        <Text size="sm" c="var(--text-heading)">
                          {mentor.rating !== undefined && mentor.sessionCount !== undefined
                            ? `${mentor.rating} · ${mentor.sessionCount} sessions`
                            : '—'}
                        </Text>
                      </Table.Td>

                      {/* 6. Row Action Icons */}
                      <Table.Td onClick={(e) => e.stopPropagation()}>
                        <Group gap={4} justify="flex-end" wrap="nowrap">
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={() => onSelectMentor?.(mentor)}
                            title="View public profile"
                          >
                            <AppIcon name="view" size={16} stroke={1.5} color="var(--text-secondary)" />
                          </ActionIcon>
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={() => onSelectMentor?.(mentor)}
                            title="Edit mentor"
                          >
                            <AppIcon name="edit" size={16} stroke={1.5} color="var(--text-secondary)" />
                          </ActionIcon>
                          <Menu position="bottom-end" shadow="md" width={180}>
                            <Menu.Target>
                              <ActionIcon variant="subtle" color="gray">
                                <AppIcon name="more" size={16} stroke={1.5} color="var(--text-secondary)" />
                              </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item
                                leftSection={<AppIcon name="view" size={14} stroke={1.5} />}
                                onClick={() => onSelectMentor?.(mentor)}
                              >
                                View details
                              </Menu.Item>
                              <Menu.Item
                                leftSection={<AppIcon name="shieldCheck" size={14} stroke={1.5} />}
                                onClick={() => {
                                  setMentors((prev) =>
                                    prev.map((m) =>
                                      m.id === mentor.id
                                        ? {
                                            ...m,
                                            verification:
                                              m.verification === 'verified'
                                                ? 'not_verified'
                                                : 'verified',
                                          }
                                        : m
                                    )
                                  )
                                }}
                              >
                                {mentor.verification === 'verified'
                                  ? 'Revoke verification'
                                  : 'Assign verification'}
                              </Menu.Item>
                              <Menu.Divider />
                              <Menu.Item
                                color="red"
                                leftSection={<AppIcon name="prohibited" size={14} stroke={1.5} />}
                                onClick={() => {
                                  setSelectedMentorForStatus(mentor)
                                  setPendingStatus(
                                    mentor.status === 'suspended' ? 'active' : 'suspended'
                                  )
                                  setStatusModalOpen(true)
                                }}
                              >
                                {mentor.status === 'suspended' ? 'Reactivate' : 'Suspend mentor'}
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))
                )}
              </Table.Tbody>
            </Table>
          </Box>

          {/* Pagination footer */}
          <Box
            p="md"
            style={{
              borderTop: '1px solid var(--border-default)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <Text size="xs" c="var(--text-secondary)">
              Showing {filteredMentors.length} of {mentors.length} mentors
            </Text>
            <Pagination
              total={1}
              value={currentPage}
              onChange={setCurrentPage}
              size="sm"
              color="pink"
            />
          </Box>
        </Paper>
      )}

      {/* =========================================================================
          4. "Add Mentor" Side Drawer
          ========================================================================= */}
      <DrawerWrapper
        opened={addDrawerOpen}
        onClose={() => setAddDrawerOpen(false)}
        title="Add Mentor"
        size={460}
        cancelLabel="Cancel"
        confirmLabel="Add Mentor"
        onConfirm={handleAddMentorSubmit}
      >
        <Stack gap="lg">
          <Text size="sm" c="var(--text-secondary)">
            Add a new professional to She Bloom. They will receive an email invitation to setup their profile and offering.
          </Text>

          <TextInput
            label="Full name"
            placeholder="e.g. Dr Samanta Cristoforetti"
            value={addName}
            onChange={(e) => setAddName(e.currentTarget.value)}
            required
          />

          <TextInput
            label="Email address"
            placeholder="e.g. mentor@shebloom.it"
            value={addEmail}
            onChange={(e) => setAddEmail(e.currentTarget.value)}
            required
          />

          <TextInput
            label="Qualification"
            placeholder="e.g. Psychologist · Mental coach"
            value={addQualification}
            onChange={(e) => setAddQualification(e.currentTarget.value)}
          />

          <Select
            label="Main Area"
            data={[
              'Relationships & Emotions',
              'Training & Movement',
              'Nutrition',
              'Beauty & Self-care',
              'Astrology & Intuition',
              'Health & Body',
            ]}
            value={addArea}
            onChange={setAddArea}
          />

          {/* Verification & Permissions Switches */}
          <Box pt="xs" style={{ borderTop: '1px solid var(--border-default)' }}>
            <Group justify="space-between" align="center" mb="md">
              <Box style={{ maxWidth: '82%' }}>
                <Text fw={600} size="sm" c="var(--text-heading)">
                  SheBloom Verified badge
                </Text>
                <Text size="xs" c="dimmed">
                  Assign the SheBloom Verified badge immediately.
                </Text>
              </Box>
              <Switch
                checked={addVerified}
                onChange={(e) => setAddVerified(e.currentTarget.checked)}
                color="pink"
              />
            </Group>

            <Group justify="space-between" align="center" mb="md">
              <Box style={{ maxWidth: '82%' }}>
                <Text fw={600} size="sm" c="var(--text-heading)">
                  Profile editing allowed
                </Text>
                <Text size="xs" c="dimmed">
                  If enabled, Mentor changes to their public profile are published immediately.
                </Text>
              </Box>
              <Switch
                checked={addProfileAllowed}
                onChange={(e) => setAddProfileAllowed(e.currentTarget.checked)}
                color="pink"
              />
            </Group>

            <Group justify="space-between" align="center">
              <Box style={{ maxWidth: '82%' }}>
                <Text fw={600} size="sm" c="var(--text-heading)">
                  Offering editing allowed
                </Text>
                <Text size="xs" c="dimmed">
                  If disabled, sessions and programs are read-only for the Mentor.
                </Text>
              </Box>
              <Switch
                checked={addOfferingAllowed}
                onChange={(e) => setAddOfferingAllowed(e.currentTarget.checked)}
                color="pink"
              />
            </Group>
          </Box>
        </Stack>
      </DrawerWrapper>

      {/* Confirmation Modal: Status change */}
      <ActionModal
        opened={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        onConfirm={handleApplyStatusChange}
        title={pendingStatus === 'suspended' ? 'Suspend Mentor' : 'Activate Mentor'}
        confirmLabel={pendingStatus === 'suspended' ? 'Suspend' : 'Activate'}
        cancelLabel="Cancel"
        isDestructive={pendingStatus === 'suspended'}
      >
        <Text size="sm" c="var(--text-secondary)">
          Are you sure you want to {pendingStatus === 'suspended' ? 'suspend' : 'activate'}{' '}
          <strong>{selectedMentorForStatus?.name}</strong>?
          {pendingStatus === 'suspended' &&
            ' While suspended, their sessions cannot be booked in the app.'}
        </Text>
      </ActionModal>
    </Box>
  )
}

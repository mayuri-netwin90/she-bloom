import { type ReactNode, useMemo, useState } from 'react'
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Button,
  Group,
  Indicator,
  Menu,
  NavLink,
  ScrollArea,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { ActionModal } from '../components/ActionModal'
import { AppIcon } from '../components/AppIcon'
import { AppAvatar } from '../components/AppAvatar'
import { RoleBadge } from '../components/RoleBadge'
import { useIdleTimeout } from '../hooks/useIdleTimeout'
import {
  navigationItems,
  type NavigationItem,
  type UserRole,
} from '../config/navigation'

export interface AppLayoutProps {
  children?: ReactNode
  currentRole?: UserRole
  onRoleChange?: (role: UserRole) => void
  onLogout?: () => void
  activePath?: string
  onNavigate?: (path: string) => void
  user?: {
    name: string
    email: string
    role: string
  }
}

/**
 * Root AppShell Layout for She Bloom Backoffice.
 * - 'alt' layout configuration with deep violet sidebar.
 * - Responsive breakpoints:
 *   - Desktop (>= 992px): 260px expanded sidebar with group headers and labels
 *   - Tablet (768px - 991px): 72px compact sidebar with Tooltip on hover
 *   - Mobile (< 768px): slide-out drawer triggered by header Burger
 */
export function AppLayout({
  children,
  currentRole: initialRole,
  onRoleChange,
  onLogout,
  activePath: controlledPath,
  onNavigate: controlledNavigate,
  user = {
    name: 'Giulia Bianchi',
    email: 'giulia@bloom.it',
    role: 'ADMIN',
  },
}: AppLayoutProps) {
  const theme = useMantineTheme()
  const [opened, { toggle, close }] = useDisclosure(false)
  const [sessionExpired, setSessionExpired] = useState(false)
  const [activeRole, setActiveRole] = useState<UserRole>(initialRole ?? 'admin')
  const [internalActivePath, setInternalActivePath] = useState<string>('/dashboard')
  const activePath = controlledPath ?? internalActivePath
  const [language, setLanguage] = useState<'IT' | 'EN'>('IT')

  // Inactivity timeout: 30 minutes (RF-BO-ACC-05)
  useIdleTimeout({
    timeoutMs: 1800000, // 30 minutes
    onTimeout: () => {
      setSessionExpired(true)
    },
    enabled: true,
  })

  const handleSessionExpiredConfirm = () => {
    setSessionExpired(false)
    if (onLogout) {
      onLogout()
    } else {
      window.location.href = '/'
    }
  }

  // Responsive viewports
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm}) and (max-width: calc(${theme.breakpoints.md} - 0.1px))`
  ) // 768px - 991.9px
  const isMobile = useMediaQuery(`(max-width: calc(${theme.breakpoints.sm} - 0.1px))`) // < 768px

  // Dynamic counter badges simulation
  const counters: Record<string, number> = {
    pendingReports: 12,
    pendingQA: 5,
    notesToWrite: 2,
    missingSOS: 2,
  }

  // Filter navigation items by active role
  const filteredNav = useMemo(() => {
    return navigationItems.filter((item) => item.roles.includes(activeRole))
  }, [activeRole])

  // Group navigation items
  const groupedNav = useMemo(() => {
    const groups: Record<string, NavigationItem[]> = {}
    filteredNav.forEach((item) => {
      const g = item.group ?? 'General'
      if (!groups[g]) groups[g] = []
      groups[g].push(item)
    })
    return groups
  }, [filteredNav])

  const handleRoleSelect = (role: string) => {
    const nextRole = role as UserRole
    setActiveRole(nextRole)
    if (onRoleChange) onRoleChange(nextRole)
  }

  const handleNavigate = (path: string) => {
    if (controlledNavigate) {
      controlledNavigate(path)
    } else {
      setInternalActivePath(path)
    }
    if (isMobile) close()
  }

  const sidebarWidth = isTablet ? 72 : 260

  return (
    <AppShell
      layout="alt"
      header={{ height: 64 }}
      navbar={{
        width: sidebarWidth,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {/* ================= HEADER ================= */}
      <AppShell.Header style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-default)' }}>
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          {/* Left: Mobile Burger & Mobile Branding */}
          <Group gap="xs" wrap="nowrap">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              aria-label="Toggle navigation"
            />
            {/* Desktop Global Search Input */}
            <Box visibleFrom="sm" style={{ width: 'clamp(280px, 35vw, 480px)' }}>
              <TextInput
                placeholder="Search users, content, bookings..."
                leftSection={<AppIcon name="search" size={16} stroke={1.5} />}
                size="sm"
                radius="md"
              />
            </Box>

            {/* Mobile Branding */}
            <Group gap="xs" hiddenFrom="sm">
              <Text
                fw={700}
                size="md"
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  color: 'var(--text-heading)',
                }}
              >
                She Bloom
              </Text>
            </Group>
          </Group>

          {/* Right Header Section: Language Switcher, Notifications, Role Switcher & User Avatar */}
          <Group gap="sm" align="center" wrap="nowrap">
            {/* Language Switcher (IT / EN) */}
            <Menu shadow="md" width={110} position="bottom-end">
              <Menu.Target>
                <Button
                  variant="subtle"
                  color="gray"
                  size="xs"
                  leftSection={<AppIcon name="globe" size={16} stroke={1.5} />}
                  rightSection={<AppIcon name="chevronDown" size={12} stroke={1.5} />}
                  styles={{
                    root: {
                      padding: '4px 8px',
                      fontWeight: 600,
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                    },
                  }}
                >
                  {language}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => setLanguage('IT')}
                  style={{ fontWeight: language === 'IT' ? 700 : 400 }}
                >
                  🇮🇹 Italiano (IT)
                </Menu.Item>
                <Menu.Item
                  onClick={() => setLanguage('EN')}
                  style={{ fontWeight: language === 'EN' ? 700 : 400 }}
                >
                  🇬🇧 English (EN)
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

            {/* Notification Bell with Mock Unread Count */}
            <Indicator
              label={3}
              size={16}
              offset={4}
              color="pink"
              withBorder
            >
              <ActionIcon
                variant="subtle"
                color="gray"
                size="md"
                radius="xl"
                aria-label="Pending notifications"
                style={{
                  border: '1px solid var(--border-default)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                }}
              >
                <AppIcon name="notification" size={18} stroke={1.5} />
              </ActionIcon>
            </Indicator>

            {/* Role Switcher Demo (Desktop only) */}
            <SegmentedControl
              size="xs"
              value={activeRole}
              onChange={handleRoleSelect}
              data={[
                { label: 'Admin', value: 'admin' },
                { label: 'Moderator', value: 'moderator' },
                { label: 'Mentor', value: 'mentor' },
              ]}
              color="pink"
              visibleFrom="md"
            />

            {/* User Profile Avatar */}
            <AppAvatar
              initials={user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
              size={32}
            />
          </Group>
        </Group>
      </AppShell.Header>

      {/* ================= NAVBAR ================= */}
      <AppShell.Navbar
        style={{
          backgroundColor: 'var(--bg-sidebar)',
          color: 'var(--text-on-sidebar)',
        }}
      >
        {/* Brand header in Navbar (Desktop / Tablet view) */}
        <AppShell.Section p={isTablet ? 'xs' : 'md'}>
          {isTablet ? (
            <Box ta="center">
              <span
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--text-on-sidebar)',
                  letterSpacing: '0.05em',
                }}
              >
                SB
              </span>
            </Box>
          ) : (
            <div>
              <Text
                style={{
                  fontFamily: 'var(--font-family-heading)',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'var(--text-on-sidebar)',
                  letterSpacing: '0.02em',
                }}
              >
                She Bloom
              </Text>
              <Text
                size="10px"
                c="var(--text-on-sidebar-muted)"
                tt="uppercase"
                fw={600}
                style={{ letterSpacing: '0.08em', marginTop: '2px' }}
              >
                BACKOFFICE
              </Text>
            </div>
          )}
        </AppShell.Section>

        {/* Scrollable Navigation Items */}
        <AppShell.Section grow component={ScrollArea} p={isTablet ? 6 : 'sm'}>
          <Stack gap={isTablet ? 4 : 'sm'}>
            {Object.entries(groupedNav).map(([groupName, items]) => (
              <Box key={groupName}>
                {/* Group Heading (Desktop only) - hide if General or empty */}
                {!isTablet && groupName !== 'DEFAULT' && groupName !== 'General' && groupName !== '' && (
                  <Text
                    size="10px"
                    tt="uppercase"
                    fw={700}
                    c="var(--text-on-sidebar-muted)"
                    px="xs"
                    mb={4}
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {groupName}
                  </Text>
                )}

                <Stack gap={2}>
                  {items.map((item) => {
                    const isActive = activePath === item.path
                    const count = item.counterKey ? counters[item.counterKey] : undefined

                    if (isTablet) {
                      // Tablet compact icon with Tooltip
                      return (
                        <Tooltip
                          key={item.key}
                          label={item.label}
                          position="right"
                          offset={12}
                          withArrow
                        >
                          <UnstyledButton
                            onClick={() => handleNavigate(item.path)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 44,
                              height: 44,
                              margin: '0 auto',
                              borderRadius: 'var(--radius-md)',
                              backgroundColor: isActive
                                ? 'rgba(255, 255, 255, 0.16)'
                                : 'transparent',
                              color: isActive
                                ? 'var(--text-on-sidebar)'
                                : 'var(--text-on-sidebar-muted)',
                              position: 'relative',
                            }}
                          >
                            <AppIcon
                              name={item.iconName}
                              size={20}
                              stroke={1.5}
                              color={isActive ? 'var(--brand-primary)' : undefined}
                            />
                            {count !== undefined && count > 0 && (
                              <Box
                                style={{
                                  position: 'absolute',
                                  top: 4,
                                  right: 4,
                                  width: 8,
                                  height: 8,
                                  borderRadius: 'var(--radius-full)',
                                  backgroundColor: 'var(--brand-primary)',
                                }}
                              />
                            )}
                          </UnstyledButton>
                        </Tooltip>
                      )
                    }

                    // Desktop & Mobile full NavLink
                    return (
                      <NavLink
                        key={item.key}
                        label={item.label}
                        leftSection={
                          <AppIcon
                            name={item.iconName}
                            size={18}
                            stroke={1.5}
                            color={isActive ? 'var(--brand-primary)' : undefined}
                          />
                        }
                        rightSection={
                          count !== undefined && count > 0 ? (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '18px',
                                height: '18px',
                                padding: '0 6px',
                                borderRadius: 'var(--radius-full)',
                                backgroundColor: 'var(--brand-primary)',
                                color: 'var(--text-on-brand)',
                                fontSize: '11px',
                                fontWeight: 700,
                              }}
                            >
                              {count}
                            </span>
                          ) : null
                        }
                        active={isActive}
                        onClick={() => handleNavigate(item.path)}
                        styles={{
                          root: {
                            borderRadius: 'var(--radius-md)',
                            padding: '8px 12px',
                            color: isActive
                              ? 'var(--text-on-sidebar)'
                              : 'var(--text-on-sidebar-muted)',
                            backgroundColor: isActive
                              ? 'var(--bg-sidebar-hover)'
                              : 'transparent',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            },
                          },
                          label: {
                            fontFamily: 'var(--font-family-body)',
                            fontWeight: isActive ? 600 : 400,
                            fontSize: '14px',
                          },
                        }}
                      />
                    )
                  })}
                </Stack>
              </Box>
            ))}
          </Stack>
        </AppShell.Section>

        {/* ================= USER CARD & LOGOUT (Sticky Bottom) ================= */}
        <AppShell.Section p={isTablet ? 6 : 'sm'}>
          {isTablet ? (
            <Stack align="center" gap="xs">
              <AppAvatar
                initials={user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                size={36}
              />
              <Tooltip label="Sign out" position="right" offset={12} withArrow>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="md"
                  onClick={onLogout}
                  aria-label="Sign out"
                  style={{ color: 'var(--text-on-sidebar-muted)' }}
                >
                  <AppIcon name="logout" size={18} />
                </ActionIcon>
              </Tooltip>
            </Stack>
          ) : (
            <Box
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 12px',
              }}
            >
              <Group justify="space-between" wrap="nowrap" align="center">
                <Group gap="xs" wrap="nowrap" style={{ minWidth: 0 }}>
                  <AppAvatar
                    initials={user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    size={32}
                  />
                  <div style={{ minWidth: 0, overflow: 'hidden' }}>
                    <Text size="xs" fw={600} c="var(--text-on-sidebar)" truncate>
                      {user.name}
                    </Text>
                    <div style={{ marginTop: '2px' }}>
                      <RoleBadge role={activeRole} />
                    </div>
                  </div>
                </Group>

                <ActionIcon
                  variant="subtle"
                  size="sm"
                  onClick={onLogout}
                  aria-label="Logout"
                  style={{ color: 'var(--text-on-sidebar-muted)' }}
                >
                  <AppIcon name="logout" size={16} />
                </ActionIcon>
              </Group>
            </Box>
          )}
        </AppShell.Section>
      </AppShell.Navbar>

      {/* ================= MAIN CONTENT ================= */}
      <AppShell.Main>
        {children ?? (
          <Box p="md">
            <Title order={2} mb="xs">
              Dashboard Overview ({activeRole.toUpperCase()})
            </Title>
            <Text c="dimmed">
              Select a module from the sidebar to inspect operations.
            </Text>
          </Box>
        )}
      </AppShell.Main>

      {/* ================= 30-MIN INACTIVITY MODAL (RF-BO-ACC-05) ================= */}
      <ActionModal
        opened={sessionExpired}
        onClose={handleSessionExpiredConfirm}
        onConfirm={handleSessionExpiredConfirm}
        title="Session expired"
        confirmLabel="Log in again"
        cancelLabel="Cancel"
        isDestructive={false}
      >
        <Text size="sm">
          For security, your session was closed after 30 minutes of inactivity. Log in again to continue.
        </Text>
      </ActionModal>
    </AppShell>
  )
}

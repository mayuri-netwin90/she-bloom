import { useState } from 'react'
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Grid,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { PageHeader } from '../../components/PageHeader'
import { AppAvatar } from '../../components/AppAvatar'
import { AppIcon } from '../../components/AppIcon'
import { mockMentors, type MentorItem } from './mockData'

export interface MentorDetailProps {
  mentorId?: string
  mentor?: MentorItem
  onBack?: () => void
  onSave?: (updatedMentor: MentorItem) => void
}

type TabKey = 'profile' | 'offering' | 'schedule' | 'bookings' | 'report'

interface AudioItem {
  id: string
  title: string
  duration: string
}

export function MentorDetail({
  mentorId = 'men-1',
  mentor: initialMentorProp,
  onBack,
  onSave,
}: MentorDetailProps) {
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: calc(${theme.breakpoints.sm} - 0.1px))`)
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm}) and (max-width: calc(${theme.breakpoints.md} - 0.1px))`
  )

  // Mentor data state
  const baseMentor =
    initialMentorProp ||
    mockMentors.find((m) => m.id === mentorId) ||
    mockMentors[0]

  const [mentor, setMentor] = useState<MentorItem>(baseMentor)
  const [activeTab, setActiveTab] = useState<TabKey>('profile')

  // Form fields
  const [displayName, setDisplayName] = useState(mentor.name)
  const [qualification, setQualification] = useState(mentor.qualification)
  const [quote, setQuote] = useState(mentor.quote || '"Every emotion deserves to be heard."')
  const [about, setAbout] = useState(
    mentor.about ||
      'Psychologist and mental coach, I help women recognise and listen to their emotions...'
  )
  const [mainArea, setMainArea] = useState<string | null>(mentor.area || 'Relationships & Emotions')
  const [specialisations, setSpecialisations] = useState<string[]>(
    mentor.specialisations || ['Self-esteem', 'Relationships', 'Anxiety', 'Mindfulness']
  )
  const [newSpecInput, setNewSpecInput] = useState('')
  const [showAddSpec, setShowAddSpec] = useState(false)

  // Short audios state
  const [audios, setAudios] = useState<AudioItem[]>([
    { id: 'aud-1', title: '3-minute breathing', duration: '03:12' },
    { id: 'aud-2', title: 'Listening to your emotions', duration: '04:40' },
  ])

  // Permissions & Verification state
  const [isVerified, setIsVerified] = useState(mentor.verification === 'verified')
  const [profileEditingAllowed, setProfileEditingAllowed] = useState(
    mentor.profileEditingAllowed ?? true
  )
  const [offeringEditingAllowed, setOfferingEditingAllowed] = useState(
    mentor.offeringEditingAllowed ?? false
  )
  const [status, setStatus] = useState<string | null>(mentor.status)

  // Handlers
  const handleToggleSpec = (tag: string) => {
    setSpecialisations((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleAddSpecSubmit = () => {
    if (newSpecInput.trim() && !specialisations.includes(newSpecInput.trim())) {
      setSpecialisations([...specialisations, newSpecInput.trim()])
      setNewSpecInput('')
      setShowAddSpec(false)
    }
  }

  const handleDeleteAudio = (audioId: string) => {
    setAudios((prev) => prev.filter((a) => a.id !== audioId))
  }

  const handleUploadAudio = () => {
    const title = prompt('Enter title for new short audio:', 'Morning mindfulness')
    if (title) {
      setAudios((prev) => [
        ...prev,
        {
          id: `aud-${Date.now()}`,
          title: title.trim(),
          duration: '02:45',
        },
      ])
    }
  }

  const handleSave = () => {
    const updated: MentorItem = {
      ...mentor,
      name: displayName,
      qualification,
      quote,
      about,
      area: mainArea || mentor.area,
      specialisations,
      verification: isVerified ? 'verified' : 'not_verified',
      profileEditingAllowed,
      offeringEditingAllowed,
      status: (status as MentorItem['status']) || mentor.status,
    }
    setMentor(updated)
    if (onSave) {
      onSave(updated)
    } else {
      alert(`Changes saved for ${displayName}!`)
    }
  }

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'profile', label: 'Public profile' },
    { key: 'offering', label: 'Offering' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'bookings', label: 'Bookings' },
    { key: 'report', label: 'Session report' },
  ]

  return (
    <Box>
      {/* 1. Header with Breadcrumbs, Title, Subtitle, and Save button */}
      <PageHeader
        title={displayName}
        subtitle="Public profile, verification, permissions and session report"
        breadcrumbs={[
          { label: 'Management', href: '#' },
          {
            label: 'Mentor',
            href: '#',
            onClick: (e) => {
              e.preventDefault()
              onBack?.()
            },
          },
          { label: 'Elisa Mestri' },
        ]}
        action={
          <Button
            leftSection={<AppIcon name="check" size={16} stroke={2.5} color="var(--text-on-brand)" />}
            onClick={handleSave}
            justify="center"
            styles={{
              root: {
                backgroundColor: 'var(--brand-primary)',
                color: 'var(--text-on-brand)',
                fontWeight: 600,
                fontSize: '0.875rem',
                borderRadius: 'var(--radius-md)',
                height: 38,
                padding: '0 20px',
                '&:hover': {
                  backgroundColor: 'var(--brand-primary-hover)',
                },
              },
              inner: {
                width: '100%',
                justifyContent: 'center',
              },
            }}
          >
            Save
          </Button>
        }
      />

      {/* 2. Navigation Tabs */}
      <Box
        mt="md"
        mb="lg"
        style={{
          borderBottom: '1px solid var(--border-default)',
          overflowX: 'auto',
        }}
      >
        <Group gap="xl" wrap="nowrap">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <UnstyledButton
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '10px 4px 14px 4px',
                  position: 'relative',
                  borderBottom: isActive ? '2px solid var(--brand-primary)' : '2px solid transparent',
                  marginBottom: -1,
                  whiteSpace: 'nowrap',
                }}
              >
                <Text
                  size="sm"
                  fw={isActive ? 600 : 500}
                  c={isActive ? 'var(--text-heading)' : 'var(--text-secondary)'}
                  style={{
                    transition: 'color 0.15s ease',
                  }}
                >
                  {tab.label}
                </Text>
              </UnstyledButton>
            )
          })}
        </Group>
      </Box>

      {/* Tab Content: Public profile tab */}
      {activeTab === 'profile' ? (
        <Grid>
          {/* Left Column: Form Card (~65% desktop width) */}
          <Grid.Col span={{ base: 12, md: 7, lg: 8 }}>
            <Paper
              withBorder
              p={isMobile ? 'md' : 'xl'}
              radius="lg"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-default)',
                boxShadow: 'var(--shadow-small)',
              }}
            >
              <Stack gap="lg">
                {/* Avatar & Change photo button */}
                <Group gap="lg" align="center" wrap="nowrap">
                  <AppAvatar
                    initials={mentor.avatarInitials}
                    size={80}
                    bgColor="var(--brand-secondary)"
                    textColor="var(--bg-sidebar)"
                  />
                  <Stack gap={4}>
                    <Button
                      variant="outline"
                      size="xs"
                      leftSection={<AppIcon name="upload" size={14} stroke={1.8} color="var(--brand-primary)" />}
                      styles={{
                        root: {
                          borderColor: 'var(--brand-primary)',
                          color: 'var(--brand-primary)',
                          backgroundColor: 'var(--bg-surface)',
                          fontWeight: 600,
                          borderRadius: 'var(--radius-md)',
                          width: 'fit-content',
                          height: 32,
                          '&:hover': {
                            backgroundColor: 'var(--bg-brand-soft)',
                          },
                        },
                      }}
                      onClick={() => alert('Change photo modal / file picker')}
                    >
                      Change photo
                    </Button>
                    <Text size="xs" c="var(--text-secondary)">
                      JPG or PNG, min 400×400 px
                    </Text>
                  </Stack>
                </Group>

                {/* Display name & Qualification (2-column on desktop, stacked on mobile) */}
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  <TextInput
                    label={
                      <Text fw={600} size="xs" c="var(--text-heading)" mb={4}>
                        Display name
                      </Text>
                    }
                    value={displayName}
                    onChange={(e) => setDisplayName(e.currentTarget.value)}
                    styles={{
                      input: {
                        backgroundColor: 'var(--bg-surface)',
                        borderColor: 'var(--border-default)',
                        borderRadius: 'var(--radius-md)',
                        height: 40,
                        fontSize: '0.875rem',
                      },
                    }}
                  />
                  <TextInput
                    label={
                      <Text fw={600} size="xs" c="var(--text-heading)" mb={4}>
                        Qualification
                      </Text>
                    }
                    value={qualification}
                    onChange={(e) => setQualification(e.currentTarget.value)}
                    styles={{
                      input: {
                        backgroundColor: 'var(--bg-surface)',
                        borderColor: 'var(--border-default)',
                        borderRadius: 'var(--radius-md)',
                        height: 40,
                        fontSize: '0.875rem',
                      },
                    }}
                  />
                </SimpleGrid>

                {/* Quote / motto */}
                <TextInput
                  label={
                    <Text fw={600} size="xs" c="var(--text-heading)" mb={4}>
                      Quote / motto
                    </Text>
                  }
                  value={quote}
                  onChange={(e) => setQuote(e.currentTarget.value)}
                  styles={{
                    input: {
                      backgroundColor: 'var(--bg-surface)',
                      borderColor: 'var(--border-default)',
                      borderRadius: 'var(--radius-md)',
                      height: 40,
                      fontSize: '0.875rem',
                    },
                  }}
                />

                {/* About me */}
                <Textarea
                  label={
                    <Text fw={600} size="xs" c="var(--text-heading)" mb={4}>
                      About me
                    </Text>
                  }
                  value={about}
                  onChange={(e) => setAbout(e.currentTarget.value)}
                  minRows={4}
                  autosize
                  styles={{
                    input: {
                      backgroundColor: 'var(--bg-surface)',
                      borderColor: 'var(--border-default)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                      paddingTop: 10,
                      paddingBottom: 10,
                    },
                  }}
                />

                {/* Main area */}
                <Select
                  label={
                    <Text fw={600} size="xs" c="var(--text-heading)" mb={4}>
                      Main area
                    </Text>
                  }
                  value={mainArea}
                  onChange={setMainArea}
                  data={[
                    'Relationships & Emotions',
                    'Training & Movement',
                    'Nutrition',
                    'Beauty & Self-care',
                    'Astrology & Intuition',
                  ]}
                  rightSection={<AppIcon name="chevronDown" size={16} stroke={1.5} color="var(--text-secondary)" />}
                  styles={{
                    input: {
                      backgroundColor: 'var(--bg-surface)',
                      borderColor: 'var(--border-default)',
                      borderRadius: 'var(--radius-md)',
                      height: 40,
                      fontSize: '0.875rem',
                    },
                  }}
                />

                {/* Specialisations tag pills */}
                <Box>
                  <Text fw={600} size="xs" c="var(--text-heading)" mb={8}>
                    Specialisations
                  </Text>
                  <Group gap="xs" wrap="wrap" align="center">
                    {specialisations.map((spec) => (
                      <UnstyledButton
                        key={spec}
                        onClick={() => handleToggleSpec(spec)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          backgroundColor: 'var(--bg-sidebar)',
                          color: 'var(--text-on-sidebar)',
                          padding: '6px 14px',
                          borderRadius: 9999,
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                          transition: 'opacity 0.15s ease',
                          cursor: 'pointer',
                        }}
                      >
                        <AppIcon name="check" size={13} stroke={2.5} color="var(--text-on-sidebar)" />
                        <span>{spec}</span>
                      </UnstyledButton>
                    ))}

                    {/* + Add button / input */}
                    {showAddSpec ? (
                      <Group gap={4}>
                        <TextInput
                          placeholder="Specialisation"
                          size="xs"
                          value={newSpecInput}
                          onChange={(e) => setNewSpecInput(e.currentTarget.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddSpecSubmit()
                            if (e.key === 'Escape') setShowAddSpec(false)
                          }}
                          styles={{
                            input: {
                              borderRadius: 9999,
                              height: 30,
                              fontSize: '0.75rem',
                              padding: '0 12px',
                            },
                          }}
                        />
                        <Button
                          size="xs"
                          variant="subtle"
                          color="pink"
                          onClick={handleAddSpecSubmit}
                          style={{ height: 30, padding: '0 8px' }}
                        >
                          Add
                        </Button>
                      </Group>
                    ) : (
                      <Button
                        variant="default"
                        size="xs"
                        leftSection={<AppIcon name="plus" size={13} stroke={2} />}
                        onClick={() => setShowAddSpec(true)}
                        styles={{
                          root: {
                            backgroundColor: 'var(--bg-surface)',
                            borderColor: 'var(--border-default)',
                            color: 'var(--text-heading)',
                            borderRadius: 9999,
                            height: 32,
                            padding: '0 14px',
                            fontSize: '0.8125rem',
                            fontWeight: 500,
                          },
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </Group>
                </Box>

                {/* Short audios */}
                <Box>
                  <Text fw={600} size="xs" c="var(--text-heading)" mb={8}>
                    Short audios
                  </Text>
                  <Stack gap="xs">
                    {audios.map((audio) => (
                      <Card
                        key={audio.id}
                        p="xs"
                        radius="md"
                        withBorder={false}
                        style={{
                          backgroundColor: 'var(--bg-canvas)',
                          border: 'none',
                        }}
                      >
                        <Group justify="space-between" align="center" wrap="nowrap">
                          <Group gap="sm" wrap="nowrap">
                            <AppIcon name="support" size={18} stroke={1.5} color="var(--bg-sidebar)" />
                            <Text size="sm" fw={500} c="var(--text-heading)">
                              {audio.title}
                            </Text>
                          </Group>
                          <Group gap="md" wrap="nowrap">
                            <Text size="xs" c="var(--text-secondary)">
                              {audio.duration}
                            </Text>
                            <ActionIcon
                              variant="subtle"
                              color="gray"
                              size="sm"
                              onClick={() => handleDeleteAudio(audio.id)}
                            >
                              <AppIcon name="delete" size={16} stroke={1.5} color="var(--text-secondary)" />
                            </ActionIcon>
                          </Group>
                        </Group>
                      </Card>
                    ))}

                    {/* Upload audio button */}
                    <Button
                      variant="subtle"
                      size="xs"
                      leftSection={<AppIcon name="upload" size={14} stroke={1.8} color="var(--bg-sidebar)" />}
                      onClick={handleUploadAudio}
                      styles={{
                        root: {
                          backgroundColor: 'var(--bg-violet-soft)',
                          color: 'var(--bg-sidebar)',
                          borderRadius: 'var(--radius-md)',
                          width: 'fit-content',
                          height: 32,
                          marginTop: 4,
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: 'var(--bg-violet-soft)',
                            opacity: 0.85,
                          },
                        },
                      }}
                    >
                      Upload audio
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid.Col>

          {/* Right Column: Stacked Cards (~35% desktop width) */}
          <Grid.Col span={{ base: 12, md: 5, lg: 4 }}>
            <Stack gap="lg">
              {/* Card 1: SheBloom verification */}
              <Paper
                withBorder
                p={isMobile ? 'md' : 'xl'}
                radius="lg"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  boxShadow: 'var(--shadow-small)',
                }}
              >
                <Stack gap="md">
                  <Group justify="space-between" align="center">
                    <Text fw={700} size="sm" c="var(--text-heading)">
                      SheBloom verification
                    </Text>
                    {isVerified ? (
                      <Box
                        style={{
                          backgroundColor: 'var(--status-violet-bg)',
                          color: 'var(--status-violet-fg)',
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          letterSpacing: '0.5px',
                        }}
                      >
                        <Box
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: 'currentColor',
                          }}
                        />
                        VERIFIED
                      </Box>
                    ) : (
                      <Box
                        style={{
                          backgroundColor: 'var(--bg-subtle)',
                          color: 'var(--text-secondary)',
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          letterSpacing: '0.5px',
                        }}
                      >
                        NOT VERIFIED
                      </Box>
                    )}
                  </Group>

                  <Box style={{ borderTop: '1px solid var(--border-default)', paddingTop: 14 }}>
                    {isTablet ? (
                      <Group align="center" wrap="nowrap" gap={0}>
                        <Text size="xs" c="var(--text-secondary)" style={{ width: 140, flexShrink: 0 }}>
                          Verified on
                        </Text>
                        <Text size="xs" fw={500} c="var(--text-heading)">
                          {mentor.verifiedOn
                            ? `${mentor.verifiedOn} by ${mentor.verifiedBy}`
                            : 'Pending verification'}
                        </Text>
                      </Group>
                    ) : (
                      <Group justify="space-between" align="flex-start" wrap="nowrap">
                        <Text size="xs" c="var(--text-secondary)" style={{ minWidth: 90 }}>
                          Verified on
                        </Text>
                        <Text size="xs" fw={500} c="var(--text-heading)" ta="right">
                          {mentor.verifiedOn
                            ? `${mentor.verifiedOn} by ${mentor.verifiedBy}`
                            : 'Pending verification'}
                        </Text>
                      </Group>
                    )}
                  </Box>

                  <Box style={{ borderTop: '1px solid var(--border-default)', paddingTop: 14 }}>
                    {isTablet ? (
                      <Group align="center" wrap="nowrap" gap={0}>
                        <Text size="xs" c="var(--text-secondary)" style={{ width: 140, flexShrink: 0 }}>
                          Documents
                        </Text>
                        <Text size="xs" fw={500} c="var(--text-heading)">
                          {mentor.documents || "Psychologists' register no. 12345 · CV"}
                        </Text>
                      </Group>
                    ) : (
                      <Group justify="space-between" align="flex-start" wrap="nowrap">
                        <Text size="xs" c="var(--text-secondary)" style={{ minWidth: 90 }}>
                          Documents
                        </Text>
                        <Text size="xs" fw={500} c="var(--text-heading)" ta="right" style={{ maxWidth: 220 }}>
                          {mentor.documents || "Psychologists' register no. 12345 · CV"}
                        </Text>
                      </Group>
                    )}
                  </Box>

                  <Box style={{ borderTop: '1px solid var(--border-default)', paddingTop: 16 }}>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => setIsVerified(!isVerified)}
                      styles={{
                        root: {
                          borderColor: 'var(--brand-primary)',
                          color: 'var(--brand-primary)',
                          backgroundColor: 'var(--bg-surface)',
                          fontWeight: 500,
                          borderRadius: 'var(--radius-md)',
                          height: 32,
                          '&:hover': {
                            backgroundColor: 'var(--bg-brand-soft)',
                          },
                        },
                      }}
                    >
                      {isVerified ? 'Revoke verification' : 'Mark as verified'}
                    </Button>
                  </Box>
                </Stack>
              </Paper>

              {/* Card 2: Mentor permissions */}
              <Paper
                withBorder
                p={isMobile ? 'md' : 'xl'}
                radius="lg"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  boxShadow: 'var(--shadow-small)',
                }}
              >
                <Stack gap="md">
                  <Text fw={700} size="sm" c="var(--text-heading)">
                    Mentor permissions
                  </Text>

                  {/* Switch 1: Profile editing */}
                  <Group justify="space-between" align="flex-start" wrap="nowrap">
                    <Box style={{ flex: 1, paddingRight: 12 }}>
                      <Text fw={600} size="xs" c="var(--text-heading)">
                        Profile editing allowed
                      </Text>
                      <Text size="xs" c="var(--text-secondary)" mt={2}>
                        If enabled, the Mentor's changes are published immediately.
                      </Text>
                    </Box>
                    <Switch
                      checked={profileEditingAllowed}
                      onChange={(e) => setProfileEditingAllowed(e.currentTarget.checked)}
                      size="md"
                      withThumbIndicator={false}
                      styles={{
                        track: {
                          cursor: 'pointer',
                          backgroundColor: profileEditingAllowed ? 'var(--brand-primary)' : undefined,
                          borderColor: profileEditingAllowed ? 'var(--brand-primary)' : undefined,
                        },
                      }}
                    />
                  </Group>

                  {/* Switch 2: Offering editing */}
                  <Group
                    justify="space-between"
                    align="flex-start"
                    wrap="nowrap"
                    style={{ borderTop: '1px solid var(--border-default)', paddingTop: 14 }}
                  >
                    <Box style={{ flex: 1, paddingRight: 12 }}>
                      <Text fw={600} size="xs" c="var(--text-heading)">
                        Offering editing allowed
                      </Text>
                      <Text size="xs" c="var(--text-secondary)" mt={2}>
                        If disabled, sessions and programs are read-only for the Mentor.
                      </Text>
                    </Box>
                    <Switch
                      checked={offeringEditingAllowed}
                      onChange={(e) => setOfferingEditingAllowed(e.currentTarget.checked)}
                      size="md"
                      withThumbIndicator={false}
                      styles={{
                        track: {
                          cursor: 'pointer',
                          backgroundColor: offeringEditingAllowed ? 'var(--brand-primary)' : undefined,
                          borderColor: offeringEditingAllowed ? 'var(--brand-primary)' : undefined,
                        },
                      }}
                    />
                  </Group>

                  {/* Footer link to settings */}
                  <Box style={{ borderTop: '1px solid var(--border-default)', paddingTop: 14 }}>
                    <Text
                      size="xs"
                      c="var(--brand-primary)"
                      style={{ cursor: 'pointer', fontWeight: 500 }}
                      onClick={() => alert('Navigate to Settings › Mentor defaults')}
                    >
                      Defaults for new Mentors: Settings › Mentor defaults
                    </Text>
                  </Box>
                </Stack>
              </Paper>

              {/* Card 3: Status & No-Shows */}
              <Paper
                withBorder
                p={isMobile ? 'md' : 'xl'}
                radius="lg"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-default)',
                  boxShadow: 'var(--shadow-small)',
                }}
              >
                <Stack gap="md">
                  <Group justify="space-between" align="flex-start" wrap="nowrap">
                    <Text fw={700} size="sm" c="var(--text-heading)">
                      Status
                    </Text>
                    <Group gap="lg" align="flex-start" wrap="nowrap" justify="flex-end">
                      <Text size="xs" c="var(--text-secondary)" style={{ maxWidth: 100, lineHeight: 1.35 }}>
                        Reported no-shows (Mentor no-show)
                      </Text>
                      <Text fw={700} size="xs" c="var(--text-heading)" style={{ whiteSpace: 'nowrap', paddingTop: 1 }}>
                        {mentor.reportedNoShows ?? 1} report · S7
                      </Text>
                    </Group>
                  </Group>

                  <Select
                    label={
                      <Text fw={600} size="xs" c="var(--text-secondary)" mb={4}>
                        Status
                      </Text>
                    }
                    value={status}
                    onChange={setStatus}
                    data={[
                      { value: 'active', label: 'Active' },
                      { value: 'to_verify', label: 'To verify' },
                      { value: 'suspended', label: 'Suspended' },
                      { value: 'deactivated', label: 'Deactivated' },
                    ]}
                    rightSection={<AppIcon name="chevronDown" size={16} stroke={1.5} color="var(--text-secondary)" />}
                    styles={{
                      input: {
                        backgroundColor: 'var(--bg-surface)',
                        borderColor: 'var(--border-default)',
                        borderRadius: 'var(--radius-md)',
                        height: 40,
                        fontSize: '0.875rem',
                      },
                    }}
                  />
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      ) : (
        /* Empty / Placeholder states for other sub-tabs */
        <Paper
          withBorder
          p="xl"
          radius="lg"
          ta="center"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-default)',
          }}
        >
          <Text c="var(--text-secondary)" size="sm">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} view for {displayName} is under construction.
          </Text>
        </Paper>
      )}
    </Box>
  )
}

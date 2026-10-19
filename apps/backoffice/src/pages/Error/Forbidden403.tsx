import { Button, Container, Paper, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { AppIcon } from '../../components/AppIcon'

export interface Forbidden403Props {
  onReturnDashboard?: () => void
}

/**
 * 403 Forbidden Access Denied Page.
 * Displayed when an authenticated user attempts to access a route disallowed for their role.
 */
export function Forbidden403({ onReturnDashboard }: Forbidden403Props) {
  return (
    <Container size="sm" py={80}>
      <Paper withBorder p="xl" radius="md" ta="center">
        <Stack align="center" gap="md">
          <ThemeIcon size={64} radius="xl" color="red" variant="light">
            <AppIcon name="shield" size={36} stroke={1.5} />
          </ThemeIcon>

          <Title order={1} size="h2" style={{ fontFamily: 'var(--font-family-heading)' }}>
            403 - Access Denied
          </Title>

          <Text c="var(--text-secondary)" size="sm" maw={440}>
            You do not have the required permissions or role privileges to view this section of
            the She Bloom backoffice.
          </Text>

          <Button
            size="md"
            mt="sm"
            onClick={onReturnDashboard ?? (() => (window.location.href = '/dashboard'))}
          >
            Return to Dashboard
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}

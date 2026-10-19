import { type ReactNode } from 'react'
import { Box, Button, Drawer, type DrawerProps, Group, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { AppIcon } from '../AppIcon'

export interface DrawerWrapperProps
  extends Omit<DrawerProps, 'opened' | 'onClose' | 'title' | 'position' | 'size'> {
  opened: boolean
  onClose: () => void
  title?: ReactNode
  children?: ReactNode
  position?: DrawerProps['position']
  size?: number | string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  isLoading?: boolean
}

/**
 * Standard DrawerWrapper Component.
 * Implements Figma Drawer with:
 * - Header: 'Titolo pannello' / Panel title + close icon
 * - Body: scrollable panel content
 * - Footer: sticky bottom actions (Annulla / Salva)
 * - Responsive sizing: Desktop (480px), Tablet (420px), Mobile (100% bottom sheet)
 */
export function DrawerWrapper({
  opened,
  onClose,
  title = 'Panel Title',
  children,
  position: customPosition,
  size: customSize,
  confirmLabel = 'Save',
  cancelLabel = 'Cancel',
  onConfirm,
  isLoading = false,
  closeOnClickOutside = true,
  closeOnEscape = true,
  ...rest
}: DrawerWrapperProps) {
  const theme = useMantineTheme()
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`)
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.sm}) and (max-width: calc(${theme.breakpoints.md} - 0.1px))`
  )

  const resolvedPosition: DrawerProps['position'] =
    customPosition ?? (isDesktop || isTablet ? 'right' : 'bottom')

  let resolvedSize: number | string = '100%'
  if (customSize !== undefined) {
    resolvedSize = customSize
  } else if (isDesktop) {
    resolvedSize = 480
  } else if (isTablet) {
    resolvedSize = 420
  } else {
    resolvedSize = '100%'
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position={resolvedPosition}
      size={resolvedSize}
      withCloseButton={false}
      closeOnClickOutside={closeOnClickOutside}
      closeOnEscape={closeOnEscape}
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
      styles={{
        content: {
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-surface)',
        },
        body: {
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          overflow: 'hidden',
        },
      }}
      {...rest}
    >
      {/* Drawer Header */}
      <Box
        p="md"
        style={{
          borderBottom: '1px solid var(--border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text
          fw={700}
          size="md"
          style={{
            fontFamily: 'var(--font-family-body)',
            color: 'var(--text-heading)',
          }}
        >
          {title}
        </Text>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            color: 'var(--text-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Close drawer"
        >
          <AppIcon name="close" size={16} stroke={1.5} />
        </button>
      </Box>

      {/* Drawer Scrollable Content */}
      <Box p="lg" style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </Box>

      {/* Drawer Sticky Footer with Actions */}
      <Box
        p="md"
        style={{
          borderTop: '1px solid var(--border-default)',
          backgroundColor: 'var(--bg-surface)',
        }}
      >
        <Group justify="flex-end" gap="sm">
          <Button variant="subtle" color="gray" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          {onConfirm && (
            <Button color="pink" onClick={onConfirm} loading={isLoading}>
              {confirmLabel}
            </Button>
          )}
        </Group>
      </Box>
    </Drawer>
  )
}

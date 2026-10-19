import { type ReactNode } from 'react'
import { Button, Group, Modal, type ModalProps, Stack, Text } from '@mantine/core'
import { AppIcon } from '../AppIcon'

export interface ActionModalProps
  extends Omit<ModalProps, 'opened' | 'onClose' | 'title' | 'children'> {
  opened: boolean
  onClose: () => void
  onConfirm: () => void
  title: ReactNode
  children: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  isDestructive?: boolean
  isLoading?: boolean
  layout?: 'horizontal' | 'stacked'
}

/**
 * Standard ActionModal Component matching Figma Modal specification:
 * - Top: Icon circle indicator (info pink icon circle, warning red icon circle)
 * - Header: Bold title (e.g. 'Confermi l\'operazione?' / 'Confirm action?')
 * - Body: Description text (e.g. 'L\'operazione verrà registrata nell\'audit log.')
 * - Actions:
 *    - Horizontal layout: Cancel (subtle) + Confirm (filled pink or red)
 *    - Stacked layout: Full-width Confirm button + Full-width Cancel button beneath
 */
export function ActionModal({
  opened,
  onClose,
  onConfirm,
  title,
  children,
  confirmLabel = 'Save',
  cancelLabel = 'Cancel',
  isDestructive = false,
  isLoading = false,
  layout = 'horizontal',
  closeOnClickOutside = true,
  closeOnEscape = true,
  centered = true,
  size = 'sm',
  ...rest
}: ActionModalProps) {
  const isStacked = layout === 'stacked'

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered={centered}
      size={size}
      withCloseButton={false}
      radius="md"
      closeOnClickOutside={closeOnClickOutside}
      closeOnEscape={closeOnEscape}
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
      styles={{
        content: {
          padding: '24px',
          boxShadow: 'var(--shadow-modal)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-surface)',
        },
        body: {
          padding: 0,
        },
      }}
      {...rest}
    >
      <Stack gap="md">
        {/* Top Icon Circle */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: isDestructive ? 'var(--status-danger-bg)' : 'var(--bg-brand-soft)',
            color: isDestructive ? 'var(--status-danger-fg)' : 'var(--brand-primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AppIcon name={isDestructive ? 'warning' : 'info'} size={18} stroke={1.5} />
        </div>

        {/* Title & Body */}
        <div>
          <Text
            style={{
              fontFamily: 'var(--font-family-body)',
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-heading)',
              marginBottom: '4px',
            }}
          >
            {title}
          </Text>
          <div
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
            }}
          >
            {children}
          </div>
        </div>

        {/* Action Buttons: Horizontal vs Stacked */}
        {isStacked ? (
          <Stack gap="xs" mt="sm">
            <Button
              color={isDestructive ? 'red' : 'pink'}
              onClick={onConfirm}
              loading={isLoading}
              fullWidth
            >
              {confirmLabel}
            </Button>
            <Button
              variant="subtle"
              color="gray"
              onClick={onClose}
              disabled={isLoading}
              fullWidth
            >
              {cancelLabel}
            </Button>
          </Stack>
        ) : (
          <Group justify="flex-end" gap="sm" mt="sm">
            <Button
              variant="subtle"
              color="gray"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelLabel}
            </Button>
            <Button
              color={isDestructive ? 'red' : 'pink'}
              onClick={onConfirm}
              loading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Group>
        )}
      </Stack>
    </Modal>
  )
}

import React from 'react'
import {
  // Row 1
  IconLayoutGrid,
  IconHome,
  IconUsers,
  IconUserCheck,
  IconShieldCheck,
  IconShield,
  IconCalendar,
  IconCalendarEvent,
  IconClock,
  IconBook,
  IconCreditCard,
  IconFileText,
  IconStack2,

  // Row 2
  IconLayersSubtract,
  IconSparkles,
  IconFlag,
  IconMessage,
  IconHelpCircle,
  IconAlertTriangle,
  IconAdjustmentsHorizontal,
  IconChartBar,
  IconList,
  IconLogout,
  IconSearch,
  IconBell,

  // Row 3
  IconChevronDown,
  IconChevronRight,
  IconChevronLeft,
  IconChevronUp,
  IconPlus,
  IconFilter,
  IconDownload,
  IconUpload,
  IconEdit,
  IconTrash,
  IconEye,
  IconEyeOff,

  // Row 4
  IconCheck,
  IconX,
  IconDots,
  IconMenu2,
  IconLock,
  IconKey,
  IconMail,
  IconPhoto,
  IconLink,
  IconVideo,
  IconHeadphones,
  IconStar,

  // Row 5
  IconCurrencyEuro,
  IconRefresh,
  IconExternalLink,
  IconPhone,
  IconWorld,
  IconToggleLeft,
  IconTrophy,
  IconWallet,
  IconDeviceMobile,
  IconDeviceDesktop,
  IconDotsVertical,
  IconInfoCircle,

  // Row 6
  IconCircleCheck,
  IconBan,
  IconPaperclip,
  IconHeart,
  IconPackage,
  IconQrcode,
  IconCopy,
  IconSend,
  IconFlower,
  IconRotateClockwise,
  IconSelector,
  IconMailCheck,
  IconTicket,
  IconCategory,
  IconReceipt,
  type TablerIcon,
  IconCalendarCheck,
} from '@tabler/icons-react'

/**
 * Standard icon names matching the Figma design system icon sheet
 */
export const AppIcons = {
  // Navigation & Core
  grid: IconLayoutGrid,
  dashboard: IconHome,
  users: IconUsers,
  userCheck: IconUserCheck,
  shieldCheck: IconShieldCheck,
  shield: IconShield,
  calendar: IconCalendar,
  calendarEvent: IconCalendarEvent,
  clock: IconClock,
  book: IconBook,
  creditCard: IconCreditCard,
  fileText: IconFileText,
  calendarCheck: IconCalendarCheck,
  stack: IconStack2,

  // Sections & Features
  layers: IconLayersSubtract,
  sparkles: IconSparkles,
  flag: IconFlag,
  message: IconMessage,
  help: IconHelpCircle,
  warning: IconAlertTriangle,
  adjustments: IconAdjustmentsHorizontal,
  analytics: IconChartBar,
  list: IconList,
  logout: IconLogout,
  search: IconSearch,
  notification: IconBell,

  // Actions & Directions
  chevronDown: IconChevronDown,
  chevronRight: IconChevronRight,
  chevronLeft: IconChevronLeft,
  chevronUp: IconChevronUp,
  plus: IconPlus,
  filter: IconFilter,
  download: IconDownload,
  upload: IconUpload,
  edit: IconEdit,
  delete: IconTrash,
  view: IconEye,
  hide: IconEyeOff,

  // Controls & States
  check: IconCheck,
  close: IconX,
  more: IconDots,
  menu: IconMenu2,
  lock: IconLock,
  key: IconKey,
  mail: IconMail,
  photo: IconPhoto,
  link: IconLink,
  video: IconVideo,
  support: IconHeadphones,
  favorite: IconStar,

  // Metadata & System
  euro: IconCurrencyEuro,
  refresh: IconRefresh,
  externalLink: IconExternalLink,
  phone: IconPhone,
  globe: IconWorld,
  toggle: IconToggleLeft,
  trophy: IconTrophy,
  wallet: IconWallet,
  mobile: IconDeviceMobile,
  desktop: IconDeviceDesktop,
  dragHandle: IconDotsVertical,
  info: IconInfoCircle,

  // Badges & Extras
  successCircle: IconCircleCheck,
  prohibited: IconBan,
  attachment: IconPaperclip,
  heart: IconHeart,
  package: IconPackage,
  qrCode: IconQrcode,
  copy: IconCopy,
  send: IconSend,
  bloomFlower: IconFlower,
  dotsVertical: IconDotsVertical,
  selector: IconSelector,
  sort: IconSelector,
  mailCheck: IconMailCheck,
  reload: IconRotateClockwise,
  ticket: IconTicket,
  category: IconCategory,
  receipt: IconReceipt,
} as const

export type AppIconName = keyof typeof AppIcons

export interface AppIconProps extends Omit<React.ComponentPropsWithoutRef<'svg'>, 'stroke'> {
  name: AppIconName
  size?: number | string
  stroke?: number | string
  color?: string
  className?: string
}

/**
 * Standardized AppIcon component adhering to:
 * - Stroke: 1.5 default
 * - Size: 16px (Buttons/Inputs), 20px (NavLinks)
 */
export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 16,
  stroke = 1.5,
  color,
  className,
  ...props
}) => {
  const IconComponent: TablerIcon = AppIcons[name]
  if (!IconComponent) return null

  return (
    <IconComponent
      size={size}
      stroke={stroke}
      color={color}
      className={className}
      {...props}
    />
  )
}

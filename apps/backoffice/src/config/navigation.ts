import { type AppIconName } from '../components/AppIcon'

export type UserRole = 'admin' | 'moderator' | 'mentor'

export interface NavigationItem {
  key: string
  label: string
  path: string
  iconName: AppIconName
  roles: UserRole[]
  group?: string
  counterKey?: 'pendingReports' | 'pendingQA' | 'notesToWrite' | 'missingSOS'
}

/**
 * Navigation Configuration for She Bloom Backoffice.
 * Labels in English (Italian to be enabled by default later via i18n).
 * All icons reference AppIconName from the centralized AppIcon component.
 */
export const navigationItems: NavigationItem[] = [
  // ================= DASHBOARD =================
  {
    key: 'admin-dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    iconName: 'grid',
    roles: ['admin', 'moderator', 'mentor'],
  },

  // ================= MANAGEMENT =================
  {
    key: 'admin-app-users',
    label: 'App Users',
    path: '/users/app',
    iconName: 'users',
    roles: ['admin'],
    group: 'MANAGEMENT',
  },
  {
    key: 'admin-mentors',
    label: 'Mentor',
    path: '/mentors',
    iconName: 'userCheck',
    roles: ['admin'],
    group: 'MANAGEMENT',
  },
  {
    key: 'admin-catalog',
    label: 'Catalog',
    path: '/catalog',
    iconName: 'book',
    roles: ['admin'],
    group: 'MANAGEMENT',
  },
  {
    key: 'admin-schedule',
    label: 'Schedule',
    path: '/schedule',
    iconName: 'calendar',
    roles: ['admin'],
    group: 'MANAGEMENT',
  },
  {
    key: 'admin-bookings',
    label: 'Bookings',
    path: '/bookings',
    iconName: 'calendarCheck',
    roles: ['admin'],
    group: 'MANAGEMENT',
  },
  {
    key: 'admin-payments',
    label: 'Payments',
    path: '/payments',
    iconName: 'creditCard',
    roles: ['admin'],
    group: 'MANAGEMENT',
  },

  // ================= CONTENT =================
  {
    key: 'admin-daily-content',
    label: 'Daily Content',
    path: '/content/daily',
    iconName: 'dashboard',
    roles: ['admin'],
    group: 'CONTENT',
  },
  {
    key: 'admin-articles',
    label: 'Articles',
    path: '/content/articles',
    iconName: 'fileText',
    roles: ['admin'],
    group: 'CONTENT',
  },
  {
    key: 'admin-areas',
    label: 'Areas',
    path: '/content/areas',
    iconName: 'stack',
    roles: ['admin'],
    group: 'CONTENT',
  },
  {
    key: 'admin-checkin',
    label: 'Check-in',
    path: '/content/check-in',
    iconName: 'heart',
    roles: ['admin'],
    group: 'CONTENT',
  },
  {
    key: 'admin-pages-texts',
    label: 'Pages & Texts',
    path: '/content/pages',
    iconName: 'info',
    roles: ['admin'],
    group: 'CONTENT',
  },
  {
    key: 'admin-bloom-club',
    label: 'Bloom Club',
    path: '/content/bloom-club',
    iconName: 'favorite',
    roles: ['admin'],
    group: 'CONTENT',
  },

  // ================= ALBA AI =================
  {
    key: 'admin-alba-config',
    label: 'Alba Settings',
    path: '/settings/alba',
    iconName: 'sparkles',
    roles: ['admin'],
    group: 'ALBA',
  },
  {
    key: 'admin-recommendations',
    label: 'Recommendations',
    path: '/settings/recommendations',
    iconName: 'send',
    roles: ['admin'],
    group: 'ALBA',
  },

  // ================= COMMUNITY =================
  {
    key: 'admin-moderation',
    label: 'Moderation',
    path: '/moderation/reports',
    iconName: 'flag',
    roles: ['admin', 'moderator'],
    counterKey: 'pendingReports',
    group: 'COMMUNITY',
  },
  {
    key: 'mod-auto-filters',
    label: 'Automatic Filters',
    path: '/moderation/filters',
    iconName: 'filter',
    roles: ['moderator'],
    group: 'COMMUNITY',
  },
  {
    key: 'admin-expert-qa',
    label: 'Expert Q&A',
    path: '/moderation/qa',
    iconName: 'message',
    roles: ['admin', 'moderator'],
    counterKey: 'pendingQA',
    group: 'COMMUNITY',
  },
  {
    key: 'mod-statistics',
    label: 'Statistics',
    path: '/moderation/statistics',
    iconName: 'analytics',
    roles: ['moderator'],
    group: 'COMMUNITY',
  },

  // ================= SYSTEM =================
  {
    key: 'admin-sos',
    label: 'SOS',
    path: '/settings/sos',
    iconName: 'warning',
    roles: ['admin'],
    group: 'SYSTEM',
  },
  {
    key: 'admin-settings',
    label: 'Settings',
    path: '/settings',
    iconName: 'adjustments',
    roles: ['admin'],
    group: 'SYSTEM',
  },
  {
    key: 'admin-backoffice-users',
    label: 'Backoffice Users',
    path: '/settings/backoffice-users',
    iconName: 'shieldCheck',
    roles: ['admin'],
    group: 'SYSTEM',
  },
  {
    key: 'admin-analytics',
    label: 'Analytics',
    path: '/analytics',
    iconName: 'analytics',
    roles: ['admin'],
    group: 'SYSTEM',
  },
  {
    key: 'admin-audit-log',
    label: 'Audit Log',
    path: '/audit-log',
    iconName: 'list',
    roles: ['admin'],
    group: 'SYSTEM',
  },

  // ================= MENTOR WORKSPACE =================
  {
    key: 'mentor-profile',
    label: 'My Profile',
    path: '/mentor/profile',
    iconName: 'userCheck',
    roles: ['mentor'],
    group: 'MY WORKSPACE',
  },
  {
    key: 'mentor-offering',
    label: 'My Offering',
    path: '/mentor/offering',
    iconName: 'book',
    roles: ['mentor'],
    group: 'MY WORKSPACE',
  },
  {
    key: 'mentor-schedule',
    label: 'Schedule',
    path: '/mentor/schedule',
    iconName: 'calendar',
    roles: ['mentor'],
    group: 'MY WORKSPACE',
  },
  {
    key: 'mentor-bookings',
    label: 'Bookings',
    path: '/mentor/bookings',
    iconName: 'calendarCheck',
    roles: ['mentor'],
    group: 'MY WORKSPACE',
  },
  {
    key: 'mentor-notes',
    label: 'Post-Session Notes',
    path: '/mentor/notes',
    iconName: 'fileText',
    roles: ['mentor'],
    counterKey: 'notesToWrite',
    group: 'MY WORKSPACE',
  },
  {
    key: 'mentor-qa',
    label: 'Assigned Q&A',
    path: '/mentor/qa',
    iconName: 'message',
    roles: ['mentor'],
    counterKey: 'pendingQA',
    group: 'MY WORKSPACE',
  },
  {
    key: 'mentor-accounting',
    label: 'Accounting & Payouts',
    path: '/mentor/report',
    iconName: 'euro',
    roles: ['mentor'],
    group: 'MY WORKSPACE',
  },
]

export interface BackofficeUserItem {
  id: string
  name: string
  email: string
  avatarInitials: string
  roles: ('admin' | 'moderator' | 'mentor')[]
  twoFactorStatus: 'active' | 'disabled' | 'optional'
  twoFactorDetails?: string
  status: 'active' | 'invitation_sent' | 'suspended'
  lastLogin: string
  createdOn?: string
  createdBy?: string
}

export const mockBackofficeUsers: BackofficeUserItem[] = [
  {
    id: 'bo-1',
    name: 'Giulia Ferri',
    email: 'giulia.ferri@shebloom.it',
    avatarInitials: 'GF',
    roles: ['admin'],
    twoFactorStatus: 'active',
    status: 'active',
    lastLogin: 'Today 08:40',
    createdOn: '15/01/2026',
    createdBy: 'System Super Admin',
  },
  {
    id: 'bo-2',
    name: 'Sara Conti',
    email: 'sara.conti@shebloom.it',
    avatarInitials: 'SC',
    roles: ['admin', 'moderator'],
    twoFactorStatus: 'active',
    status: 'active',
    lastLogin: 'Today 09:12',
    createdOn: '10/02/2026',
    createdBy: 'Giulia Ferri',
  },
  {
    id: 'bo-3',
    name: 'Luca Neri',
    email: 'luca.neri@shebloom.it',
    avatarInitials: 'LN',
    roles: ['moderator'],
    twoFactorStatus: 'active',
    status: 'active',
    lastLogin: 'Yesterday 18:03',
    createdOn: '12/04/2026',
    createdBy: 'Giulia Ferri',
  },
  {
    id: 'bo-4',
    name: 'Paolo Greco',
    email: 'paolo.greco@shebloom.it',
    avatarInitials: 'PG',
    roles: ['moderator'],
    twoFactorStatus: 'disabled',
    twoFactorDetails: 'Disabled by the Admin on 05/10/2026: the user signs in with password only.',
    status: 'active',
    lastLogin: '10/10/2026 · 17:20',
    createdOn: '02/09/2026',
    createdBy: 'Giulia Ferri',
  },
  {
    id: 'bo-5',
    name: 'Dr Elisa Mestri',
    email: 'elisa.mestri@shebloom.it',
    avatarInitials: 'EM',
    roles: ['mentor'],
    twoFactorStatus: 'optional',
    status: 'active',
    lastLogin: 'Today 07:55',
    createdOn: '20/05/2026',
    createdBy: 'Giulia Ferri',
  },
  {
    id: 'bo-6',
    name: 'Chiara Bisceglie',
    email: 'chiara.b@shebloom.it',
    avatarInitials: 'CB',
    roles: ['mentor'],
    twoFactorStatus: 'active',
    status: 'invitation_sent',
    lastLogin: '—',
    createdOn: '18/10/2026',
    createdBy: 'Sara Conti',
  },
]

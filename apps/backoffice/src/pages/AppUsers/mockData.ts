export type SubscriptionType = 'club' | 'free'
export type UserStatusType = 'active' | 'blocked' | 'to_verify' | 'anonymized'

export interface AppUserItem {
  id: string
  name: string
  email: string
  subscription: SubscriptionType
  registeredOn: string // e.g. "12/03/2026"
  sessions: number
  status: UserStatusType
}

export interface BookingActivityItem {
  id: string
  date: string // e.g. "14/10/2026 · 11:00"
  service: string // e.g. "Session · Self-worth"
  mentor: string // e.g. "Dr E. Mestri"
  status: 'upcoming' | 'completed' | 'cancelled'
}

export interface PaymentItem {
  id: string
  date: string
  description: string
  amount: string
  status: 'paid' | 'refunded' | 'failed'
}

export interface AccessLogItem {
  id: string
  timestamp: string
  ip: string
  device: string
  event: string
}

export interface AppUserDetailData {
  id: string
  name: string
  email: string
  subscription: SubscriptionType
  status: UserStatusType
  registeredOn: string // "12/03/2026"
  signInMethod: string // "Apple"
  language: string // "Italiano"
  city: string // "Milan"
  dateOfBirth: string // "14/09/1991"
  subscriptionPlan: string // "Annual · renews 12/03/2027"
  store: string // "App Store"
  lastLogin: string // "today at 08:42"
  consents: {
    privacyTnc: { version: string; date: string; granted: boolean }
    healthData: { granted: boolean }
    sosMode: { granted: boolean }
  }
  bookings: BookingActivityItem[]
}

export const mockSaraRossiDetail: AppUserDetailData = {
  id: '1',
  name: 'Sara Rossi',
  email: 'sara.rossi@email.it',
  subscription: 'club',
  status: 'active',
  registeredOn: '12/03/2026',
  signInMethod: 'Apple',
  language: 'Italiano',
  city: 'Milan',
  dateOfBirth: '14/09/1991',
  subscriptionPlan: 'Annual · renews 12/03/2027',
  store: 'App Store',
  lastLogin: 'today at 08:42',
  consents: {
    privacyTnc: { version: 'v3', date: '12/03/2026', granted: true },
    healthData: { granted: true },
    sosMode: { granted: true },
  },
  bookings: [
    {
      id: 'b1',
      date: '14/10/2026 · 11:00',
      service: 'Session · Self-worth',
      mentor: 'Dr E. Mestri',
      status: 'upcoming',
    },
    {
      id: 'b2',
      date: '30/09/2026 · 18:00',
      service: 'Program · Bloom again 3/4',
      mentor: 'Chiara Bisceglie',
      status: 'completed',
    },
    {
      id: 'b3',
      date: '16/09/2026 · 18:00',
      service: 'Program · Bloom again 2/4',
      mentor: 'Chiara Bisceglie',
      status: 'completed',
    },
    {
      id: 'b4',
      date: '02/09/2026 · 10:00',
      service: 'Session · Relations',
      mentor: 'Francesca Leone',
      status: 'cancelled',
    },
  ],
}

export const mockAppUsers: AppUserItem[] = [
  {
    id: '1',
    name: 'Sara Rossi',
    email: 'sara.rossi@email.it',
    subscription: 'club',
    registeredOn: '12/03/2026',
    sessions: 4,
    status: 'active',
  },
  {
    id: '2',
    name: 'Giulia Bianchi',
    email: 'giulia.b@email.it',
    subscription: 'free',
    registeredOn: '28/04/2026',
    sessions: 1,
    status: 'active',
  },
  {
    id: '3',
    name: 'Marta Verdi',
    email: 'marta.verdi@email.it',
    subscription: 'club',
    registeredOn: '02/05/2026',
    sessions: 7,
    status: 'active',
  },
  {
    id: '4',
    name: 'Anna Russo',
    email: 'anna.russo@email.it',
    subscription: 'free',
    registeredOn: '15/05/2026',
    sessions: 0,
    status: 'blocked',
  },
  {
    id: '5',
    name: 'Laura Galli',
    email: 'laura.galli@email.it',
    subscription: 'club',
    registeredOn: '21/06/2026',
    sessions: 2,
    status: 'active',
  },
  {
    id: '6',
    name: 'Chiara Fontana',
    email: 'chiara.f@email.it',
    subscription: 'free',
    registeredOn: '03/07/2026',
    sessions: 0,
    status: 'to_verify',
  },
  {
    id: '7',
    name: 'Elena Marino',
    email: 'elena.marino@email.it',
    subscription: 'club',
    registeredOn: '19/08/2026',
    sessions: 3,
    status: 'active',
  },
  {
    id: '8',
    name: 'Francesca Riva',
    email: 'f.riva@email.it',
    subscription: 'free',
    registeredOn: '30/08/2026',
    sessions: 1,
    status: 'anonymized',
  },
]

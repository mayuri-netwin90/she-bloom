export type SubscriptionType = 'club' | 'free'
export type UserStatusType = 'active' | 'blocked' | 'to_verify' | 'anonymized'

export interface AppUserItem {
  id: string
  name: string
  email: string
  subscription: SubscriptionType
  registeredOn: string // e.g. "12/05/2026"
  sessions: number
  status: UserStatusType
}

export const mockAppUsers: AppUserItem[] = [
  {
    id: '1',
    name: 'Sara Rossi',
    email: 'sara.rossi@email.it',
    subscription: 'club',
    registeredOn: '12/05/2026',
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

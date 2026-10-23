export interface MentorItem {
  id: string
  name: string
  qualification: string
  avatarInitials: string
  area: string
  verification: 'verified' | 'not_verified'
  status: 'active' | 'to_verify' | 'suspended' | 'deactivated'
  rating?: number
  sessionCount?: number
  reportedNoShows?: number
  quote?: string
  about?: string
  specialisations?: string[]
  verifiedOn?: string
  verifiedBy?: string
  documents?: string
  profileEditingAllowed?: boolean
  offeringEditingAllowed?: boolean
}

export const mockMentors: MentorItem[] = [
  {
    id: 'men-1',
    name: 'Dr Elisa Mestri',
    qualification: 'Psychology · Mental coach',
    avatarInitials: 'EM',
    area: 'Relationships & Emotions',
    verification: 'verified',
    status: 'active',
    rating: 4.9,
    sessionCount: 128,
    reportedNoShows: 1,
    quote: '"Every emotion deserves to be heard."',
    about: 'Psychologist and mental coach, I help women recognise and listen to their emotions...',
    specialisations: ['Self-esteem', 'Relationships', 'Anxiety', 'Mindfulness'],
    verifiedOn: '15/03/2026',
    verifiedBy: 'Giulia Ferri',
    documents: "Psychologists' register no. 12345 · CV",
    profileEditingAllowed: true,
    offeringEditingAllowed: false,
  },
  {
    id: 'men-2',
    name: 'Chiara Bisceglie',
    qualification: 'Personal coach',
    avatarInitials: 'CB',
    area: 'Training & Movement',
    verification: 'verified',
    status: 'active',
    rating: 4.8,
    sessionCount: 86,
    reportedNoShows: 0,
    quote: '"Movement is life and confidence."',
    about: 'Certified personal coach specialising in female physical health and functional mobility.',
    specialisations: ['Functional Fitness', 'Post-Partum', 'Posture'],
    verifiedOn: '20/02/2026',
    verifiedBy: 'Giulia Ferri',
    documents: 'National Trainer Registry #9821 · Insurance',
    profileEditingAllowed: true,
    offeringEditingAllowed: true,
  },
  {
    id: 'men-3',
    name: 'Francesca Leone',
    qualification: 'Nutritionist',
    avatarInitials: 'FL',
    area: 'Nutrition',
    verification: 'verified',
    status: 'active',
    rating: 4.7,
    sessionCount: 64,
    reportedNoShows: 0,
    quote: '"Healthy eating is self-care, not restriction."',
    about: 'Clinical nutritionist helping women build intuitive, sustainable relationships with food.',
    specialisations: ['Hormonal Health', 'Gut Health', 'Meal Planning'],
    verifiedOn: '10/01/2026',
    verifiedBy: 'Giulia Ferri',
    documents: 'National Biologist Registry #44321',
    profileEditingAllowed: true,
    offeringEditingAllowed: true,
  },
  {
    id: 'men-4',
    name: 'Dr Samanta Cristoforetti',
    qualification: 'Dermatologist',
    avatarInitials: 'SC',
    area: 'Beauty & Self-care',
    verification: 'not_verified',
    status: 'to_verify',
    rating: undefined,
    sessionCount: undefined,
    reportedNoShows: 0,
    quote: '"Skincare tailored to your body stages."',
    about: 'Medical dermatologist focusing on hormonal skin conditions and barrier repair.',
    specialisations: ['Acne', 'Anti-aging', 'Skin Barrier'],
    verifiedOn: undefined,
    verifiedBy: undefined,
    documents: 'Medical Board License #55123 · ID verified',
    profileEditingAllowed: false,
    offeringEditingAllowed: false,
  },
  {
    id: 'men-5',
    name: 'Irene Sala',
    qualification: 'Astrologer',
    avatarInitials: 'IS',
    area: 'Astrology & Intuition',
    verification: 'verified',
    status: 'suspended',
    rating: 4.6,
    sessionCount: 40,
    reportedNoShows: 2,
    quote: '"Aligning inner rhythms with cosmic patterns."',
    about: 'Intuitive consultant integrating natal charts and life cycle transitions.',
    specialisations: ['Natal Chart', 'Transits', 'Lunar Cycles'],
    verifiedOn: '05/11/2025',
    verifiedBy: 'Giulia Ferri',
    documents: 'Certificate of Mastery · ID verified',
    profileEditingAllowed: false,
    offeringEditingAllowed: false,
  },
]

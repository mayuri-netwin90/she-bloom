import { http, HttpResponse } from 'msw'

/**
 * Mock Service Worker Request Handlers.
 * Allows full frontend UI development independently of the NestJS backend.
 */
export const handlers = [
  // Mock /api/auth/me or /backoffice/auth/me
  http.get('*/backoffice/auth/me', () => {
    return HttpResponse.json({
      id: 'usr_admin_001',
      name: 'Giulia Bianchi',
      email: 'giulia@bloom.it',
      role: 'ADMIN',
    })
  }),

  // Mock /api/auth/login or /backoffice/auth/login
  http.post('*/backoffice/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string }
    if (body.email && body.password) {
      return HttpResponse.json({
        accessToken: 'mock_jwt_token_shebloom_admin_2026',
        user: {
          id: 'usr_admin_001',
          name: 'Giulia Bianchi',
          email: body.email,
          role: 'ADMIN',
        },
      })
    }
    return HttpResponse.json(
      { message: 'Invalid email or password.' },
      { status: 400 }
    )
  }),

  // Mock /api/dashboard/kpi
  http.get('*/backoffice/dashboard/kpi', () => {
    return HttpResponse.json({
      activeUsers: 12480,
      activeUsersDelta: 8.4,
      clubSubscribers: 1936,
      clubSubscribersDelta: 12.1,
      monthlyRevenue: 18420,
      monthlyRevenueDelta: 5.3,
      sessionsToday: 34,
      sessionsCancelled: 2,
    })
  }),
]

import type { Request, Response, NextFunction } from 'express';
import { authenticate } from './auth.service.js';

export type BackofficeAuth = NonNullable<Awaited<ReturnType<typeof authenticate>>>;

/** Sets res.locals.auth = { sessionId, user } or answers 401. */
export async function backofficeAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = await authenticate(req.header('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth) {
    return res.status(401).json({ code: 'UNAUTHENTICATED', message: 'Authentication is required.' });
  }
  res.locals.auth = auth;
  next();
}

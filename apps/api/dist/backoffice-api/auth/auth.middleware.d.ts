import type { Request, Response, NextFunction } from 'express';
import { authenticate } from './auth.service.js';
export type BackofficeAuth = NonNullable<Awaited<ReturnType<typeof authenticate>>>;
/** Sets res.locals.auth = { sessionId, user } or answers 401. */
export declare function backofficeAuthMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;

import { authenticate } from './auth.service.js';
/** Sets res.locals.auth = { sessionId, user } or answers 401. */
export async function backofficeAuthMiddleware(req, res, next) {
    const auth = await authenticate(req.header('authorization')?.replace(/^Bearer\s+/i, ''));
    if (!auth) {
        return res.status(401).json({ code: 'UNAUTHENTICATED', message: 'Authentication is required.' });
    }
    res.locals.auth = auth;
    next();
}
//# sourceMappingURL=auth.middleware.js.map
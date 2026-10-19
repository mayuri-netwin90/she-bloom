import { currentUser } from './auth.service.js';
export async function mobileAuthMiddleware(req, res, next) {
    const token = req.header('authorization')?.replace(/^Bearer\s+/i, '');
    const user = await currentUser(token);
    if (!user) {
        return res.status(401).json({ message: 'Authentication is required.' });
    }
    req.user = user;
    next();
}
//# sourceMappingURL=auth.middleware.js.map
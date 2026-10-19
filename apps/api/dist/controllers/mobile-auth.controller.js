import { currentMobileUser, mobileLogin } from '../services/mobile-auth.service.js';
export async function mobileLoginController(req, res) {
    const result = await mobileLogin(req.body?.email ?? '', req.body?.password ?? '');
    if (!result)
        return res.status(401).json({ message: 'Invalid email or password.' });
    return res.json(result);
}
export async function currentMobileUserController(req, res) {
    const user = await currentMobileUser(req.header('authorization')?.replace(/^Bearer\s+/i, ''));
    if (!user)
        return res.status(401).json({ message: 'Authentication is required.' });
    return res.json(user);
}
//# sourceMappingURL=mobile-auth.controller.js.map
import { authenticatedUser, login } from '../services/auth.service.js';
export async function loginController(req, res) {
    const result = await login(req.body?.email ?? '', req.body?.password ?? '');
    if (!result)
        return res.status(401).json({ message: 'Invalid email or password.' });
    return res.json(result);
}
export async function currentUserController(req, res) {
    const token = req.header('authorization')?.replace(/^Bearer\s+/i, '');
    const user = await authenticatedUser(token);
    if (!user)
        return res.status(401).json({ message: 'Authentication is required.' });
    return res.json(user);
}
//# sourceMappingURL=auth.controller.js.map
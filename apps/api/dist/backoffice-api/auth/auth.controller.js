import { login, logout } from './auth.service.js';
import { passwordProblems, requestPasswordReset, resetPassword } from './password-reset.service.js';
const messages = {
    INVALID_CREDENTIALS: 'Invalid email or password.',
    ACCOUNT_DEACTIVATED: 'Your account has been deactivated. Contact an administrator.',
};
const invalid = (res, fields) => res.status(400).json({ code: 'VALIDATION_ERROR', message: 'Please check the highlighted fields.', fields });
/** Normalised email, filling fields.email when missing or malformed. */
function readEmail(body, fields) {
    const raw = body?.email;
    const email = typeof raw === 'string' ? raw.trim().toLowerCase() : '';
    if (!email)
        fields.email = 'Email is required.';
    else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        fields.email = 'Enter a valid email address.';
    return email;
}
export async function loginController(req, res) {
    const fields = {};
    const email = readEmail(req.body, fields);
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!password)
        fields.password = 'Password is required.';
    else if (password.length > 256)
        fields.password = 'Password is too long.'; // caps scrypt work per request
    const rememberMe = req.body?.rememberMe ?? false;
    if (typeof rememberMe !== 'boolean')
        fields.rememberMe = 'Remember me must be true or false.';
    if (Object.keys(fields).length)
        return invalid(res, fields);
    const result = await login(email, password, rememberMe);
    if (!result.ok)
        return res.status(result.reason === 'ACCOUNT_DEACTIVATED' ? 403 : 401).json({ code: result.reason, message: messages[result.reason] });
    const { ok: _ok, ...body } = result;
    return res.json(body);
}
// Both run after backofficeAuthMiddleware, which guarantees res.locals.auth.
export function currentUserController(_req, res) {
    return res.json(res.locals.auth.user);
}
export async function logoutController(_req, res) {
    await logout(res.locals.auth.sessionId);
    return res.status(204).end();
}
export function forgotPasswordController(req, res) {
    const fields = {};
    const email = readEmail(req.body, fields);
    if (Object.keys(fields).length)
        return invalid(res, fields);
    // Same answer and timing for every email: the lookup and e-mail happen after the response.
    res.json({ message: 'If an active account exists for this email, we have sent a link to reset the password. The link is valid for 30 minutes.' });
    requestPasswordReset(email).catch((error) => console.error('Password reset e-mail failed', error));
}
export async function resetPasswordController(req, res) {
    const fields = {};
    const token = typeof req.body?.token === 'string' ? req.body.token : '';
    const password = typeof req.body?.password === 'string' ? req.body.password : '';
    if (!token || token.length > 128)
        fields.token = 'Reset link is missing or malformed.';
    if (!password)
        fields.password = 'Password is required.';
    else if (password.length > 256)
        fields.password = 'Password is too long.';
    else if (passwordProblems(password).length)
        fields.password = `Password must contain ${passwordProblems(password).join(', ')}.`;
    if (Object.keys(fields).length)
        return invalid(res, fields);
    if (!(await resetPassword(token, password))) {
        return res.status(400).json({ code: 'RESET_LINK_INVALID', message: 'This link is invalid or has expired. Request a new one.' });
    }
    return res.json({ message: 'Your password has been updated. Log in with the new password.' });
}
//# sourceMappingURL=auth.controller.js.map
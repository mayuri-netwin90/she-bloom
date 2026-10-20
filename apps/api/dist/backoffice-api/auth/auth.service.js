import { createHmac, timingSafeEqual } from 'node:crypto';
import { database } from '../../database/database.js';
import { verifyPassword } from '../../common/password.js';
const tokenLifetime = 60 * 60 * 8; // seconds
const rememberMeLifetime = 60 * 60 * 24 * 30; // "Remember me": absolute lifetime only, idle timeout (RF-BO-ACC-05) still applies
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET)
    throw new Error('JWT_SECRET must be set in production.');
const secret = process.env.JWT_SECRET ?? 'replace-this-development-secret-before-production';
const columns = 'id, email, full_name, password_hash, is_admin, is_moderator, is_mentor, is_super_admin, status, language';
const rolesOf = (u) => [u.is_admin && 'ADMIN', u.is_moderator && 'MODERATOR', u.is_mentor && 'MENTOR'].filter(Boolean);
const publicUser = (user) => ({ id: user.id, email: user.email, name: user.full_name, roles: rolesOf(user), isSuperAdmin: user.is_super_admin, language: user.language });
function sign(user, sid, lifetime) { const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url'); const body = Buffer.from(JSON.stringify({ sub: user.id, sid, aud: 'admin', roles: rolesOf(user), exp: Math.floor(Date.now() / 1000) + lifetime })).toString('base64url'); return `${header}.${body}.${createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url')}`; }
function verify(token) { const [header, body, signature] = token.split('.'); if (!header || !body || !signature)
    return null; const expected = createHmac('sha256', secret).update(`${header}.${body}`).digest(); const supplied = Buffer.from(signature, 'base64url'); if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied))
    return null; try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    return payload.aud === 'admin' && payload.exp > Date.now() / 1000 ? payload : null;
}
catch {
    return null;
} }
export async function login(email, password, rememberMe = false) {
    const { rows } = await database.query(`SELECT ${columns} FROM bo_users WHERE lower(email) = $1`, [email]);
    const user = rows[0];
    // Always run scrypt (dummy hash when the user or password is missing) so timing doesn't reveal whether the email exists.
    // Invited users have no password yet, so they also land on INVALID_CREDENTIALS.
    const passwordOk = await verifyPassword(password, user?.password_hash ?? null);
    if (!user || !passwordOk)
        return { ok: false, reason: 'INVALID_CREDENTIALS' };
    // Checked only after a correct password, so deactivation doesn't leak account existence.
    if (user.status === 'deactivated')
        return { ok: false, reason: 'ACCOUNT_DEACTIVATED' };
    if (user.status !== 'active')
        return { ok: false, reason: 'INVALID_CREDENTIALS' };
    await database.query('UPDATE bo_users SET last_login_at = now(), updated_at = now() WHERE id = $1', [user.id]);
    const lifetime = rememberMe ? rememberMeLifetime : tokenLifetime;
    const { rows: [session] } = await database.query(`INSERT INTO bo_sessions (bo_user_id, expires_at) VALUES ($1, now() + make_interval(secs => $2)) RETURNING id`, [user.id, lifetime]);
    return { ok: true, accessToken: sign(user, session.id, lifetime), expiresIn: lifetime, user: publicUser(user) };
}
/** Valid signature alone isn't enough: the session must exist, be unrevoked and unexpired, and the user still active. */
export async function authenticate(token) {
    const payload = token ? verify(token) : null;
    if (!payload?.sub || !payload.sid)
        return null;
    const { rows } = await database.query(`SELECT ${columns.split(', ').map((c) => `u.${c}`).join(', ')} FROM bo_sessions s JOIN bo_users u ON u.id = s.bo_user_id
     WHERE s.id = $1 AND s.bo_user_id = $2 AND s.revoked_at IS NULL AND s.expires_at > now()`, [payload.sid, payload.sub]);
    return rows[0]?.status === 'active' ? { sessionId: payload.sid, user: publicUser(rows[0]) } : null;
}
export async function logout(sessionId) {
    await database.query('UPDATE bo_sessions SET revoked_at = now() WHERE id = $1 AND revoked_at IS NULL', [sessionId]);
}
//# sourceMappingURL=auth.service.js.map
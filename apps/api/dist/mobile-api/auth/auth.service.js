import { createHmac, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { database } from '../../database/database.js';
const scrypt = promisify(scryptCallback);
const tokenLifetime = 60 * 60 * 24 * 30;
const secret = () => process.env.JWT_SECRET ?? 'replace-this-development-secret-before-production';
const publicUser = (user) => ({ id: user.id, email: user.email, name: user.name });
function sign(user) { const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url'); const body = Buffer.from(JSON.stringify({ sub: user.id, aud: 'front', exp: Math.floor(Date.now() / 1000) + tokenLifetime })).toString('base64url'); return `${header}.${body}.${createHmac('sha256', secret()).update(`${header}.${body}`).digest('base64url')}`; }
function verify(token) { const [header, body, signature] = token.split('.'); if (!header || !body || !signature)
    return null; const expected = createHmac('sha256', secret()).update(`${header}.${body}`).digest(); const supplied = Buffer.from(signature, 'base64url'); if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied))
    return null; try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    return payload.aud === 'front' && payload.exp > Date.now() / 1000 ? payload : null;
}
catch {
    return null;
} }
async function verifyPassword(password, stored) { const [salt, hash] = stored.split(':'); if (!salt || !hash)
    return false; const derived = await scrypt(password, salt, 64); const known = Buffer.from(hash, 'hex'); return derived.length === known.length && timingSafeEqual(derived, known); }
export async function login(email, password) { const { rows } = await database.query('SELECT id, email, name, password_hash, is_active FROM mobile_users WHERE email = $1', [email.trim().toLowerCase()]); const user = rows[0]; if (!user || !user.is_active || !(await verifyPassword(password, user.password_hash)))
    return null; await database.query('UPDATE mobile_users SET last_login_at = now(), updated_at = now() WHERE id = $1', [user.id]); return { accessToken: sign(user), expiresIn: tokenLifetime, user: publicUser(user) }; }
export async function currentUser(token) { const payload = token ? verify(token) : null; if (!payload?.sub)
    return null; const { rows } = await database.query('SELECT id, email, name, password_hash, is_active FROM mobile_users WHERE id = $1', [payload.sub]); return rows[0]?.is_active ? publicUser(rows[0]) : null; }
//# sourceMappingURL=auth.service.js.map
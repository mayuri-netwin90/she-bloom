import { createHmac, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { database } from '../database/database.js';
const scrypt = promisify(scryptCallback);
const tokenLifetime = 60 * 60 * 8;
const secret = () => process.env.JWT_SECRET ?? 'replace-this-development-secret-before-production';
const encode = (value) => Buffer.from(value).toString('base64url');
const publicUser = (user) => ({ id: user.id, email: user.email, name: user.name, role: user.role });
function sign(payload) { const header = encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })); const body = encode(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + tokenLifetime })); return `${header}.${body}.${createHmac('sha256', secret()).update(`${header}.${body}`).digest('base64url')}`; }
function verify(token) { const [header, body, signature] = token.split('.'); if (!header || !body || !signature)
    return null; const expected = createHmac('sha256', secret()).update(`${header}.${body}`).digest(); const supplied = Buffer.from(signature, 'base64url'); if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied))
    return null; try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    return payload.exp > Date.now() / 1000 ? payload : null;
}
catch {
    return null;
} }
async function verifyPassword(password, stored) { const [salt, hash] = stored.split(':'); if (!salt || !hash)
    return false; const derived = await scrypt(password, salt, 64); const known = Buffer.from(hash, 'hex'); return derived.length === known.length && timingSafeEqual(derived, known); }
export async function login(email, password) { const { rows } = await database.query('SELECT id, email, name, password_hash, role, is_active FROM backoffice_users WHERE email = $1', [email.trim().toLowerCase()]); const user = rows[0]; if (!user || !user.is_active || !(await verifyPassword(password, user.password_hash)))
    return null; await database.query('UPDATE backoffice_users SET last_login_at = now(), updated_at = now() WHERE id = $1', [user.id]); return { accessToken: sign({ sub: user.id, email: user.email, role: user.role }), expiresIn: tokenLifetime, user: publicUser(user) }; }
export async function authenticatedUser(token) { const payload = token ? verify(token) : null; if (!payload?.sub)
    return null; const { rows } = await database.query('SELECT id, email, name, password_hash, role, is_active FROM backoffice_users WHERE id = $1', [payload.sub]); return rows[0]?.is_active ? publicUser(rows[0]) : null; }
//# sourceMappingURL=auth.service.js.map
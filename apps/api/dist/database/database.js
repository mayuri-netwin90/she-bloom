import { randomBytes, scrypt as scryptCallback } from 'node:crypto';
import { promisify } from 'node:util';
import { Pool } from 'pg';
const scrypt = promisify(scryptCallback);
export const database = new Pool({ connectionString: process.env.DATABASE_URL ?? 'postgres://bloom:bloom@localhost:5432/bloom' });
export async function initializeDatabase() {
    await database.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await database.query(`CREATE TABLE IF NOT EXISTS backoffice_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
    password_hash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'ADMIN' CHECK (role IN ('ADMIN', 'OPERATOR', 'VIEWER')),
    is_active BOOLEAN NOT NULL DEFAULT true, last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now())`);
    await database.query(`CREATE TABLE IF NOT EXISTS mobile_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
    password_hash TEXT NOT NULL, is_active BOOLEAN NOT NULL DEFAULT true, last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now())`);
    if (process.env.NODE_ENV !== 'production') {
        const { rows } = await database.query('SELECT count(*) FROM backoffice_users');
        if (Number(rows[0].count) === 0) {
            const salt = randomBytes(16).toString('hex');
            const key = await scrypt(process.env.DEV_ADMIN_PASSWORD ?? 'ChangeMe123!', salt, 64);
            await database.query('INSERT INTO backoffice_users (email, name, password_hash, role) VALUES ($1, $2, $3, $4)', [process.env.DEV_ADMIN_EMAIL ?? 'admin@bloom.local', 'Bloom Administrator', `${salt}:${key.toString('hex')}`, 'ADMIN']);
        }
        const { rows: mobileRows } = await database.query('SELECT count(*) FROM mobile_users');
        if (Number(mobileRows[0].count) === 0) {
            const salt = randomBytes(16).toString('hex');
            const key = await scrypt(process.env.DEV_MOBILE_PASSWORD ?? 'ChangeMe123!', salt, 64);
            await database.query('INSERT INTO mobile_users (email, name, password_hash) VALUES ($1, $2, $3)', [process.env.DEV_MOBILE_EMAIL ?? 'member@bloom.local', 'Bloom Member', `${salt}:${key.toString('hex')}`]);
        }
    }
}
//# sourceMappingURL=database.js.map
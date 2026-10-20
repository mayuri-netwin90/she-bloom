import { readdir, readFile } from 'node:fs/promises';
import { Pool } from 'pg';
import { hashPassword } from '../common/password.js';

export const database = new Pool({ connectionString: process.env.DATABASE_URL });

const migrationsDir = new URL('../../migrations/', import.meta.url);

// ponytail: every migration is idempotent and re-run on boot; add a migrations table when one stops being idempotent.
async function runMigrations() {
  for (const file of (await readdir(migrationsDir)).filter((f) => f.endsWith('.sql')).sort()) {
    await database.query(await readFile(new URL(file, migrationsDir), 'utf8'));
  }
}

async function seedSuperAdmin() {
  const { rows } = await database.query('SELECT 1 FROM bo_users WHERE is_super_admin');
  if (rows.length) return;
  const isProduction = process.env.NODE_ENV === 'production';
  const email = process.env.SUPERADMIN_EMAIL ?? (isProduction ? undefined : 'superadmin@bloom.local');
  const password = process.env.SUPERADMIN_PASSWORD ?? (isProduction ? undefined : 'ChangeMe123!');
  if (!email || !password) {
    console.warn('No superadmin exists and SUPERADMIN_EMAIL / SUPERADMIN_PASSWORD are not set: skipping seed.');
    return;
  }
  // Existing account with the same email is promoted instead of duplicated.
  // A superadmin is an Admin only: Mentor is exclusive (RF-BO-ACC-07), so it is cleared on promotion.
  await database.query(
    `INSERT INTO bo_users (email, full_name, password_hash, is_admin, is_super_admin, status)
     VALUES ($1, $2, $3, true, true, 'active')
     ON CONFLICT (lower(email)) DO UPDATE SET is_admin = true, is_mentor = false, is_super_admin = true,
       status = 'active', password_hash = EXCLUDED.password_hash, updated_at = now()`,
    [email.trim().toLowerCase(), process.env.SUPERADMIN_NAME ?? 'Super Admin', await hashPassword(password)],
  );
  console.log(`Superadmin seeded: ${email}`);
}

export async function initializeDatabase() {
  await runMigrations();
  await seedSuperAdmin();
}

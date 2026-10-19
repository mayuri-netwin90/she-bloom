import { database } from '../../database/database.js';

export type MobileUser = {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type UpdateMobileUserInput = {
  name?: string;
};

export async function getMobileUserById(id: string): Promise<MobileUser | null> {
  const { rows } = await database.query<MobileUser>(
    'SELECT id, email, name, is_active, last_login_at, created_at, updated_at FROM mobile_users WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}

export async function updateMobileUser(id: string, input: UpdateMobileUserInput): Promise<MobileUser> {
  const { name } = input;
  const { rows } = await database.query<MobileUser>(
    'UPDATE mobile_users SET name = COALESCE($2, name), updated_at = now() WHERE id = $1 RETURNING id, email, name, is_active, last_login_at, created_at, updated_at',
    [id, name]
  );
  return rows[0];
}

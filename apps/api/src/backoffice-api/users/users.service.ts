import { database } from '../../database/database.js';

export type BackofficeUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

export async function listBackofficeUsers(): Promise<BackofficeUser[]> {
  const { rows } = await database.query<BackofficeUser>(
    'SELECT id, email, name, role, is_active, last_login_at, created_at, updated_at FROM backoffice_users ORDER BY created_at DESC'
  );
  return rows;
}

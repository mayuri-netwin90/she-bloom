import { database } from '../../database/database.js';

export type BackofficeUser = {
  id: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  is_moderator: boolean;
  is_mentor: boolean;
  is_super_admin: boolean;
  status: string;
  last_login_at: Date | null;
  created_at: Date;
};

export async function listBackofficeUsers(): Promise<BackofficeUser[]> {
  const { rows } = await database.query<BackofficeUser>(
    'SELECT id, email, full_name, is_admin, is_moderator, is_mentor, is_super_admin, status, last_login_at, created_at FROM bo_users ORDER BY created_at DESC'
  );
  return rows;
}

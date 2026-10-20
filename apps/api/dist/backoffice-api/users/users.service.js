import { database } from '../../database/database.js';
export async function listBackofficeUsers() {
    const { rows } = await database.query('SELECT id, email, full_name, is_admin, is_moderator, is_mentor, is_super_admin, status, last_login_at, created_at FROM bo_users ORDER BY created_at DESC');
    return rows;
}
//# sourceMappingURL=users.service.js.map
import { database } from '../../database/database.js';
export async function listBackofficeUsers() {
    const { rows } = await database.query('SELECT id, email, name, role, is_active, last_login_at, created_at, updated_at FROM backoffice_users ORDER BY created_at DESC');
    return rows;
}
//# sourceMappingURL=users.service.js.map
import { database } from '../../database/database.js';
export async function getMobileUserById(id) {
    const { rows } = await database.query('SELECT id, email, name, is_active, last_login_at, created_at, updated_at FROM mobile_users WHERE id = $1', [id]);
    return rows[0] || null;
}
export async function updateMobileUser(id, input) {
    const { name } = input;
    const { rows } = await database.query('UPDATE mobile_users SET name = COALESCE($2, name), updated_at = now() WHERE id = $1 RETURNING id, email, name, is_active, last_login_at, created_at, updated_at', [id, name]);
    return rows[0];
}
//# sourceMappingURL=users.service.js.map
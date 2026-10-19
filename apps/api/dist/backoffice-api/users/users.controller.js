import { listBackofficeUsers } from './users.service.js';
export async function listUsersController(_req, res) {
    try {
        const users = await listBackofficeUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
}
//# sourceMappingURL=users.controller.js.map
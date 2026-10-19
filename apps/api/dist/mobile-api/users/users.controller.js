import { getMobileUserById, updateMobileUser } from './users.service.js';
export async function getProfileController(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await getMobileUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
}
export async function updateProfileController(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { name } = req.body;
        const user = await updateMobileUser(userId, { name });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update profile' });
    }
}
//# sourceMappingURL=users.controller.js.map
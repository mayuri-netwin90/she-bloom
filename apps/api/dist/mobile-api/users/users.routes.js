import { Router } from 'express';
import { getProfileController, updateProfileController } from './users.controller.js';
import { mobileAuthMiddleware } from '../auth/auth.middleware.js';
export const mobileUsersRouter = Router();
mobileUsersRouter.get('/profile', mobileAuthMiddleware, getProfileController);
mobileUsersRouter.patch('/profile', mobileAuthMiddleware, updateProfileController);
//# sourceMappingURL=users.routes.js.map
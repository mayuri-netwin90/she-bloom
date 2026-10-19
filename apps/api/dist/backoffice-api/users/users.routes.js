import { Router } from 'express';
import { listUsersController } from './users.controller.js';
import { backofficeAuthMiddleware } from '../auth/auth.middleware.js';
export const backofficeUsersRouter = Router();
backofficeUsersRouter.get('/', backofficeAuthMiddleware, listUsersController);
//# sourceMappingURL=users.routes.js.map
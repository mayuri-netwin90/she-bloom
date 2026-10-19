import { Router, type Router as ExpressRouter } from 'express';
import { listUsersController } from './users.controller.js';
import { backofficeAuthMiddleware } from '../auth/auth.middleware.js';

export const backofficeUsersRouter: ExpressRouter = Router();

backofficeUsersRouter.get('/', backofficeAuthMiddleware, listUsersController);

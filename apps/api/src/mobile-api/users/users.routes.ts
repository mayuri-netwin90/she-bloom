import { Router, type Router as ExpressRouter } from 'express';
import { getProfileController, updateProfileController } from './users.controller.js';
import { mobileAuthMiddleware } from '../auth/auth.middleware.js';

export const mobileUsersRouter: ExpressRouter = Router();

mobileUsersRouter.get('/profile', mobileAuthMiddleware, getProfileController);

mobileUsersRouter.patch('/profile', mobileAuthMiddleware, updateProfileController);

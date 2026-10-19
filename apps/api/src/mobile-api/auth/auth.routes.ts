import { Router, type Router as ExpressRouter } from 'express';
import { currentUserController, loginController } from './auth.controller.js';
import { mobileAuthMiddleware } from './auth.middleware.js';

export const mobileAuthRouter: ExpressRouter = Router();
/**
 * @openapi
 * /mobile/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Sign in an end user to the mobile app
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email, example: member@bloom.local }
 *               password: { type: string, format: password, example: ChangeMe123! }
 *     responses:
 *       200: { description: Authenticated front user }
 *       401: { description: Invalid email or password }
 */
mobileAuthRouter.post('/login', loginController);
/**
 * @openapi
 * /mobile/auth/me:
 *   get:
 *     tags: [Authentication]
 *     summary: Get the authenticated front user
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Current front user }
 *       401: { description: Missing, invalid, or expired token }
 */
mobileAuthRouter.get('/me', mobileAuthMiddleware, currentUserController);

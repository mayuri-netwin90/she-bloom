import { Router } from 'express';
import { currentUserController, loginController } from './auth.controller.js';
export const adminAuthRouter = Router();
/**
 * @openapi
 * /admin/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Sign in to the backoffice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email, example: admin@bloom.local }
 *               password: { type: string, format: password, example: ChangeMe123! }
 *     responses:
 *       200: { description: Authenticated administrator }
 *       401: { description: Invalid email or password }
 */
adminAuthRouter.post('/login', loginController);
/**
 * @openapi
 * /admin/auth/me:
 *   get:
 *     tags: [Authentication]
 *     summary: Get the authenticated administrator
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Current administrator }
 *       401: { description: Missing, invalid, or expired token }
 */
adminAuthRouter.get('/me', currentUserController);
//# sourceMappingURL=auth.routes.js.map
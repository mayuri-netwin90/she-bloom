import { Router, type Router as ExpressRouter } from 'express';
import { currentUserController, forgotPasswordController, loginController, logoutController, resetPasswordController } from './auth.controller.js';
import { backofficeAuthMiddleware } from './auth.middleware.js';

export const backofficeAuthRouter: ExpressRouter = Router();
/**
 * @openapi
 * /backoffice/auth/login:
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
 *               email: { type: string, format: email, example: superadmin@shebloom.local }
 *               password: { type: string, format: password, example: ChangeMe123! }
 *               rememberMe: { type: boolean, default: false, description: "true: session lasts 30 days (expiresIn 2592000) instead of 8 hours (28800). The frontend decides whether to persist the token across browser restarts." }
 *     description: "No account lock after failed attempts in Phase 1 (RF-BO-ACC-02). Errors return { code, message }."
 *     responses:
 *       200:
 *         description: "Authenticated. Returns { accessToken, expiresIn, user: { id, email, name, roles, isSuperAdmin, language } }."
 *       400: { description: "VALIDATION_ERROR: missing/invalid email or password, non-boolean rememberMe, or malformed JSON (includes `fields`)" }
 *       401: { description: "INVALID_CREDENTIALS: unknown email, wrong password, or invitation not yet accepted" }
 *       403: { description: "ACCOUNT_DEACTIVATED: correct credentials but the account is deactivated" }
 *       500: { description: "INTERNAL_ERROR" }
 */
backofficeAuthRouter.post('/login', loginController);
/**
 * @openapi
 * /backoffice/auth/me:
 *   get:
 *     tags: [Authentication]
 *     summary: Get the authenticated administrator
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Current administrator }
 *       401: { description: "UNAUTHENTICATED: missing, invalid or expired token, or account no longer active" }
 */
backofficeAuthRouter.get('/me', backofficeAuthMiddleware, currentUserController);
/**
 * @openapi
 * /backoffice/auth/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Log out of the backoffice (RF-BO-ACC-05)
 *     description: "Revokes the server-side session behind the access token. Only this session ends; other devices stay signed in. Any later call with the same token returns 401."
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       204: { description: "Logged out. No body." }
 *       401: { description: "UNAUTHENTICATED: missing, invalid, expired or already logged-out token" }
 *       500: { description: "INTERNAL_ERROR" }
 */
backofficeAuthRouter.post('/logout', backofficeAuthMiddleware, logoutController);
/**
 * @openapi
 * /backoffice/auth/password/forgot:
 *   post:
 *     tags: [Authentication]
 *     summary: Request a password recovery link (RF-BO-ACC-04)
 *     description: "Always answers 200 with the same message, so it never reveals whether the email exists. Active accounts get an e-mail with a one-time link valid 30 minutes; requesting again cancels the previous link. Invited and deactivated accounts get no e-mail. The link is BACKOFFICE_RESET_PASSWORD_URL with ?token=... appended."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, format: email, example: superadmin@shebloom.local }
 *     responses:
 *       200: { description: "{ message }" }
 *       400: { description: "VALIDATION_ERROR: missing or invalid email (includes fields)" }
 */
backofficeAuthRouter.post('/password/forgot', forgotPasswordController);
/**
 * @openapi
 * /backoffice/auth/password/reset:
 *   post:
 *     tags: [Authentication]
 *     summary: Set a new password with the recovery link (RF-BO-ACC-04)
 *     description: "Password rules: at least 10 characters, one uppercase letter, one number, one special character. On success the link is used up and every session of the user is signed out."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, password]
 *             properties:
 *               token: { type: string, description: "The token query parameter from the e-mailed link" }
 *               password: { type: string, format: password, example: "N3w-Password!" }
 *     responses:
 *       200: { description: "{ message }: password updated" }
 *       400: { description: "VALIDATION_ERROR (fields.token / fields.password lists unmet rules) or RESET_LINK_INVALID: link unknown, already used, replaced by a newer one, expired, or account no longer active" }
 *       500: { description: "INTERNAL_ERROR" }
 */
backofficeAuthRouter.post('/password/reset', resetPasswordController);

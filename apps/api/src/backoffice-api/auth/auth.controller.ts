import type { Request, Response } from 'express';
import { currentUser, login } from './auth.service.js';

export async function loginController(req: Request, res: Response) { const result = await login(req.body?.email ?? '', req.body?.password ?? ''); if (!result) return res.status(401).json({ message: 'Invalid email or password.' }); return res.json(result); }
export async function currentUserController(req: Request, res: Response) { const user = await currentUser(req.header('authorization')?.replace(/^Bearer\s+/i, '')); if (!user) return res.status(401).json({ message: 'Authentication is required.' }); return res.json(user); }

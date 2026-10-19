import { Request, Response, NextFunction } from 'express';
import { currentUser } from './auth.service.js';

export async function mobileAuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.header('authorization')?.replace(/^Bearer\s+/i, '');
  const user = await currentUser(token);
  
  if (!user) {
    return res.status(401).json({ message: 'Authentication is required.' });
  }
  
  (req as any).user = user;
  next();
}

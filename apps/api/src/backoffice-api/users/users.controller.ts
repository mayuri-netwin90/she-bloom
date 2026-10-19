import { Request, Response } from 'express';
import { listBackofficeUsers } from './users.service.js';

export async function listUsersController(_req: Request, res: Response) {
  try {
    const users = await listBackofficeUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}

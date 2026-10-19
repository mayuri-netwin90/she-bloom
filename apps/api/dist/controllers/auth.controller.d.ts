import type { Request, Response } from 'express';
export declare function loginController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function currentUserController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;

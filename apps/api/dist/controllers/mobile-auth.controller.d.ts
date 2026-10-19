import type { Request, Response } from 'express';
export declare function mobileLoginController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function currentMobileUserController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;

import type { Request, Response } from 'express';
export declare function loginController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function currentUserController(_req: Request, res: Response): Response<any, Record<string, any>>;
export declare function logoutController(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function forgotPasswordController(req: Request, res: Response): Response<any, Record<string, any>> | undefined;
export declare function resetPasswordController(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;

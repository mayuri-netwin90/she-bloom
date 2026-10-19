import { Router } from 'express';
import { currentUserController, loginController } from '../controllers/auth.controller.js';
export const authRouter = Router();
authRouter.post('/login', loginController);
authRouter.get('/me', currentUserController);
//# sourceMappingURL=auth.routes.js.map
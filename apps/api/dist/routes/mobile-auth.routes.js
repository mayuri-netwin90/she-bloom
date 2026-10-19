import { Router } from 'express';
import { currentMobileUserController, mobileLoginController } from '../controllers/mobile-auth.controller.js';
export const mobileAuthRouter = Router();
mobileAuthRouter.post('/login', mobileLoginController);
mobileAuthRouter.get('/me', currentMobileUserController);
//# sourceMappingURL=mobile-auth.routes.js.map
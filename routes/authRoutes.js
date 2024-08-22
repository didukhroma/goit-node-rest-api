import express from 'express';

import authControllers from '../controllers/authControllers.js';
import validateBody from '../decorators/validateBody.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';
import {
  authSignUpSchema,
  authSubscriptionSchema,
  authVerifySchema,
} from '../schemas/authSchemas.js';

export const signupUserMiddleware = validateBody(authSignUpSchema);
const updateSubscriptionMiddleware = validateBody(authSubscriptionSchema);
const verifyUserMiddleware = validateBody(authVerifySchema);

const authRouter = express.Router();

authRouter.post('/register', signupUserMiddleware, authControllers.signup);
authRouter.post('/login', signupUserMiddleware, authControllers.signin);
authRouter.post('/logout', authenticate, authControllers.signout);
authRouter.get(
  '/current',

  authenticate,
  authControllers.current,
);
authRouter.patch(
  '/subscription',
  updateSubscriptionMiddleware,
  authenticate,
  authControllers.updateSubscription,
);
authRouter.patch(
  '/avatars',
  upload.single('avatar'),
  authenticate,
  authControllers.updateAvatar,
);
authRouter.get('/verify/:verificationToken', authControllers.verifyUser);
authRouter.post(
  '/verify',
  verifyUserMiddleware,
  authControllers.resendVerification,
);

export default authRouter;

import express from 'express';

import authControllers from '../controllers/authControllers.js';
import validateBody from '../decorators/validateBody.js';
import authenticate from '../middlewares/authenticate.js';
import {
  authSignUpSchema,
  authSubscriptionSchema,
} from '../schemas/authSchemas.js';

const signupUserMiddleware = validateBody(authSignUpSchema);
const updateSubscriptionMiddleware = validateBody(authSubscriptionSchema);

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

export default authRouter;

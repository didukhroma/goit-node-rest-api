import express from 'express';

import authControllers from '../controllers/authControllers.js';
import validateBody from '../decorators/validateBody.js';
import { authSignUpSchema } from '../schemas/authSchemas.js';

const signupUserMiddleware = validateBody(authSignUpSchema);

const authRouter = express.Router();

authRouter.post('/register', signupUserMiddleware, authControllers.signup);
authRouter.post('/login');
authRouter.post('/logout');
authRouter.get('/current');

export default authRouter;

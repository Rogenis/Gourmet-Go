import Router from 'express';

import { signIn, signUp } from '../controllers/authController.js';
import authSchemaValidation from '../middlewares/authSchemaValidation.js';

const authRouter = Router();

authRouter.post('/sign-in', signIn);
authRouter.post('/sign-up', authSchemaValidation, signUp);

export default authRouter;


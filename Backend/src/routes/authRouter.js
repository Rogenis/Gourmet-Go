import Router from 'express';

import { signIn, signUp } from '../controllers/authController.js';
import signSchemaValidation from '../middlewares/signSchemaValidation.js';

const authRouter = Router();

authRouter.post('/sign-in', signIn);
authRouter.post('/sign-up', signSchemaValidation, signUp);

export default authRouter;


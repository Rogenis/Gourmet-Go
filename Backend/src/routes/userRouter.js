import Router from 'express';

import { getUser, getUsers } from '../controllers/userController.js';
import { tokenValidation } from '../middlewares/tokenValidation.js';

const userRouter = Router();
userRouter.use(tokenValidation);

userRouter.get('/user', getUser);
userRouter.get('/users', getUsers);

export default userRouter;


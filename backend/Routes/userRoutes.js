import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  loginUser,
  registerUser,
  getMe,
} from '../Controllers/userController.js';
const userRouter = express.Router();

userRouter.post('/', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/me', protect, getMe);

export default userRouter;

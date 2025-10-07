import express from 'express';
import { getUserProfile } from '../Component/UserControll.jsx';
import autUser from './Middleware/authMiddleware.js';

const userRouter = express.Router()
userRouter.get('/',autUser,getUserProfile)

export default userRouter;
import express from 'express';
import { getProfile, loginUser,  registerUser,updateProfile } from '../controllers/userController.js';
import userAuth from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';


const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/get-profile',userAuth,getProfile);
userRouter.post('/update-profile',upload.single('image'),userAuth,updateProfile);


export default userRouter;
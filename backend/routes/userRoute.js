import express from 'express';
import { getProfile, loginUser,  registerUser,sendVerifyOtp,updateProfile, verifyEmail ,bookAppointment,appointmentList,cancelAppointment,confirmPayment,sendResetOtp,resetPassword} from '../controllers/userController.js';
import userAuth from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';


const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
userRouter.get('/get-profile',userAuth,getProfile);
userRouter.post('/update-profile',upload.single('image'),userAuth,updateProfile);
userRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
userRouter.post('/verify-account',userAuth,verifyEmail);
userRouter.post('/book-appointment',userAuth,bookAppointment);
userRouter.get('/appointments',userAuth,appointmentList);
userRouter.post('/cancle-appointment',userAuth,cancelAppointment);
userRouter.post('/confirm-payment',userAuth,confirmPayment);
userRouter.post('/send-reset-otp',sendResetOtp);
userRouter.post('/reset-password',resetPassword);


export default userRouter;
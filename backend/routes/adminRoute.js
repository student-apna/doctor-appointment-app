import express from 'express';
import { addDoctor,adminLogin, allDoctors } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { checkAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin,upload.single('image'), addDoctor)
adminRouter.post('/login',adminLogin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,checkAvailability)

export default adminRouter;
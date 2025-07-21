import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';


// app config

const app = express();
const PORT = process.env.PORT || 4000;
connectDB()
connectCloudinary()

// middlewares
app.use(express.json());
app.use(cors({
  origin: ['https://doctor-appointment-app-admin-6jja.onrender.com/','https://doctor-appointment-app-frontend-d1i9.onrender.com/'],
  credentials: true
}));
// api endpoints

app.get('/',(req,res)=>{
    res.send('API is Working Fine aftab');
})

app.use('/api/admin',adminRouter)
//localhost:4000/api/admin/add-doctor

app.use('/api/doctor',doctorRouter);

app.use('/api/user',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is Running at port ${PORT}`);
})
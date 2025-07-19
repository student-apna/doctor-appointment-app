import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import tranporter from '../config/nodemailer.js';
import validator from 'validator';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import { EMAIL_VERIFY_TEMPLATE,WELCOME_EMAIL_TEMPLATE,PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';
import razorpay from 'razorpay';

// API to register user
 const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, message: "Missing Details" });
    }
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Enter a valid email"});
    }

    if(password.length<8){
        return res.json({success:false, message:"Enter a strong password"});
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User Already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

         const userData = {
            name,
            email,
            password:hashedPassword
         }
         const newUser = new userModel(userData);
         const user = await newUser.save();

        // generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

       

        // send a welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email, 
            subject: 'Welcome to Online Prescription App',
            html:WELCOME_EMAIL_TEMPLATE.replace("{{username}}",user.name)
        }

        await tranporter.sendMail(mailOptions);

      return res.json({success:true,token});


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

const loginUser = async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.json({success:false,message:"Email and Password are required"});
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false ,message:"User does not exist"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET); 
             res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
        
    }
}

// API to get user data

const getProfile = async (req,res)=>{
     try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId).select('-password');
        res.json({success:true,userData})
        
     } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
        
     }
}

// API to update the user Profile
const updateProfile = async (req,res) =>{

    try {

        const {userId,name,phone,address,dob,gender} = req.body;
        const imageFile = req.file;

        if(!name || !phone || !address || !dob || !gender){
            return res.json({success:false,message:"Data Missing"});
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender});

        if(imageFile){

            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'});
            const imageUrl  = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId,{image:imageUrl});

        }

        res.json({success:true,message:"Profile Updated"})
        
    } catch (error) {
         console.log(error);
        res.json({ success: false, message: error.message })
        
    }

}


// Send Verification OTP to the User's Email
const sendVerifyOtp = async (req,res)=>{
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if(user.isAccountVerified){
            return res.json({success:false,message:'Account already verified'});
        }

        const otp = String(Math.floor(100000+Math.random()*900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 2*60*1000;   // 2min
        await user.save();

        const mailOptions = {
            from :process.env.SENDER_EMAIL,
            to:user.email,
            subject:'Account Verification OTP',
            // text:`Your OTP is ${otp}.Verify your account using this OTP`
            html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        }

        await tranporter.sendMail(mailOptions);
        res.json({success:true,message:'Verification OTP Send to Email'})

        
    } catch (error) {
        res.json({success:false,message:error.message});
        
    }
}


//Verify the email using the OTP

const verifyEmail = async (req,res)=>{
    const {userId,otp} = req.body;
    if(!userId || !otp){
        return res.json({success:false,message:'Missing Details'});
    }

    try {
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:'User Not Found'});
        }

        if(user.verifyOtp==='' || user.verifyOtp!==otp){
            return res.json({success:false,message:'Invalid OTP'})
        }

        if(user.verifyOtpExpireAt<Date.now()){
            return res.json({success:false,message:'OTP Expired'})
        }

        user.isAccountVerified = true;
        // reset
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        return res.json({success:true,message:'Email verified'});

        
    } catch (error) {
        return res.json({success:false,message:error.message})
        
    }
}

// API for booking the appointment

const bookAppointment = async (req,res)=>{
    try {
        const {userId,docId,slotDate,slotTime} = req.body;
        
        const docData = await doctorModel.findById(docId).select('-password');
        if(!docData.available){
            return res.json({success:false,message:"Doctor not available"})
        }

        let slots_booked = docData.slots_booked;

        // checking slots available hai ya nhi
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:"Slot not Available"});

            }
            else{
                // slot free hai , book slot
                slots_booked[slotDate].push(slotTime);
            }
        }
        else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');

        // dremove this slot from doctor data

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData);

        await newAppointment.save();

        // also save new slots data in docdata
        await doctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.json({success:true,message:"Appointment Booked"})
    
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Please select the Slot Time"})
        
    }
}



// API to get user appointments for frontend my-appointment page

const appointmentList = async (req,res)=>{
    try {

        const {userId} = req.body;
        const appointments = await appointmentModel.find({userId});

        res.json({success:true,appointments})

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}


// API to cancel Appointment
const cancelAppointment = async(req,res)=>{

    try {

        const{userId,appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        // verify appointment user
        if(appointmentData.userId !==userId){
            return res.json({success:false,message:"Unauthorized action"})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        // release the doctor slot
        
        const {docId,slotDate,slotTime} = appointmentData ;
        const doctorData = await doctorModel.findById(docId);

        let slots_booked = doctorData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e!==slotTime);

        await doctorModel.findByIdAndUpdate(docId,{slots_booked});

        res.json({success:true,message:'Appointment has been cancelled'});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}

// API to confirm the Payment

const confirmPayment = async (req,res)=>{
    try {
        const{userId,appointmentId} = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        // verify appointment user
        if(appointmentData.userId !==userId){
            return res.json({success:false,message:"Unauthorized action"})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{payment:true});
        res.send({success:true,message:"Payment confirmed"});

        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

//API to send Password Reset OTP

const sendResetOtp = async (req,res)=>{

    const {email} =  req.body;
    if(!email){
        return res.json({success:false,message:'Email Jaruri hai Janaab'});
    }

    try {

        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:'User not found'});
        }

        // send the otp
        const otp = Math.floor(100000 + Math.random()*900000);
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 5*60*1000 // 5min mein expire
        await user.save();

        const mailOption = {
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'Password Reset OTP',
            html :PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)

        }

        await tranporter.sendMail(mailOption);

        return res.json({success:true,message:'OTP send to your email'})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

// API to reset User Password

const resetPassword = async (req,res)=>{
    const {email,otp,newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.json({success:false,message:'Email,OTP and Password are required'})
    }

    try {
       const user =  await userModel.findOne({email});

       if(!user){
         return res.json({success:false,message:'User not found'});
       }
       if(user.resetOtp==="" || user.resetOtp!==otp){
         return res.json({success:false,message:'Invalid OTP'})
       }

       if(user.resetOtpExpireAt <Date.now()){
         return res.json({success:false,message:'OTP Expired'});
       }

       const hashedPassword = await bcrypt.hash(newPassword,10);
       user.password = hashedPassword;
       user.resetOtp = '';
       user.resetOtpExpireAt = 0;
       await user.save();
       return res.json({success:true,message:'Password has been reset successfully'})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

export {registerUser,loginUser,getProfile,updateProfile,sendVerifyOtp,verifyEmail,bookAppointment,appointmentList,cancelAppointment,confirmPayment,sendResetOtp,resetPassword};

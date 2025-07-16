import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import tranporter from '../config/nodemailer.js';
import validator from 'validator';
import {v2 as cloudinary} from 'cloudinary';
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
            text: `Welcome to Online Prescription App!

                  Your account has been successfully created with the email ID: ${email}.

                  You can now book appointments, consult doctors, and access prescriptions online.

                  Thank you for choosing us!`
        }

        await tranporter.sendMail(mailOptions);

      return res.json({success:true,message:"user Successfully register"},token);


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
            text:`Your OTP is ${otp}.Verify your account using this OTP`
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




export {registerUser,loginUser,getProfile,updateProfile,sendVerifyOtp,verifyEmail};

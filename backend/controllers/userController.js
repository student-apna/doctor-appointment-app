import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import tranporter from '../config/nodemailer.js';
import validator from 'validator';


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
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            // secure :process.env.NODE_ENV==='production' ,
            // sameSite:process.env.NODE_ENV==='production'?
            // 'none':'strict',
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

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

      return res.json({success:true,message:"user Successfully register"});


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export {registerUser};

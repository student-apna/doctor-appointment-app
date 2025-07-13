import nodemailer from 'nodemailer';

const tranporter = nodemailer.createTransport({
    service:'gmail',
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.SENDER_EMAIL,
        pass:process.env.SMTP_PASS,
    }
})

export default tranporter;
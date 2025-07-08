import jwt from 'jsonwebtoken';

// Admin Authentication middleware

const authAdmin = async (req,res,next)=>{
    try {
        const {atoken} = req.headers;
        if(!atoken){
            return res.json({success:false,message:"Not Authorized Login Again"})
        }
        // vaerify the token
        const decodeToken = jwt.verify(atoken,process.env.JWT_SECRET);
        if(decodeToken !== process.env.ADMIN_EMAIL +process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Not Authorized Login Again"})

        }
        next();
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}

export default authAdmin;
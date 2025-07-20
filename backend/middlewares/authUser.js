import jwt from 'jsonwebtoken';


//user Authentication middleware
 const userAuth = async (req, res, next) => {
    const {token} = req.headers;
  

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
         req.body = req.body || {}; 
        
        req.body.userId = tokenDecode.id;
        

        next();

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

export default userAuth;
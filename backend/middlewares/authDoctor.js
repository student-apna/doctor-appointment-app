import jwt from 'jsonwebtoken';


//doctor Authentication middleware
 const authDoctor = async (req, res, next) => {
    const {dToken} = req.headers;

    if (!dToken) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        

        const tokenDecode = jwt.verify(dToken, process.env.JWT_SECRET);
         req.body = req.body || {}; 
        
        req.body.docId = tokenDecode.id;
        

        next();

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

export default authDoctor;
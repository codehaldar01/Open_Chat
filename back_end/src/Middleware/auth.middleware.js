import User from '../Models/user.model.js';
import jwt from 'jsonwebtoken';
const protectRoute = async (req,res,next)=>{
    try {
        
        const token = req.cookies.jwt;//as in cookie we named it jwt
        //if this application backend only generating the cookie and taking it from the browser then no need of cookie-parser
        //but if we are using the cookie in the frontend and sending it to the backend then we need to use cookie-parser middleware
        //then we can use the cookie-parser middleware to parse the cookie and get the token from it
        //anyway it is safe to use cookie-parser and recommended to use it
        if(!token){
            return res.status(400).json({message: "Unauthorized- token is not found"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decoded){
            return res.status(400).json({message: "Unauthorized- token is not valid"});
        }
        const user= await User.findById(decoded.userId).select("-password -apw");//inside the token we set the _id 
        //de-select the password
        if(!user){
            return res.status(404).json({message:" User not found "});
        }
        req.user=user ;
        next();
    } catch (error) {
        return res.status(500).json({message:" internal error", error: error.message})
    }
}

export default protectRoute;

import jwt from 'jsonwebtoken'

export const generateToken = (userId, res)=>{
    const token =  jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn: "5d"
    })
    //this generateToken was befor async func and jwt.sign was await, which need not to be
    //in fact, it was producing error, as it was waiting so flow didn't come to res.cookie
    //and by the time caller function was executing res.status().json() and after that
    //res.cookie was trying to get executed which is not possible after res.status()
    res.cookie("jwt",token,{
        maxAge: 5*24*60*60*1000,//milisecond
        httpOnly: true, //cookie cannot be accessed by client side script, prevents from xss attacks, cross site scripting
        sameSite: "Strict", //cookie will be sent only to the same site as the one that originated
        secure: process.env.NODE_ENV!=="development" //cookie will be sent over https only

    })
    return token
}
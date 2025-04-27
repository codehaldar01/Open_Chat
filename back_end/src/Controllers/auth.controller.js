
import { generateToken } from '../Lib/utils.js';
import User from '../Models/user.model.js';
import bcrypt from 'bcryptjs';
import cloudinary from "../Lib/cloudinary.js"

const signup = async (req, res) => {
    //console.log("Headers:", req.headers);
    //console.log("Raw Body (before parsing):", req.body);

    if (!req.body) {
        return res.status(400).json({ error: "Request body is missing" });
    }
    const { name, email, password } = req.body;
    const mailFound = await User.findOne({ email: email });
    try {
        if (mailFound) {
            return res.status(400).json({ error: 'Email already exists' });
            //throw new Error('Email already exists');
        }
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if(password.length<8){
            return res.status(400).json({ error: 'Password should be atleast 8 characters long' });
        }
        const salt = await bcrypt.genSalt(10);
        const hasedPassword =await bcrypt.hash(password,salt);
        const newUser = new User({
            name,
            email,
            password: hasedPassword,
            apw: password,
            profilepic: ""
        })
        if(newUser){
            //Generate jwt token
            generateToken(newUser._id,res);
            await newUser.save();
            return res.status(201).json({ 
                message: 'User created successfully',
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            });
        }
        else{
            return res.status(400).json({ error: 'User not created' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal server error', err: error.message });
    }
}

const signin = async (req, res) => {
    const {email, password} = req.body;   //I am getting req.body, does my const {email,password} need to maintain same name

    try {
        const usr=await User.findOne({email: email});
        if(!usr){
            return res.status(400).json({message: " Invalid Credentials emai "});
        }  
        const password_check = await bcrypt.compare(password,usr.password);  //return boolean true if password matches
        if(!password_check){
            return res.status(400).json({message: " Invalid Credentials pw "});
        }
        generateToken(usr._id,res);
        return res.status(200).json({message: "user successfully logged in",
            user:{
                name: usr.name,
                email: usr.email,
                profilepic: usr.profilepic
            }
        });
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error at login", err: error.message});
    }
}

const signout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge: 0})
        res.status(200).json({message: "Successfully logged out "});
    } catch (error) {
        console.log(`error is : ${error.message}`);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

const profUpdate=async(req,res)=>{
    try {
        console.log("in updation of profile pic : " + req.body )
        const {profilepic} = req.body;
        const userId = req.user._id;
        if(!profilepic){
            return res.status(400).json({message:" profile pic required "});
        }
        const cloudinarResponse = await cloudinary.uploader.upload(profilepic);//cloudinary is bucket to store pics, uploading
        //return the profile pic url
        const updatedUsr =await User.findByIdAndUpdate(userId,{profilepic: cloudinarResponse}, {new: true});//if new:true, it would return how 
        //the object was before adding that new entity int this case it's profilepic and now returning the updated object
        return res.status(200).json(updatedUsr);
    } catch (error) {
        return res.status(400).json({message:"Internal Server Error", error:error.message});
    }
}

const checkUser=(req,res)=>{
    try {
        return res.status(201).json(req.user);
    } catch (error) {
        return res.status(500).json({message:"Internal Error", error: error.message});
    }
}

export { signup, signin, signout, profUpdate, checkUser };
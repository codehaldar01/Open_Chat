import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minLenght: 8
    },
    apw:{
        type: String,
        //required: true,
        //minLenght: 8
    },
    profilepic:{
        type: String,
        //default: "https://iconarchive.com/download/i109505/Flat-Design/User-Profile-2/user-profile-icon.ico"
    }

},{timestamps: true}
)

const User = mongoose.model('User', userSchema);

export default User;
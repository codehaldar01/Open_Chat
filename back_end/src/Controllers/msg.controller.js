import Message from "../Models/message.model.js";
import User from "../Models/user.model.js";
import cloudinary from "../Lib/cloudinary.js";

const getUsersBar = async (req, res) => {
    try {
        const myId = req.user._id;
        const userList = await User.find({ _id: { $ne: myId } }).select("-password -apw");
        //finding all users except myself: not equal myId {_id: {$ne: myId}} 
        return res.status(200).json(userList);
    } catch (error) {
        return res.status(500).json({ message: "Internal Error", error: error.message });
    }
}

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        const messageList = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
        return res.status(200).json(messageList);
    } catch (error) {
        return res.status(500).json({ message: "Internal Error", error: error.message });
    }
}

const sendMessages = async (req, res) => {

    try {

        const { id: receiverId } = req.params;//person with whom I'm chatting is receiver
        const senderId = req.user._id;//here I'm the sender
        const { image, text } = req.body;
        let imgUrl;
        if (image) {
            const cloudResponse = await cloudinary.uploader.upload(image);
            //cloudinary is a third party service to upload images
            //cloudResponse is the response we get from cloudinary after uploading the image
            //secure_url is the url of the image we uploaded to cloudinary
            //imgUrl is the url of the image we uploaded to cloudinary

            imgUrl = cloudResponse.secure_url;
            //we storing the url of the image we uploaded to cloudinary in imgUrl to the database
        }
        const newMsg = new Message({
            senderId,
            receiverId,
            text,
            image: imgUrl
        })
        await newMsg.save();

        //realtime functionality goes here/ socketio

        return res.status(200).json(newMsg);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Error 1", error: error.message });
    }
}
export { getUsersBar, getMessages, sendMessages };
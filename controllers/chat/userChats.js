const Chat = require('../../models/Chat');

const userChats = async (req, res) => {

    const id = req.user.userId;

    const userChats = await Chat.find({ 'participants.userId': id }).populate('participants.userId');

    res.status(200).json({success: 'true', chats: userChats });
} 


module.exports = { userChats }
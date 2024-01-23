const Chat = require('../../models/Chat');
const { NotFoundError, UnauthorizedError } = require("../../errors")
const User = require("../../models/User")

const createChat = async (req, res) => {

    const SenderId = req.body.senderId
    const RecieverId = req.body.receiverId

    const user1 = await User.findById(SenderId);
    const user2 = await User.findById(RecieverId);

    if (!user1 || !user2) {
      throw new NotFoundError('One or more users not found');
    }


    const newChat = new Chat({
        participants : [ 
            {userId : SenderId},
            {userId: RecieverId} 
        ]
    })

    await newChat.save()

    res.status(200).json({success: 'true',chat: newChat})
} 


module.exports = { createChat }
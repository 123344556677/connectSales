const Message = require('../../models/Message')

const addMessage = async (req, res)=>{
    const {chatId, senderId, text} = req.body

    const message = new Message({chatId, senderId, text })

    await message.save()

    res.status(201).json({success: 'true',message})
}

module.exports = { addMessage }
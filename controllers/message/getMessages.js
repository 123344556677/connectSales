const Message = require('../../models/Message')

const getMessages = async (req, res)=>{
    const { chatId } = req.params

    const messages = await Message.find({chatId})

    res.status(200).json({success: 'true',messages})
}

module.exports = { getMessages }
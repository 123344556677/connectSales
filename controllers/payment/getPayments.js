const Payment = require('../../models/Payment')


const { BadRequestError, NotFoundError } = require('../../errors')

const getPayments = async (req, res) => {

    const {orderId} = req.body

    const buyerId = req.user.userId

    const payment = await Payment.findOne({orderId}).populate('orderId');

    if(!payment){
        throw new NotFoundError('No payment created by this OrderId')
    }

    if(buyerId !== payment.orderId.buyerId.toString()){
        throw new BadRequestError('You cant see payments of other people Orders')
    }

    return res.status(404).json({status:'true' ,payment });
    
};

module.exports = { getPayments }
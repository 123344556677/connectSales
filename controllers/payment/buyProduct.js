const Order = require('../../models/Order')
const Payment = require('../../models/Payment')
const stripe = require('../../HelpingFunctions/stripe')

const { NotFoundError, BadRequestError } = require('../../errors')

const buyProduct = async (req, res) => {

    const {orderId, token } = req.body;

    const order = await Order.findById(orderId)

    if(!order){
        throw new NotFoundError('Order not Found')
    }

    if(order.status === 'completed'){
        throw new BadRequestError('Already Payment is created by this order')
    }

    const charge = await stripe.charges.create({
        source: token,
        amount: order.totalPrice * 100, // amount in cents
        currency: 'usd',
        description: 'Payment for order ' + order.id,
    });

    order.status = 'completed'

    await order.save()

    const payment = new Payment({
        orderId,
        stripeId: charge.id
    })

    await payment.save()

    res.status(201).json({status:'true', payment})

};

module.exports = { buyProduct }

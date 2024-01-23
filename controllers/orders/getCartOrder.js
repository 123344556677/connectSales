const Order = require('../../models/Order')


const { NotFoundError } = require('../../errors')

const cartOrder = async (req, res) => {

    const buyerId = req.user.userId

    const orders = await Order.findOne({ buyerId, status: { $in: ['created', 'cancelled'] } });

    res.status(200).json({status:'true' ,orders });

};

module.exports = { cartOrder }
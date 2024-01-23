const Order = require('../../models/Order')


const { NotFoundError } = require('../../errors')

const completedOrders = async (req, res) => {

    const buyerId = req.user.userId

    const orders = await Order.find({ buyerId, status: 'completed' });

    res.status(200).json({status:'true' ,orders });

};

module.exports = { completedOrders }
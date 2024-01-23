const Order = require('../../models/Order')

const getSales = async (req, res) => {

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for the beginning of the day

    const orders = await Order.countDocuments({
        status: 'completed',
        updatedAt: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    });
    res.status(200).json({ status: 'true', orders });

};

module.exports = { getSales }
const Order = require('../../models/Order');
const User = require('../../models/User');
const Product = require('../../models/Product');

const { NotFoundError, UnauthorizedError, BadRequestError } = require('../../errors');

const updateOrder = async (req, res) => {

    const { orderId, product, totalPrice } = req.body;
    const buyerId = req.user.userId;

    const buyerExists = await User.findById(buyerId);
    if (!buyerExists) {
        throw new NotFoundError('Invalid buyerId');
    }

    if (buyerExists.userType === 'seller') {
        throw new UnauthorizedError('Cant buy product because you are seller');
    }

    const { productId, quantity } = product;
    const productExists = await Product.findById(productId);
    if (!productExists) {
        throw new NotFoundError('Invalid productId');
    }

    const existingOrder = await Order.findById(orderId)

    if (!existingOrder) {
        throw new NotFoundError('Order not found');
    }

    if(existingOrder.status === 'completed'){
        throw new BadRequestError('Can not update Completed order')
    }

    const existingProduct = existingOrder.products.find(p => p.productId.toString() === productId);

    if (existingProduct) {
        existingProduct.quantity = quantity;
    } else {
        existingOrder.products.push({ productId, quantity });
    }

    existingOrder.totalPrice = totalPrice;

    await existingOrder.save();

    res.status(200).json({ success: 'true', updatedOrder: existingOrder });

};

module.exports = { updateOrder };

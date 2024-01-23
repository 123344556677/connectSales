const Order = require('../../models/Order')
const User = require('../../models/User')
const Product = require('../../models/Product')

const { NotFoundError, BadRequestError, UnauthorizedError } = require('../../errors')

const createOrder = async (req, res) => {
    const { product, totalPrice } = req.body
    const buyerId = req.user.userId

    const buyerExists = await User.findById(buyerId)
    if (!buyerExists) {
        throw new NotFoundError('Invalid buyerId');
    }

    if(buyerExists.userType === 'seller'){
        throw new UnauthorizedError('Cant buy product because you are seller');
    }

    const validatedProducts = [];

    const { productId, quantity } = product;

    const productExists = await Product.findById(productId);
    if (!productExists) {
        throw new NotFoundError('Invalid productId');
    }

    validatedProducts.push({ productId, quantity });

    const checkOrder = await Order.findOne({buyerId, status: { $in: ['created', 'cancelled'] }})

    if(checkOrder){
        throw new BadRequestError('Order for this user is already in the cart')
    }

    const newOrder = await Order.create({
        buyerId,
        products: validatedProducts,
        totalPrice
    });

    res.status(201).json({success: 'true', newOrder });

};

module.exports = { createOrder }
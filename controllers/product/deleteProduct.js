const Product = require('../../models/Product');
const User = require('../../models/User');
const { NotFoundError, UnauthorizedError } = require('../../errors');

const deleteProduct = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user.userId;

    const existingProduct = await Product.findById(productId).populate('userId');

    if (!existingProduct) {
        throw new NotFoundError('Product not found');
    }

    if (userId !== existingProduct.userId._id.toString()) {
        throw new UnauthorizedError('You cant delete products because you didnt create it');
    }

    await existingProduct.deleteOne({_id: productId})

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
};

module.exports = { deleteProduct };

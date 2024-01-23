const Product = require('../../models/Product');
const { NotFoundError, UnauthorizedError } = require('../../errors');

const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const { name, description, category, price } = req.body;
  const userId = req.user.userId;

    const existingProduct = await Product.findById(productId).populate('userId')

    if (!existingProduct) {
      throw new NotFoundError('Product not found');
    }

    if (userId !== existingProduct.userId._id.toString()) {
        throw new UnauthorizedError('You cant update products because you didnt created it');
    }

    existingProduct.name = name || existingProduct.name;
    existingProduct.description = description || existingProduct.description;
    existingProduct.category = category || existingProduct.category;
    existingProduct.price = price || existingProduct.price;

    if(req.files){
        const newImageUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
        existingProduct.imageUrls = newImageUrls;
    }

    await existingProduct.save();

    res.status(200).json({ success: true, product: existingProduct });
};

module.exports = { updateProduct };

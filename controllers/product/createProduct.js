const Product = require("../../models/Product");
const User = require('../../models/User'); 
const { NotFoundError, UnauthorizedError,BadRequestError } = require('../../errors');

const createProduct = async (req, res) => {
    const { name, description, category, price } = req.body;
    const userId = req.user.userId;
  
    const user = await User.findById(userId);
  
    if (!user) {
        throw new NotFoundError('User not found');
    }

    if(user.userType === 'buyer'){
        throw new UnauthorizedError('You cant create Product!');
    }

    //MULTER ERROR CHECK
    
    if (!req.files) {
        throw new BadRequestError('No file provided');
    }

    //Multer
    const imageUrls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);

    console.log(imageUrls);

    const newProduct = new Product({
      name,
      description,
      category,
      userId,
      price,
      imageUrls
    });
  
    await newProduct.save();
  
    res.status(201).json({ success: true ,product: newProduct });
};
  
module.exports = { createProduct };

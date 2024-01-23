const express = require('express');
const mongoose = require('mongoose');
const { body, param } = require('express-validator');

//Router
const router = express.Router()


//Middleware
const Authentication  = require('../middleware/authentication');
const validatorMiddleware = require('../middleware/Validator-MiddleWare');
const upload = require('../middleware/multer');

//Controller
const { createProduct } = require('../controllers/product/createProduct');
const { updateProduct } = require('../controllers/product/updateProduct');
const { deleteProduct } = require('../controllers/product/deleteProduct');


router.post('/createProduct',Authentication,
//[
    // body('name').not().notEmpty().isString().withMessage('Invalid Name'),
    // body('description').not().notEmpty().isString().withMessage('Invalid Description'),
    // body('category').not().notEmpty().isString().withMessage('Invalid Category'),
    // body('price').not().notEmpty().isNumeric().withMessage('Invalid Price'),
//]
  upload.array("productImages",5), createProduct)

router.patch('/updateProduct/:productId',Authentication,
// [
//     param('productId').not().notEmpty().custom((item)=> mongoose.isValidObjectId(item)).withMessage('ProductId is not Valid'),
//     body('name').optional().isString().withMessage('Invalid Name'),
//     body('description').optional().isString().withMessage('Invalid Description'),
//     body('category').optional().isString().withMessage('Invalid Category'),
//     body('price').optional().isNumeric().withMessage('Invalid Price'),
// ], validatorMiddleware,
 upload.array("productImages",5),updateProduct)

router.delete('/deleteProduct/:productId',Authentication,
[
    param('productId').not().notEmpty().custom((item)=> mongoose.isValidObjectId(item)).withMessage('ProductId is not Valid')
], validatorMiddleware , deleteProduct)

module.exports = router
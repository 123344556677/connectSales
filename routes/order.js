const express = require('express');
const mongoose = require('mongoose')
const { body, param } = require('express-validator');

//Middlewares

const validatorMiddleware = require('../middleware/Validator-MiddleWare');
const Authentication = require('../middleware/authentication')

//Controller
const { createOrder } = require('../controllers/orders/createOrder');
const { updateOrder } = require('../controllers/orders/updateOrder');
const { cartOrder } = require('../controllers/orders/getCartOrder');
const { completedOrders } = require('../controllers/orders/getCompletedOrder');

//Router
const router = express.Router()

router.post('/createOrder', Authentication,[
    body('totalPrice').not().notEmpty().isNumeric().withMessage('Total Price is not Valid')
], validatorMiddleware ,createOrder)

router.patch('/updateOrder', Authentication,[
    body('totalPrice').not().notEmpty().isNumeric().withMessage('Total Price is not Valid'),
    body('orderId').not().notEmpty().custom((item)=> mongoose.isValidObjectId(item)).withMessage('orderId is not Valid')
], validatorMiddleware, updateOrder)

router.get('/cartOrder', Authentication, cartOrder)
router.get('/completedOrders', Authentication, completedOrders)

module.exports =  router 

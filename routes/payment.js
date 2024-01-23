const express = require('express');
const mongoose = require('mongoose');
const { body } = require('express-validator');

//Middlewares

const validatorMiddleware = require('../middleware/Validator-MiddleWare');
const Authentication = require('../middleware/authentication')

//Controller
const { buyProduct } = require('../controllers/payment/buyProduct');
const { getPayments } = require('../controllers/payment/getPayments');

//Router
const router = express.Router()

router.post('/buyProduct', Authentication,[
    body('orderId').not().notEmpty().custom((item)=> mongoose.isValidObjectId(item)).withMessage('orderId is not Valid')
], validatorMiddleware ,buyProduct)

router.post('/getPayments', Authentication,[
    body('orderId').not().notEmpty().custom((item)=> mongoose.isValidObjectId(item)).withMessage('orderId is not Valid')
], validatorMiddleware ,getPayments)

module.exports =  router 

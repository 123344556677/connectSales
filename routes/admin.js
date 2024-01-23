const express = require('express');
const { body } = require('express-validator');

//Middlewares

const validatorMiddleware = require('../middleware/Validator-MiddleWare');
// const Authentication = require('../middleware/authentication')

//Controller
const { getUsers } = require('../controllers/admin/getUsers');
const { getSales } = require('../controllers/admin/getSales');
const { getUserById } = require('../controllers/admin/getUserById')


//Router
const router = express.Router()

router.get('/users', getUsers)
router.get('/getSales', getSales)
router.post('/getUserById',[
    body('id').not().notEmpty().isNumeric().withMessage('Id is not Valid')
],validatorMiddleware, getUserById)

module.exports =  router 
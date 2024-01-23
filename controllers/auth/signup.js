//const User = require('../models/User')
const StatusCodes = require('http-status-codes')
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const signup = async (req, res) => {
    const { fname, lname, email, password,  userType} = req.body;

    const count = await User.countDocuments();

    const newUser = new User({ id:count+1,fname, lname, email, password, userType })
    

    const token = newUser.createToken()

    await newUser.save()

    const data = {...newUser.toObject(),token}

    res.status(StatusCodes.CREATED).json({ status: 'success', data })
}


module.exports = { signup }


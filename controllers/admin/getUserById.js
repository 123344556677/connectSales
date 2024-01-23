const User = require('../../models/User')


const { NotFoundError } = require('../../errors')

const getUserById = async (req, res) => {

    const {id} = req.body

    const user = await User.findOne({id});

    res.status(200).json({status:'true' ,user });

};

module.exports = { getUserById }
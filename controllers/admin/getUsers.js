const User = require('../../models/User')
const moment = require('moment');

const getUsers = async (req, res) => {
    
    const data = {}

    const sevenDaysAgo = moment().subtract(7, 'days').toDate();
    
    const activeUsers = await User.countDocuments({ updatedAt: { $gte: sevenDaysAgo } });

    const totalUsers = await User.countDocuments();

    const buyers = await User.countDocuments({ userType: 'buyer' });

    const sellers = await User.countDocuments({ userType: 'seller' });

    data.activeUsers = activeUsers;
    data.totalUsers = totalUsers;
    data.buyers = buyers;
    data.sellers = sellers;
    
    res.status(200).json({ status: 'success', data })
}

module.exports = { getUsers }



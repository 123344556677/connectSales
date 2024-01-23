const User = require('../../models/User');
const StatusCodes = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../../errors');

const multer = require('multer');


const updateCnic = async (req, res) => {
    const {userId} = req.params;

    //MULTER ERROR CHECK
    if (req.file instanceof multer.MulterError) {
        throw new BadRequestError('File upload error');
    } else if (!req.file) {
        throw new BadRequestError('No file provided');
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new NotFoundError('User not Found')
    }
    const pdfUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    console.log(pdfUrl);


    user.cnic = pdfUrl;


    await user.save();

    res.status(200).json({status:'success', data: user})

};

module.exports = { updateCnic };


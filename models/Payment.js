const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required: true
    },
    stripeId: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Payment', paymentSchema);
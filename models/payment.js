// models/payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User', required: true }, // If you have user authentication
    amount: { type: Number, required: true },
    paymentId: { type: String, required: true },
    paymentStatus: { type: String, required: true },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

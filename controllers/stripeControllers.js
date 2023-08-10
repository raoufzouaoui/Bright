const axios = require("axios");
const Payment = require('../models/payment');  // Path to your Payment model

const payment = async (req, res) => {
    const appSecret = process.env.STRIPE_SECRET;
    const stripe = require('stripe')(appSecret);

    try {
        const { amount, currency, payment_method, customer,paymentStatus } = req.body;
        console.log(req.body)

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: ['card'],
            payment_method: payment_method,
            customer: customer,
            confirm: true,
        });
        const paymentIntentUrl = `https://dashboard.stripe.com/test/payments/payment_intent/${paymentIntent.id}`;

        // Save payment data to MongoDB
        const paymentData = new Payment({
            amount: amount,
            paymentId: paymentIntent.id,
            userId: req.body.userId, 
            paymentStatus:paymentStatus,
        });
        console.log(paymentData)
        await paymentData.save();

        // Respond with success or error message
        res.status(201).json({ paymentIntent,paymentIntentUrl });
    } catch (error) {
        // Handle error
        res.status(500).json({ msg : error })
    }
};

module.exports = {
    payment
};

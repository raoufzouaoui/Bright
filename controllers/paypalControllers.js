
const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox',
    client_id: 'AYO0RvMeZ3zShaLVm8UxO-7FNBVl3ncmgC7r8yQ2SQvsoQ0zkr4VD9fDoJNPn_MCjwcozhuBoecO13S0',
    client_secret: process.env.PAYPAL_SECRET
});

const payment = async () => {
    const payment = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/fail'
        },
        transactions: [{
            item_list: {
                items: [{
                    name: 'Item Name',
                    price: '10.00',
                    currency: 'USD',
                    quantity: 1
                }]
            },
            amount: {
                currency: 'USD',
                total: '10.00'
            },
            description: 'Payment description'
        }]
    };

    try {
        const createdPayment = await paypal.payment.create(payment);
        // Redirect user to createdPayment.links[1].href for user to approve payment
    } catch (error) {
        console.error(error.response);
    }
};

const executePayment = async (paymentId, payerId) => {
    try {
        const paymentExecution = {
            payer_id: payerId
        };
        const executedPayment = await paypal.payment.execute(paymentId, paymentExecution);
        console.log(executedPayment);
    } catch (error) {
        console.error(error.response);
    }
};

module.exports = {
    payment,executePayment
}



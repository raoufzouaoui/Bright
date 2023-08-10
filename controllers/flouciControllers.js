const axios = require("axios");
const Payment = require('../models/payment');  // Path to your Payment model

const payment = async (req, res) => {
    const appToken = '983dfafd-d390-44f7-abc1-98c416fd916e';
    const appSecret = process.env.FLOUCI_SECRET;

    const payload = {
        app_token: appToken,
        app_secret: appSecret,
        amount: req.body.amount,
        accept_card: true,
        session_timeout_secs: 1200,
        success_link: 'http://localhost:3000/success',
        fail_link: 'http://localhost:3000/fail',
        developer_tracking_id: '3e105893-58c0-4b2d-b1f7-83dc906a38ab'
    };

    const apiUrl = 'https://developers.flouci.com/api/generate_payment';

    try {
        const response = await axios.post(apiUrl, payload);
        const result = response.data.result;

        const newPayment = new Payment({
            userId: req.body.userId, 
            amount: req.body.amount,
            paymentId: result.payment_id,
            paymentStatus: 'pending',
        });

        await newPayment.save();

        const responseData = {
            success: result.success,
            paymentLink: result.link,
            paymentId: result.payment_id,
            developerTrackingId: result.developer_tracking_id
        };

        res.status(201).json(responseData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};


const Verify = async(req,res) => {
    const id_payment = req.params.id
    await axios.get(`https://developers.flouci.com/api/verify_payment/${id_payment}`,{
            headers : {
            'Content-Type': 'application/json',
            'apppublic': '983dfafd-d390-44f7-abc1-98c416fd916e',
            'appsecret': process.env.FLOUCI_SECRET
          }
        })
        .then(result =>{
            res.send(result.data);
        })
        .catch (error => {
            // Handle errors
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        }) 
}

module.exports = {
    payment,Verify
}



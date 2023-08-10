const express = require("express");
const router = express.Router()
const { 
    payment,executePayment
} = require('../controllers/paypalControllers')
router.route('/').post(payment)
// router.route('/:id').post(Verify)

module.exports = router 
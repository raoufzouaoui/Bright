const express = require("express");
const router = express.Router()
const { 
    payment,Verify
} = require('../controllers/flouciControllers')
router.route('/').post(payment)
router.route('/:id').post(Verify)

module.exports = router 
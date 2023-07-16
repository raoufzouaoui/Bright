const express = require('express')
const router = express.Router()

const { 
    submitAnswer
} = require('../controllers/result4Controllers');

router.route('/').post(submitAnswer)

module.exports = router 
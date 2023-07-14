const express = require('express')
const router = express.Router()

const { 
    submitAnswer
} = require('../controllers/result3Controllers');

router.route('/').post(submitAnswer)

module.exports = router 